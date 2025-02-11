'use server';

// Internal App
import { readCookie } from '@/utils';
import { defaultSettings, defaultThemeVars } from './bt';
import type { TenantSettings, StringMap, Tenant } from '@/interfaces';
import { appSettings, defaultTenant, tenantCookieName } from '@/constans';

export async function selectTheme(tenant: Tenant): Promise<StringMap> {
  const { availableTenants } = appSettings;
  const availableTenantsList = availableTenants.map((tenant) => tenant as Tenant);

  try {
    let themeOptions = {};

    if (tenant !== defaultTenant && availableTenantsList.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}UiTheme`);
      themeOptions = options.themeVars;
    }

    const currentTheme = { ...defaultThemeVars, ...themeOptions };

    return currentTheme;
  } catch (error) {
    throw new Error(`Tenant Theme: ${(error as Error).message}`);
  }
}

export async function selectSettings(tenantUrl?: Tenant): Promise<TenantSettings> {
  const tenant = ((await readCookie(tenantCookieName)) as Tenant) ?? tenantUrl;
  const { availableTenants } = appSettings;
  const availableTenantsList = availableTenants.map((tenant) => tenant as Tenant);

  try {
    let optionSettings = {};

    if (tenant !== defaultTenant && availableTenantsList.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}Settings`);

      optionSettings = options.settings;
    }

    const currentSettings = { ...defaultSettings, ...optionSettings };

    return currentSettings;
  } catch (error) {
    throw new Error(`Tenant Settings: ${(error as Error).message}`);
  }
}
