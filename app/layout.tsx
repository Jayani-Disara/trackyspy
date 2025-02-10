import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbars from '@/components/Navbars';
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TrackySpy',
  description: 'Track product prices effortlessly and save money on your online shopping.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        <Navbars />
        <ToastContainer position="bottom-right" theme="light" />
        <main className="max-w-10xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
