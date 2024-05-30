![友得云客房产小程序](https://qiniucdn.udeve.cn/fang2021/4bbe636b-e0e8-4580-8bb0-66bbf61f11bd.png)

## 友得云客(社区版)小程序运行指南

### 第一步：项目获取与导入
1. 请首先从远程仓库将友得云客小程序项目克隆至本地计算机：
```markdown
git clone https://gitee.com/youdeyunke/app.git
```

### 第二步：微信开发者工具导入
1. 打开微信开发者工具，选择“导入项目”功能。
2. 导航至本地刚刚克隆下来的项目目录，定位到`weapp`文件夹并选择该文件夹作为导入目标。
   
   ![导入步骤示意图](https://qiniucdn.udeve.net/udyk/65e7f2388ecaf3ad72666429.png)
   ![确认导入路径示意图](https://qiniucdn.udeve.net/udyk/65e7f2388ecaf3ad72666428.png)

### 第三步：运行与调试
1. 成功导入项目后，在微信开发者工具的编辑器界面中，点击“编译并运行”按钮，确保项目能够正常启动。
   
   ![运行项目示意图](https://qiniucdn.udeve.net/udyk/65e7f2388ecaf3ad72666427.png)
2. 修改`utils/request.js`中的`apiHost`为您的后端项目运行地址。

### 导入效果预览
完成上述步骤后，友得云客小程序将会在模拟器或者真机环境中展现以下所示的效果：
   
   ![导入后效果图](https://qiniucdn.udeve.net/udyk/65e7f3348ecaf3ad7266642a.png)
