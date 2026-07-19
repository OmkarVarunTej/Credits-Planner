import { useState } from "react";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { AccordionItem } from "../components/Accordion";
import CourseTable from "../components/CourseTable";
import { universityCoreDistribution, universityCoreBaskets } from "../data/curriculum";

export default function UniversityCore() {
  const [openKey, setOpenKey] = useState<string | null>("engineering-foundation");

  return (
    <PageShell
      title="University Core Credits Distribution"
      subtitle="Minimum, earned, and remaining credits across every University Core basket."
    >
      {/* Distribution table — exactly as VTOP */}
      <div className="hidden overflow-hidden rounded-2xl glass md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
              <th className="px-6 py-4 font-medium">Basket</th>
              <th className="px-6 py-4 text-right font-medium">Minimum</th>
              <th className="px-6 py-4 text-right font-medium">Earned</th>
              <th className="px-6 py-4 text-right font-medium">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {universityCoreDistribution.map((row, i) => (
              <motion.tr
                key={row.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border-b border-white/5 text-sm hover:bg-white/5"
              >
                <td className="px-6 py-4 font-medium text-white/90">{row.name}</td>
                <td className="px-6 py-4 text-right text-white/70">{row.minimum}</td>
                <td className="px-6 py-4 text-right text-white/70">{row.earned}</td>
                <td className="px-6 py-4 text-right text-white/70">{row.remaining}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {universityCoreDistribution.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass rounded-2xl p-4"
          >
            <div className="text-sm font-medium text-white/90">{row.name}</div>
            <div className="mt-2 flex justify-between text-xs text-white/50">
              <span>Min {row.minimum}</span>
              <span>Earned {row.earned}</span>
              <span>Remaining {row.remaining}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accordions per sub-basket */}
      <div className="mt-14 space-y-4">
        {universityCoreBaskets.map((basket) => (
          <AccordionItem
            key={basket.key}
            label={basket.label}
            subtitle={`${basket.courses.length} course${basket.courses.length !== 1 ? "s" : ""}`}
            isOpen={openKey === basket.key}
            onToggle={() => setOpenKey(openKey === basket.key ? null : basket.key)}
          >
            <CourseTable courses={basket.courses} />
          </AccordionItem>
        ))}
      </div>
    </PageShell>
  );
}
