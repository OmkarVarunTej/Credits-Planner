import { motion } from "framer-motion";
import { creditSummary, totalCredits } from "../data/curriculum";

function Bar({ earned, total }: { earned: number; total: number }) {
  const pct = total > 0 ? (earned / total) * 100 : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-full rounded-full bg-brandred"
      />
    </div>
  );
}

export default function CurriculumOverviewTable() {
  return (
    <>
      {/* Desktop glass table */}
      <div className="hidden overflow-hidden rounded-2xl glass md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 text-right font-medium">Total Credits</th>
              <th className="px-6 py-4 text-right font-medium">Earned Credits</th>
              <th className="px-6 py-4 text-right font-medium">Remaining Credits</th>
              <th className="px-6 py-4 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody>
            {creditSummary.map((row, i) => (
              <motion.tr
                key={row.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-b border-white/5 text-sm transition hover:bg-white/5"
              >
                <td className="px-6 py-4 font-medium text-white/90">{row.category}</td>
                <td className="px-6 py-4 text-right text-white/70">{row.total}</td>
                <td className="px-6 py-4 text-right text-white/70">{row.earned}</td>
                <td className="px-6 py-4 text-right text-white/70">{row.remaining}</td>
                <td className="px-6 py-4">
                  <Bar earned={row.earned} total={row.total} />
                </td>
              </motion.tr>
            ))}
            <tr className="bg-white/5 text-sm font-semibold">
              <td className="px-6 py-4 text-white">Total</td>
              <td className="px-6 py-4 text-right text-white">{totalCredits.total}</td>
              <td className="px-6 py-4 text-right text-white">{totalCredits.earned}</td>
              <td className="px-6 py-4 text-right text-white">{totalCredits.remaining}</td>
              <td className="px-6 py-4">
                <Bar earned={totalCredits.earned} total={totalCredits.total} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {creditSummary.map((row, i) => (
          <motion.div
            key={row.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass rounded-2xl p-4"
          >
            <div className="text-sm font-medium text-white/90">{row.category}</div>
            <div className="mt-3">
              <Bar earned={row.earned} total={row.total} />
            </div>
            <div className="mt-3 flex justify-between text-xs text-white/50">
              <span>{row.earned} / {row.total} credits earned</span>
              <span className="text-white/70">{row.remaining} remaining</span>
            </div>
          </motion.div>
        ))}
        <div className="glass rounded-2xl border-brandred/30 p-4">
          <div className="text-sm font-semibold text-white">Total</div>
          <div className="mt-3">
            <Bar earned={totalCredits.earned} total={totalCredits.total} />
          </div>
          <div className="mt-3 flex justify-between text-xs text-white/60">
            <span>{totalCredits.earned} / {totalCredits.total} credits earned</span>
            <span>{totalCredits.remaining} remaining</span>
          </div>
        </div>
      </div>
    </>
  );
}
