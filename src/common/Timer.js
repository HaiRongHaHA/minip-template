export default class Timer {
    constructor(options) {
        options && this.setOptions(options);
    }
    // 事件队列
    static queue = [];
    // 异步队列标志位
    static timerFlag = null;
    // 检查事件队列
    static checkQueue() {
        const queue = Timer.queue;
        if (queue.length > 0) {
            Timer.timerFlag === null && Timer.startQueue();
        } else {
            Timer.stopQueue();
        }
    }
    // 开始队列循环
    static startQueue() {
        Timer.timerFlag = setInterval(() => {
            Timer.queue.forEach(that => {
                let { intervalFn, checkCallBack } = that;
                checkCallBack.call(that) &&
                    intervalFn &&
                    intervalFn(that.endTime - that.beginTime);
            });
        }, 16);
    }
    // 停止队列循环
    static stopQueue() {
        clearInterval(Timer.timerFlag);
        Timer.timerFlag = null;
    }
    setOptions(options) {
        this.time = options.time || this.time; // 倒计时时长
        this.beginTime = options.beginTime || this.beginTime; // 开始时间
        this.interval = options.interval || this.interval || 1000; // 回调执行间隔时间(毫秒)
        this.endTime = options.endTime || this.endTime; // 结束时间
        this.intervalFn = options.intervalFn || this.intervalFn; // 需要执行的回调函数
        this.endFn = options.endFn || this.endFn; // 倒计时结束时执行的回调函数
    }
    // 加入队列
    joinQueue() {
        let index = Timer.queue.indexOf(this);
        if (index === -1) {
            Timer.queue.push(this);
            Timer.checkQueue();
        }
    }
    // 移出队列
    leavaQueue() {
        let index = Timer.queue.indexOf(this);
        if (index !== -1) {
            Timer.queue.splice(index, 1);
            Timer.checkQueue();
        }
    }
    // 校验是否执行回调函数
    checkCallBack() {
        let nowTime = new Date().getTime();
        // 到达结束时间后移除队列
        if (nowTime >= this.endTime) {
            this.leavaQueue();
            this.endFn && this.endFn();
            return false;
        } else if (nowTime - this.beginTime >= this.interval) {
            this.beginTime = nowTime;
            return true;
        } else {
            return false;
        }
    }
    start() {
        const time = parseFloat(this.time);
        if (!isNaN(time)) {
            this.beginTime = new Date().getTime();
            this.endTime = this.beginTime + time;
            this.joinQueue();
        }
    }
    stop() {
        this.leavaQueue();
    }
}
