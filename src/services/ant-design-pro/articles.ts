// @ts-ignore
/* eslint-disable */
import { request } from './axios';

/** 新增或编辑文章 POST /api/article */
export async function updateArticle<T>(options?: { [key: string]: any }) {
  return request<T>({
    method: 'post',
    url: '/article/update',
    ...(options || {}),
  });
}

/** 删除文章 DELETE /api/article */
export async function deleteArticle(options?: { [key: string]: any }) {
  return request({
    method: 'delete',
    ...(options || {}),
  });
}

/** 获取文章列表 GET /api/articles */
export async function getArticles<T>(options?: { [key: string]: any }) {
  return request<T>({
    method: 'get',
    ...(options || {}),
  });
}
