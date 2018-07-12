### 克隆好了之后
### 使用cnpm i 安装模块
### 使用 npm run dev 启动项目
### 使用 npm run build 打包项目
## 开发端口:9528

# 前端添加路由(添加左侧菜单栏)
#### 以下面的代码为例子,
#### 在src/router/index.js中添加如下代码,
#### 并且在src/views下创建相应的组件
```
{
    path: '/internetOa',
    component: Layout,
    children: [
      {
        path: 'internetOa',
        name: 'InternetOa',
        component: () => import('@/views/oa/internetOa'),
        meta: {title: '网上办公', icon: 'form'}
      }
    ]
}
  ```
  * 数据接口处理均在@/api目录下
  * 数据验证均在@utils目录下
  * BASE_API配置在config目录下
