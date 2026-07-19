import { motion } from "framer-motion";
import { usePlanner, CATEGORY_LIMITS } from "./PlannerContext";
import PlannerProgressBar from "./PlannerProgressBar";

const CATEGORIES = ["University Core", "Programme Core", "Programme Elective", "University Elective"];

export default function PlannerSummary() {
  const { getCategoryTotals, grandTotal } = usePlanner();
  const grand = grandTotal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl glass p-5 sm:p-7"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-brandred">Planner Summary</div>
          <h2 className="mt-1 font-podium text-2xl uppercase tracking-wide text-white sm:text-3xl">
            Selected Credits
          </h2>
        </div>
        <div className="text-right">
          <motion.div
            key={grand.total}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-inter text-4xl font-bold tabular-nums text-white sm:text-5xl"
          >
            {grand.total}
          </motion.div>
          <div className="text-xs uppercase tracking-widest text-white/40">/ 200</div>
        </div>
      </div>

      <PlannerProgressBar value={grand.total} max={200} label="Overall Progress" />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat, i) => {
          const t = getCategoryTotals(cat);
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl glass-light p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-white/60">{cat}</div>
                <motion.span
                  key={t.total}
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-inter text-lg font-bold tabular-nums text-white"
                >
                  {t.total}
                  <span className="text-sm font-normal text-white/30"> / {CATEGORY_LIMITS[cat]}</span>
                </motion.span>
              </div>
              <div className="mt-2">
                <PlannerProgressBar value={t.total} max={CATEGORY_LIMITS[cat]} showText={false} />
              </div>
              <div className="mt-1.5 flex gap-3 text-[10px] text-white/40">
                <span>{t.completed} earned</span>
                <span>{t.selected} planned</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
