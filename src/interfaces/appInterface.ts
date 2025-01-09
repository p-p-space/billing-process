import { z } from 'zod';
// Internal App
import { appSchema } from '@/schemas';

/**
 * Represents the data structure for body data.
 */
export type ReqResBody = z.infer<typeof appSchema.reqResBody>;

/**
 * SettingsApp is a type that represents an object where each key is a string and the value is a Tenant.
 */
export type SettingsApp = z.infer<typeof appSchema.settingsApp>;

/**
 * StringMap is a type that represents an object with string keys and string values.
 */
export type StringMap = z.infer<typeof appSchema.stringMap>;

/**
 * Tenant is a type that represents the structure of a tenant schema.
 */
export type Tenant = z.infer<typeof appSchema.tenant>;
