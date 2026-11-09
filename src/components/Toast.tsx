import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-navy-900 border border-gold-400 text-white shadow-2xl animate-fadeIn max-w-md">
      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-sm font-medium leading-snug flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
