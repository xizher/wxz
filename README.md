# wxz

> JavaScript Extension From XizheWu

[TOC]

## git 提交格式规范
> <type>: <body>

- feat: 新功能
- fix: 修复bug
- docs: 文档
- style: 格式（不影响代码运行的变动）
- refactor: 重构
- test: 增加测试
- chore: 构建过程或辅助工具的变动

## src/js-utils

### CookieUtils

Cookie操作工具类，方法均为静态方法。

- `setCookie`：设置Cookie
- `delCookie`：删除Cookie
- `getCookie`：获取cookie

### CryptoUtils

字符串加密解密工具类，方法均为静态方法。

- `setKey`：设置key值
- `setIv`：设置iv值
- `enCrypto`：加密
- `deCrypto`：解密

```javascript
/* example */
CryptoUtils.setKey('').setIv('') // config crypto
```

### BaseUtils

基础工具类，方法均为静态方法

- `deepCopyJSON`：对象深拷贝（利用JSON的特性）
- `deepCopy`：对象深拷贝（递归式）
- `guid`：获取GUID字符串
- `getRootPath`：获取当前页面的根地址
- `randomRange`：获取指定范围随机整数
- `getGeoLocation`：获取当前定位
- `watchGeoLocation`：启动定位监听
- `isFromMobileBrowser`：判断网页是否通过移动端设备打开
- `deepExtent`：对象扩展
- `copyText`：复制文本

