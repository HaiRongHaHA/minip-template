import Timer from "@/common/Timer";
import { test } from "@/apis/base.js";

Page({
    data: {
        getSecond: 0,
        countDownUI: [],
        initCountDown: [5467688, 98875, 5800, 12345556, 9800, 432150]
    },
    onLoad() {
        this.initCountDown();
    },
    initCountDown() {
        this.data.initCountDown.map((item, index) => {
            const timer = new Timer();
            timer.setOptions({
                time: item,
                endTime: 0,
                intervalFn: EndTime => {
                    let hours = Math.floor((EndTime / 1000 / 60 / 60) % 24),
                        minute = Math.floor((EndTime / 1000 / 60) % 60),
                        second = Math.floor((EndTime / 1000) % 60);
                    let str = `${hours}时${minute}分${second}秒`;
                    this.setData({
                        [`countDownUI[${index}]`]: str
                    });
                },
                endFn: () => {
                    this.setData({
                        [`countDownUI[${index}]`]: null,
                        [`initCountDown[${index}]`]: null
                    });
                }
            });
            timer.start();
        });
    },
    openCountDown() {
        const timer = new Timer();
        timer.setOptions({
            time: 60000,
            intervalFn: remainingTime => {
                this.setData({
                    getSecond: Math.round(remainingTime / 1000)
                });
            },
            endFn: () => {
                this.setData({
                    getSecond: 0
                });
            }
        });
        timer.start();
    }
});
