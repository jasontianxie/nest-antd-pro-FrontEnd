import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { marked } from 'marked';
import hljs from 'highlight.js';
import styles from './index.less';
import 'highlight.js/styles/atom-one-dark.css';

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

const NewArticle: React.FC = () => {
  const [markdownText, setMarkdownText] = useState('');
  return (
    <PageContainer>
      <Card>
        <div className={styles.wrap}>
          <div className={styles.textWrap}>
            <h3>input markdown text here</h3>
            {/* <div
              className={styles.textarea}
              contentEditable="true"
              onChange={(e: any) => setMarkdownText(e.target.value)}
            ></div> */}
            <textarea
              className={styles.textarea}
              onChange={(e: any) => setMarkdownText(e.target.value)}
            />
          </div>
          <div className={styles.previewWrap}>
            <h3>this is markdown preview</h3>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: marked.parse(markdownText) }}
            ></div>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default NewArticle;
