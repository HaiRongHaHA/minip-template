// 自动消失提示框封装
export const showToast = function(tname, icon) {
    wx.showToast({
        title: tname,
        icon: icon || "none"
    });
};
// loading框封装
export const showLoading = function(title) {
    wx.showLoading({
        title: title,
        mask: true
    });
};

//刷新当前页面
export const refresh = function() {
    let pagesLenth = getCurrentPages().length;
    let currentPage = getCurrentPages()[pagesLenth - 1];
    if (pagesLenth !== 0) {
        currentPage.onLoad(currentPage.options);
        currentPage.onShow();
    }
};

// 设置设备信息
export const setSystemInfo = function() {
    let systemConfig = {
        pixelRate: 0.5, //px与rpx换算关系
        platform: "ios", //操作平台 用于适配胶囊高度
        capsuleHeight: 40, //胶囊高度
        statusBarHeight: 20, //手机顶部状态栏高度
        titleHeight: 136, //整个导航头高度
        systemHeight: 0, //手机屏幕高度
        systemWidth: 0, //手机屏幕宽度
        isAllScreen: false, //是否是全面屏手机
        isHighHead: false //是否是刘海屏手机
    };
    wx.getSystemInfo({
        success: function(res) {
            let capsuleHeight = 40; //临时变量，计算titleHeight时用
            systemConfig.platform = res.platform;
            systemConfig.pixelRate = Number((res.windowWidth / 750).toFixed(2));
            systemConfig.statusBarHeight =
                res.statusBarHeight / systemConfig.pixelRate;
            systemConfig.systemHeight = res.windowHeight;
            systemConfig.systemWidth = res.windowWidth;
            const platform = res.platform.toLowerCase();
            if (platform.includes("devtools")) {
                capsuleHeight = 44;
                systemConfig.capsuleHeight = 44 / systemConfig.pixelRate;
            }
            if (platform.includes("ios")) {
                capsuleHeight = 40;
                systemConfig.capsuleHeight = 40 / systemConfig.pixelRate;
            }
            if (platform.includes("android")) {
                capsuleHeight = 48;
                systemConfig.capsuleHeight = 48 / systemConfig.pixelRate;
            }
            systemConfig.titleHeight =
                (capsuleHeight + res.statusBarHeight) / systemConfig.pixelRate;
            if (res.statusBarHeight >= 44) systemConfig.isHighHead = true;
            if (res.windowHeight > 750) systemConfig.isAllScreen = true;
        },
        failure(res) {
            getApp().showToast("获取设备信息失败", "none");
        }
    });
    return systemConfig;
};

// 小程序版本更新检查
export const UpdateManager = function() {
    // 获取小程序更新机制兼容
    if (wx.canIUse("getUpdateManager")) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate();
                            }
                        }
                    });
                });
                updateManager.onUpdateFailed(function() {
                    // 新的版本下载失败
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content:
                            "新版本已经上线啦~，请您删除当前小程序，重新打开哟~"
                    });
                });
            }
        });
    } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
            title: "提示",
            content:
                "当前微信版本过低，无法使用更新功能，请升级到最新微信版本后重试。"
        });
    }
};
