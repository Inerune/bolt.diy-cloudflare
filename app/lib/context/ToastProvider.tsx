// components/ToastProvider.tsx
import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Toast = {
  id: number;
  title: string;
  description?: string;
};

type ToastContextType = {
  showToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
};

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-xl bg-white border border-gray-200 shadow-xl p-4 w-80 dark:bg-neutral-900 dark:border-neutral-700"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {toast.title}
              </div>
              {toast.description && (
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {toast.description}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
