import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const grayBold = '#333333';

const btTheme = {
  black: '#000',
  borderRadius: 12,
  error: '#F34770',
  fontFamily: inter.style.fontFamily,
  grey50: '#F3F3F3',
  grey100: '#D3D3D3',
  grey200: '#C4C4C4',
  grey300: grayBold,
  grey400: '#C4C4C4',
  h1: 46,
  h2: 32,
  h3: 24,
  h4: 20,
  h5: 18,
  primary: '#8142F5',
  primaryDark: '#DFD3F4',
  primaryLight: '#F3EDFE',
  secondary: '#A19DA2',
  small: 12,
  text: 16,
  textColor: grayBold,
  white: '#FFF',
};

export default btTheme;
