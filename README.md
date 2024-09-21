<h1 align="center">taro-miniapp</h1>

<div align="center">
taro 4 + taro-ui 3实现的React小程序开发脚手架
<p align="center">
<img src="https://img.shields.io/badge/React-18.3.1-brightgreen" alt="React version"/>
<img src="https://img.shields.io/badge/taro-4.0.5-brightgreen" alt="taro version"/>
<img src="https://img.shields.io/badge/taro-ui-3.3.0-brightgreen" alt="taro-ui version"/> 
</p>
</div>

# 后端框架 

## 开发框架
- [taro](https://github.com/nervjs/taro) 小程序React框架 [文档](https://taro-docs.jd.com/docs/next/GETTING-STARTED)
- [taro-ui](https://github.com/NervJS/taro-ui) 小程序前端UI组件 [文档](https://taro-ui.jd.com/#/docs/introduction)

## 编译运行

```bash
$ yarn config set registry https://registry.npmmirror.com/
$ yarn upgrade --save
$ yarn upgrade-interactive --latest
$ yarn install

$ yarn dev:weapp
$ taro build --type weapp --watch

$ yarn build:weapp
$ taro build --type weapp
```

## 目录结构

```md
.
├── README.md
├── ice.config.mts                  # The project config
├── package.json
├── .browserslistrc                 # Browsers that we support
├── public
│   ├── favicon.ico   
├── src
|  ├── app.ts                       # App entry
|  ├── assets
|  ├── components                   # Common component
|  ├── document.tsx
|  ├── global.css                   # Global style
|  ├── interfaces
|  ├── menuConfig.tsx               # Layout menus
|  ├── models
|  ├── pages                        # Pages directory
|  ├── services
|  ├── store.ts                     # App store
|  └── typings.d.ts
└── tsconfig.json
```
## 镜像构建部署

```bash
# 使用multi-stage(多阶段构建)需要docker 17.05+版本支持
DOCKER_BUILDKIT=1 docker build  --network=host --no-cache --force-rm -t registry.cn-shenzhen.aliyuncs.com/dev-ops/ice-antd:1.0.0 .
docker push  registry.cn-shenzhen.aliyuncs.com/dev-ops/ice-antd:1.0.0
docker save -o ice-antd-1.0.0.tar  registry.cn-shenzhen.aliyuncs.com/dev-ops/ice-antd:1.0.0
docker load -i ice-antd-1.0.0.tar
```
## 容器运行-Docker运行
``` shell
docker rm -f ice-antd
docker run -d --name ice-antd --network=host --restart always registry.cn-shenzhen.aliyuncs.com/dev-ops/ice-antd:1.0.0
```