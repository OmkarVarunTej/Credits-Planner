import { motion } from "framer-motion";
import { usePlanner, CATEGORY_LIMITS } from "./PlannerContext";

const CATS = ["University Core", "Programme Core", "Programme Elective", "University Elective"] as const;

export default function StickySummary() {
  const { getCategoryTotals, grandTotal } = usePlanner();
  const grand = grandTotal();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brandblack/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Category breakdowns */}
        <div className="hidden gap-6 sm:flex">
          {CATS.map((cat) => {
            const t = getCategoryTotals(cat);
            return (
              <div key={cat} className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  {cat.replace("Programme", "Prog.").replace("University", "Uni.").replace("Elective", "Elec.")}
                </div>
                <motion.div
                  key={t.total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="font-inter text-sm font-bold tabular-nums text-white"
                >
                  {t.total}
                  <span className="text-xs font-normal text-white/30"> / {CATEGORY_LIMITS[cat]}</span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Mobile: single compact display */}
        <div className="flex gap-3 sm:hidden">
          {CATS.map((cat) => {
            const t = getCategoryTotals(cat);
            const shortLabel = cat === "University Core" ? "UC" : cat === "Programme Core" ? "PC" : cat === "Programme Elective" ? "PE" : "UE";
            return (
              <div key={cat} className="text-center">
                <div className="text-[9px] uppercase tracking-wider text-white/40">{shortLabel}</div>
                <div className="font-inter text-xs font-bold tabular-nums text-white">
                  {t.total}
                  <span className="text-[10px] font-normal text-white/30">/{CATEGORY_LIMITS[cat]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-3 hidden h-10 w-px bg-white/10 sm:block" />

        {/* Grand total */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Total</div>
          </div>
          <motion.div
            key={grand.total}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-podium text-3xl font-bold tabular-nums text-white sm:text-4xl"
          >
            {grand.total}
            <span className="text-lg font-normal text-white/30 sm:text-xl"> / 200</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
