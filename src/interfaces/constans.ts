import { langs } from '@/i18n';

/**
 * RootLayout
 *
 * @typeParam children: React.ReactNode
 * @typeParam params.lang: React.ReactNode
 */
export type RootLayout = {
  children?: React.ReactNode;
  params?: {
    lang: string;
  };
};

/**
 * Represents the properties passed to a page component.
 * @typeParam params.lang: string
 */
export type PageProps = {
  params: {
    lang: 'en' | 'es';
  };
};

/**
 * Type definition for Lang, which represents a language from the available languages.
 */
export type Lang = (typeof langs)[number];

/**
 * Type definition for LangData, which It outlines the properties and values for a language data
 */
export type LangData = {
  [key: string]: Record<string, string>;
};

/**
 * Type definition for LangFiles, which It outlines the properties and values for a language file json
 */
export type LangFiles = {
  [key: string]: string[];
};
