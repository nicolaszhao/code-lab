# Nest App

## Getting Start

### Install Mongo with Docker

```sh
docker pull mongo:latest
```

Check mongo has already installed:

```sh
docker images
```

run mongo container:

```sh
docker run -d -p 27017:27017 --name mongodb mongo
```

Parameter description:

- `-d`: 后台运行容器
- `-p 27017:27017`: 将主机的27017端口映射到容器的27017端口。
- `--name mongodb`: 为容器指定一个名字，这里是 `mongodb`，你可以根据需要更改。

check mongo container running info:

```sh
docker ps
```

install MongolDB Shell:

[下载 MongoDB Shell](https://www.mongodb.com/zh-cn/docs/mongodb-shell/)

连接到运行中的 MongoDB 容器：

```sh
mongosh --host 127.0.0.1 --port 27017
```

进入 MongoDB 容器的 bash shell 命令如下：

```sh
docker exec -it mongodb bash
```

不再需要时停止和删除容器，可以使用以下命令：

```sh
docker stop mongodb
docker rm mongodb
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
