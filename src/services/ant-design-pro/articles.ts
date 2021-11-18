// @ts-ignore
/* eslint-disable */
import { request } from './axios';
import { message } from 'antd';

/** 新增或编辑文章 POST /api/article */
export async function updateArticle(options?: { [key: string]: any }) {
  return request<{ id: number; content: string }>({
    method: 'post',
    url: '/article/update',
    ...(options || {}),
  }).then((res) => {
    if (res.code === 403) {
      message.error('need authorization');
      return false;
    } else {
      return res;
    }
  });
}

/** 删除文章 DELETE /api/article */
export async function deleteArticle(options?: { [key: string]: any }) {
  return request({
    method: 'delete',
    url: '/article/delete',
    ...(options || {}),
  });
}

/** 获取文章列表 GET /api/articles */
export async function getArticles(options?: { [key: string]: any }) {
  return request({
    method: 'get',
    url: '/article/list',
    ...(options || {}),
  });
}
