![友得云客房产小程序](https://tcdn.udeve.net/fang2021/4bbe636b-e0e8-4580-8bb0-66bbf61f11bd.png)

## 友得云客(社区版)管理面板运行指南

### 第一步：项目获取与导入
1. 请首先从远程仓库将友得云客小程序项目克隆至本地计算机：
```markdown
git clone https://gitee.com/youdeyunke/app.git
```

### 第二步：IDE导入
1. 打开您选择的 IDE 工具。使用 IDE 导入功能，导航至克隆下来的项目目录。选择 `panel` 文件夹作为项目的导入目标。

### 第三步：项目运行环境配置
1. 请首先安装nodejs，并配置nodejs环境变量。node版本为14.18.1。
2. 使用`npm install`命令安装依赖包。
3. 修改`vue.config.js`里的`devServer`配置，将`target`设置为您的后端项目运行地址。

### 第四步：项目运行
完成上述步骤后，使用`npm run dev`命令启动项目。