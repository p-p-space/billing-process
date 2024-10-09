//Internal app
import { RootLayout } from '@/interfaces';

export default function RootLayoutMain({ children, params }: RootLayout) {
  return (
    <html lang={params?.lang}>
      <body>
        <div className="bg-white min-h-screen w-full color-text">{children}</div>
      </body>
    </html>
  );
}
