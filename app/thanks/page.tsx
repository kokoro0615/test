import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="container-base py-12">
      <h1 className="text-3xl font-bold">ご予約ありがとうございます</h1>
      <p className="mt-4 text-slate-700">受付完了しました。24時間以内にご連絡いたします。LINE追加で事前案内をお届けします。</p>
      <Link href="https://line.me" className="mt-6 inline-block rounded-lg bg-brand-500 px-4 py-2 font-semibold text-white">LINEを追加する</Link>
    </main>
  );
}
