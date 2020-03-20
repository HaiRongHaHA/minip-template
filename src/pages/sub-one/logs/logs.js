//logs.js
Page({
    data: {
        logs: [],
        now: new Date().getTime()
    },
    onLoad: function() {
        this.setData({
            logs: (wx.getStorageSync("logs") || []).map(log => {
                return new Date(log);
            })
        });
    }
});
