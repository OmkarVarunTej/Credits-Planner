import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  label: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function AccordionItem({ label, subtitle, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="overflow-hidden rounded-2xl glass">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/5"
      >
        <div>
          <div className="font-podium text-lg uppercase tracking-wide text-white sm:text-xl">
            {label}
          </div>
          {subtitle && <div className="mt-1 text-xs text-white/50">{subtitle}</div>}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/5"
        >
          <ChevronDown className="h-4 w-4 text-white/70" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-4 sm:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
