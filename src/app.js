import ENV from "./env.js";
import * as Global from "@/common/global.js";

App({
    globalData: {
        picURL: ENV.picURL, // 图片路径
        baseURL: ENV.baseURL, // 业务接口路径
        loginURL: ENV.loginURL, // 登录接口路径
        appId: "wx000000000000000", // 仅为示例，并非真实appId
        systemConfig: null // 设备信息
    },
    onLaunch() {
        // 获取设备信息
        this.globalData.systemConfig = Global.setSystemInfo();
    },
    onShow() {
        Global.UpdateManager(); // 检查包更新
    },
    showToast: Global.showToast,
    showLoading: Global.showLoading,
    refresh: Global.refresh
});
