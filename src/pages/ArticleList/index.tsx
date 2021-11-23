import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, message, List, Popconfirm } from 'antd';
import { marked } from 'marked';
import hljs from 'highlight.js';
import styles from './index.less';
import 'highlight.js/styles/atom-one-dark.css';
import type { IRouteComponentProps } from 'umi';
import { getArticles, deleteArticle } from '@/services/ant-design-pro/articles';
import type { IArticle } from '@/pages/ArticleList/types';
import moment from 'moment';

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
  const [currentArticle, setCurrentArticle] = useState<IArticle>();
  const [articles, setArticles] = useState<IArticle[]>([]);

  const getSingularArticle = () => {
    getArticles<IArticle>({
      url: `/article/${id}`,
    }).then(({ code, data }) => {
      if (code === 0) {
        setCurrentArticle(data);
      } else {
        message.error('get article detail failed');
      }
    });
  };

  const getAllArticles = () => {
    getArticles<IArticle[]>({
      url: '/article/all',
    }).then(({ code, data }) => {
      if (code === 0) {
        setArticles(data);
      } else {
        message.error('get article list failed');
      }
    });
  };

  const removeArticle = (articleId: number) => {
    deleteArticle({ url: `/article/${articleId}` }).then(({ code }) => {
      if (code === 0) {
        message.success('delete success');
        getAllArticles();
      } else {
        message.error('delete fail');
      }
    });
  };

  useEffect(() => {
    if (id) {
      getSingularArticle();
    } else {
      getAllArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageContainer
      header={{
        title: id ? 'Article Detail' : 'Article List',
      }}
    >
      {id ? (
        <Card>
          <h1 className={styles.title}>{currentArticle && currentArticle.articleTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(currentArticle?.article || '') }} />
        </Card>
      ) : (
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={articles}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    key="list-article-edit"
                    onClick={() => props.history.push(`/manageArticle/${item.id}`)}
                  >
                    edit
                  </a>,
                  <Popconfirm
                    placement="top"
                    title={'are you sure?'}
                    onConfirm={() => removeArticle(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a key="list-article-delete">delete</a>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a onClick={() => props.history.push(`/articleList/${item.id}`)}>
                      {item.articleTitle}
                    </a>
                  }
                  description={`create at: ${moment(item.createDt).format(
                    'YYYY-MM-DD HH:mm',
                  )}, update at: ${moment(item.updateDt).format('YYYY-MM-DD HH:mm')}`}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default NewArticle;
