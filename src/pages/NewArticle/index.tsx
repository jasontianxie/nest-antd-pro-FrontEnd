import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { marked } from 'marked';
import hljs from 'highlight.js';
import styles from './index.less';
import 'highlight.js/styles/atom-one-dark.css';

const text = window.atob(
  'IyMgY2xlYXIgY29va2llCgpgYGBqcwpmdW5jdGlvbiBjbGVhckFsbENvb2tpZSgpIHsKICB2YXIga2V5cyA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvW14gPTtdKyg/PVw9KS9nKTsKICBpZiAoa2V5cykgewogICAgZm9yICh2YXIgaSA9IGtleXMubGVuZ3RoOyBpLS07ICkKICAgICAgZG9jdW1lbnQuY29va2llID0ga2V5c1tpXSArICc9MDtleHBpcmVzPScgKyBuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpOwogIH0KfQpgYGAKCiMjIHdyaXRlIGNvb2tpZQoKYGBganMKZnVuY3Rpb24gc2V0Q29va2llKGNfbmFtZSwgdmFsdWUsIGV4cGlyZWRheXMpIHsKICB2YXIgZXhkYXRlID0gbmV3IERhdGUoKTsKICBleGRhdGUuc2V0RGF0ZShleGRhdGUuZ2V0RGF0ZSgpICsgZXhwaXJlZGF5cyk7CiAgZG9jdW1lbnQuY29va2llID0KICAgIGNfbmFtZSArICc9JyArIGVzY2FwZSh2YWx1ZSkgKyAoZXhwaXJlZGF5cyA9PSBudWxsID8gJycgOiAnO2V4cGlyZXM9JyArIGV4ZGF0ZS50b0dNVFN0cmluZygpKTsKfQpgYGAKCiMjIHJlYWQgY29va2llcwoKYGBganMKLy9yZWFkIGNvb2tpZXMKZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHsKICB2YXIgYXJyLAogICAgcmVnID0gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICc9KFteO10qKSg7fCQpJyk7CgogIGlmICgoYXJyID0gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlZykpKSByZXR1cm4gYXJyWzJdOwogIGVsc2UgcmV0dXJuIG51bGw7Cn0KYGBgCgotLSBhdXRob3I6amFzb250aWFueGllCgpsaW5rczpbaHR0cHM6Ly93d3cuYmFpZHUuY29tXShodHRwczovL3d3dy5iYWlkdS5jb20pCgpzb3VyY2U6W2JhaWR1XShodHRwczovL3d3dy5iYWlkdS5jb20pCgoKIVtpbWddKGh0dHBzOi8vd3d3LmJhaWR1LmNvbS9pbWcvZmxleGlibGUvbG9nby9wYy9yZXN1bHQucG5nKQ==',
);

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
  const [markdownText, setMarkdownText] = useState(text);
  return (
    <PageContainer>
      <Card>
        <div className={styles.wrap}>
          <div className={styles.textWrap}>
            <h3 className={styles.textTitle}>input markdown text here:</h3>
            {/* <div
              className={styles.textarea}
              contentEditable="true"
              onChange={(e: any) => setMarkdownText(e.target.value)}
            ></div> */}
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
            ></div>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default NewArticle;
