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

# Reactプロジェクト作成
# プロジェクト作成の前からnode_modulesのVolume-Mountがされている場合、docker-compose.ymlの該当箇所をコメントアウトするように指示する。
# プロジェクトのルート位置でgit管理しているため、Reactプロジェクト内に生成される.gitは削除する。
front-build:
	docker-compose exec front sh -c \
		"if [ -d ${FRONT_PROJ_NAME}/node_modules ]; then \
			echo Comment out front_store Volume-Mount in docker-compose.yml ! ; \
		else \
			yarn create react-app --template typescript ${FRONT_PROJ_NAME} && cd ${FRONT_PROJ_NAME} && \
			if [ -d .git ]; then \
				rm -rf .git ; \
			fi\
		fi"

# Next.jsプロジェクト作成
# プロジェクト作成の前からnode_modulesのVolume-Mountがされている場合、docker-compose.ymlの該当箇所をコメントアウトするように指示する。
# プロジェクトのルート位置でgit管理しているため、Nextプロジェクト内に生成される.gitは削除する。
# front-build:
# 	docker-compose exec front sh -c \
# 		"if [ -d ${FRONT_PROJ_NAME}/node_modules ]; then \
# 			echo Comment out front_store Volume-Mount in docker-compose.yml ! ; \
# 		else \
# 			yarn create next-app --ts ${FRONT_PROJ_NAME} && cd ${FRONT_PROJ_NAME} && \
# 			if [ -d .git ]; then \
# 				rm -rf .git ; \
# 			fi\
# 		fi"
########################################################################################
################################# apiに関するコマンド #####################################
########################################################################################
# apiコンテナ(NestJS)にアクセスする。
api-exec:
	docker-compose exec api bash

# NestJSプロジェクト作成
# プロジェクト作成の前からnode_modulesのVolume-Mountがされている場合、docker-compose.ymlの該当箇所をコメントアウトするように指示する。
api-build:
	docker-compose exec api sh -c \
		"if [ -d ${API_PROJ_NAME}/node_modules ]; then \
			echo Comment out api_store Volume-Mount in docker-compose.yml ! ; \
		else \
			nest new ${API_PROJ_NAME} --package-manager yarn --skip-git \
		fi"
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
