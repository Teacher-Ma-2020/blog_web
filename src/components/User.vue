<template>
  <div style="background-image: url(https://yssimage.oss-cn-hangzhou.aliyuncs.com/bg9.jpg);height: 1000px">
    <Header></Header>
    <div style="width: 20%;height: 70%;background-color: white;margin: 0 auto;text-align: center;border-radius: 15px;position:relative;top: 20px">
      <div style="position: relative;top: 20px">
        <div class="text">个人信息</div>
        <el-container>

          <el-main >

            <el-form  ref="ruleForm" label-width="100px" class="add_width">

                <el-avatar :size="80" :src="ruleForm.avatar" ></el-avatar>
            </el-form>
            <table style="line-height: 48px;font-size: 16px;text-align: center;width: 100%">
              <tr>
                <th style="color:#3e8bc7">用户名</th>
                <th >{{this.ruleForm.username}}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">生日</th>
                <th>{{ this.ruleForm.created.substr(0,10) }}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">邮箱</th>
                <th>{{ this.ruleForm.email }}</th>
              </tr>
              <tr>
                <th style="color:#3e8bc7">博客数量</th>
                <th>{{ this.blogNum }}</th>
              </tr>
              <tr style="height: 120px">
                <th style="text-align: right"><router-link to="userUpdate"><el-button type="primary"  round>修改信息</el-button></router-link></th>
                <th><router-link to="/blogsAll"><el-button round>返回博客</el-button></router-link></th>
              </tr>
            </table>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
name: "User",
  components: {Header},
  data() {
    return {
      ruleForm: {
      },
      blogNum:0
    };
  },
  methods: {
  },
  created() {
    if(this.$store.getters.getUser==null){
      this.$router.push("/login")
    }else {
      this.$http.get("/user/findName/"+this.$store.getters.getUser.id).then(res=>{
        this.ruleForm= res.data.data
        this.$http.get("/getNum?userid="+this.$store.getters.getUser.id).then(res=>{
          this.blogNum=res.data.data;
        })
      })

    }
  }
}
</script>

<style scoped>
/*@import "../html/css/login.css";*/
/*@import "../html/css/master.css";*/
.add{
  width: 100%;
  margin: 0 auto;
}
.logo{
  height: 60%;
  margin-top: 10px;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.demo-ruleForm{
  margin: 0 auto;
}
.button{
  margin-right: 30px;
}
.add_width{
  width:90%;
  margin: 0 auto;
}
.photo{
  float: left;
}
.text {
  /* 标题Login的样式 */
  font-size: 30px;
  font-weight: bold;

  text-align: center;
  /*line-height: 80px;*/
  /*margin-top: 40px;*/
}
</style>
