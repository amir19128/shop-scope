import './globals.css';
import { Providers } from '@/store/Providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShopScope',
  description: 'Product & user dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <Providers>
          <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
