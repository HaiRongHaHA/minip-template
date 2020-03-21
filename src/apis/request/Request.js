const App = getApp();
const InterceptorManager = require('./InterceptorManager');

class Request {
    constructor(options) {
        this.options = options || {};
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
    }

    static defaults = {
        method: 'GET',
        type: 'json',
        baseURL: ''
    };

    /**
     * 获取请求options
     */
    getOptions(config) {
        const valueFromConfig2Keys = [
            'url',
            'method',
            'data',
            'header',
            'type',
            'baseURL'
        ];

        if (typeof config === 'string') {
            config = arguments[1] || {};
            config.url = arguments[0];
        } else {
            config = config || {};
        }

        valueFromConfig2Keys.forEach(prop => {
            if (prop === 'header') {
                this.options[prop] = {
                    ...Request.defaults[prop],
                    ...this.options[prop],
                    ...config[prop]
                };
            } else {
                this.options[prop] =
                    config[prop] !== undefined
                        ? config[prop]
                        : this.options[prop] !== undefined
                        ? this.options[prop]
                        : Request.defaults[prop];
            }
        });
    }

    dispatchRequest = options => {
        let { url, header, method, data, baseURL } = options;
        return new Promise((resolve, reject) => {
            this.RequestTask = wx.request({
                url: baseURL + url,
                data,
                header,
                method,
                success: res => {
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    };

    /**
     * 网络请求
     */
    request = config => {
        this.getOptions(config);

        const chain = [this.dispatchRequest, undefined]; //请求数据处理队列
        let promise = Promise.resolve(this.options);
        this.interceptors.request.forEach(function unshiftRequestInterceptors(
            interceptor
        ) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        this.interceptors.response.forEach(function pushResponseInterceptors(
            interceptor
        ) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
    };
}

export default Request;
