import 'server-only';

const dictionaries = {
  en: () => import('../../../public/dictionaries/en.json').then((module) => module.default),
  es: () => import('../../../public/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => dictionaries[locale]();
