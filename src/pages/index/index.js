import { test } from "@/apis/base.js";
import Timer from "@/common/Timer";

Page({
    data: {
        now: new Date().getTime(),
        userInfo: null
    },
    onLoad() {
        // 示例
        test()
            .then(({ data }) => {
                // do something
            })
            .catch(err => {
                // do something
            });
    },
    // 获取用户信息
    getUserInfo(e) {
        this.setData({
            userInfo: e.detail.userInfo
        });
    },
    //事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: "/pages/sub-one/timer/timer"
        });
    }
});
