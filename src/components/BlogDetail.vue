<template>
  <div  v-loading.fullscreen.lock="isLoad">

    <Header ></Header>
    <div class="header">
    </div>
    <div class="doc-container" id="doc-container">
      <div class="container-fixed">

        <div class="col-content" style="width:100%">
          <div class="inner">
            <article class="article-list">
              <input type="hidden" value="@Model.BlogTypeID" id="blogtypeid" />
              <section class="article-item" style="border-radius: 20px;">
                <aside class="title" style="line-height:1.5;">
                  <h2 class="font">{{ruleForm.title}}</h2>
                  <br/>
                  <p class="fc-grey fs-14" style="font-size: 18px">
                    <small>
                      作者：<a href="javascript:void(0)" target="_blank" class="fc-link">{{this.ruleForm.userName}}</a>
                    </small>
                    <small class="ml10">围观群众：<i class="readcount fc-link">{{this.blog.view}}</i></small>
                    <small class="ml10">更新于 <label class="fc-link">{{this.blog.created}}</label> </small>
                  </p>
                </aside>
                <div class="time mt10" style="padding-bottom:0;">
                  <span class="day">{{ blog.created.substr(8,2) }}</span>
                  <span class="month fs-18">{{ blog.created.substr(5,2) }}<small class="fs-14">月</small></span>
                  <span class="year fs-18">{{ blog.created.substr(0,4) }}</span>
                </div>
                <div class="content artiledetail" style="border-bottom: 1px solid #e1e2e0; padding-bottom: 20px;">
                  <div style="width:100%;min-height: 500px">
                    <div class="mblog"  style="background-color: white">
                      <el-backtop >
                        <div
                          style="{
                          height: 100%;
                          width: 100%;
                          background-color: #f2f5f6;
                          box-shadow: 0 0 6px rgba(0,0,0,.12);
                          text-align: center;
                          line-height: 50px;
                          color: #1989fa;
                         }"
                        >UP</div>
                      </el-backtop>
                      <br/>
                      <br/>

                      <div class="markdown-body"  style="font-size: 17px" v-html="ruleForm.content"  >
                      </div>
                      <br/>
                    </div>
                    <div id="bu">
                      <el-button @click="out" >返回</el-button>
                    </div>
                  </div>
                  <div class="copyright mt20">
                    <p class="f-toe fc-black">
                      非特殊说明，本文版权归 <span style="color: black;font-size: 20px">{{this.ruleForm.userName}}</span> 所有，转载请注明出处.
                    </p>
                    <p class="f-toe">
                      本文标题：
                      <a href="javascript:void(0)" class="r-title">{{this.ruleForm.title}}</a>
                    </p>
                  </div>
                  <div id="aplayer" style="margin:5px 0"></div>
                  <h6>分享</h6>
                </div>
                <div class="bdsharebuttonbox share" data-tag="share_1">
                  <ul>
                    <li class="f-praise"><span><a class="s-praise"></a></span></li>
                    <li class="f-weinxi"><a class="s-weinxi" data-cmd="weixin"></a></li>
                    <li class="f-sina"><a class="s-sina" data-cmd="tsina"></a></li>
                    <li class="f-qq" href="#"><i class="fa fa-qq"></i></li>
                    <li class="f-qzone"><a class="s-qzone" data-cmd="qzone"></a></li>
                  </ul>
                </div>
                <div class="f-cb"></div>
                <div class="mt20 f-fwn fs-24 fc-grey comment" style="border-top: 1px solid #e1e2e0; padding-top: 20px;">
                </div>
                <fieldset class="layui-elem-field layui-field-title">
                  <div class="textarea-wrap message" id="textarea-wrap">
                    <form class="layui-form blog-editor" action="">
                      <div style="margin:0 auto;text-align: center">
                        <el-input style="width: 80%;font-size: 15px"
                                  type="textarea"
                                  :autosize="{ minRows: 6}"
                                  placeholder="请写下您的留言"
                                  v-model="textarea"
                                  maxlength="50"
                                  show-word-limit
                        >
                        </el-input>
                      </div>
                      <div class="layui-form-item">
                      </div>
                      <div class="layui-form-item">
                        <button @click.prevent="addComment" style="display:block;margin:0 auto" class="layui-btn" lay-submit="formLeaveMessage" lay-filter="formLeaveMessage">发表评论</button>
                      </div>
                    </form>
                  </div>
                  <legend>评论</legend>
                </fieldset>
                <ul class="blog-comment" id="blog-comment"></ul>
              </section>
            </article>
            <div class="mt20">
              <ul class="message-list" id="message-list">
                <div v-for="message in blog.comments">
                  <li class="zoomIn article" >
                    <div class="comment-parent">

                      <img :src="message.user.avatar"  />
                      <div class="info">
                        <span class="username">{{message.user.username}}:</span>
                      </div>
                      <div class="comment-content" style="font-size: 16px">
                        {{ message.content }}
                        <span style="float: right"><i class="el-icon-time">&nbsp;<font style="font-size: 13px">{{message.created}}</font></i></span>
                      </div>
                    </div>
                    <el-divider></el-divider>
                  </li>
                </div>
              </ul>
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
import 'github-markdown-css/github-markdown.css'
import Header from "./Header";
import "github-markdown-css";
import 'highlight.js/styles/atom-one-dark.css'

export default {
  name: "BlogDetail.vue",
  data(){
    return{
      isLoad:true,
      blog:[],
      ruleForm:{
        id:"",
        title:"",
        description:"",
        content:"",
        userID:""
      },
      username:"",
      ownBlog:false,
      textarea:"",
      comment:{},
    }
  },
  methods:{
    remove(id){
      this.$http.get("/deleteBlog/"+id,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
        this.$alert('删除成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push("/blogs")
          }
        });
      })
    },
    out(){
      this.$router.push("/blogs")
    },
    addComment(){
      if(this.$store.getters.getUser==null){
        this.$router.push("/login")
      }
      if (this.textarea===""){
        this.$message({
          showClose: true,
          message: '请写下您的评论~',
          type: 'warning',
          offset: 100
        });
      }else{
        this.comment.content=this.textarea;
        this.comment.user_id=this.$store.getters.getUser.id;
        this.comment.blog_id=this.$route.params.blogId;
        this.$http.post("/comment/addComment",this.comment).then(res=>{
          this.$alert('留言成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.textarea="";
              this.$http.get("/blog/"+this.$route.params.blogId).then(res=>{
                const blog=res.data.data;
                this.blog=blog;
                console.log(this.blog);
              })
            }
          });
        })
      }


    },
    getBlog(){
      this.isLoad=true
      this.$http.get("/blog/"+this.$route.params.blogId).then(res=>{
        this.isLoad=false;
        const blog=res.data.data;
        this.blog=blog;
        this.ruleForm.id=blog.id;
        this.ruleForm.title=blog.title;
        this.ruleForm.description=blog.description;
        this.ruleForm.userName=blog.userName;

        var MarkdownIt = require('markdown-it');
        var md = new MarkdownIt();
        var result = md.render(blog.content);
        this.ruleForm.content=result;
      })
    }
  },
  components: { Header},
  created() {
    this.getBlog();
  }
}
</script>

<style scoped>

@import "../../static/html/layui/css/layui.css" ;
@import "../../static/html/css/master.css";
@import "../../static/html/css/gloable.css";
@import "../../static/html/css/nprogress.css";
@import "../../static/html/css/blog.css";
@import "../../static/html/css/message.css";
@import "../../static/html/font-awesome/css/font-awesome.min.css";

  .mblog{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 97%;
    margin: 20px auto;
    min-height: 500px;
    padding: 20px;
  }
  .but{
    float: right;
  }
  .font{
    color: dodgerblue;
  }

  .head{background: white;position: fixed;top: 0;width: 100%;z-index: 80;}

  #bu{
    margin: 0 auto;
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
  }
</style>
