# 🍳 菜谱 API - Cloudflare Workers

一个基于 Cloudflare Workers 的轻量级菜谱 API 服务，提供中式菜谱数据查询功能。

## ✨ 特性

- 🚀 基于 Cloudflare Workers，全球边缘计算
- 📱 RESTful API 设计，支持 CORS
- 🔍 支持菜谱搜索和分类筛选
- 💾 内存存储，快速响应
- 🌐 友好的 Web 界面和 API 文档
- 🆓 完全免费部署

## 🛠️ 快速开始

### 前置要求

- Node.js 16+ 
- npm 或 yarn
- Cloudflare 账户

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/yqq-a/recipe-api-worker2.git
cd recipe-api-worker2
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:8787` 查看 API 文档。

### 部署到 Cloudflare

1. 登录 Cloudflare
```bash
npx wrangler auth login
```

2. 部署到生产环境
```bash
npm run deploy
```

3. 部署到测试环境
```bash
npm run deploy:staging
```

## 📚 API 文档

### 基础信息

- **基础 URL**: `https://your-worker.your-subdomain.workers.dev`
- **响应格式**: JSON
- **支持 CORS**: 是

### 端点列表

#### 获取所有菜谱

```http
GET /api/recipes
```

**查询参数:**
- `category` (可选): 按分类筛选 (川菜, 家常菜, 面食等)
- `limit` (可选): 返回数量限制 (默认: 10)
- `offset` (可选): 偏移量 (默认: 0)

**示例:**
```bash
curl "https://your-worker.workers.dev/api/recipes?category=川菜&limit=5"
```

**响应:**
```json
{
  "success": true,
  "data": [...],
  "total": 3,
  "limit": 5,
  "offset": 0
}
```

#### 获取单个菜谱

```http
GET /api/recipes/{id}
```

**示例:**
```bash
curl "https://your-worker.workers.dev/api/recipes/1"
```

**响应:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "宫保鸡丁",
    "category": "川菜",
    "difficulty": "中等",
    "cookTime": "20分钟",
    "servings": 2,
    "ingredients": [...],
    "instructions": [...],
    "tags": [...]
  }
}
```

#### 搜索菜谱

```http
GET /api/recipes/search?q={关键词}
```

**示例:**
```bash
curl "https://your-worker.workers.dev/api/recipes/search?q=鸡"
```

#### 获取分类列表

```http
GET /api/categories
```

**响应:**
```json
{
  "success": true,
  "data": [
    {
      "name": "川菜",
      "count": 2
    },
    {
      "name": "家常菜",
      "count": 2
    }
  ]
}
```

## 🗂️ 项目结构

```
recipe-api-worker2/
├── src/
│   └── worker.js          # 主要的 Worker 代码
├── wrangler.toml          # Wrangler 配置文件
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🔧 自定义配置

### 添加新菜谱

在 `src/worker.js` 文件中的 `RECIPES` 数组里添加新的菜谱对象：

```javascript
{
  id: 6,
  name: "新菜名",
  category: "分类",
  difficulty: "难度",
  cookTime: "时间",
  servings: 人数,
  ingredients: ["配料1", "配料2"],
  instructions: ["步骤1", "步骤2"],
  tags: ["标签1", "标签2"]
}
```

### 自定义域名

在 `wrangler.toml` 中取消注释并配置路由：

```toml
routes = [
  "your-domain.com/api/*"
]
```

### 环境变量

可以在 `wrangler.toml` 中添加环境变量：

```toml
[vars]
API_KEY = "your-api-key"
ENVIRONMENT = "production"
```

## 📊 性能优化

- **缓存**: Cloudflare 自动提供边缘缓存
- **压缩**: 自动启用 Gzip/Brotli 压缩
- **CDN**: 全球边缘节点分发
- **冷启动**: Workers 几乎零冷启动时间

## 🚀 扩展功能

### 可能的增强功能

1. **持久化存储**: 使用 Cloudflare KV 存储菜谱数据
2. **用户评分**: 添加菜谱评分系统
3. **图片支持**: 集成 Cloudflare Images
4. **缓存优化**: 实现智能缓存策略
5. **用户管理**: 添加用户收藏功能

### KV 存储示例

```toml
# wrangler.toml
[[kv_namespaces]]
binding = "RECIPES_KV"
id = "your-kv-namespace-id"
preview_id = "your-preview-kv-namespace-id"
```

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：

- GitHub Issues
- Email: your-email@example.com

---

**享受编码和烹饪的乐趣！** 🎉