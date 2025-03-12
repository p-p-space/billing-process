// Internal app

import { defaultSettings } from './bt/btSettings';
import { defaultThemeVars } from './bt/btUiTheme';
import type { TenantSettings, Tenant, StringMap } from '@/interfaces';
import { baseURLs, prefixCookieName, sessSettings } from '@/constans/httpConstans';
import { availableTenants, credentials, defaultTenant, redisSettings, timeZone } from '@/constans';

export async function tenantMuiTheme(tenant: Tenant): Promise<StringMap> {
  const availableTenantsList = availableTenants.map((tenant) => tenant);

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

export async function handleSettings(tenant: Tenant): Promise<TenantSettings> {
  const availableTenantsList = availableTenants.map((tenant) => tenant);

  try {
    let optionSettings = {};

    if (tenant !== defaultTenant && availableTenantsList.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}Settings`);

      optionSettings = options.settings;
    }

    const settings = { ...defaultSettings, ...optionSettings };

    const currentSettings = updateCurrentSettings(settings, tenant);

    return currentSettings;
  } catch (error) {
    throw new Error(`Tenant Settings: ${(error as Error).message}`);
  }
}

function updateCurrentSettings(settings: TenantSettings, tenant: Tenant) {
  settings.webUrl = baseURLs.app ?? settings.webUrl;
  settings.servUrl = baseURLs.serv ?? settings.servUrl;
  settings.timeZone = timeZone ?? settings.timeZone;
  settings.redisHost = redisSettings.host ?? settings.redisHost;
  settings.redisPort = redisSettings.port ? parseInt(redisSettings.port) : settings.redisPort;
  settings.redisDb = redisSettings.db ? parseInt(redisSettings.db) : settings.redisDb;
  settings.redisTls = redisSettings.ssl ? redisSettings.ssl === 'ON' : settings.redisTls;
  settings.redisUser = redisSettings.user ?? settings.redisUser;
  settings.redisPassword = redisSettings.password ?? settings.redisPassword;
  settings.redisPrefix = `${prefixCookieName}${tenant}`;
  settings.sessExpTime = sessSettings.sessExpTime ? parseInt(sessSettings.sessExpTime) : settings.sessExpTime;
  settings.sessResetTime = settings.sessExpTime <= 60 ? Math.ceil(settings.sessExpTime / 3) : 30;
  settings.sessMatchIp = sessSettings.sessMatchIp ? sessSettings.sessMatchIp === 'ON' : settings.sessMatchIp;
  settings.sessRefresh = sessSettings.sessRefresh ? sessSettings.sessRefresh === 'ON' : settings.sessRefresh;
  settings.tenantId = credentials.tenantId ?? settings.tenantId;
  settings.tenantClientSecret = credentials.tenantClientSecret ?? settings.tenantClientSecret;
  settings.tenantClientId = credentials.tenantClientId ?? settings.tenantClientId;
  settings.cognitoRegion = credentials.cognitoRegion ?? settings.cognitoRegion;
  settings.cognitoUserPoolId = credentials.cognitoUserPoolId ?? settings.cognitoUserPoolId;
  settings.cognitoClientId = credentials.cognitoClientId ?? settings.cognitoClientId;
  settings.cognitoClientSecret = credentials.cognitoClientSecret ?? settings.cognitoClientSecret;
  settings.webJwePrivKey = headersPem(settings.webJwePrivKey, 'private');
  settings.webJwePubKey = headersPem(settings.webJwePubKey, 'public');
  settings.webJwsPrivKey = headersPem(settings.webJwsPrivKey, 'private');
  settings.webJwsPubKey = headersPem(settings.webJwsPubKey, 'public');
  settings.servJwePrivKey = headersPem(settings.servJwePrivKey, 'private');
  settings.servJwePubKey = headersPem(settings.servJwePubKey, 'public');
  settings.servJwsPrivKey = headersPem(settings.servJwsPrivKey, 'private');
  settings.servJwsPubKey = headersPem(settings.servJwsPubKey, 'public');

  return settings;
}

function headersPem(key: string, type: 'private' | 'public') {
  const header = `-----BEGIN ${type.toUpperCase()} KEY-----`;
  const footer = `-----END ${type.toUpperCase()} KEY-----`;

  return `${header}${key}${footer}`;
}
