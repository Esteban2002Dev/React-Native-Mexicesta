import { STORAGE_KEYS } from '@constants/storageKeys';
import { Color } from '@interfaces/Color';
import { getData, saveData } from '@services/storageService';
import { create } from 'zustand';
import { Settings } from '@interfaces/settings';
import { BackgroundColors } from '../../../data/BackgroundColors';

export interface ThemeState {
    background: Color;
    
    setBackground: () => void;
    saveNewBackground: (background: Color) => void;
}

export const useTheme = create<ThemeState>()((set, get) => ({
    background: { colors: [], name: '' },
    setBackground: async () => {
        const settings: Settings = await getData(STORAGE_KEYS.SETTINGS_KEY);
        if (settings.background) {
            set({ background: settings.background });
        } else {
            set({ background: BackgroundColors[0] });
            const newSettings: Settings = { background: BackgroundColors[0] };
            await saveData(STORAGE_KEYS.SETTINGS_KEY, newSettings);
            get().setBackground();
        }
    },
    saveNewBackground: async (background: Color) => {
        const settings: Settings = await getData(STORAGE_KEYS.SETTINGS_KEY);
        if ( settings ) {
            settings.background = background;
            await saveData(STORAGE_KEYS.SETTINGS_KEY, settings);
            get().setBackground();
        }
    }
}));
