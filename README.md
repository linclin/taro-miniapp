<h1 align="center">taro-miniapp</h1>

<div align="center">
Taro 4 + Taro UI 3实现的React小程序开发脚手架
<p align="center">
<img src="https://img.shields.io/badge/React-18.3.1-brightgreen" alt="React version"/>
<img src="https://img.shields.io/badge/Taro-4.0.6-brightgreen" alt="Taro version"/>
<img src="https://img.shields.io/badge/Taro UI-3.3.0-brightgreen" alt="Taro UI version"/> 
</p>
</div>

## 开发框架
- [Taro](https://github.com/nervjs/taro) 小程序React框架 [文档](https://taro-docs.jd.com/docs/next/GETTING-STARTED)
- [Taro UI](https://github.com/NervJS/taro-ui) 小程序前端UI组件 [文档](https://taro-ui.jd.com/#/docs/introduction)

## 编译运行

```bash
$ taro create system

$ yarn config set registry https://registry.npmmirror.com/
$ yarn install
$ yarn upgrade-interactive --latest


$ yarn dev:weapp
或
$ taro build --type weapp --watch

$ yarn build:weapp
或
$ taro build --type weapp
```

## 微信小程序配置
```bash
#request合法域名
https://zhls.qq.com  #腾讯有数 https://srdata.tencent.com/web/home
https://api.datanexus.qq.com #腾讯有数
https://hmma.baidu.com #百度统计 https://mtj.baidu.com/web/dashboard

```