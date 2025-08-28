# Material Design 3 颜色主题编辑器

一个基于 Material Design 3 设计规范的实时颜色主题编辑器，支持亮色模式和黑暗模式的同步预览与个性化定制。

![Material Design 3](https://img.shields.io/badge/Material%20Design-3-blue?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square)
![CSS3](https://img.shields.io/badge/CSS-3-blue?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML-5-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌐 在线演示

**[👉 立即体验 Material Design 3 颜色主题编辑器](https://lunagao.github.io/material-design-3-color-editor/)**

## 🎨 项目简介

这是一个专业的 Material Design 3 颜色主题编辑器，让设计师和开发者能够：

- 🎯 **实时预览**：在亮色模式和黑暗模式之间同步查看颜色效果
- 🔧 **精确控制**：支持 HEX 颜色代码输入和可视化颜色选择器
- 📱 **完整覆盖**：包含所有 Material Design 3 颜色 tokens
- 💾 **数据持久化**：支持主题配置的导入导出功能
- ⚡ **快捷操作**：丰富的键盘快捷键支持

## 🌈 功能特性

### 核心功能
- **双模式预览**：左侧亮色模式，右侧黑暗模式，实时同步显示
- **完整颜色系统**：支持 Primary、Secondary、Tertiary、Error、Surface 等完整颜色配置
- **智能颜色生成**：亮色模式颜色变化时，黑暗模式自动生成相应的适配颜色
- **黑暗模式独立配置**：支持单独调整黑暗模式的背景色

### 颜色管理
- **HEX 输入**：每个颜色都支持 HEX 代码直接输入
- **输入验证**：自动验证 HEX 颜色格式，支持 3 位和 6 位格式
- **双向同步**：颜色选择器和 HEX 输入框实时双向同步
- **颜色说明**：每个颜色都有详细的中英文说明和使用场景介绍

### 预设主题
- **内置主题**：默认、蓝色、绿色、橙色四种预设主题
- **随机主题**：一键生成随机颜色主题
- **重置功能**：支持重置所有颜色或仅重置黑暗模式

### 数据管理
- **导入导出**：支持 JSON 格式的主题配置导入导出
- **本地存储**：自动保存配置到 localStorage
- **配置恢复**：页面重新加载时自动恢复上次的配置

## 🎯 使用场景

- **设计系统开发**：为企业或产品创建统一的颜色规范
- **主题定制**：为网站或应用定制个性化的颜色主题
- **Material Design 学习**：深入理解 Material Design 3 颜色系统
- **原型设计**：快速预览不同颜色搭配的视觉效果
- **开发工具**：为前端开发团队提供颜色配置工具

## 🚀 快速开始

### 运行项目

1. **克隆或下载项目**
```bash
# 克隆仓库 (请替换 YOUR_USERNAME 为您的 GitHub 用户名)
git clone https://github.com/LunaGao/material-design-3-color-editor.git
cd material-design-3-color-editor

# 或直接下载 ZIP 文件并解压
```

2. **启动本地服务器**
```bash
# 使用 Python
python3 -m http.server 8080

# 或使用 Node.js
npx serve .

# 或使用任何静态文件服务器
```

3. **打开浏览器**
访问 `http://localhost:8080` 即可开始使用

### 基本使用

1. **颜色调整**：
   - 使用左侧颜色选择器调整颜色
   - 或直接在 HEX 输入框中输入颜色代码
   - 修改后效果会在右侧实时显示

2. **主题管理**：
   - 点击预设主题快速应用
   - 使用"随机主题"探索新的颜色搭配
   - 通过"导出主题"保存当前配置

3. **黑暗模式配置**：
   - 在黑暗模式区域右上角调整背景色
   - 或使用"重置黑暗模式"恢复默认

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + 1` | 切换到组件展示页面 |
| `Ctrl + 2` | 切换到卡片页面 |
| `Ctrl + 3` | 切换到表单页面 |
| `Ctrl + 4` | 切换到布局页面 |
| `Ctrl + R` | 生成随机主题 |
| `Ctrl + D` | 重置为默认主题 |
| `Ctrl + E` | 导出当前主题 |
| `Ctrl + I` | 导入主题文件 |
| `Ctrl + ?` | 显示快捷键帮助 |
| `Esc` | 关闭模态框 |

## 🎨 颜色系统说明

### Material Design 3 颜色角色

#### Primary Colors 主色系统
- **Primary**: 应用的主要品牌色，用于按钮、链接等主要元素
- **On Primary**: 显示在主色背景上的文本和图标颜色
- **Primary Container**: 主色的低对比度变体，用于背景区域
- **On Primary Container**: 显示在主色容器背景上的文本和图标颜色

#### Secondary Colors 辅助色系统
- **Secondary**: 提供颜色层次的辅助色彩，用于不太突出的元素
- **On Secondary**: 显示在辅助色背景上的文本和图标颜色
- **Secondary Container**: 辅助色的低对比度变体，用于背景和容器
- **On Secondary Container**: 显示在辅助色容器背景上的文本和图标颜色

#### Tertiary Colors 第三色系统
- **Tertiary**: 用于对比强调和平衡主色与辅助色
- **On Tertiary**: 显示在第三色背景上的文本和图标颜色
- **Tertiary Container**: 第三色的低对比度变体，用于特殊背景区域
- **On Tertiary Container**: 显示在第三色容器背景上的文本和图标颜色

#### Error Colors 错误色系统
- **Error**: 用于显示错误状态和警告信息
- **On Error**: 显示在错误色背景上的文本和图标颜色
- **Error Container**: 错误色的低对比度变体，用于错误提示区域
- **On Error Container**: 显示在错误色容器背景上的文本和图标颜色

#### Surface Colors 表面色系统
- **Background**: 应用的主要背景色，位于所有内容之后
- **On Background**: 显示在背景色上的文本和图标颜色
- **Surface**: 用于卡片、工具栏和其他组件的背景色
- **On Surface**: 显示在表面色背景上的文本和图标颜色
- **Surface Variant**: 用于低对比度表面的颜色变体
- **On Surface Variant**: 显示在表面变体色背景上的文本和图标颜色
- **Outline**: 用于边框、分割线和轮廓的颜色
- **Outline Variant**: 用于低对比度边框和分割线的颜色

## 📁 项目结构

```
material_color/
├── index.html                 # 主页面文件
├── styles/
│   ├── material-theme.css     # Material Design 3 颜色变量定义
│   └── main.css              # 主要样式文件
├── scripts/
│   ├── color-manager.js      # 颜色管理核心逻辑
│   └── app.js               # 应用主逻辑和页面交互
├── debug.html               # 调试页面
├── test.js                  # 测试脚本
└── README.md               # 项目说明文档
```

### 关键文件说明

- **`index.html`**: 主要的 HTML 结构，包含双栏布局和所有颜色配置界面
- **`styles/material-theme.css`**: 定义了完整的 Material Design 3 颜色系统变量
- **`styles/main.css`**: 应用的主要样式，包括布局、组件样式和响应式设计
- **`scripts/color-manager.js`**: 核心颜色管理类，处理颜色更新、验证、导入导出等功能
- **`scripts/app.js`**: 应用主类，处理页面交互、事件监听和用户界面逻辑

## 🔧 技术实现

### 核心技术栈
- **HTML5**: 语义化结构和现代 Web 标准
- **CSS3**: CSS 自定义属性（CSS Variables）实现主题系统
- **Vanilla JavaScript**: 原生 ES6+ 语法，无外部依赖
- **Material Design 3**: 遵循最新的 Material Design 设计规范

### 关键技术特性
- **CSS 变量动态更新**: 使用 `setProperty()` 动态修改 CSS 自定义属性
- **事件驱动架构**: 基于事件监听器的响应式界面更新
- **模块化设计**: 颜色管理和应用逻辑分离，便于维护和扩展
- **本地存储**: 使用 `localStorage` 实现配置持久化

### 颜色同步机制
```javascript
// 亮色模式颜色更新时，自动生成黑暗模式对应颜色
updateColorToken(token, color, themeMode = 'both') {
    if (themeMode === 'both' || themeMode === 'light') {
        document.documentElement.style.setProperty(cssVariable, color);
    }
    if (themeMode === 'both' || themeMode === 'dark') {
        this.updateDarkModeColor(token, color);
    }
}
```

## 🎯 浏览器兼容性

- ✅ Chrome 88+
- ✅ Firefox 87+
- ✅ Safari 14+
- ✅ Edge 88+

### 依赖的现代浏览器特性
- CSS 自定义属性（CSS Variables）
- ES6+ 语法支持
- HTML5 Color Input
- LocalStorage API

## 🚧 开发指南

### 添加新的颜色配置

1. **在 HTML 中添加颜色输入组**:
```html
<div class="color-input-group">
    <label for="new-color">New Color 新颜色<br><small>颜色用途说明</small></label>
    <div class="color-inputs">
        <input type="color" id="new-color" value="#FFFFFF" data-token="new-color">
        <input type="text" class="hex-input" id="new-color-hex" value="#FFFFFF" data-token="new-color" maxlength="7" placeholder="#RRGGBB">
    </div>
</div>
```

2. **在 CSS 中定义对应的变量**:
```css
:root {
    --md-sys-color-new-color: #FFFFFF;
}

[data-theme="dark"] {
    --md-sys-color-new-color: #000000;
}
```

3. **在 JavaScript 中添加到预设主题**:
```javascript
const presets = {
    default: {
        // ... 其他颜色
        'new-color': '#FFFFFF'
    }
};
```

### 自定义样式

所有样式都使用 CSS 变量，可以轻松自定义：

```css
/* 自定义左侧面板背景 */
.color-panel {
    background-color: #YOUR_COLOR;
}

/* 自定义按钮样式 */
.md-button.filled {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
}
```

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 遵循 ES6+ 语法标准
- 使用有意义的变量和函数命名
- 添加必要的注释说明
- 保持代码结构清晰

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [Material Design 3 官方文档](https://m3.material.io/)
- [Material Design 颜色系统](https://m3.material.io/styles/color/system)
- [CSS 自定义属性 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系我们：

- 🐛 提交 [Issue](https://github.com/LunaGao/material-design-3-color-editor/issues)
- 🔥 发送 [Pull Request](https://github.com/LunaGao/material-design-3-color-editor/pulls)
- ⭐ 给项目点个 Star 支持我们

---

**感谢使用 Material Design 3 颜色主题编辑器！** 🎨

让我们一起创造更美好的用户界面体验。