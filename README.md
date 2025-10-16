# 北京商会移动端发布展示系统

本项目提供一个适配移动端的北京商会展示前端，以及完整的内容管理后台。仓库分为 `backend` 与 `frontend` 两个子项目，可分别独立启动。

## 功能概览

- **后台 API（Node.js + Express + SQLite）**
  - 内容分区（sections）与列表型资源（collections）的通用化管理。
  - 提供创建、更新、删除与查询接口，方便后台系统或管理端集成。
  - 内置数据库迁移与演示数据脚本，开箱即可快速体验。
  - 默认启用 CORS、Helmet、JSON 限流等基础安全配置。

- **前端应用（Vite + React）**
  - 参考原型设计实现的移动优先布局，支持主流移动端屏幕。
  - 动态从后台拉取商会亮点、新闻快讯、活动日程、会员风采与联系方式。
  - 采用响应式栅格、粘性导航、按钮状态等增强交互体验。

## 快速开始

### 1. 启动后台

```bash
cd backend
cp .env.example .env   # 如需自定义端口或 CORS，编辑 .env
npm install
npm run migrate        # 初始化 SQLite 数据库
npm run seed           # （可选）导入演示数据
npm run dev            # 或 npm start
```

默认后台监听在 `http://localhost:4000`，主要接口包括：

- `GET /api/health`：健康检查。
- `GET /api/sections`、`GET /api/sections/:key`、`PUT /api/sections/:key`
- `GET/POST/PUT/DELETE /api/collections/:collection`

### 2. 启动前端

```bash
cd frontend
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`，并通过 Vite 代理将 `/api` 请求转发到后台。如果后台地址不同，可在 `.env` 中设置：

```bash
VITE_API_BASE_URL=http://your-api-host:4000
```

### 3. 构建与部署

- 前端：`npm run build` 会生成 `dist/`，可部署到任意静态资源服务器。
- 后台：将 `backend` 目录部署到支持 Node.js 的环境即可，确保持久化目录 `backend/data` 可写。

## 目录结构

```
backend/
  src/app.js           # Express 应用入口
  src/routes/          # sections 与 collections 路由
  src/scripts/         # 数据库迁移与演示数据脚本
  data/                # SQLite 数据库存储位置
frontend/
  src/                 # React 组件与样式
  vite.config.js       # Vite 配置（含 API 代理）
```

## 下一步建议

- 扩展后台为实际的管理界面（例如结合 React Admin 或自研 CMS）。
- 为 API 增加身份认证（JWT、OAuth 等）以保护管理接口。
- 接入对象存储或 CDN 管理多媒体资源。
- 对接推送服务，实现活动发布的即时通知。

欢迎根据业务需求进一步扩展本项目。
