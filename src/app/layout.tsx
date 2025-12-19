import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Inter, Poppins } from 'next/font/google';
import AppWrappers from './AppWrappers';
import RootHead from './head';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <RootHead/>
      <body id={'root'} style={{ fontFamily: 'Poppins, sans-serif' }}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
