'use server';

import { z } from 'zod';

const reservationSchema = z.object({
  name: z.string().min(1, 'お名前は必須です').max(40),
  phone: z.string().min(10, '電話番号を確認してください').max(20),
  email: z.string().email('メール形式が不正です').optional().or(z.literal('')),
  menu: z.enum(['痩身', 'フェイシャル']),
  firstChoice: z.string().min(1, '第1希望は必須です'),
  secondChoice: z.string().optional(),
  thirdChoice: z.string().optional(),
  notes: z.string().max(500).optional(),
  agreement: z.literal('on', {
    errorMap: () => ({ message: '同意が必要です' })
  }),
  website: z.string().max(0).optional()
});

export type FormState = {
  success: boolean;
  message: string;
};

const defaultState: FormState = { success: false, message: '' };

export async function submitReservation(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = reservationSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    menu: formData.get('menu'),
    firstChoice: formData.get('firstChoice'),
    secondChoice: formData.get('secondChoice'),
    thirdChoice: formData.get('thirdChoice'),
    notes: formData.get('notes'),
    agreement: formData.get('agreement'),
    website: formData.get('website')
  });

  if (!parsed.success) {
    return {
      ...defaultState,
      message: parsed.error.issues[0]?.message ?? '入力内容をご確認ください。'
    };
  }

  if (parsed.data.website) {
    return { success: true, message: '送信を受け付けました。' };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL_TO;
  const fromEmail = process.env.NOTIFY_EMAIL_FROM ?? 'onboarding@resend.dev';

  if (!resendApiKey || !notifyTo) {
    return {
      ...defaultState,
      message: '現在フォーム送信の設定中です。お急ぎの場合はお電話でご連絡ください。'
    };
  }

  const emailBody = `\n新規予約リクエスト\n\nお名前: ${parsed.data.name}\n電話番号: ${parsed.data.phone}\nメール: ${parsed.data.email || '未入力'}\nメニュー: ${parsed.data.menu}\n第1希望: ${parsed.data.firstChoice}\n第2希望: ${parsed.data.secondChoice || '未入力'}\n第3希望: ${parsed.data.thirdChoice || '未入力'}\n備考: ${parsed.data.notes || '未入力'}\n`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyTo],
        subject: '【LP予約】新規予約リクエスト',
        text: emailBody
      })
    });

    if (!response.ok) {
      return { ...defaultState, message: '送信に失敗しました。時間をおいてお試しください。' };
    }

    return { success: true, message: '送信ありがとうございました。担当者より折り返しご連絡します。' };
  } catch {
    return { ...defaultState, message: '通信エラーが発生しました。' };
  }
}
