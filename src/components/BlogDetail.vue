<template>
  <div >

    <Header></Header>
    <div class="header">
    </div>
    <div class="doc-container" id="doc-container" v-loading.fullscreen.lock="isLoad">
      <div class="container-fixed">
        <center >
          <el-dialog
            style="min-width: 250px;"
            title=""
            :visible.sync="dialogVisible"
            width="25%"
            :before-close="handleClose">
            <span>
              <h1>用户信息</h1>
              <br/>
                <el-avatar :size="100" :src="rule.avatar" ></el-avatar>
              <table style="line-height: 48px;font-size: 16px;text-align: center;width: 100%">
              <tr>
                <th style="color:#3e8bc7">用户名</th>
                <th >{{this.rule.username}}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">生日</th>
                <th>{{ this.rule.created.substr(5,5) }}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">邮箱</th>
                <th>{{ this.rule.email }}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">博客数量</th>
                <th>{{ this.blogNum }}</th>
              </tr>
            </table>
              <br/>
              <el-button  @click="dialogVisible=false"   round>返回</el-button>
            </span>
            <span slot="footer" class="dialog-footer">
        </span>
          </el-dialog>
        </center>
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
                      作者：<a href="javascript:void(0)" @click="open(ruleForm.userId)" class="fc-link">{{this.ruleForm.userName}}</a>
                    </small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <small class="ml10" >更新于 <label class="fc-link">{{this.blog.created.substr(0,10)}}</label> </small>
                  </p>
                </aside>
                <div class="time mt10" style="padding-bottom:0;">
                  <span class="day">{{ blog.created.substr(8,2) }}</span>
                  <span class="month fs-18">{{ blog.created.substr(5,2) }}<small class="fs-14">月</small></span>
                  <span class="year fs-18">{{ blog.created.substr(0,4) }}</span>
                </div>
                <div class="content artiledetail" v-highlight style="border-bottom: 1px solid #e1e2e0; padding-bottom: 20px;">
                  <div style="width:100%;min-height: 500px">
                    <div class="mblog"  v-highlight style="background-color: white">
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
                      <el-button @click="out" type="primary" plain style="width: 80px;height: 30px" >返回</el-button>
                    </div>
                  </div>
                  <div class="copyright mt20">
                    <p class="f-toe fc-black">
                      非特殊说明，本文版权归 <a href="javascript:" @click="open(ruleForm.userId)"><span style="color: #2EA7E0  ;font-size: 20px">{{this.ruleForm.userName}}</span></a> 所有，转载请注明出处.
                    </p>
                    <p class="f-toe">
                      本文标题：
                      <a  class="r-title">{{this.ruleForm.title}}</a>
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

                      <img :src="message.user.avatar" style="cursor:pointer;" @click="open(message.user.id)" />
                      <div class="info">
                        <span class="username" style="cursor:pointer;" @click="open(message.user.id)">{{message.user.username}}:</span>
                        <span style="float: right" v-if="(message.user.id===Login_id)">
                        <el-link @click="removeComment(message.id,message.blogId)">
                          <i class="el-icon-delete"></i>删除
                        </el-link>
                        </span>
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
              <a href="blogsAll"  title="博文"><i class="fa fa-book"></i></a>
              <a href="message"  title="留言"><i class="fa fa-comments"></i></a>
              <a href="log"  title="日志"><i class="fa fa-tag"></i></a>
              <a href="about"  title="关于"><i class="fa fa-info-circle"></i></a>
              <a href="https://wpa.qq.com/msgrd?v=3&uin=319991012&site=qq&menu=yes" class="qq" target="_blank" title="319991012"><i class="fa fa-qq"></i></a>
              <a href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=319991012@qq.com" class="email" target="_blank" title="319991012@qq.com"><i class="fa fa-envelope"></i></a>
            </div>
            <p class="mt05">
              Copyright &copy; 2018-2022 风的季节 All Rights Reserved V.1.0.0 鄂ICP备2021008605号
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import Header from "./Header";
import 'highlight.js/styles/atom-one-dark.css'

export default {
  components: { Header},
  comments:{Header},
  name: "BlogDetail.vue",
  data(){
    return{
      Login_id:-1,
      blog:[],
      ruleForm:{
        id:"",
        title:"",
        description:"",
        content:"",
        userId:""
      },
      username:"",
      ownBlog:false,
      textarea:"",
      comment:{},
      rule: {
        avatar:"",
        username:"",
        created:"",
        email:"",
      },
      dialogVisible: false,
      blogNum:0,
      isLoad:false
    }
  },
  methods:{
    remove(id){
      this.isLoad=true;
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
    removeComment(id,blogId){
      this.$confirm('是否删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isLoad=true;
        this.$http.get("/comment/deleteById?id="+id+"&blog_id="+blogId,{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res=>{
          this.isLoad=false;
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 100
          });
          this.$http.get("/blog/"+this.$route.params.blogId).then(res=>{
            const blog=res.data.data;
            this.blog=blog;
          })
        })
      })
    },
    out(){
      this.$router.push("/blogsAll")
    },
    addComment(){
      if(this.$store.getters.getUser.id==null){
        this.$router.push("/login")
      }else{
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
          this.isLoad=true;
          this.$http.post("/comment/addComment",this.comment).then(res=>{
            this.isLoad=false;
            this.$alert('评论成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.textarea="";
                this.$http.get("/blog/"+this.$route.params.blogId).then(res=>{
                  const blog=res.data.data;
                  this.blog=blog;
                })
              }
            });
          })
        }
      }

    },
    getBlog(){
      this.isLoad=true;
      this.$http.get("/blog/"+this.$route.params.blogId).then(res=>{
        const blog=res.data.data;
        this.blog=blog;
        this.ruleForm.id=blog.id;
        this.ruleForm.title=blog.title;
        this.ruleForm.description=blog.description;
        this.ruleForm.userName=blog.userName;
        this.ruleForm.userId=blog.userId;
        var MarkdownIt = require('markdown-it');
        var md = new MarkdownIt();
        var result = md.render(blog.content);
        this.ruleForm.content=result;
        console.log(this.blog)
        this.isLoad=false;
      })
      if(this.$store.getters.getUser.id!=null){
        this.Login_id=this.$store.getters.getUser.id;
      }
    },
    handleClose(done) {
      this.dialogVisible=false;
    },
    open(id){
      this.isLoad=true;
      this.dialogVisible=true;
      this.$http.get("/user/findName/"+id).then(res=>{
        this.rule= res.data.data
      })
      this.$http.get("/getNum?userid="+id).then(res=>{
        this.blogNum=res.data.data;
        this.isLoad=false;
      })
    }
  },
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
