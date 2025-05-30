import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'success' | 'error';
}

export function Toast({
  open,
  onClose,
  title,
  description,
  duration = 3000,
  variant = 'default'
}: ToastProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={cn(
          "rounded-lg shadow-lg p-4 min-w-[320px] max-w-md animate-slide-in",
          variant === 'success' && "bg-emerald-50 border border-emerald-200",
          variant === 'error' && "bg-red-50 border border-red-200",
          variant === 'default' && "bg-white border border-gray-200"
        )}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            {title && (
              <h3 
                className={cn(
                  "font-medium",
                  variant === 'success' && "text-emerald-800",
                  variant === 'error' && "text-red-800",
                  variant === 'default' && "text-gray-800"
                )}
              >
                {title}
              </h3>
            )}
            {description && (
              <p 
                className={cn(
                  "text-sm mt-1",
                  variant === 'success' && "text-emerald-700",
                  variant === 'error' && "text-red-700",
                  variant === 'default' && "text-gray-600"
                )}
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className={cn(
              "rounded-md p-1 opacity-70 transition-opacity hover:opacity-100",
              variant === 'success' && "text-emerald-700",
              variant === 'error' && "text-red-700",
              variant === 'default' && "text-gray-500"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}