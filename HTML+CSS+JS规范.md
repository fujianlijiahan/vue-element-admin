#HTML5标签规范:

1.	标签必须合法且闭合、嵌套正确，标签名需小写
2.	标签语法无错误，需要符合语义化

#CSS规范:
1.	CSS类名命名参考注释与命名
2.	禁止使用层级过深的选择器，最多3级。
3.	除非有特定的功能、组件要求等，禁止随意使用id来定义元素样式
4.	除非是样式reset需要，禁止对纯元素选择器设置特定样式，避免样式污染
```
  错误示范：
 	//会导致页面所有的a标签都被加上背景
 	a{background:url(xxx);}
 	//后期修改可能会添加一些span标签，如果刚好在div里面，会被污染；不利于后期护
 	div span{display:block}
```
5.  
#图片处理:

1.	图片体积不能超过300K
2.	JPG图片必须压缩，一般80%品质即可，保证文字清晰
3.	透明PNG图片必须使用压缩工具压缩后提供

#JS规范:

1.	变量和函数为小驼峰法标识
2.	全局变量为大写 (UPPERCASE )
3.	常量 (如 PI) 为大写 (UPPERCASE )
4.	函数功能单一
5.	运算符 ( = + - * / ) 前后需要添加空格
6.	异步调用采用Promise方式
7.	状态管理采用vuex
8.  前后端联调传参参数采用大驼峰或小驼峰,响应内容的key值均为小驼峰形式

#布局:
1.	布局中采用element-ui中的UI
2.	总体布局:top包括logo,登出,tag.		Left为菜单路由 	剩余为主体显示内容
3.	主内容页面布局:左上角search条件,右上角新增删除按钮,右下角分页(分页采用elementUI中完整版,并添加背景色)
```
 <div class="pagination-container" style="margin-top: 10px;" align="right" v-show="total">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
```
#注释
1.  较长的HTML片段，请在板块之间加入注释，使得结构更清晰：
```
...
<!-- 活动板块 开始 -->
<div class="part-act">
...
</div>
<!-- 活动板块 结束 -->
...
```
2.  如果是需要和后台开发联调的自定义函数。请注明函数的调用方式，包括函数的用途、参数类型等。
```
// 转盘初始化
// 参数1：是奖品的个数，数字类型
// 参数2：用来旋转的圆盘元素，可为dom元素 或 选择器字符串
    var panel=new PanelLotery({
        length:8,
        el:'#ltpanel'
    });
```

#命名
* 样式命名
1.  class、id都需小写
2.  命名使用英文，禁止使用特殊字符
3.  涉及数据、交互等需要联调的部分，禁止通过id选择器定义样式，以免开发过程中id名变化，引起页局错乱
4.  类名命名需要语义化，参考下面的示例：
```
 .wrap{}                 //外层容器
 .mod-box{}              //模块容器
 .btn-start{}            //开始
 .btn-download-ios{}     //ios下载
 .btn-download-andriod{} //安卓下载
 .btn-head-nav1{}        //头部导航链接1
 .btn-news-more{}        //更多新闻
 .btn-play{}             //播放视频
 .btn-ico{}              //按钮ico
 .btn-lottery{}          //开始抽奖
 .side-nav{}             //侧栏导航
 .side-nav-btn1{}        //侧栏导航-链接1 
 .btn-more{}             //更多
```
#其他
1.  table等加载时需要使用loading 使用 v-loading="loading"
2.  模态框标题左上角,右上角关闭的X,右下角放置保存,取消等按钮
3.  保存按钮添加:disabled="saveDisabled"属性防止重复提交

