let URL = {
    envName: process.env.NODE_ENV,
    picURL: "",
    baseURL: "",
    appId: ""
};
console.log(process.env);
switch (process.env.NODE_ENV) {
    case "development":
        URL.picURL = "https://zht-dev-nosec.oss-cn-beijing.aliyuncs.com/";
        // URL.picURL = 'https://zht-test-nosec.oss-cn-beijing.aliyuncs.com/'
        URL.baseURL = "https://custom.dev.ccbuluo.cn/agora";
        URL.loginURL = "https://custom.dev.ccbuluo.cn/member";
        URL.appId = "wx17f444ee74bc113d";
        // URL.baseURL = 'https://custom.dev.ccbuluo.cn/agora-baowei' //宝伟
        // URL.baseURL = 'https://custom.dev.ccbuluo.cn/agora-lizhao'; //照哥
        // URL.baseURL = 'http://custom.dev.ccbuluo.cn/agora-liuduo'; // 刘铎
        // URL.baseURL = 'http://custom.dev.ccbuluo.cn/agora-caoshuai'; // 巢帅
        break;
    case "test":
        URL.picURL = "https://zht-test-nosec.oss-cn-beijing.aliyuncs.com/";
        URL.baseURL = "https://custom.test.ccbuluo.cn/agora";
        // URL.baseURL = 'https://custom.test.ccbuluo.cn/agora-lizhao'; //照哥
        URL.loginURL = "https://custom.test.ccbuluo.cn/member";
        URL.appId = "wx17f444ee74bc113d"; //'wx633c3906da63d061';
        break;
    case "qa":
        URL.picURL = "https://zht-qa-nosec.oss-cn-beijing.aliyuncs.com/";
        URL.baseURL = "https://custom.qa.ccbuluo.cn/agora";
        URL.loginURL = "https://custom.qa.ccbuluo.cn/member";
        URL.appId = "wx17f444ee74bc113d"; //'wx633c3906da63d061';
        break;
    case "production":
        URL.picURL = "https://zht-prod-nosec.oss-cn-beijing.aliyuncs.com/";
        URL.baseURL = "https://custom.ccbuluo.com/agora";
        URL.loginURL = "https://custom.ccbuluo.com/member";
        URL.appId = "wx17f444ee74bc113d";
        break;
}

export default URL;
