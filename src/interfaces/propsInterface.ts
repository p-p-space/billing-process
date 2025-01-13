import type { AllowedTenants, StringMap } from './appInterface';

// Type definition for props that include React children
export type ChildrenProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Type definition for props that include a promise resolving to an object with a tenant string.
 */
export type ParamsProps = {
  params: Promise<{
    tenant: AllowedTenants;
  }>;
};

/**
 * Type definition for props that include map of string keys and string values for theme UI.
 */
export type ThemeProps = {
  themeVars: StringMap;
};
