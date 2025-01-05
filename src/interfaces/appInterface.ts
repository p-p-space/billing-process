import { tenantSchema } from '@/schemas';
import { z } from 'zod';

export type Tenant = z.infer<typeof tenantSchema>;
