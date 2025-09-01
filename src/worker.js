// 菜谱数据
const RECIPES = [
  {
    id: 1,
    name: "宫保鸡丁",
    category: "川菜",
    difficulty: "中等",
    cookTime: "20分钟",
    servings: 2,
    ingredients: [
      "鸡胸肉 300g",
      "花生米 50g", 
      "干辣椒 6-8个",
      "花椒 1小勺",
      "大葱 1根",
      "生姜 1块",
      "大蒜 3瓣",
      "生抽 2勺",
      "老抽 1勺",
      "料酒 1勺",
      "糖 1勺",
      "盐 适量",
      "淀粉 1勺",
      "食用油 适量"
    ],
    instructions: [
      "鸡胸肉切丁，用料酒、生抽、淀粉腌制15分钟",
      "花生米过油炸至金黄，捞出备用",
      "热锅下油，下鸡丁炒至变色盛起",
      "锅内留少许油，下干辣椒和花椒炒香",
      "下葱姜蒜爆香，倒入鸡丁",
      "调入生抽、老抽、糖炒匀",
      "最后加入花生米炒匀即可"
    ],
    tags: ["下饭菜", "经典菜", "辣味"]
  },
  {
    id: 2,
    name: "红烧肉",
    category: "家常菜",
    difficulty: "中等",
    cookTime: "60分钟",
    servings: 4,
    ingredients: [
      "五花肉 500g",
      "生抽 3勺",
      "老抽 2勺",
      "料酒 2勺",
      "冰糖 30g",
      "八角 2个",
      "桂皮 1小块",
      "香叶 2片",
      "生姜 3片",
      "大葱 1段",
      "盐 适量"
    ],
    instructions: [
      "五花肉切块，冷水下锅焯水去腥",
      "热锅下少许油，放入冰糖炒糖色",
      "糖色炒至焦糖色时，下肉块翻炒上色",
      "加入生抽、老抽、料酒炒匀",
      "加入热水没过肉块，放入香料",
      "大火烧开转小火炖45分钟",
      "最后大火收汁即可"
    ],
    tags: ["经典菜", "下饭菜", "家常菜"]
  },
  {
    id: 3,
    name: "麻婆豆腐",
    category: "川菜",
    difficulty: "简单",
    cookTime: "15分钟", 
    servings: 2,
    ingredients: [
      "嫩豆腐 1盒",
      "猪肉末 100g",
      "郫县豆瓣酱 2勺",
      "生抽 1勺",
      "花椒粉 1勺",
      "大蒜 2瓣",
      "生姜 1小块",
      "韭黄 2根",
      "淀粉 1勺",
      "高汤 适量"
    ],
    instructions: [
      "豆腐切块，用盐水焯一下",
      "热锅下油，炒香肉末",
      "加入豆瓣酱炒出红油",
      "下蒜蓉姜末爆香",
      "加入高汤烧开",
      "放入豆腐块轻轻推散",
      "用淀粉勾芡，撒花椒粉和韭黄即可"
    ],
    tags: ["川菜", "辣味", "下饭菜"]
  },
  {
    id: 4,
    name: "西红柿鸡蛋面",
    category: "面食",
    difficulty: "简单",
    cookTime: "10分钟",
    servings: 1,
    ingredients: [
      "面条 100g",
      "鸡蛋 2个",
      "西红柿 2个",
      "大葱 1根",
      "生抽 1勺",
      "盐 适量",
      "糖 1勺",
      "食用油 适量"
    ],
    instructions: [
      "西红柿去皮切块",
      "鸡蛋打散炒熟盛起",
      "热锅下油炒西红柿出汁",
      "加入生抽、盐、糖调味",
      "倒入鸡蛋炒匀",
      "另起锅煮面条",
      "面条煮好后拌入西红柿鸡蛋即可"
    ],
    tags: ["简单快手", "面食", "家常菜"]
  },
  {
    id: 5,
    name: "糖醋里脊",
    category: "家常菜",
    difficulty: "中等",
    cookTime: "25分钟",
    servings: 3,
    ingredients: [
      "猪里脊肉 300g",
      "鸡蛋 1个",
      "面粉 50g",
      "淀粉 30g",
      "番茄酱 3勺",
      "白醋 2勺",
      "糖 3勺",
      "盐 适量",
      "料酒 1勺"
    ],
    instructions: [
      "里脊肉切条，用盐、料酒腌制",
      "调糊：面粉、淀粉、鸡蛋调成糊",
      "肉条挂糊下锅炸至金黄",
      "调糖醋汁：番茄酱、醋、糖、少许水",
      "热锅倒入糖醋汁煮开",
      "倒入炸好的里脊翻炒均匀即可"
    ],
    tags: ["酸甜", "下饭菜", "经典菜"]
  }
];

// CORS 头部
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// 主要的 fetch 处理函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 处理 OPTIONS 请求 (CORS 预检)
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    try {
      // 路由处理
      if (path === '/' && method === 'GET') {
        return handleHomePage();
      } else if (path === '/api/recipes' && method === 'GET') {
        return handleGetRecipes(url);
      } else if (path.match(/^\/api\/recipes\/\d+$/) && method === 'GET') {
        const id = parseInt(path.split('/').pop());
        return handleGetRecipeById(id);
      } else if (path === '/api/recipes/search' && method === 'GET') {
        return handleSearchRecipes(url);
      } else if (path === '/api/categories' && method === 'GET') {
        return handleGetCategories();
      } else {
        return new Response('Not Found', { 
          status: 404,
          headers: corsHeaders 
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};

// 首页处理
function handleHomePage() {
  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>菜谱 API</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
      .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
      .method { color: #007bff; font-weight: bold; }
    </style>
  </head>
  <body>
    <h1>🍳 菜谱 API 服务</h1>
    <p>欢迎使用菜谱 API！这个服务提供了丰富的中式菜谱数据。</p>
    
    <h2>API 端点</h2>
    
    <div class="endpoint">
      <span class="method">GET</span> <code>/api/recipes</code><br>
      获取所有菜谱列表<br>
      参数: <code>?category=分类</code>, <code>?limit=数量</code>, <code>?offset=偏移量</code>
    </div>
    
    <div class="endpoint">
      <span class="method">GET</span> <code>/api/recipes/{id}</code><br>
      根据 ID 获取单个菜谱详情
    </div>
    
    <div class="endpoint">
      <span class="method">GET</span> <code>/api/recipes/search</code><br>
      搜索菜谱<br>
      参数: <code>?q=关键词</code>
    </div>
    
    <div class="endpoint">
      <span class="method">GET</span> <code>/api/categories</code><br>
      获取所有菜谱分类
    </div>
    
    <h2>示例</h2>
    <ul>
      <li><a href="/api/recipes">获取所有菜谱</a></li>
      <li><a href="/api/recipes/1">获取第一个菜谱</a></li>
      <li><a href="/api/recipes/search?q=鸡">搜索包含"鸡"的菜谱</a></li>
      <li><a href="/api/categories">获取分类列表</a></li>
    </ul>
    
    <h2>响应格式</h2>
    <p>所有 API 响应都是 JSON 格式，包含以下字段：</p>
    <ul>
      <li><code>success</code>: 请求是否成功</li>
      <li><code>data</code>: 返回的数据</li>
      <li><code>total</code>: 总数量（列表接口）</li>
      <li><code>message</code>: 错误信息（如有）</li>
    </ul>
  </body>
  </html>
  `;
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...corsHeaders
    }
  });
}

// 获取菜谱列表
function handleGetRecipes(url) {
  const params = url.searchParams;
  const category = params.get('category');
  const limit = parseInt(params.get('limit')) || 10;
  const offset = parseInt(params.get('offset')) || 0;
  
  let filteredRecipes = [...RECIPES];
  
  // 按分类过滤
  if (category) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.category === category
    );
  }
  
  // 分页
  const total = filteredRecipes.length;
  const paginatedRecipes = filteredRecipes.slice(offset, offset + limit);
  
  return new Response(JSON.stringify({
    success: true,
    data: paginatedRecipes,
    total: total,
    limit: limit,
    offset: offset
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

// 根据 ID 获取菜谱
function handleGetRecipeById(id) {
  const recipe = RECIPES.find(r => r.id === id);
  
  if (!recipe) {
    return new Response(JSON.stringify({
      success: false,
      message: '菜谱不存在'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
  
  return new Response(JSON.stringify({
    success: true,
    data: recipe
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

// 搜索菜谱
function handleSearchRecipes(url) {
  const query = url.searchParams.get('q');
  
  if (!query) {
    return new Response(JSON.stringify({
      success: false,
      message: '请提供搜索关键词'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
  
  const results = RECIPES.filter(recipe => 
    recipe.name.includes(query) ||
    recipe.category.includes(query) ||
    recipe.ingredients.some(ingredient => ingredient.includes(query)) ||
    recipe.tags.some(tag => tag.includes(query))
  );
  
  return new Response(JSON.stringify({
    success: true,
    data: results,
    total: results.length,
    query: query
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

// 获取分类列表
function handleGetCategories() {
  const categories = [...new Set(RECIPES.map(recipe => recipe.category))];
  
  const categoryStats = categories.map(category => ({
    name: category,
    count: RECIPES.filter(recipe => recipe.category === category).length
  }));
  
  return new Response(JSON.stringify({
    success: true,
    data: categoryStats
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}