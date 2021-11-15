// @ts-ignore
/* eslint-disable */
import { request } from './axios';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFakeCaptchaParams & {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request({
    method: 'get',
    url: '/login/captcha',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登出接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request({
    method: 'post',
    url: '/login/outLogin',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request({
    method: 'post',
    url: '/auth/login',
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
