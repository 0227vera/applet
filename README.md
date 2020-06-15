# 模版说明

## 文档和技能要求

1. [阅读小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

2. [熟悉小程序后台管理](https://mp.weixin.qq.com/wxamp/home/guide?token=1860492823&lang=zh_CN)

3. 有最基本的前端开发技能

## 小程序特殊配置以及常见的问题

### 1. 项目启动的时候

需要构建npm

1. 本地`npm i`

2. 在开发者工具中`详情>本地设置>使用npm模块`勾选

3. 在工具栏中`工具>构建npm`

4. 完全退出小程序开发者者工具，然后重新进入应用即可

### 2. 将背景图覆盖顶部状态栏

全局配置可在 app.json

```json
"window": {
  "navigationStyle": "custom"
}
```

具体页面配置可在 [pageName].json中添加如下配置

```json
{
  "navigationStyle": "custom"
}
```

### 3. 小程序的openid需要服务端去处理

### 4. 小程序外链安全问题，需要在后台下载相关文件然后配置小程序白名单

