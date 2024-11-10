import { ToastProps } from '@components/shared/Toast';
import { Types } from '@enums/ToastType';
import { useState, useCallback } from 'react';

export function useToast() {
    const [toastConfig, setToastConfig] = useState<Omit<ToastProps, 'visible' | 'onHide'> | null>(null);
    const [visible, setVisible] = useState(false);

    const showToast = useCallback(({ title, message, icon, type = Types.info, duration }: Omit<ToastProps, 'visible' | 'onHide'>) => {
        setToastConfig({ title, message, icon, type, duration });
        setVisible(true);
    }, []);

    const hideToast = useCallback(() => {
        setVisible(false);
        setToastConfig(null);
    }, []);

    return {
        showToast,
        toastProps: { ...toastConfig, visible, onHide: hideToast } as ToastProps,
    };
}
