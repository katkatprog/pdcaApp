# 取扱説明書
## 環境変数の設定方法
プロジェクトのルートディレクトリに.envファイルを作成し、下記の環境変数を設定してください。
- FRONT_PORT=<frontのポート番号>
- FRONT_PROJ_NAME=<frontのプロジェクト名>
- API_PORT=<apiのポート番号>
- API_PROJ_NAME=<apiのプロジェクト名>
- DB_PORT=<dbのポート番号>
- DB_NAME=<dbで使用するデータベース名>
- DB_USER=<dbで使用するユーザー名>
- DB_PASS=<dbで使用するパスワード>
- PRISMA_STUDIO_PORT=<Prisma studioで使用するポート番号>

## makeコマンドを用いた諸々の操作方法
Makefile内コマンドを用いた諸々の操作方法は以下のとおりです。
- imageのビルド: make build
- 環境の起動: make up
- 環境のシャットダウン: make down
- frontコンテナに入り作業をする: make front-exec
- apiコンテナに入り作業をする: make api-exec
- dbコンテナに入り作業をする: make db-exec
- dbコンテナに入りつつデータベースにログイン: make db-login
- front(React)のプロジェクト新規作成: make front-create-app
- api(NestJS)のプロジェクト新規作成: make api-create-app
- (注意)front,apiのimage削除、各種volume削除: make all-reset
