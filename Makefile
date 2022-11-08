include .env

########################################################################################
################################# 共通コマンド ###########################################
########################################################################################
#	環境の起動
up:
	docker-compose up

# 環境の動作終了
down:
	docker-compose down

# 環境の再起動
restart:
	@make down
	@make up

# imageの作成(build)
build:
	docker-compose build --no-cache

# buildしたimageの削除
rmi:
# image名を取得するため、$(shell ...)にて、カレントディレクトリのみを取得し、なおかつ小文字に変換する。
	docker rmi $(shell basename `pwd` | tr 'A-Z' 'a-z')_api
	docker rmi $(shell basename `pwd` | tr 'A-Z' 'a-z')_front

# front, apiのvolumeの削除
rmvol:
# volume名を取得するため、$(shell ...)にてフルパスからカレントディレクトリのみを抽出し、それを小文字に変換する。
	docker volume rm $(shell basename `pwd` | tr 'A-Z' 'a-z')_api_store
	docker volume rm $(shell basename `pwd` | tr 'A-Z' 'a-z')_front_store

# 環境の全リセット
all-reset:
	$(shell make rmi) ; $(shell make db-rmvol) ; $(shell make rmvol)
########################################################################################
################################# frontに関するコマンド ######################################
########################################################################################
# frontコンテナにアクセスする。
front-exec:
	docker-compose exec front bash

# Reactプロジェクト新規作成
# (1)/workspace/front(ホスト側の./front)のプロジェクト内のnode_modulesがVolume-Mountがされている関係上、
# 	一時的にコンテナ内の/workspace_tmpにプロジェクトを作成、
# (2)/workspace_tmpに作成したプロジェクトのファイルを、/workspace/frontのプロジェクトに移動させるが、
# 	node_modules, .gitの移動は行いたくないので、移動前に削除。
# (3)/workspace_tmpのプロジェクトから残ったファイルを/workspace/frontに移動。
# (4)/workspace_tmpを削除
front-create-app:
	docker-compose exec front sh -c \
		"mkdir /workspace_tmp && cd /workspace_tmp && yarn create react-app --template typescript ${FRONT_PROJ_NAME} && \
		cd ./${FRONT_PROJ_NAME} && rm -rf .git node_modules &&\
		cd /workspace_tmp/${FRONT_PROJ_NAME} && mv * .[^\.]* /workspace/front/${FRONT_PROJ_NAME} && \
		cd /workspace/front && rm -rf /workspace_tmp"

# Next.jsプロジェクト新規作成
# (1)/workspace/front(ホスト側の./front)のプロジェクト内のnode_modulesがVolume-Mountがされている関係上、
# 	一時的にコンテナ内の/workspace_tmpにプロジェクトを作成、
# (2)/workspace_tmpに作成したプロジェクトのファイルを、/workspace/frontのプロジェクトに移動させるが、
# 	node_modules, .gitの移動は行いたくないので、移動前に削除。
# (3)/workspace_tmpのプロジェクトから残ったファイルを/workspace/frontに移動。
# (4)/workspace_tmpを削除
# front-create-app:
# 	docker-compose exec front sh -c \
# 		"mkdir /workspace_tmp && cd /workspace_tmp && yarn create next-app --ts ${FRONT_PROJ_NAME} && \
# 		cd ./${FRONT_PROJ_NAME} && rm -rf .git node_modules &&\
# 		cd /workspace_tmp/${FRONT_PROJ_NAME} && mv * .[^\.]* /workspace/front/${FRONT_PROJ_NAME} && \
# 		cd /workspace/front && rm -rf /workspace_tmp"

########################################################################################
################################# apiに関するコマンド #####################################
########################################################################################
# apiコンテナ(NestJS)にアクセスする。
api-exec:
	docker-compose exec api bash

# NestJSプロジェクト新規作成
# --skip-installをすることで、プロジェクト作成の際にnode_modulesがインストールされなくなり、Volume-Mountされているnode_modulesと競合せず済む。
# .gitが作られないようにする
api-create-app:
	docker-compose exec api sh -c \
		"nest new ${API_PROJ_NAME} --package-manager yarn --skip-install --skip-git"

########################################################################################
################################# dbに関するコマンド ######################################
########################################################################################
# dbコンテナのpostgres環境にログインする。コマンドにDBログイン情報を含むが、先頭に@を付けることで表示されなくなる。
db-login:
	@docker-compose exec db sh -c 'psql -U ${DB_USER} -d ${DB_NAME}'

# dbコンテナにアクセスする。
db-exec:
	docker-compose exec db bash

# dbコンテナのvolume(データ保存場所)を削除する。
db-rmvol:
# volume名を取得するため、$(shell ...)にてフルパスからカレントディレクトリのみを抽出し、それを小文字に変換する。
	docker volume rm $(shell basename `pwd` | tr 'A-Z' 'a-z')_db_store
