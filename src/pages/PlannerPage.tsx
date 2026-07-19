import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { PlannerProvider, usePlanner, PLANNER_BASKETS } from "../planner/PlannerContext";
import PlannerSummary from "../planner/PlannerSummary";
import PlannerBasket from "../planner/PlannerBasket";
import StickySummary from "../planner/StickySummary";
import ResetDialog from "../planner/ResetDialog";
import SearchBar from "../planner/SearchBar";

function PlannerInner() {
  const { reset } = usePlanner();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("code");
  const [resetOpen, setResetOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const ucBaskets = PLANNER_BASKETS.filter((b) => b.category === "University Core");
  const pcBaskets = PLANNER_BASKETS.filter((b) => b.category === "Programme Core");
  const peBaskets = PLANNER_BASKETS.filter((b) => b.category === "Programme Elective");
  const ueBaskets = PLANNER_BASKETS.filter((b) => b.category === "University Elective");

  const handleReset = () => {
    reset();
    setResetOpen(false);
  };

  const filterProps = { search, statusFilter, selectedFilter, sortBy };

  return (
    <div className="min-h-screen bg-brandblack pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-brandblack/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-inter text-xs uppercase tracking-widest text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/all-courses"
              className="hidden font-inter text-xs uppercase tracking-widest text-white/60 transition hover:text-white sm:block"
            >
              All Courses
            </Link>
            <button
              onClick={() => setResetOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-brandred/30 bg-brandred/10 px-4 py-2 text-[11px] uppercase tracking-widest text-brandred transition hover:border-brandred/50 hover:bg-brandred/20"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:py-16">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-14"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-brandred">
            Software Engineering · VIT-AP
          </div>
          <h1 className="mt-3 font-podium text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            Curriculum Planner
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/50 sm:text-base">
            Select courses you plan to take. Credits are calculated live with basket limits enforced.
            Your selections are saved automatically.
          </p>
        </motion.div>

        {/* Summary */}
        <PlannerSummary />

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`grid h-[46px] w-[46px] flex-shrink-0 place-items-center rounded-xl border transition ${
                filtersOpen
                  ? "border-brandred/50 bg-brandred/10 text-brandred"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {filtersOpen ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            </button>
          </div>

          {/* Filter chips */}
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              <FilterGroup label="Status">
                {[
                  { v: "all", l: "All" },
                  { v: "Completed", l: "Completed" },
                  { v: "Registered", l: "Registered" },
                  { v: "Not Registered", l: "Not Registered" },
                ].map(({ v, l }) => (
                  <Chip key={v} active={statusFilter === v} onClick={() => setStatusFilter(v)}>
                    {l}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Selection">
                {[
                  { v: "all", l: "All" },
                  { v: "selected", l: "Selected" },
                  { v: "not-selected", l: "Not Selected" },
                ].map(({ v, l }) => (
                  <Chip key={v} active={selectedFilter === v} onClick={() => setSelectedFilter(v)}>
                    {l}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Sort">
                {[
                  { v: "code", l: "Code" },
                  { v: "name", l: "A-Z" },
                  { v: "credits", l: "Credits" },
                  { v: "status", l: "Status" },
                ].map(({ v, l }) => (
                  <Chip key={v} active={sortBy === v} onClick={() => setSortBy(v)}>
                    {l}
                  </Chip>
                ))}
              </FilterGroup>
            </motion.div>
          )}
        </motion.div>

        {/* University Core */}
        <Section title="University Core" delay={0.1}>
          {ucBaskets.map((b) => (
            <PlannerBasket key={b.key} basket={b} {...filterProps} />
          ))}
        </Section>

        {/* Programme Core */}
        <Section title="Programme Core" delay={0.15}>
          {pcBaskets.map((b) => (
            <PlannerBasket key={b.key} basket={b} {...filterProps} />
          ))}
        </Section>

        {/* Programme Elective */}
        <Section title="Programme Elective" delay={0.2}>
          {peBaskets.map((b) => (
            <PlannerBasket key={b.key} basket={b} {...filterProps} />
          ))}
        </Section>

        {/* University Elective */}
        <Section title="University Elective" delay={0.25}>
          {ueBaskets.map((b) => (
            <PlannerBasket key={b.key} basket={b} {...filterProps} />
          ))}
        </Section>
      </div>

      {/* Sticky footer */}
      <StickySummary />

      {/* Reset dialog */}
      <ResetDialog open={resetOpen} onConfirm={handleReset} onCancel={() => setResetOpen(false)} />
    </div>
  );
}

// Wrapper to provide context
export default function PlannerPage() {
  return (
    <PlannerProvider>
      <PlannerInner />
    </PlannerProvider>
  );
}

// ─── helper sub-components ───
function Section({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="mt-12 lg:mt-16"
    >
      <h2 className="mb-5 font-podium text-xl uppercase tracking-wide text-white sm:text-2xl lg:mb-6">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[10px] uppercase tracking-widest text-white/30">{label}:</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-wider transition ${
        active
          ? "border-brandred/50 bg-brandred/15 text-brandred"
          : "border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
      }`}
    >
      {children}
    </button>
  );
}
