//Internal app
import type { Lang } from '@/interfaces';

export const langCookieName = 'app_lang';
export const langs: Lang[] = ['en', 'es'] as const;
export const defaultLang: Lang = 'en';
