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

## src/js-ext

扩展原型对象

```javascript
/* example: 日期转模板字符串 */
$ext(new Date()).format('yyyy-MM-dd hh-mm-ss')
```

### Date 日期对象扩展

- `format`：日期格式化
- `getNextDate`：获取下一个增量日数的日期对象
- `getMonth`：获取日期对象的月份

### String 字符串对象扩展

- `contain`：检查字符串是否包含在给定字符串数组内
- `trimAll`：获取无空格状态的字符串
- `replaceAll`：替换所有符串查询的字符串，并返回替换后结果

### Number 数字对象扩展

- `floor`：向下取整
- `ceil`：向上取整
- `abs`：绝对值
- `round`：保留小数位
- `toDateFormat`：数字转日期字符串
- `toCashString`：数字转现金字符串
- `toChineseString`：数字转中文数字

### Array 数组对象扩展

- `insert`：插入
- `remove`：移除
- `clear`：清空
- `reset`：重置
- `removeValue`：移除值
- `unique`：去重
- `getUnique`：获取唯一值
- `equal`：是否相等
- `findItem`：寻找所有符合要求的对象数组子集
- `findItems`：寻找符合要求的第一个对象数组子集
- `propToArr`：提取对象数组属性
- `sum`：获取数字数组值总和
- `last`：获取数组的最后一位对象
- `max`：获取数字数组最大值
- `min`：获取数字数组最小值
- `ave`：获取数字数组平均值

## src/listener

监听器

- `on`：绑定事件
- `fire`：触发事件
- `off`：取消特定的绑定事件
- `once`：绑定一次性事件

## src/comparator

比较器

- `equal`：两者是否等于
- `lessThan`：前者是否小于后者
- `greaterThan`：前者是否大于后者
- `lessThanOrEqual`：前者是否小于等于后者
- `greaterThanOrEqual`：前者是否大于等于后者
- `reverse`：反转比较

## src/data-structure

数据结构集成

### LinkedList

单链表

- **get** `length`：链表结点数
- `getAt`：获取指定位置索引上的结点
- `append`：在链表尾部添加结点
- `toString`：链表转字符串
- `toArray`：链表转数组
- `insert`：在指定位置插入结点
- `removeAt`：移除指定位置的结点
- `remove`：移除指定结点值的第一的结点
- `removeAll`：移除指定结点值的所有结点
- `indexOf`：查找指定结点值的位置
- `clear`：清空链表结点
- `isEmpty`：是否为空链表

