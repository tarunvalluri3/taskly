import { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, CircleAlert, X } from "lucide-react";

const ToastContext = createContext();

const iconMap = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
  warning: CircleAlert
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = (id) =>
    setToasts(t => t.filter(x => x.id !== id));

  const show = (message, type = "info", duration = 3500) => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => remove(id), duration);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {/* Toast Stack */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md space-y-2 z-50">

        {toasts.map(t => {
          const Icon = iconMap[t.type] || Info;

          return (
            <div
              key={t.id}
              className="flex items-center gap-3 p-3 bg-black text-white rounded-xl shadow-lg animate-[fadeIn_.2s_ease]"
            >
              <Icon size={18} className="shrink-0" />

              <p className="text-sm leading-snug flex-1">
                {t.message}
              </p>

              <button onClick={() => remove(t.id)} className="opacity-80 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          );
        })}

      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
