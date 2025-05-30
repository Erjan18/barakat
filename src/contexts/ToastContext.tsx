import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/ui/Toast';

interface ToastContextType {
  showToast: (props: {
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'error';
    duration?: number;
  }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastProps, setToastProps] = useState<{
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'error';
    duration?: number;
  }>({});

  const showToast = useCallback((props: {
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'error';
    duration?: number;
  }) => {
    setToastProps(props);
    setIsOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...toastProps}
      />
    </ToastContext.Provider>
  );
}