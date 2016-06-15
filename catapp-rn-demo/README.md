# CAT APP 0.4.0

已完成功能：登录、账户审核管理、数据环境切换、账户信息、数据模块主页及管理、
报错大盘基础数据表

登录root账号：
username: adminxxxxx
password: 123

也可以用自己的域账号登录后申请审核，然后用root账号审批之后就可以登录使用了。

## 安装及本地环境配置

1.  如果未安装nodejs，请先安装[nodejs](https://nodejs.org);
2.  `cd CatApp2016/` ;
3.  `npm install` 安装react、react-native等;
4.  如果你要在windows上运行android，可以安装[Genymotion](https://www.genymotion.com/download)模拟器，
    可参考[reactnative.cn](http://reactnative.cn/)上的[安装教程](http://reactnative.cn/docs/0.22/android-setup.html)

## 主要目录结构说明

项目主要源码位于`src/app`目录下：

```
├─components // 独立封装的组件
│  ├─checkbox
│  │  └─images
│  └─icons-grid // 这个就是封装了icon的网格布局的一个组件，使用细节在下一章节解释
│      └─images
├─config // 常量、ajax请求url等
├─images
├─pages
│  ├─Charts
│  ├─ErrorBake // 这个是之前为了做会议演示时临时从旧项目中引入的组件，目前可以忽略
│  │  └─errors
│  ├─Errors // 报错大盘页面
│  ├─Home
│  │  └─images
│  ├─icons-grid-demo // icon-grid的使用示例
│  ├─Manager 
│  │  ├─Home
│  │  └─Subpage
│  ├─Message
│  ├─Pending
│  ├─Settings
│  ├─SignIn
│  ├─User
│  └─util // 这也是之前为了演示用的，目前可以忽略
├─styles
└─utils // 一些封装的工具库
```

## Icons-Grid 组件的使用说明

- 代码位于`/src/app/components/icons-grid`目录下，已做封装，可独立使用
- 需要依赖组件`checkbox`
- 使用可参考`/src/app/pages/icons-grid-demo`目录下的示例代码，在项目启动后在
    Home页点击“业务大盘”后查看效果

### Icons-Grid 组件的属性

#### `fullData` (array, [{id, label, icon}, ...])

用来渲染settings list的原始的完整数据

#### `selectedItems` (array)

用于第一次渲染grid的（已选中的）数据项的id数组

#### `cellSize` (number)

grid横向显示的网格数量

#### `onPress` (function)

grid item 点击后执行的回调函数，会传入一个数据项的`id`作为参数


 
