---
title: 一篇博客
published: 2025-04-16
tags:
  - test
lang: zh
---



# 排版元素测试

## 文字格式
**粗体文本** *斜体文本* `行内代码` [链接示例](https://example.com)

## 列表样式

### 无序列表
- 列表项一
- 列表项二
  - 嵌套列表项

### 有序列表
1. 第一项
2. 第二项

## 代码块测试

```javascript
function helloWorld() {
  console.log('Hello World!');
}
```

## 数学公式支持
行内公式示例：$E = mc^2$

块级公式示例：
```math
\int_{a}^{b} x^2 dx
```

## 图片测试

![测试图片](/src/assets/1-dark.jpeg)
<small style="display:block;text-align:center">带说明文字的可缩放图片</small>

## 响应式表格

| 特性        | 支持状态   | 备注          |
| ----------- | ---------- | ------------- |
| 深色模式    | ✔️         | 自动/手动切换 |
| 数学公式    | ✔️         | KaTeX渲染     |
| 代码高亮    | ✔️         | Prisma主题    |