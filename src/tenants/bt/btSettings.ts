// Internal App
import { webEnv } from '@/constans';
import { EnvSettings } from '@/interfaces';
import { localSettings, devSettings, testSettings, uatSettings, prodSettings } from './settings';

const envSettings: EnvSettings = {
  local: {
    ...localSettings,
  },
  dev: {
    ...localSettings,
    ...devSettings,
  },
  test: {
    ...localSettings,
    ...testSettings,
  },
  uat: {
    ...localSettings,
    ...uatSettings,
  },
  prod: {
    ...localSettings,
    ...prodSettings,
  },
};

export const defaultSettings = {
  ...envSettings[webEnv],
};
