import { settingsApp, stringMap, tenantSchema } from '@/schemas';
import { z } from 'zod';

/**
 * StringMap is a type that represents an object with string keys and string values.
 */
export type StringMap = z.infer<typeof stringMap>;

/**
 * Tenant is a type that represents the structure of a tenant schema.
 */
export type Tenant = z.infer<typeof tenantSchema>;

/**
 * SettingsApp is a type that represents an object where each key is a string and the value is a Tenant.
 */
export type SettingsApp = z.infer<typeof settingsApp>;
