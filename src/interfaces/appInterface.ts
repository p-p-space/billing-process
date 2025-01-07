import { stringMap, tenantSchema } from '@/schemas';
import { z } from 'zod';

export type StringMap = z.infer<typeof stringMap>;

export type Tenant = z.infer<typeof tenantSchema>;

export type SettingsApp = Record<string, Tenant>;
