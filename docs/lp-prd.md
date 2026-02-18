# LP PRD（痩身/フェイシャル体験予約）

## 1. 目的 / KPI
- 目的: 体験予約の獲得、LINE追加による来店前教育。
- KPI（一次）: 予約完了数 / CVR / CPA。
- KPI（二次）: LINE追加率 / 来店率 / 初回→成約率 / 3ヶ月LTV。

## 2. ターゲット / 検索意図
- ターゲット: 25〜45歳女性、仕事/育児で忙しい層。
- 主な悩み: 自己流ダイエット継続困難、フェイスライン・毛穴・くすみ。
- 検索意図: 「地域名 + 痩身 体験」「地域名 + フェイシャル 毛穴」。

## 3. 価値提案（1文）
無理なく続く習慣設計までサポートし、初回体験から通いやすさと安心感を提供する。

## 4. セクション構成
1. Hero（価格+CTA）
2. 悩み共感
3. 選ばれる理由（USP）
4. 料金
5. FAQ
6. ブログカード
7. 予約フォーム
8. フッター（法務）

## 5. 主要CTA
- 体験予約する（#contact へ遷移）
- LINEで相談（外部LINE）
- 電話で予約（telリンク）

## 6. フォーム仕様
- 項目: 名前, 電話, メール(任意), メニュー, 希望日時(第1-3), 備考, 同意チェック。
- バリデーション: Server Actions + Zod（サーバ側必須）。
- スパム対策: honeypot（`website`）実装。
- 送信: Resend API（環境変数 `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`）。
- 送信後導線: 成功メッセージ表示（将来は `/thanks` 遷移の運用に拡張）。

## 7. SEO要件
- metadata（title/description/OG/metadataBase）
- `sitemap.ts` / `robots.ts`
- OG画像1枚
- ブログ全文複製は禁止（カード導線のみ）

## 8. 計測
- 想定イベント: `reserve_submit`, `line_click`, `tel_click`
- 実装方針: GTMでボタンクリックおよびフォーム送信フック（運用接続時設定）

## 9. ブログカード仕様
- 表示件数: 3件
- 取得: RSS（`BLOG_RSS_URL`）をサーバ側 fetch
- ISR: `revalidate: 3600`
- フォールバック: デフォルト記事カード表示

## 10. 受入基準（Done）
- LPがNext.jsでビルド可能。
- 主要ページ（`/`, `/privacy`, `/terms`, `/thanks`）が存在。
- 予約フォームのサーバ側バリデーションが動作。
- SEO基盤（metadata / sitemap / robots / OG）が存在。

## Assumptions / Impact
- Assumption: 店舗名・住所・営業時間・実績数値は未確定。
- Impact: 実データ確定前は仮テキスト運用となり、広告審査資料としては不足。
- Assumption: Resend送信元ドメイン未設定。
- Impact: 本番運用前に送信元認証が必須。
