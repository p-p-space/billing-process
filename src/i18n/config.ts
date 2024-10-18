export type Lang = (typeof langs)[number];

export const cookieLang = 'app_lang';
export const langs = ['en', 'es'] as const;
export const defaultLang: Lang = 'en';
