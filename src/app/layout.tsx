import './globals.css';

import { Inter } from 'next/font/google';
import { Logo } from '../components/logo';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EsterCare Archive - William',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen w-screen bg-[#ede7e1] ">
          <div className="absolute top-3 right-3">
            <Logo />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
