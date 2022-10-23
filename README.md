# nest_react_docker
## 環境変数の設定方法
プロジェクトのルートディレクトリに.envファイルを作成し、下記の環境変数を設定してください。
- FRONT_PORT=<frontのポート番号>
- FRONT_WORKDIR=<frontのコンテナ内の作業ディレクトリ>
- FRONT_PROJ_NAME=<frontのプロジェクト名>
- API_PORT=<apiのポート番号>
- API_WORKDIR=<apiのコンテナ内の作業ディレクトリ>
- API_PROJ_NAME=<apiのプロジェクト名>
- DB_PORT=<dbのポート番号>
- DB_NAME=<dbで使用するデータベース名>
- DB_USER=<dbで使用するユーザー名>
- DB_PASS=<dbで使用するパスワード>
- PRISMA_STUDIO_PORT=<Prisma studioで使用するポート番号>