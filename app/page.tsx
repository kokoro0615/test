import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { getBlogCards } from '@/lib/blog';

const reasons = [
  '生活習慣ヒアリングから施術・ホームケアまで一貫設計',
  '担当制で毎回同じ施術者が伴走（運用前提）',
  '駅徒歩3分・平日20時までで通いやすい'
];

const faqs = [
  ['痛みはありますか？', '体感には個人差がありますが、初回カウンセリングで刺激の強さを調整します。'],
  ['勧誘が不安です。', 'ご希望とご予算に合う提案のみ実施します。不要な場合はその場でお断りいただけます。'],
  ['所要時間は？', '初回はカウンセリング含め約90分です。'],
  ['支払い方法は？', '現金・各種クレジットカード・電子決済に対応予定です。']
];

export default async function Home() {
  const blogCards = await getBlogCards(3);

  return (
    <main>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16">
        <div className="container-base grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-brand-700">先着30名・今月末まで</p>
            <h1 className="text-4xl font-bold leading-tight">無理なく続く“習慣設計”までサポート。<br />痩身・フェイシャル初回体験</h1>
            <p className="text-lg text-slate-700">初回体験 3,980円〜9,800円 / 売り込みなし（運用時に明記）</p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-700">体験予約する</a>
              <a href="https://line.me" className="rounded-xl border border-brand-700 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50">LINEで相談</a>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">こんなお悩みに</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>・自己流ダイエットが続かない</li>
              <li>・フェイスライン、毛穴、くすみが気になる</li>
              <li>・忙しくても定期的に通えるサロンを探している</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-base py-14">
        <h2 className="text-2xl font-bold">選ばれる理由</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason} className="rounded-xl border border-slate-200 p-5">
              <p className="text-slate-700">{reason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container-base">
          <h2 className="text-2xl font-bold">料金プラン</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3">プラン</th>
                  <th className="px-4 py-3">価格</th>
                  <th className="px-4 py-3">内容</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">初回体験</td><td className="px-4 py-3">3,980円〜9,800円</td><td className="px-4 py-3">カウンセリング+施術+ホームケア提案</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">通常1回</td><td className="px-4 py-3">12,000円〜</td><td className="px-4 py-3">目的別カスタム施術</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3">回数券</td><td className="px-4 py-3">10%OFF（当日入会特典）</td><td className="px-4 py-3">継続ケア向け</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-base py-14">
        <h2 className="text-2xl font-bold">よくある質問</h2>
        <div className="mt-6 space-y-4">
          {faqs.map(([question, answer]) => (
            <details key={question} className="rounded-xl border border-slate-200 p-4">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-2 text-slate-700">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container-base">
          <h2 className="text-2xl font-bold">お悩み別ブログ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {blogCards.map((post) => (
              <article key={`${post.url}-${post.title}`} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500">{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</p>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                {post.category ? <p className="mt-1 text-xs text-brand-700">#{post.category}</p> : null}
                <p className="mt-3 text-sm text-slate-600">{post.summary}</p>
                <a href={post.url} target="_blank" className="mt-4 inline-block text-sm font-semibold text-brand-700 underline">記事を読む</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container-base py-14">
        <h2 className="text-2xl font-bold">体験予約フォーム</h2>
        <p className="mt-2 text-slate-700">予約受付完了後、折返しのご連絡を差し上げます。LINE追加でホームケアPDFも配布中。</p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8">
        <div className="container-base flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
          <p>© 2026 Sample Beauty Salon</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="underline">プライバシーポリシー</Link>
            <Link href="/terms" className="underline">利用規約</Link>
            <a href="tel:0000000000" className="underline">電話で予約</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
