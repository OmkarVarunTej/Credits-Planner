import { motion } from "framer-motion";
import type { Course } from "../data/curriculum";
import StatusBadge from "./StatusBadge";

interface CourseTableProps {
  courses: (Course & { basket?: string })[];
  showBasket?: boolean;
}

export default function CourseTable({ courses, showBasket = false }: CourseTableProps) {
  if (courses.length === 0) {
    return (
      <div className="glass-light rounded-2xl p-8 text-center text-sm text-white/40">
        No courses match the current filters.
      </div>
    );
  }

  return (
    <>
      {/* Desktop glass table */}
      <div className="hidden overflow-hidden rounded-2xl glass md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
              <th className="px-6 py-4 font-medium">Course Code</th>
              <th className="px-6 py-4 font-medium">Course</th>
              {showBasket && <th className="px-6 py-4 font-medium">Basket</th>}
              <th className="px-6 py-4 font-medium">Registered Semester</th>
              <th className="px-6 py-4 text-right font-medium">Credits</th>
              <th className="px-6 py-4 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <motion.tr
                key={c.basket ? `${c.basket}-${c.code}` : c.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
                className="border-b border-white/5 text-sm transition hover:bg-white/5"
              >
                <td className="px-6 py-4 font-inter font-medium text-white/90">{c.code}</td>
                <td className="px-6 py-4 text-white/80">{c.name}</td>
                {showBasket && (
                  <td className="px-6 py-4 text-xs uppercase tracking-wider text-brandred/90">
                    {c.basket}
                  </td>
                )}
                <td className="px-6 py-4 text-white/50">{c.semester}</td>
                <td className="px-6 py-4 text-right text-white/80">{c.credits}</td>
                <td className="px-6 py-4 text-right">
                  <StatusBadge status={c.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {courses.map((c, i) => (
          <motion.div
            key={c.basket ? `${c.basket}-${c.code}` : c.code}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-inter text-xs uppercase tracking-widest text-brandred">
                  {c.code} {showBasket && c.basket ? `· ${c.basket}` : ""}
                </div>
                <div className="mt-1 text-sm font-medium text-white/90">{c.name}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-white/50">
              <span>{c.semester}</span>
              <span className="text-white/80">{c.credits} credits</span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
