import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: '【地域名】痩身・フェイシャル体験予約LP | 無理なく続く習慣設計サポート',
  description:
    '痩身・フェイシャルの初回体験予約LP。無理なく続く習慣設計までサポートし、来店前後の不安を丁寧に解消します。',
  openGraph: {
    title: '痩身・フェイシャル体験予約LP',
    description: '上品・安心・誠実なトーンで、体験予約とLINE追加を獲得するLP。',
    images: ['/og-image.svg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
