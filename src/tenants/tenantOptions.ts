// Internal App
import { availableTenantsList, defaultTenant } from '@/constans';
import { SettingsApp, StringMap, Tenant } from '@/interfaces';
import { defaultSettings, defaultThemeVars } from './bt';

export async function selectTheme(tenant: Tenant): Promise<StringMap> {
  try {
    let themeOptions = {};

    if (tenant !== defaultTenant && availableTenantsList.includes(tenant)) {
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

    if (tenant !== defaultTenant && availableTenantsList.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}Settings`);

      optionSettings = options.settings;
    }

    return { ...defaultSettings, ...optionSettings };
  } catch (error) {
    throw new Error(`Tenant Settings: ${(error as Error).message}`);
  }
}
