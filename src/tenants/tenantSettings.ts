'use server';

// Internal App
import { tenantCookie } from '@/utils';
import { encode, encryptData } from '@/security';
import { defaultSettings } from './bt/btSettings';
import { defaultThemeVars } from './bt/btUiTheme';
import { appSettings, defaultTenant, jwtAlgs } from '@/constans';
import type { TenantSettings, Tenant, StringMap } from '@/interfaces';

let currentSettings: TenantSettings | null = null;

export async function tenantMuiTheme(tenant: Tenant): Promise<StringMap> {
  const { availableTenants } = appSettings;
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

export async function tenantSettings(tenant: Tenant): Promise<TenantSettings> {
  if (currentSettings) {
    return currentSettings;
  }

  const { availableTenants } = appSettings;
  const availableTenantsList = availableTenants.map((tenant) => tenant);

  try {
    let optionSettings = {};

    if (tenant !== defaultTenant && availableTenantsList.includes(tenant)) {
      const options = await import(`./${tenant}/${tenant}Settings`);

      optionSettings = options.settings;
    }

    currentSettings = { ...defaultSettings, ...optionSettings };

    setTimeout(() => {
      currentSettings = null;
    }, 30000);

    return currentSettings;
  } catch (error) {
    throw new Error(`Tenant Settings: ${(error as Error).message}`);
  }
}

export async function redisSetts(tenant: Tenant) {
  const redisconf = await tenantSettings(tenant);

  return {
    host: redisconf.redisHost,
    port: redisconf.redisPort,
    db: redisconf.redisDb,
    username: redisconf.redisUser,
    password: redisconf.redisPassword,
    keyPrefix: `${redisconf.redisPrefix}:`,
    tls: redisconf.redisTls === 'ON' ? { rejectUnauthorized: false } : undefined,
  };
}

export async function assetSetts() {
  const tenant = await tenantCookie();
  const assetsConf = await tenantSettings(tenant);

  return {
    tenantPwa: assetsConf.tenantPwa,
    tenantTheme: assetsConf.tenantTheme,
    tenantImages: assetsConf.tenantImages,
    webUrl: assetsConf.webUrl,
  };
}

export async function sessionSetts(tenant: Tenant) {
  const sessionConf = await tenantSettings(tenant);

  return {
    sessExpTime: sessionConf.sessExpTime,
    sessCookieName: sessionConf.sessCookieName,
  };
}

export async function browserHttpSetts() {
  const tenant = await tenantCookie();
  const browserConf = await tenantSettings(tenant);

  const payload = {
    webUrl: browserConf.webUrl,
    webJwePubKey: browserConf.webJwePubKey,
    secJwsStr: browserConf.secJwsStr,
    webJwsPubKey: browserConf.webJwsPubKey,
  };

  const secretJwe = encode(browserConf.secJweStr);
  const settings = await encryptData(payload, secretJwe, jwtAlgs.jweAlgSec);

  return {
    secJweStr: browserConf.secJweStr,
    settings,
  };
}

export async function appHttpSetts() {
  const tenant = await tenantCookie();
  const appConf = await tenantSettings(tenant);

  return {
    webUrl: appConf.webUrl,
    webJwePrivKey: appConf.webJwePrivKey,
    secJwsStr: appConf.secJwsStr,
    secJweStr: appConf.secJweStr,
    webJwsPrivKey: appConf.webJwsPrivKey,
  };
}

export async function servHttpSetts() {
  const tenant = await tenantCookie();
  const servConf = await tenantSettings(tenant);

  return {
    servUrl: servConf.servUrl,
    servJwePubKey: servConf.servJwePubKey,
    servJwsPrivKey: servConf.servJwsPrivKey,
    servJwePrivKey: servConf.servJwePrivKey,
  };
}

export async function cognitoCredSetts() {
  const tenant = await tenantCookie();
  const cognitoConf = await tenantSettings(tenant);

  return {
    clientId: cognitoConf.cognitoClientId,
    clientSecret: cognitoConf.cognitoClientSecret,
    region: cognitoConf.cognitoRegion,
    userPollId: cognitoConf.cognitoUserPoolId,
  };
}

export async function appCredSetts() {
  const tenant = await tenantCookie();
  const appCredConf = await tenantSettings(tenant);

  return {
    clientId: appCredConf.tenantClientId,
    clientSecret: appCredConf.tenantClientSecret,
    tenantId: appCredConf.tenantId,
  };
}
