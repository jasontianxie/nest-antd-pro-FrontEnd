import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, message, Input } from 'antd';
import { marked } from 'marked';
import hljs from 'highlight.js';
import styles from './index.less';
import 'highlight.js/styles/atom-one-dark.css';
import type { IRouteComponentProps } from 'umi';
import { useModel } from 'umi';
import { updateArticle } from '@/services/ant-design-pro/articles';
import { getArticles } from '@/services/ant-design-pro/articles';
import { IArticle } from '@/pages/ArticleList/types';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const NewArticle: React.FC<IRouteComponentProps<{ id: string }, {}>> = (props) => {
  // IRouteComponentProps泛型参数的第一个是params的参数，第二个是query的参数
  const {
    match: {
      params: { id },
    },
  } = props;
  const [markdownText, setMarkdownText] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  useEffect(() => {
    if (id) {
      getArticles<IArticle>({
        url: `/article/${id}`,
      }).then(({ code, data }) => {
        if (code === 0) {
          setArticleTitle(data.articleTitle);
          setMarkdownText(data.article);
        } else {
          message.error('get article detail failed');
        }
      });
    }
  }, [id]);

  return (
    <PageContainer
      header={{
        title: id ? 'Edit Article' : 'Create New Article',
      }}
      footer={[
        <Button
          key="2"
          type="primary"
          onClick={async () => {
            if (articleTitle === '') {
              message.error('please input article title');
              return;
            }
            const { code } = await updateArticle<{ id: number }>({
              data: {
                id: id && Number(id),
                userId: currentUser?.uid,
                article: markdownText,
                articleTitle: articleTitle,
              },
            });
            if (code === 0) {
              message.success(id ? 'update successfully' : 'create successfully');
            } else {
              message.error(id ? 'update failed' : 'create failed');
            }
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Card>
        <div className={styles.title}>
          <Input
            value={articleTitle}
            placeholder="please input article title"
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>
        <div className={styles.wrap}>
          <div className={styles.textWrap}>
            <h3 className={styles.textTitle}>
              input{' '}
              <a target="_blank" href="https://www.markdownguide.org/basic-syntax/">
                markdown
              </a>{' '}
              text here:
            </h3>
            <textarea
              value={markdownText}
              className={styles.textarea}
              onChange={(e) => {
                setMarkdownText(e.target.value);
              }}
            />
          </div>
          <div className={styles.previewWrap}>
            <h3 className={styles.textTitle}>this is markdown preview:</h3>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: marked.parse(markdownText) }}
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default NewArticle;
