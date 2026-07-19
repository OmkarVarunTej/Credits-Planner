import { motion } from "framer-motion";

interface PlannerProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showText?: boolean;
}

export default function PlannerProgressBar({
  value,
  max,
  label,
  showText = true,
}: PlannerProgressBarProps) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isFull = value >= max;

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-white/50">
          <span className="uppercase tracking-wider">{label}</span>
          {showText && (
            <span className="tabular-nums">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full ${
            isFull
              ? "bg-emerald-500"
              : "bg-gradient-to-r from-brandred to-red-400"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
