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

## DBのマイグレーション

### Expressコンテナでの作業

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

#### 作成したユーザーの確認など

1.MySQLコンテナにアタッチ

```:bash
docker exec -it MySQLのコンテナ名 /bin/bash
```

2.MySQLに接続

```:bash
mysql -h db -P 3306 -u root -p
```

このコマンドの後下記パスワード入力

`password`

3.使用するDBを選択

```:bash
use blog_db_dev;
```

4.Usersテーブルの内容を確認する

```:bash
select * from Users;
```
