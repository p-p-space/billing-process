import type { StringMap, Tenant } from './appInterface';
import { TenantStore } from './storeInterface';

// Type definition for props that include React children
export type ChildrenProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Type definition for props that include a promise resolving to an object with a tenant string.
 */
export type ParamsProps = {
  params: Promise<{
    tenant: Tenant;
  }>;
};

/**
 * Type definition for props that include map of string keys and string values for theme UI.
 */
export type TenantSettProps = {
  tenantSett: TenantStore['tenantSett'];
  themeVars: StringMap;
};

/**
 * Type definition for props that include a user attributes.
 */
export type DataServerProps = {
  userAttr: Record<string, any>;
};
