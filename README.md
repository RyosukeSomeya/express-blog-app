# express-mysql-env-on-docker

## 開発環境の立ち上げ

### 1.プロジェクトのディレクトリへ移動

```:bash
cd express-blog-app
```

### 2.dockerイメージを生成する

```:bash
docker-compose build
```

### 3.dockerコンテナを起動する

```:bash
docker-compose up -d # バックグラウンド起動
```

## DBのマイグレーションまで

### MySQLコンテナでの作業

#### 1. コンテナへ接続

```:bash
docker exec -it MySQLのコンテナ名 /bin/bash
```

#### 2. MySQLへ接続

```:bash
mysql -h db -P 3306 -u root -p
```

※プロンプトに従ってパスワードを入力

#### 3. DB作成

```:bash
CREATE DATABASE blog_db_dev;

SHOW DATABASES; # => blog_db_devが存在するDBの一覧にあればOK
```

### Expressコンテナでの作業

※ MySQLの作業を完了しておくこと。

#### コンテナへ接続

```:bash
docker exec -it Expressコンテナ名 /bin/bash
```

#### マイグレーション実行

```:bash
npx sequelize-cli db:migrate
```

ここまで、完了するとDBとの連携の準備が整い、ユーザー登録ができるようになります。

### その他

#### 作成したユーザーの確認

1. MySQLに接続
2. 下記コマンドを順に実行

```:bash
use blog_db_dev; # 使用するDBを選択
select * from Users; # Usersテーブルの内容を表示
```
