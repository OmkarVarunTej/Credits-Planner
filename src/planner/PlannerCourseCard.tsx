import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import type { Course } from "../data/curriculum";
import type { BasketDef } from "./PlannerContext";
import { usePlanner } from "./PlannerContext";

interface PlannerCourseCardProps {
  course: Course;
  basket: BasketDef;
}

export default function PlannerCourseCard({ course, basket }: PlannerCourseCardProps) {
  const { isSelected, toggle, canSelect } = usePlanner();

  const isCompleted = course.status === "Completed";
  const isRegistered = course.status === "Registered";
  const selected = isSelected(basket.key, course.code);
  const disabled = !isCompleted && !selected && !canSelect(course, basket);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
        isCompleted
          ? "border-emerald-500/20 bg-emerald-500/5"
          : selected
          ? "border-brandred/40 bg-brandred/10"
          : disabled
          ? "border-white/5 bg-white/[0.02] opacity-50"
          : "glass hover:border-white/15 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Checkbox or completed icon */}
        <div className="mt-0.5 flex-shrink-0">
          {isCompleted ? (
            <div className="grid h-5 w-5 place-items-center rounded bg-emerald-500/20">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          ) : (
            <button
              onClick={() => !disabled && toggle(basket.key, course.code)}
              disabled={disabled}
              className={`grid h-5 w-5 place-items-center rounded border transition ${
                selected
                  ? "border-brandred bg-brandred"
                  : disabled
                  ? "cursor-not-allowed border-white/10 bg-white/5"
                  : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5 text-white" />}
            </button>
          )}
        </div>

        {/* Course info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-inter text-xs font-bold uppercase tracking-widest text-brandred">
              {course.code}
            </span>
            {/* Status badge */}
            {isCompleted && (
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                Completed
              </span>
            )}
            {isRegistered && (
              <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-400">
                Registered
              </span>
            )}
            {!isCompleted && !isRegistered && (
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
                Not Registered
              </span>
            )}
          </div>
          <div className="mt-1 text-sm font-medium text-white/90 sm:text-base">{course.name}</div>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-white/40">
            <span>{course.credits} Credit{course.credits !== 1 ? "s" : ""}</span>
            {course.semester !== "Not Registered" && course.semester !== "Not Required" && (
              <>
                <span className="text-white/10">·</span>
                <span>{course.semester}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Disabled tooltip */}
      {disabled && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-amber-400/70">
          <AlertCircle className="h-3 w-3" />
          Maximum credits reached for this basket
        </div>
      )}
    </motion.div>
  );
}
