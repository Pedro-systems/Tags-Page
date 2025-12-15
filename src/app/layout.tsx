/**
 * Layout principal da aplicação
 * 
 * Define a estrutura base HTML e metadados.
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GHL Tag Review - BellaTerra',
  description: 'Interface for reviewing and approving GHL tag changes',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
