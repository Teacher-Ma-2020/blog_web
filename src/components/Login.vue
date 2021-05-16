<template>
  <div v-loading.fullscreen.lock="isLoad">
    <Header></Header>
    <div class="header">
    </div>
    <div class="container">
      <div class="login-form">
        <div class="text">登录</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%" class="demo-ruleForm" >
            <el-form-item label="账号/邮箱" prop="username">
              <el-input v-model="ruleForm.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="position: relative;bottom: 15px">
              <el-input type="password" v-model="ruleForm.password" ></el-input>
            </el-form-item>

            <div class="btn" @click="submitForm('ruleForm')">登录</div>
            <div class="other">
              没有账号？<a @click.prevent="resetForm('ruleForm')" href="#">去注册</a>
            </div>
        </el-form>
      </div>
    </div>
    <p></p>

  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "Login",
  components: {Header},
  data() {
    return {
      isLoad:false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/login",this.ruleForm).then(res=>{
            console.log(res);
            const jwt=res.headers['authorization'];
            const userInfo=res.data.data;
            console.log(userInfo);
            console.log(jwt);
            this.$store.commit("SET_TOKEN",jwt);
            this.$store.commit("SET_USERINFO",userInfo);
            if(this.$store.getters.getUser!=null){
              this.$router.push("/blogsAll")
            }
          })
        } else {

          console.log('error submit!!');
          return false;
        }

      });
    },
    resetForm(formName) {
      this.$router.push("/userAdd")
    },
    button(){
      this.$router.push("/blogs")
    }
  },
  created() {
    this.$notify({
      title: '提示',
      message: '请先登陆~',
      type: 'warning',
      offset: 100
    });
  }
}
</script>

<style>
@import "../../static/html/css/master.css";

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
  max-width: 100%;
  margin: 0 auto;
}



.container {
  height: 100%;
  background-size: cover;

}
.login-form {
  background-color: #fff;
  width: 350px;
  height: 500px;
  border-radius: 15px;

  /* 定位到中心 */
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text {
  /* 标题Login的样式 */
  font-size: 30px;
  font-weight: bold;

  text-align: center;
  line-height: 40px;
  margin-top: 40px;
}
.form-item, .btn, .other {
  margin: 40px auto;
  width: 90%;
}

input {
  width: 80%;
  /*margin-top: 20px;*/
  padding: 10px;
  /* placeholder变更为大写字体 */
  /*text-transform: uppercase;*/
  /* 边框效果 */
  border: 0;
  outline: none;
  border-bottom: 1px solid #fbc2eb;
  border-bottom: 1px solid #fff;
}
input::placeholder{
  font-weight: bold;
  color: #acb7c9;
}
input:focus {
  /* 当输入框获取焦点时的效果 */
  /*box-shadow: 0px 0px 5px #fbc2eb;*/
  border-bottom: 1px solid #fff;
  animation: bBottom 2s infinite ;
}
@keyframes bBottom {
  50% {
    border-bottom: 1px solid #a6c1ee;
  }
}
.btn {
  height: 40px;
  line-height: 40px;
  /* 字体 */
  color: #fff;
  font-weight: bold;
  letter-spacing: 10px;
  text-align: center;
  /* 鼠标样式 */
  cursor: pointer;
  /* 边框、背景 */
  border-radius: 10px;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee, #fbc2eb);
  background-size: 200%;
}
.btn:hover {
  animation: btnAnimate 1s infinite;
}
@keyframes btnAnimate {
  50% {
    background-position: 200%;
  }
}

a {
  text-decoration: none;
  color: #fbc2eb;
}


</style>
