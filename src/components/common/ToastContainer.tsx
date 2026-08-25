import React from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAcademic();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
        };

        const bgColors = {
          success: 'bg-slate-900/95 border-emerald-500/40 text-emerald-50 shadow-emerald-950/30',
          warning: 'bg-slate-900/95 border-amber-500/40 text-amber-50 shadow-amber-950/30',
          error: 'bg-slate-900/95 border-rose-500/40 text-rose-50 shadow-rose-950/30',
          info: 'bg-slate-900/95 border-indigo-500/40 text-indigo-50 shadow-indigo-950/30',
        };

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">
                {toast.title}
              </h4>
              <p className="text-sm text-slate-100 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 transition-colors rounded"
              title="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
