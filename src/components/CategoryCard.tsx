import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CategorySummary } from "../data/curriculum";

const ROUTES: Record<string, string> = {
  "University Core": "/university-core",
  "Programme Core": "/programme-core",
  "Programme Elective": "/programme-elective",
  "University Elective": "/university-elective",
};

export default function CategoryCard({ row, index }: { row: CategorySummary; index: number }) {
  const pct = row.total > 0 ? Math.round((row.earned / row.total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl glass p-6 transition hover:border-brandred/40 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brandred/10 blur-3xl transition group-hover:bg-brandred/20" />

      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-white/40">{pct}% complete</div>
        <h3 className="mt-2 font-podium text-2xl uppercase tracking-wide text-white sm:text-3xl">
          {row.category}
        </h3>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <div className="font-inter text-xl font-bold text-white sm:text-2xl">{row.total}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Total</div>
          </div>
          <div>
            <div className="font-inter text-xl font-bold text-emerald-400 sm:text-2xl">{row.earned}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Earned</div>
          </div>
          <div>
            <div className="font-inter text-xl font-bold text-white/60 sm:text-2xl">{row.remaining}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Remaining</div>
          </div>
        </div>

        <Link
          to={ROUTES[row.category]}
          className="group/btn mt-8 inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-inter text-xs uppercase tracking-widest text-white transition hover:border-brandred hover:bg-brandred/10"
        >
          View Curriculum
          <ArrowUpRight className="h-4 w-4 transition group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
