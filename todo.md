# mastra を利用した Slack 経由の天気情報 AI エージェント - 実装タスクリスト

このドキュメントは、mastra cloud を利用した Slack 経由の天気情報 AI エージェント実装のためのタスクリストです。役割分担を明確にしています。

## 役割分担

- **AI 担当**: コーディング、スクリプト作成、設定ファイル作成
- **ユーザー様担当**: クラウドサービスの設定、デプロイの実行

## 1. 環境セットアップ

- [ ] 1.1. 開発環境の準備 【AI 担当】

  - [ ] mise.toml を使用した Node.js と pnpm の設定

- [ ] 1.2. 各サービスのプロジェクト構造 【AI 担当】
  - [ ] 各サービス実装時に必要なディレクトリ構造を作成
  - [ ] 環境変数設定（.env, .env.example）
  - [ ] .gitignore の設定

## 2. mastra cloud 設定 【ユーザー様担当】

- ※ 実施済みのため省略

## 3. Slack App 設定 【AI 担当：コード実装、ユーザー様担当：実際の設定】

- [ ] 3.1. Slack App Manifest の作成

  - [ ] アプリ定義の JSON マニフェスト作成
  - [ ] 必要なスコープの設定
    - [ ] `app_mentions:read`
    - [ ] `chat:write`
    - [ ] `im:history`
    - [ ] `im:read`
    - [ ] `im:write`
  - [ ] イベント設定（`app_mention`, `message.im`）
  - [ ] Bot User 設定

- [ ] 3.2. マニフェストを使用したアプリ作成手順のドキュメント作成
  - [ ] マニフェストのインストール方法
  - [ ] 必要な設定の説明

## 4. Google Cloud Platform 設定 【AI 担当：Terraform 実装、ユーザー様担当：適用】

- [ ] 4.1. Terraform によるインフラ定義
  - [ ] GCP プロジェクト設定
  - [ ] 必要な API の有効化
  - [ ] サービスアカウント設定
  - [ ] Cloud Tasks 設定
  - [ ] Artifact Registry 設定
  - [ ] Cloud Run 設定
  - [ ] Firestore 設定（必要に応じて）

## 5. バックエンドサービス実装 【AI 担当】

- [ ] 5.1. メインサービス（Cloud Run Service）

  - [ ] プロジェクト構造の作成
  - [ ] 依存関係のインストール
    - [ ] `@slack/bolt`
    - [ ] `express`
    - [ ] `@google-cloud/tasks`
    - [ ] `dotenv`
  - [ ] Slack Bolt アプリの実装
  - [ ] イベントハンドラーの実装
  - [ ] Cloud Tasks へのタスク登録機能の実装
  - [ ] エラーハンドリングの実装
  - [ ] ログ記録の実装
  - [ ] Dockerfile の作成

- [ ] 5.2. ワーカーサービス（Cloud Run Worker）

  - [ ] プロジェクト構造の作成
  - [ ] 依存関係のインストール
    - [ ] `express`
    - [ ] `@slack/web-api`
    - [ ] `@mastra/client-js`
    - [ ] `dotenv`
  - [ ] タスク処理エンドポイントの実装
  - [ ] mastra cloud API クライアントの実装
  - [ ] Slack API を使用した応答送信機能の実装
  - [ ] エラーハンドリングの実装
  - [ ] ログ記録の実装
  - [ ] Dockerfile の作成

- [ ] 5.3. mastra client-js 連携
  - [ ] クライアントの初期化
  - [ ] エージェント呼び出しの実装
  - [ ] レスポンス処理の実装

## 6. テストと検証 【AI 担当：コード実装、ユーザー様担当：実行】

- [ ] 6.1. 統合テスト
  - [ ] Slack API との統合テスト
  - [ ] mastra cloud API との統合テスト
  - [ ] Cloud Tasks との統合テスト

## 7. デプロイ 【AI 担当：スクリプト実装、ユーザー様担当：実行】

- [ ] 7.1. デプロイスクリプトの作成

  - [ ] Docker build コマンド
  - [ ] Docker push コマンド（Artifact Registry へ）
  - [ ] gcloud run deploy コマンド
  - [ ] 環境変数設定コマンド

- [ ] 7.2. メインサービスのデプロイ手順

  - [ ] Docker イメージのビルド
  - [ ] Artifact Registry へのプッシュ
  - [ ] Cloud Run へのデプロイ
  - [ ] 環境変数の設定

- [ ] 7.3. ワーカーサービスのデプロイ手順

  - [ ] Docker イメージのビルド
  - [ ] Artifact Registry へのプッシュ
  - [ ] Cloud Run へのデプロイ
  - [ ] 環境変数の設定

- [ ] 7.4. Slack App の設定更新手順
  - [ ] リクエスト URL の更新
  - [ ] イベント購読の確認

## 実装の進め方

1. まず、Terraform によるインフラ定義から始めます
2. 次に、Slack App Manifest を作成します
3. その後、メインサービスとワーカーサービスを実装します
4. 最後に、デプロイスクリプトを作成します

各ステップで必要なディレクトリ構造を作成し、コードを実装していきます。
