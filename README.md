# PasteQ 网站

https://pasteq.iofree.xyz/


此仓库包含 PasteQ Mac 应用程序的官方网站，使用 VitePress 构建。

## 快速开始

要本地设置和运行项目，请按照以下步骤操作：

### 先决条件

*   Node.js (版本 18.0.0 或更高)
*   npm (Node Package Manager)

### 安装

1.  克隆仓库：
    ```bash
    git clone https://github.com/iofree/pasteQ-site.git # 如果实际仓库地址不同，请替换
    cd pasteQ-site
    ```
2.  安装依赖：
    ```bash
    npm install
    ```

### 开发

启动开发服务器：

```bash
npm run dev
```

这将在 `http://localhost:5173`（或另一个可用端口）提供文档站点。

### 构建

构建生产环境的静态站点：

```bash
npm run build
```

生成的静态文件将位于 `docs/.vitepress/dist`。

### 预览

本地预览构建好的站点：

```bash
npm run preview
```

### 项目结构

文档内容位于 `docs/` 目录中。它支持多种语言，其中英文内容在 `docs/en/` 下，中文内容在 `docs/guide/` 下（或直接在 `docs/` 下作为默认语言）。
