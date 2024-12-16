import { z } from 'zod';

export const dataRequestSchema = z.object({
  method: z.enum(['get', 'post', 'put', 'patch', 'delete', 'options']),
  url: z.string(),
  formData: z.record(z.string()).optional(),
  originPath: z.string().optional(),
});
