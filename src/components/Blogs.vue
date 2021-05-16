<template>

<div >
  <Header></Header>

  <div class="header">
  </div>

  <div class="doc-container" v-loading.fullscreen.lock="isLoad" id="doc-container">
    <div class="container-fixed" >
      <el-switch
        style="display: block"
        v-model="radio"
        active-color="#5BA8F6"
        inactive-color="#5BA8F6"
        active-text="发布时间↑"
        inactive-text="访问量↑">
      </el-switch>
      <div class="col-content">
        <div class="inner">
          <article class="article-list bloglist" id="LAY_bloglist">
            <section class="article-item zoomIn article"v-for="blog in blogs"  :key="blog.id">
              <div class="fc-flag" v-if="blog.view>=50">精华</div>
              <h5 class="title">
                <span class="fc-blue">【<font style="color: #2EA7E5;">原创</font>】</span>
                <router-link :to="{name:'BlogDetail',params:{blogId: blog.id}}"><a ><font style="font-size: 23px">{{ blog.title }}</font></a></router-link>
              </h5>
              <div class="time">
                <span class="day">{{ blog.created.substr(8,2) }}</span>
                <span class="month fs-18">{{ blog.created.substr(5,2) }}<span class="fs-14">月</span></span>
                <span class="year fs-18 ml10">{{ blog.created.substr(0,4) }}</span>
              </div>
              <div class="content">
                <router-link :to="{name:'BlogDetail',params:{blogId: blog.id}}">
                  <a class="cover img-light">
                    <img :src="blog.avatar"/>
                  </a>
                </router-link>
                  <div class="mblog" style="background-color: white;font-size: 14px;color: #212220;">
                    <div class="markdown-body"  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height: 180px;font-size: 12px;position: relative;bottom: 20px"  v-html="blog.description"  >
                    </div>
                    <br/>
                  </div>
              </div>
              <span style="float: right"><i class="el-icon-user-solid" style="font-size: 20px;color: #4476A7">:{{blog.userName}}</i></span>
              <div class="read-more">
                <router-link :to="{name:'BlogDetail',params:{blogId: blog.id}}"><a class="fc-black f-fwb">继续阅读</a></router-link>
              </div>
              <aside class="f-oh footer">
                <div class="f-fl tags" >
                  <span class="fa fa-tags fs-16" v-for="tag in blog.dynamicTags">
                  <a class="tag" >{{tag}}</a>
                    </span>
                </div>
                <div class="f-fr" style="float: right">
									<span class="read">
										<i class="fa fa-eye fs-16"></i>
										<i class="num">{{blog.view}}</i>
									</span>
                  <span class="ml20">
										<i class="fa fa-comments fs-16"></i>
										<a href="javascript:void(0)" class="num fc-grey">{{blog.commentCount}}</a>
									</span>
                </div>
              </aside>
            </section>
            <br/>
            <br/>
            <el-pagination class="mpage"
                           background
                           layout="prev, pager, next"
                           :current-page="currentPage"
                           :page-size="pageSize"
                           :total="total"
                           @current-change=page
            >
            </el-pagination>
          </article>
        </div>
      </div>
      <div class="col-other">
        <div class="inner">
          <div class="other-item" id="categoryandsearch">
            <div class="search">
              <label class="search-wrap">
                <input type="text" v-model="search" id="searchtxt" placeholder="输入关键字搜索" />
                <span class="search-icon">
					                <i class="fa fa-search" @click="page(1)"></i>
					            </span>
              </label>
              <ul class="search-result"></ul>
            </div>
            <ul class="category mt20" id="category">
              <li data-index="0" class="slider"></li>
              <li data-index="1"><a href="">全部文章</a></li>
              <li data-index="2" @click.prevent="tags('JAVA')"><a  href="">JAVA</a></li>
              <li data-index="3" @click.prevent="tags('笔记')"><a href="">笔记</a></li>
              <li data-index="4" @click.prevent="tags('Spring')"><a href="">Spring</a></li>
            </ul>
          </div>
          <!--遮罩-->
          <div class="blog-mask animated layui-hide"></div>
          <div class="other-item">
            <h5 class="other-item-title">热门文章</h5>
            <div class="inner">
              <ul class="hot-list-article">
                <li v-for="blog in blogHot"> <router-link :to="{name:'BlogDetail',params:{blogId: blog.id}}">{{blog.title}}</router-link></li>
              </ul>
            </div>
          </div>
          <div class="other-item">
            <h5 class="other-item-title">置顶推荐</h5>
            <div class="inner">
              <ul class="hot-list-article">
                <li> <router-link to="/blogDetail/23"><a href="">SpringBoot笔记</a></router-link></li>
                <li> <router-link to="/blogDetail/25"><a href="">Java集合</a></router-link></li>
                <li> <router-link to="/blogDetail/26"><a href="">数据结构与算法</a></router-link></li>
              </ul>
            </div>
          </div>
          <div class="other-item">
            <h5 class="other-item-title">最近访客</h5>
            <div class="inner">
              <dl class="vistor">
                <dd v-for="user in users">
                  <a href="javasript:;"><img :src="user.avatar"><cite>{{user.username}}</cite></a>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="grid-footer">
    <div class="footer-fixed">
      <div class="copyright">
        <div class="info">
          <div class="contact">
            <a href="https://wpa.qq.com/msgrd?v=3&uin=319991012&site=qq&menu=yes" class="qq" target="_blank" title="319991012"><i class="fa fa-qq"></i></a>
            <a href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=319991012@qq.com" class="email" target="_blank" title="319991012@qq.com"><i class="fa fa-envelope"></i></a>
          </div>
          <p class="mt05">
            Copyright &copy; 2018-2018 风的季节 All Rights Reserved V.1.0.0 蜀ICP备18008600号
          </p>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>

import Header from "./Header";


export default {
  name: "Blogs",
  data() {
    return {
      isLoad:true,
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      radio: true,
      userID:'',
      defaultData: "preview",
      users:[],
      blogHot:[],
      search:""
    }
  },
  components: {Header},
  methods: {
    page(currentPage) {
      this.isLoad=true;
      this.$http.get("/blogs?currentPage=" + currentPage+"&search="+this.search+"&radio="+this.radio).then(res => {
        this.blogs = res.data.data.records;
        console.log(this.blogs);
        if (this.blogs.length===0){
          this.$message({
            message: '暂无内容',
            type: 'warning',
            offset: 100
          });

        }

        this.currentPage = res.data.data.current;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.size;
        for (let i = 0; i < this.blogs.length; i++) {
          var MarkdownIt = require('markdown-it');
          var md = new MarkdownIt();
          var result = md.render(this.blogs[i].description);
          this.blogs[i].description=result;
        }
        this.isLoad=false;
      })
    },
    all(){
      this.page(1)
    },
    tags(search){
      this.search=search;
      this.page(1)
    }
  },
  created() {

    this.page(1)
    this.$http.get("/user/getAll").then(res=>{
      this.users=res.data.data;
    });
    this.$http.get("/getHot").then(res=>{
      this.blogHot=res.data.data;
    });
    if (this.$store.getters.getUser!==null){
      this.userID=this.$store.getters.getUser.id;
    }
  },

  watch:{
    'radio':{
      handler:function (){
        this.page(1)
      },
      deep:true
    }
  }
}

</script>



<style scoped>
@import "../../static/html/font-awesome/css/font-awesome.min.css";
@import "../../static/html/layui/css/layui.css" ;
@import "../../static/html/css/master.css";
@import "../../static/html/css/nprogress.css";
@import "../../static/html/css/blog.css";
  .mpage{
    text-align: center;
    margin: 0 auto;
  }
  .block{
    max-width: 60%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .font{
    text-decoration: none;
    color: dodgerblue;
  }
  #button{
    text-align: right;
  }
</style>
