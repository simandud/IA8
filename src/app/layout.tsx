import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marketing Campaign Generator - Cuenca, Ecuador',
  description: 'Genera campañas de marketing completas con Inteligencia Artificial para tu negocio en Cuenca, Ecuador',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
