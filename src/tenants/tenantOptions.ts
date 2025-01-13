// Internal App
import { appSettings, defaultTenant } from '@/constans';
import { AppSettings, AvailableTenants, StringMap } from '@/interfaces';
import { defaultSettings, defaultThemeVars } from './bt';

export async function selectTheme(tenant: AvailableTenants): Promise<StringMap> {
  const { availableTenants } = appSettings;
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

export async function selectSettings(tenant: AvailableTenants): Promise<AppSettings> {
  const { availableTenants } = appSettings;
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
