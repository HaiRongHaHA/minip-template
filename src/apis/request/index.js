import Request from "./Request.js";

Request.defaults.baseURL = getApp().globalData.baseURL;

const request = (options = {}) => {
    /*
     * 设置选项
     */
    const setOptions = () => {
        let { type = "json", header = {} } = options;
        let jwtToken = wx.getStorageSync("jwtToken");
        let defaultHeader = {
            jwtToken: jwtToken
        };
        if (type === "form") {
            defaultHeader["content-type"] = "application/x-www-form-urlencoded";
        } else {
            defaultHeader["content-type"] = "application/json";
        }
        return { ...defaultHeader, ...header };
    };

    options.header = setOptions();

    const request = new Request(options);

    /**
     * 设置统一的异常处理
     */
    const errorHandler = message => {
        if (message.errMsg === "request:fail timeout") {
            getApp().showToast("请求超时！");
        } else if (message.errMsg === "request:fail ") {
            getApp().showToast("请检查您的网络！");
        }
        return Promise.reject(message);
    };

    /**
     * 判断接口响应状态
     */
    const successHandler = res => {
        return new Promise((resolve, reject) => {
            if (res.data.code === "1") {
                resolve(res);
            } else if (
                res.data.code === "400006" ||
                res.data.code === "999999" ||
                res.data.code === "20011" ||
                res.data.code === "0"
            ) {
                getApp().showToast(res.data.message);
                reject(res.data.message);
            }
        });
    };

    // 全局处理接口响应
    request.interceptors.response.use(successHandler, errorHandler);

    // 请求拦截器
    request.interceptors.request.use(data => {
        console.log(data, "data");
        return data;
    });

    // 响应拦截器
    request.interceptors.response.use(
        response => {
            return response;
        },
        err => {
            throw err;
        }
    );

    return request.request();
};
export default request;
