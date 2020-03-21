import request from "./request/index.js";

// 查询领券概率接口
export const test = () =>
    request({
        url: "test", //仅为示例，并非真实的接口地址
        method: "GET"
    });
