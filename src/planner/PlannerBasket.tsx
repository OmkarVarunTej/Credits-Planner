import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { BasketDef } from "./PlannerContext";
import { usePlanner } from "./PlannerContext";
import PlannerCourseCard from "./PlannerCourseCard";
import PlannerProgressBar from "./PlannerProgressBar";

interface PlannerBasketProps {
  basket: BasketDef;
  search: string;
  statusFilter: string;
  selectedFilter: string;
  sortBy: string;
  defaultOpen?: boolean;
}

export default function PlannerBasket({
  basket,
  search,
  statusFilter,
  selectedFilter,
  sortBy,
  defaultOpen = false,
}: PlannerBasketProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { isSelected, completedCredits, selectedCredits, basketTotal } = usePlanner();

  const completed = completedCredits(basket);
  const selected = selectedCredits(basket);
  const total = basketTotal(basket);
  const selectedCount = basket.courses.filter(
    (c) => c.status !== "Completed" && isSelected(basket.key, c.code)
  ).length;

  // Filter & sort
  const filtered = useMemo(() => {
    let list = [...basket.courses];

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter && statusFilter !== "all") {
      list = list.filter((c) => c.status === statusFilter);
    }

    // Selected filter
    if (selectedFilter === "selected") {
      list = list.filter((c) => isSelected(basket.key, c.code) || c.status === "Completed");
    } else if (selectedFilter === "not-selected") {
      list = list.filter((c) => !isSelected(basket.key, c.code) && c.status !== "Completed");
    }

    // Sort - copy array first to guarantee immutability
    const sorted = [...list];
    if (sortBy === "code") sorted.sort((a, b) => a.code.localeCompare(b.code));
    else if (sortBy === "credits") sorted.sort((a, b) => b.credits - a.credits);
    else if (sortBy === "status") {
      const order = { Completed: 0, Registered: 1, "Not Registered": 2 };
      sorted.sort((a, b) => order[a.status] - order[b.status]);
    } else if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [basket.courses, basket.key, search, statusFilter, selectedFilter, sortBy, isSelected]);

  // Don't render basket if no courses match filters
  if (filtered.length === 0 && (search || statusFilter !== "all" || selectedFilter !== "all")) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl glass"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-white/5 sm:px-6"
      >
        <div className="min-w-0 flex-1 pr-4">
          <div className="font-podium text-lg uppercase tracking-wide text-white sm:text-xl">
            {basket.label}
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-white/50">
            <span>{basket.courses.length} courses</span>
            <span>
              {completed} completed · {selected} planned
            </span>
            {selectedCount > 0 && (
              <span className="text-brandred">{selectedCount} selected</span>
            )}
            {total > basket.maxCredits && (
              <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400 border border-amber-500/20">
                Planning Buffer (+5 Credits)
              </span>
            )}
          </div>
          <div className="mt-3 max-w-xs">
            <PlannerProgressBar value={total} max={basket.maxCredits} showText={false} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="font-inter text-xl font-bold tabular-nums text-white">
              {total}
              <span className="text-sm font-normal text-white/40"> / {basket.maxCredits}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Credits</div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/5"
          >
            <ChevronDown className="h-4 w-4 text-white/70" />
          </motion.div>
        </div>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-4 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                {filtered.map((course) => (
                  <PlannerCourseCard key={`${basket.key}-${course.code}`} course={course} basket={basket} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-white/30">
                  No courses match the current filters.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
