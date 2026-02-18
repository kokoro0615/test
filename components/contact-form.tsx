'use client';

import { useActionState } from 'react';
import { submitReservation } from '@/lib/actions';

const initialState = { success: false, message: '' };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitReservation, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-slate-700">
          お名前*
          <input name="name" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          電話番号*
          <input name="phone" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-slate-700">
          メール（任意）
          <input type="email" name="email" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          希望メニュー*
          <select name="menu" required className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="痩身">痩身</option>
            <option value="フェイシャル">フェイシャル</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1 text-sm font-medium text-slate-700">
          第1希望日時*
          <input name="firstChoice" required placeholder="例) 3/15 10:00" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          第2希望日時
          <input name="secondChoice" placeholder="例) 3/16 13:00" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          第3希望日時
          <input name="thirdChoice" placeholder="例) 3/17 18:00" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <label className="block space-y-1 text-sm font-medium text-slate-700">
        備考
        <textarea name="notes" rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>

      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input type="checkbox" name="agreement" required className="mt-1" />
        <span>
          <a href="/privacy" className="text-brand-700 underline">プライバシーポリシー</a>に同意して送信します。
        </span>
      </label>

      {state.message ? (
        <p className={`text-sm ${state.success ? 'text-emerald-700' : 'text-rose-700'}`}>{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? '送信中...' : '体験予約を送信する'}
      </button>
      <p className="text-xs text-slate-500">※送信後、担当者から24時間以内にご連絡します。</p>
    </form>
  );
}
