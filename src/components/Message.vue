<template>
  <div v-loading.fullscreen.lock="isLoad">
    <Header></Header>
    <div class="header">
    </div>
    <div class="doc-container" id="doc-container">
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
    <footer class="grid-footer">
      <div class="footer-fixed">
        <div class="copyright">
          <div class="info">
            <div class="contact">
              <a href="https://wpa.qq.com/msgrd?v=3&uin=319991012&site=qq&menu=yes" class="qq" target="_blank" title="319991012"><i class="fa fa-qq"></i></a>
              <a href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=319991012@qq.com" class="email" target="_blank" title="319991012@qq.com"><i class="fa fa-envelope"></i></a>
            </div>
            <p class="mt05">
              Copyright &copy; 2018-2022 风的季节 All Rights Reserved V.1.0.0 蜀ICP备18008600号
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
      textarea: '',
      messages:{},
      messageAdd:{
        user_id:0,
        content:""
      }
    }
  },
  methods:{
    addMessage(){
      if (this.$store.getters.getUser!=null){
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
                  this.$router.push("/messAge");
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
    getAll(){
      this.isLoad=true;
      this.$http.get("/message/getAll").then(res=>{
        this.messages=res.data.data;
        this.isLoad=false;
      })
    }
  }
  ,
  created() {
    this.getAll();
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
