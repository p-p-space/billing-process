'use server';

// Internal app
import { jwtAlgs } from '@/constans';
import { currenTenant } from '@/utils';
import type { Tenant } from '@/interfaces';
import { encode, encryptData } from '@/security';
import { handleSettings } from './settingsManage';

export async function redisSetts(tenant: Tenant) {
  const redisconf = await handleSettings(tenant);

  return {
    host: redisconf.redisHost,
    port: redisconf.redisPort,
    db: redisconf.redisDb,
    username: redisconf.redisUser,
    password: redisconf.redisPassword,
    keyPrefix: `${redisconf.redisPrefix}:`,
    tls: redisconf.redisTls ? { rejectUnauthorized: false } : undefined,
  };
}

export async function assetSetts() {
  const tenant = await currenTenant();
  const assetsConf = await handleSettings(tenant);

  return {
    sessExpTime: assetsConf.sessExpTime,
    sessResetTime: assetsConf.sessResetTime,
    tenantAllowed: assetsConf.tenantAllowed,
    tenantImages: assetsConf.tenantImages,
    tenantPwa: assetsConf.tenantPwa,
    tenantTheme: assetsConf.tenantTheme,
    webUrl: assetsConf.webUrl,
  };
}

export async function sessionSetts(tenant: Tenant) {
  const sessionConf = await handleSettings(tenant);

  return {
    sessExpTime: sessionConf.sessExpTime,
    sessResetTime: sessionConf.sessResetTime,
    sessRefresh: sessionConf.sessRefresh,
  };
}

export async function browserHttpSetts() {
  const tenant = await currenTenant();
  const browserConf = await handleSettings(tenant);

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
  const tenant = await currenTenant();
  const appConf = await handleSettings(tenant);

  return {
    webUrl: appConf.webUrl,
    webJwePrivKey: appConf.webJwePrivKey,
    secJwsStr: appConf.secJwsStr,
    secJweStr: appConf.secJweStr,
    webJwsPrivKey: appConf.webJwsPrivKey,
  };
}

export async function servHttpSetts() {
  const tenant = await currenTenant();
  const servConf = await handleSettings(tenant);

  return {
    servUrl: servConf.servUrl,
    servJwePubKey: servConf.servJwePubKey,
    servJwsPrivKey: servConf.servJwsPrivKey,
    servJwePrivKey: servConf.servJwePrivKey,
  };
}

export async function cognitoCredSetts() {
  const tenant = await currenTenant();
  const cognitoConf = await handleSettings(tenant);

  return {
    clientId: cognitoConf.cognitoClientId,
    clientSecret: cognitoConf.cognitoClientSecret,
    region: cognitoConf.cognitoRegion,
    userPollId: cognitoConf.cognitoUserPoolId,
  };
}

export async function appCredSetts() {
  const tenant = await currenTenant();
  const appCredConf = await handleSettings(tenant);

  return {
    clientId: appCredConf.tenantClientId,
    clientSecret: appCredConf.tenantClientSecret,
    tenantId: appCredConf.tenantId,
  };
}
