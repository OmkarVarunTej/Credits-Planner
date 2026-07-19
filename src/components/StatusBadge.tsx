import type { CourseStatus } from "../data/curriculum";

const STYLES: Record<CourseStatus, string> = {
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Registered: "bg-brandred/15 text-red-400 border-brandred/40",
  "Not Registered": "bg-white/5 text-white/40 border-white/10",
};

export default function StatusBadge({ status }: { status: CourseStatus }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
