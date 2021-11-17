## 清除 cookie

```js
function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
  }
}
```

## 写 cookie

```js
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name + '=' + escape(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
}
```

## 读取 cookies

```js
//读取cookies
function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

  if ((arr = document.cookie.match(reg))) return arr[2];
  else return null;
}
```

-- 作者：jasontianxie

链接：[https://www.baidu.com](https://www.baidu.com)

来源：[博客](https://www.baidu.com)

本文原创版权属于刘伟波 ，转载请注明出处，谢谢合作
