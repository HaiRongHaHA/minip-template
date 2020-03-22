# wep-template

> ## 项目简介

**此项目是 wep-cli 脚手架的代码模板**

**模板采用 webpack 打包达到小程序工程化开发，解决了微信小程序 JS 文件只能引用相对路径，wxml 中引入 wxs 只能引入相对路径，不能使用 Less(模板默认 less，暂不支持选择其他 css 预处理器)等问题，模板还特地内置了小程序请求拦截器、时间管理器、时间&金额过滤器、常用正则等开发常用工具类**

> ## 如何使用？

```
npm install

// 监听修改自动刷新,代码不会压缩混淆
npm run dev

// 代码压缩混淆(上传体验版时用)
npm run build

// 查看js模块依赖图
npm run build --report
```

> ## 注意事项

**此项目目前暂不支持 TS**

**webpack 可以帮助我们 ES6 转 ES5，压缩和混淆代码，因此这些事情，不需要微信开发者工具帮我们做了。点击微信开发者工具右上角的详情按钮，在项目设置中，反勾选 ES6 转 ES5，上传代码时自动压缩混淆等选项，**

![alt](https://user-gold-cdn.xitu.io/2019/6/12/16b4aa2fff770619?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> ## 参考文献

[掘金：小程序工程化实践（上篇）-- 手把手教你撸一个小程序 webpack 插件，一个例子带你熟悉 webpack 工作流程](https://juejin.im/post/5d00aa5e5188255a57151c8a#heading-11)
