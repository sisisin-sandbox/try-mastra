# mastra を利用した Slack 経由の AI エージェント - 命名規則

このドキュメントでは、プロジェクトで使用する各種コンポーネントの命名規則を定義します。

## 1. GCP リソース関連

| コンポーネント                 | 命名案                           | 説明                                   |
| ------------------------------ | -------------------------------- | -------------------------------------- |
| GCP プロジェクト ID            | `knowledgework-simenyan-sandbox` | 指定されたプロジェクト ID              |
| リージョン                     | `asia-northeast1`                | 変更なし                               |
| Artifact Registry リポジトリ   | `try-mastra-images`              | Docker イメージを保存するリポジトリ    |
| Cloud Tasks キュー             | `try-mastra-tasks-queue`         | 非同期処理用のタスクキュー             |
| サービスアカウント（メイン）   | `try-mastra-slack-sa`            | メインサービス用のサービスアカウント   |
| サービスアカウント（ワーカー） | `try-mastra-worker-sa`           | ワーカーサービス用のサービスアカウント |

## 2. Cloud Run サービス関連

| コンポーネント                     | 命名案                                  | 説明                                                                       |
| ---------------------------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| メインサービス                     | `try-mastra-slack-app`                  | Slack からのリクエストを処理するメインサービス                             |
| ワーカーサービス                   | `try-mastra-worker`                     | バックグラウンド処理を行うワーカーサービス                                 |
| メインサービスの Docker イメージ   | `try-mastra-slack-app:${GIT_SHORT_SHA}` | メインサービスの Docker イメージ（git short sha をバージョンとして使用）   |
| ワーカーサービスの Docker イメージ | `try-mastra-worker:${GIT_SHORT_SHA}`    | ワーカーサービスの Docker イメージ（git short sha をバージョンとして使用） |

## 3. Slack App 関連

| コンポーネント     | 命名案            | 説明                              |
| ------------------ | ----------------- | --------------------------------- |
| Slack App 名       | `Sime Mastra Bot` | ユーザーに表示されるアプリ名      |
| Bot ユーザー名     | `sime-mastra-bot` | @メンションで使用されるユーザー名 |
| Bot ユーザー表示名 | `Sime Mastra Bot` | Slack に表示されるボット名        |

## 4. ディレクトリ/ファイル構造

| コンポーネント               | 命名案                | 説明                                           |
| ---------------------------- | --------------------- | ---------------------------------------------- |
| Terraform ディレクトリ       | `terraform/`          | Terraform コードを格納するディレクトリ         |
| メインサービスディレクトリ   | `slack-app/`          | メインサービスのコードを格納するディレクトリ   |
| ワーカーサービスディレクトリ | `worker/`             | ワーカーサービスのコードを格納するディレクトリ |
| Slack Manifest ファイル      | `slack-manifest.json` | Slack App のマニフェスト定義                   |
| デプロイスクリプト           | `deploy.sh`           | デプロイ用のシェルスクリプト                   |

## 5. 環境変数

| コンポーネント       | 命名案                            | 説明                                  |
| -------------------- | --------------------------------- | ------------------------------------- |
| Slack Bot Token      | `TRY_MASTRA_SLACK_BOT_TOKEN`      | Slack API を呼び出すためのトークン    |
| Slack Signing Secret | `TRY_MASTRA_SLACK_SIGNING_SECRET` | Slack リクエストの検証用シークレット  |
| mastra cloud API Key | `TRY_MASTRA_CLOUD_API_KEY`        | mastra cloud API を呼び出すためのキー |
| mastra Agent ID      | `TRY_MASTRA_AGENT_ID`             | mastra cloud のエージェント ID        |
| GCP Project ID       | `TRY_MASTRA_GCP_PROJECT_ID`       | GCP プロジェクト ID                   |
| Worker Service URL   | `TRY_MASTRA_WORKER_URL`           | ワーカーサービスの URL                |

## 6. Terraform リソース

| リソースタイプ                      | 命名案                                                          | 説明                                   |
| ----------------------------------- | --------------------------------------------------------------- | -------------------------------------- |
| google_project_service              | `google_project_service.required_apis`                          | 必要な GCP API を有効化                |
| google_service_account              | `google_service_account.try_mastra_slack_sa`                    | メインサービス用のサービスアカウント   |
| google_service_account              | `google_service_account.try_mastra_worker_sa`                   | ワーカーサービス用のサービスアカウント |
| google_artifact_registry_repository | `google_artifact_registry_repository.try_mastra_images`         | Artifact Registry リポジトリ           |
| google_cloud_tasks_queue            | `google_cloud_tasks_queue.try_mastra_tasks_queue`               | Cloud Tasks キュー                     |
| google_cloud_run_service            | `google_cloud_run_service.try_mastra_slack_app`                 | メインサービスの Cloud Run             |
| google_cloud_run_service            | `google_cloud_run_service.try_mastra_worker`                    | ワーカーサービスの Cloud Run           |
| google_cloud_run_service_iam_member | `google_cloud_run_service_iam_member.try_mastra_worker_invoker` | ワーカーサービスの呼び出し権限         |

## 命名規則の一貫性

このプロジェクトでは、以下の命名規則を一貫して適用しています：

1. **プロジェクト識別子**: `try-mastra` をプレフィックスとして使用し、リソース名に一貫して反映
2. **リソースの役割**: リソースの役割を名前に反映（例：`slack-app`, `worker`）
3. **環境変数**: 大文字のスネークケースで、プレフィックスとして `TRY_MASTRA` を使用
4. **Terraform リソース**: Terraform HCL の命名規則に従い、アンダースコアを使用（例：`try_mastra_slack_app`）
5. **Docker イメージ**: git short sha をバージョンとして使用し、一貫性のあるバージョン管理を実現

これらの命名規則により、プロジェクト全体で一貫性のある命名が保たれ、リソースの役割や関連性が明確になります。
