/*
 环境变量，发布测试或者生产切换这个注释
*/
const WECHART_ENV = "test";
// const WECHART_ENV = 'qa';
// const WECHART_ENV = 'development';
// const WECHART_ENV = 'production';
let URL = {
    envName: WECHART_ENV,
    picURL: "",
    baseURL: "",
    appId: ""
};
switch (WECHART_ENV) {
    case "development":
        URL.picURL = "https://dev.com/"; // 仅为示例，并非真实的接口地址
        URL.baseURL = "https://dev/";
        URL.loginURL = "https://dev/";
        break;
    case "test":
        URL.picURL = "https://test/";
        URL.baseURL = "https://test/";
        URL.loginURL = "https://test/";
        break;
    case "qa":
        URL.picURL = "https://qa.xxx/";
        URL.baseURL = "https://qa/";
        URL.loginURL = "https://qa/";
        break;
    case "production":
        URL.picURL = "https://prod.xxx/";
        URL.baseURL = "https://prod/";
        URL.loginURL = "https://prod/";
        break;
}

module.exports = URL;
