import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastProps } from '@components/shared/Toast';
import { Types } from '@enums/ToastType';

// Type for Toast context
interface ToastContextType {
    showToast: (props: Omit<ToastProps, 'visible' | 'onHide'>) => void;
    hideToast: () => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the ToastContext
export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};

// The ToastProvider component
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toastConfig, setToastConfig] = useState<Omit<ToastProps, 'visible' | 'onHide'> | null>(null);
    const [visible, setVisible] = useState(false);

    const showToast = useCallback(
        ({ title, message, icon, type = Types.info, duration }: Omit<ToastProps, 'visible' | 'onHide'>) => {
            setToastConfig({ title, message, icon, type, duration });
            setVisible(true);
        },
        []
    );

    const hideToast = useCallback(() => {
        setVisible(false);
        setToastConfig(null);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Toast {...{ ...toastConfig, visible, onHide: hideToast }} />
        </ToastContext.Provider>
    );
};
