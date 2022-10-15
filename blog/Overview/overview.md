---
title: '为什么要开发这样一个文档平台？'
authors: [yudong]
tags: [markdown, mdx, docusaurus, blog, documentation]
---

### 解决什么问题？

1. 更好的编辑与阅读体验
2. 完全可定制
3. 移动端阅读
4. 基于 Git 的文档跟踪，没有数据库可确保数据不丢失
5. 可通过 Conflence API 将 markdown/mdx 内容同步至 Conflence，即作为 Conflence 的补充
6. 可基于 API 自动收集与整理内容，比如内嵌基于后端代码自动生成的 Open API JSON 生成优雅的接口文档，可利用 GitHub API 获取分析出知名、流行的开源库，供团队学习和技术选型提供参考
7. 挖掘沉淀有价值的技术和业务内容，包括业务总结、团队 API 文档、实用的原创或收集的代码片段、技术博客、开源软件 & 工具挖掘与选型、技术资讯等

### 怎么用？

1. `git clone <repository>` 下载源代码
   :::caution
   需要先安装 Node.js 环境
   :::
2. `cd kunlun-universal && pnpm i` 进入仓库安装依赖
   :::info
   本仓库基于 pnpm workspace 做依赖管理
   :::
3. `pnpm start` 本地启动 open [http://localhost:3000](http://localhost:3000)
4. `git add . && git commit -m "docs: add docs" && git push` 提交代码
   :::tip
   git commit message 需符合 verify-commit-msg.js 中所定义的规范
   :::

### 现在有哪些功能？

-   [x] 支持所有 [markdown](https://markdown.com.cn/basic-syntax/) 语法，详见 [Markdown Guide](https://www.markdownguide.org/)
-   [x] 支持所有 [mdx](https://mdxjs.com/) 语法
-   [x] 本地搜索
-   [x] 文档版本管理
-   [x] 主题切换
-   [x] 国际化
-   [x] 适配手机浏览器
-   [x] 扩展实现 Code Block

    1. 代码高亮

    ````
    ```js
    var s = 'JavaScript syntax highlighting'
    alert(s)
    ```
    ````

    显示效果如下

    ```js
    var s = 'JavaScript syntax highlighting'
    alert(s)
    ```

    2.  指定行代码高亮

    ````
    ```js {2}
    function highlightMe() {
      console.log('This line can be highlighted!');
    }
    ```
    ````

    显示效果如下

    ```js {2}
    function highlightMe() {
        console.log('This line can be highlighted!')
    }
    ```

    3.  支持加载其它位置代码文件（本地则必须位于 static 目录下）或完整 GitHub

    **自定义标题**

    ````
    ```py reference title="自定义标题"
    /python/length.py
    ```
    ````

    显示效果如下

    ```py reference title="自定义标题"
    /python/length.py
    ```

    ***

    **默认使用文件路径作为标题**

    ````
    ```py reference
    /python/length.py
    ```
    ````

    显示效果如下

    ```py reference
    /python/length.py
    ```

    ***

    **无标题**

    ````
    ```py reference notitle
    /python/length.py
    ```
    ````

    显示效果如下

    ```py reference notitle
    /python/length.py
    ```

    4.  自定义代码高亮样式  
        You can write JSX and use React components within your Markdown thanks to [MDX](https://mdxjs.com/).

    ```
    export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>{children}</span> );

     <Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

     I can write **Markdown** alongside my _JSX_!
    ```

    显示效果如下

export const Highlight = ({children, color}) => ( <span style={{
  backgroundColor: color,
  borderRadius: '2px',
  color: '#fff',
  padding: '0.2rem',
}}>{children}</span> );

<Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

I can write **Markdown** alongside my _JSX_!

### 有什么规划？

-   可以收藏、点赞
-   可以批注
-   接入 [PBAuth](./)
-   可在线新建/编辑文档，无需通过 `git` 提交
-   增加对 `TypeScript`/`Python` playground 的支持
-   待补充...

### 还存在哪些问题？
