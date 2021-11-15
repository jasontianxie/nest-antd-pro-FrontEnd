// @ts-ignore
/* eslint-disable */
import { request } from './axios';

/** 获取当前的用户 GET /api/user/profile */
export async function currentUser(options?: { [key: string]: any }) {
  return request({
    url: '/user/profile',
    method: 'get',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
// export async function getNotices(options?: { [key: string]: any }) {
//   return request('/api/notices', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
