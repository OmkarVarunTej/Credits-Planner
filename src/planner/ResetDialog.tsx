import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ResetDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ResetDialog({ open, onConfirm, onCancel }: ResetDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 w-full max-w-sm rounded-2xl glass p-6 sm:p-8"
          >
            <button
              onClick={onCancel}
              className="absolute right-4 top-4 text-white/40 transition hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-brandred/15">
                <AlertTriangle className="h-7 w-7 text-brandred" />
              </div>
              <h3 className="font-podium text-xl uppercase tracking-wide text-white">
                Reset Planner?
              </h3>
              <p className="mt-2 text-sm text-white/50">
                This will clear all selected courses and reset every basket. This action cannot be
                undone.
              </p>

              <div className="mt-6 flex w-full gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-xs uppercase tracking-widest text-white/70 transition hover:border-white/20 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 rounded-lg bg-brandred px-4 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-brandred/80"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
