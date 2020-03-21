// 身份证正则
export const idCardReg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X|x)$/;

// 邮箱正则
export const emailReg = /^\w+((-\w+)|(.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

// 姓名正则(包含译名带·符号的)
export const nameReg = /^[\u4e00-\u9fa5]{2,10}(·[\u4e00-\u9fa5]{2,10}){0,2}$/;

//手机号正则
export const phoneReg = /^1[3456789]\d{9}$/;
