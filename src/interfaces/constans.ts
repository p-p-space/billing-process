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
