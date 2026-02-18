import { BlogCard } from './types';

const DEFAULT_BLOG_ITEMS: BlogCard[] = [
  {
    title: '忙しい方でも続けやすい痩身習慣の作り方',
    url: '#',
    publishedAt: '2026-01-20',
    category: '痩身',
    summary: '通院頻度だけでなく、生活リズムに合わせたホームケアの設計で無理なく継続するポイントを解説します。'
  },
  {
    title: '毛穴悩みに向き合うフェイシャル体験前のチェック',
    url: '#',
    publishedAt: '2026-01-13',
    category: '毛穴',
    summary: '施術前の肌状態把握と日々の洗顔・保湿の見直しで、体験効果を高めるための基本をまとめました。'
  },
  {
    title: 'くすみ対策で意識したい食事と睡眠のコツ',
    url: '#',
    publishedAt: '2026-01-05',
    category: 'くすみ',
    summary: 'サロンケアと相乗効果が期待できる、食事・睡眠・血行ケアの観点からセルフメンテナンス方法を紹介します。'
  }
];

type RSSItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  category?: string;
  description?: string;
};

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export async function getBlogCards(limit = 3): Promise<BlogCard[]> {
  const rssUrl = process.env.BLOG_RSS_URL;
  if (!rssUrl) {
    return DEFAULT_BLOG_ITEMS.slice(0, limit);
  }

  try {
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return DEFAULT_BLOG_ITEMS.slice(0, limit);
    }

    const xml = await response.text();
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).slice(0, limit);

    const mapped = items.map((entry): BlogCard => {
      const body = entry[1];
      const getTag = (tag: string) => body.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))?.[1] ?? '';
      const raw: RSSItem = {
        title: stripHtml(getTag('title')),
        link: stripHtml(getTag('link')),
        pubDate: stripHtml(getTag('pubDate')),
        category: stripHtml(getTag('category')),
        description: stripHtml(getTag('description'))
      };

      return {
        title: raw.title || '記事タイトル',
        url: raw.link || '#',
        publishedAt: raw.pubDate || new Date().toISOString(),
        category: raw.category || undefined,
        summary: (raw.description || '最新情報をご覧ください。').slice(0, 140)
      };
    });

    return mapped.length ? mapped : DEFAULT_BLOG_ITEMS.slice(0, limit);
  } catch {
    return DEFAULT_BLOG_ITEMS.slice(0, limit);
  }
}
