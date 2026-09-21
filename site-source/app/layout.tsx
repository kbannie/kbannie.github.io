import type { Metadata } from 'next';
import './globals.css';
const title = 'Kabeen Kim | Academic Homepage';
const description = 'Kabeen Kim studies Computer Engineering and Information Statistics at Duksung Women’s University, with research experience in document understanding, LLM reasoning, GraphRAG, and computer vision.';
const siteUrl = 'https://kbannie.github.io';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title, description,
  alternates: { canonical: siteUrl + "/" },
  icons: { icon: '/favicon.svg' },
  openGraph: { title, description, type: 'website', locale: 'en_US', siteName: 'Kabeen Kim', url: siteUrl, images: [{ url: siteUrl + '/og.png', width: 1730, height: 909, alt: 'Kabeen Kim — Knowledge Graphs, GraphRAG, Grounded LLM Reasoning' }] },
  twitter: { card: 'summary_large_image', title, description, images: [siteUrl + '/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/fonts/source-sans-3-latin-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>;
}
