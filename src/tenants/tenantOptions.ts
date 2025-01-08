// Internal App
import { availableTenants, defaultTenant } from '@/constants';
import { SettingsApp, StringMap, Tenant } from '@/interfaces';
import { defaultSettings, defaultThemeVars } from './bt';

export async function selectTheme(tenant: Tenant): Promise<StringMap> {
  try {
    let themeOptions = {};

    if (tenant !== defaultTenant && availableTenants.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}UiTheme`);
      themeOptions = options.themeVars;
    }

    return { ...defaultThemeVars, ...themeOptions };
  } catch (error) {
    throw new Error(`Tenant Theme: ${(error as Error).message}`);
  }
}

export async function selectSettings(tenant: Tenant): Promise<SettingsApp> {
  try {
    let optionSettings = {};

    if (tenant !== defaultTenant && availableTenants.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}Settings`);

      optionSettings = options.settings;
    }

    return { ...defaultSettings, ...optionSettings };
  } catch (error) {
    throw new Error(`Tenant Settings: ${(error as Error).message}`);
  }
}
