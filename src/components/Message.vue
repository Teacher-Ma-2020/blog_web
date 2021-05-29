<template>
  <div v-loading.fullscreen.lock="isLoad">
    <Header></Header>
    <div class="header">
    </div>
    <div class="doc-container" id="doc-container">
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
                <el-avatar :size="100" :src="ruleForm.avatar" ></el-avatar>
              <table style="line-height: 48px;font-size: 16px;text-align: center;width: 100%">
              <tr>
                <th style="color:#3e8bc7">用户名</th>
                <th >{{this.ruleForm.username}}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">生日</th>
                <th>{{ this.ruleForm.created.substr(5,5) }}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">邮箱</th>
                <th>{{ this.ruleForm.email }}</th>
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
      <div class="container-fixed">
        <div class="container-inner">
          <section class="msg-remark">
            <h1>留言板</h1>
            <p>
              沟通交流，拉近你我！
            </p>
          </section>
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
                <button @click.prevent="addMessage" style="display:block;margin:0 auto" class="layui-btn" lay-submit="formLeaveMessage" lay-filter="formLeaveMessage">提交留言</button>
              </div>
            </form>
          </div>
        </div>

        <div class="f-cb"></div>

        <hr />
        <div class="mt20">
          <ul class="message-list" id="message-list">
            <div v-for="message in messages">
              <li class="zoomIn article" >
                <div class="comment-parent">

                  <img style="cursor:pointer;" @click="open(message.userId)" :src="message.user.avatar"  />
                  <div class="info">
                    <span class="username" style="cursor:pointer;" @click="open(message.userId)">{{message.user.username}}:</span>
                    <span style="float: right" v-if="(message.userId===Login_id)">
                      <el-link @click="remove(message.id)">
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
              Copyright &copy; 2018-2022 风的季节 All Rights Reserved V.1.0.0 鄂ICP备2021008605号-1
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
  components: {Header},
  comments:{Header},
  name: "message",
  data(){
    return{
      isLoad:true,
      isLogin:false,
      show:false,
      Login_id:-1,
      textarea: '',
      messages:[],
      messageAdd:{
        user_id:0,
        content:""
      },
      dialogVisible: false,
      ruleForm: {
        avatar:"",
        username:"",
        created:"",
        email:"",
      },
      blogNum:0
    }
  },
  methods:{
    getAll(){
      this.isLoad=true;
      this.$http.get("/message/getAll").then(res=>{

        this.messages=res.data.data;
        this.isLoad=false;
        console.log(this.messages)
      })
    },
    addMessage(){

      if (this.$store.getters.getUser.id!=null){
        if(this.textarea===""){
          this.$message({
            showClose: true,
            message: '请写下您的留言~',
            type: 'warning',
            offset: 100
          });
        }else{
            this.isLoad=true;
            this.messageAdd.content=this.textarea;
            this.messageAdd.user_id=this.$store.getters.getUser.id;
            console.log(this.messageAdd);
            this.$http.post("/message/addMessage",this.messageAdd).then(res=>{
              if(res.data.data){
                this.$alert('留言成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.getAll();
                    this.textarea="";
                  }
                });
              }else{
                this.$alert('出现错误', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/messAge");
                    this.getAll();
                    this.textarea="";
                  }
                });
              }
            })

        }
      }else{
        this.$router.push("/login")
      }
    },
    handleClose(done) {
      this.dialogVisible=false;
    },
    open(id){
      this.dialogVisible=true;
      this.isLoad=true;
      this.$http.get("/user/findName/"+id).then(res=>{
        this.ruleForm= res.data.data
      })
      this.$http.get("/getNum?userid="+id).then(res=>{
        this.blogNum=res.data.data;
        this.isLoad=false;
      })
    },
    remove(id){
      this.$confirm('是否删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get("/message/deleteById?id="+id).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 100
          });
          this.getAll();
        });
      })

    }
  },
  created() {
    this.getAll();
    if(this.$store.getters.getUser.id!=null){
      this.isLoad=true;
      this.Login_id=this.$store.getters.getUser.id;
    }
  }
}
</script>


<style scoped>
@import "../../static/html/font-awesome/css/font-awesome.min.css";
@import "../../static/html/css/timeline.css";
@import "../../static/html/css/master.css";
@import "../../static/html/css/gloable.css";
@import "../../static/html/css/nprogress.css";
@import "../../static/html/layui/css/layui.css";
@import "../../static/html/css/message.css";

</style>
