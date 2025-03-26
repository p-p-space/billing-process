// Internal app
import { defaultSettings } from './bt/btSettings';
import { defaultThemeVars } from './bt/btUiTheme';
import type { TenantSettings, Tenant, StringMap } from '@/interfaces';
import { availableTenants, credentials, defaultTenant, redisSettings, timeZone } from '@/constans';
import { Appkeys, baseURLs, prefixCookieName, servRsakeys, sessSettings, webRsakeys } from '@/constans/httpConstans';

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
  const tenantSett = tenant.toUpperCase();
  const redisHost = process.env[`${tenantSett}_REDIS_HOST`] ?? redisSettings.host;
  const redisPort = process.env[`${tenantSett}_REDIS_PORT`] ?? redisSettings.port;
  const redisDb = process.env[`${tenantSett}_REDIS_DB`] ?? redisSettings.db;
  const redisTls = process.env[`${tenantSett}REDIS_TLS`] ?? redisSettings.tls;
  const redisUser = process.env[`${tenantSett}_REDIS_USER`] ?? redisSettings.user;
  const redisPass = process.env[`${tenantSett}_REDIS_PASSWORD`] ?? redisSettings.password;
  const tenantId = process.env[`${tenantSett}_TENANT_ID`] ?? credentials.tenantId;
  const tenantClientSecret = process.env[`${tenantSett}_TENANT_CLIENT_ID`] ?? credentials.tenantClientSecret;
  const tenantClientId = process.env[`${tenantSett}_TENANT_CLIENT_SECRET`] ?? credentials.tenantClientId;
  const cognitoRegion = process.env[`${tenantSett}_COGNITO_REGION`] ?? credentials.cognitoRegion;
  const cognitoUserPoolId = process.env[`${tenantSett}_COGNITO_USER_POOL_ID`] ?? credentials.cognitoUserPoolId;
  const cognitoClientId = process.env[`${tenantSett}_COGNITO_CLIENT_ID`] ?? credentials.cognitoClientId;
  const cognitoClientSecret = process.env[`${tenantSett}_COGNITO_CLIENT_SECRET`] ?? credentials.cognitoClientSecret;
  const webJwePrivKey = process.env[`${tenantSett}_WEB_JWE_PRIV_KEY`] ?? webRsakeys.webJwePrivKey;
  const webJwePubKey = process.env[`${tenantSett}_WEB_JWE_PUB_KEY`] ?? webRsakeys.webJwePubKey;
  const webJwsPrivKey = process.env[`${tenantSett}_WEB_JWS_PRIV_KEY`] ?? webRsakeys.webJwsPrivKey;
  const webJwsPubKey = process.env[`${tenantSett}_WEB_JWS_PUB_KEY`] ?? webRsakeys.webJwsPubKey;
  const servJwePrivKey = process.env[`${tenantSett}_SERV_JWE_PRIV_KEY`] ?? servRsakeys.servJwePrivKey;
  const servJwePubKey = process.env[`${tenantSett}_SERV_JWE_PUB_KEY`] ?? servRsakeys.servJwePubKey;
  const servJwsPrivKey = process.env[`${tenantSett}_SERV_JWS_PRIV_KEY`] ?? servRsakeys.servJwsPrivKey;
  const servJwsPubKey = process.env[`${tenantSett}_SERV_JWS_PUB_KEY`] ?? servRsakeys.servJwsPubKey;
  const secJweStr = process.env[`${tenantSett}_SEC_JWE_STR`] ?? Appkeys.secJweStr;
  const secJwsStr = process.env[`${tenantSett}_SEC_JWS_STR`] ?? Appkeys.secJwsStr;

  settings.webUrl = baseURLs.app ?? settings.webUrl;
  settings.servUrl = baseURLs.serv ?? settings.servUrl;
  settings.timeZone = timeZone ?? settings.timeZone;
  settings.redisHost = redisHost ?? settings.redisHost;
  settings.redisPort = redisPort ? parseInt(redisPort) : settings.redisPort;
  settings.redisDb = redisDb ? parseInt(redisDb) : settings.redisDb;
  settings.redisTls = redisTls ? redisTls === 'ON' : settings.redisTls;
  settings.redisUser = redisUser ?? settings.redisUser;
  settings.redisPassword = redisPass ?? settings.redisPassword;
  settings.redisPrefix = `${prefixCookieName}${tenant}`;
  settings.sessExpTime = sessSettings.sessExpTime ? parseInt(sessSettings.sessExpTime) : settings.sessExpTime;
  settings.sessResetTime = sessSettings.sessResetTime ? parseInt(sessSettings.sessResetTime) : settings.sessResetTime;
  settings.sessMatchIp = sessSettings.sessMatchIp ? sessSettings.sessMatchIp === 'ON' : settings.sessMatchIp;
  settings.sessRefresh = sessSettings.sessRefresh ? sessSettings.sessRefresh === 'ON' : settings.sessRefresh;
  settings.tenantId = tenantId ?? settings.tenantId;
  settings.tenantClientSecret = tenantClientSecret ?? settings.tenantClientSecret;
  settings.tenantClientId = tenantClientId ?? settings.tenantClientId;
  settings.cognitoRegion = cognitoRegion ?? settings.cognitoRegion;
  settings.cognitoUserPoolId = cognitoUserPoolId ?? settings.cognitoUserPoolId;
  settings.cognitoClientId = cognitoClientId ?? settings.cognitoClientId;
  settings.cognitoClientSecret = cognitoClientSecret ?? settings.cognitoClientSecret;
  settings.webJwePrivKey = headersPem(webJwePrivKey ?? settings.webJwePrivKey, 'private');
  settings.webJwePubKey = headersPem(webJwePubKey ?? settings.webJwePubKey, 'public');
  settings.webJwsPrivKey = headersPem(webJwsPrivKey ?? settings.webJwsPrivKey, 'private');
  settings.webJwsPubKey = headersPem(webJwsPubKey ?? settings.webJwsPubKey, 'public');
  settings.servJwePrivKey = headersPem(servJwePrivKey ?? settings.servJwePrivKey, 'private');
  settings.servJwePubKey = headersPem(servJwePubKey ?? settings.servJwePubKey, 'public');
  settings.servJwsPrivKey = headersPem(servJwsPrivKey ?? settings.servJwsPrivKey, 'private');
  settings.servJwsPubKey = headersPem(servJwsPubKey ?? settings.servJwsPubKey, 'public');
  settings.secJweStr = secJweStr ?? settings.secJweStr;
  settings.secJwsStr = secJwsStr ?? settings.secJwsStr;

  return settings;
}

function headersPem(key: string, type: 'private' | 'public') {
  const header = `-----BEGIN ${type.toUpperCase()} KEY-----`;
  const footer = `-----END ${type.toUpperCase()} KEY-----`;

  return `${header}${key}${footer}`;
}
