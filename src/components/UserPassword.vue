<template>
  <div style="background-image: url(https://yssimage.oss-cn-hangzhou.aliyuncs.com/bg9.jpg);height: 1000px">
    <Header></Header>
    <div  style="width: 27%;min-width: 300px;height: 58%;background-color: white;margin: 0 auto;text-align: center;border-radius: 15px;position:relative;top: 16%" >
      <div style="position: relative;top: 40px" >
        <div class="text">找回密码</div>
        <br>
        <br/>
        <el-container>
          <el-main >
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="add_width">
              <el-form-item label="邮箱" style="height: 45px" prop="email" required>
                <el-input v-model="ruleForm.email"  ></el-input>
              </el-form-item>
              <el-form-item label="修改密码" style="height: 45px"  prop="password"  required>
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" style="height: 45px" prop="checkPass" required>
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item prop="emailNum" style="height: 45px" label="验证码" required>
                <el-input v-model="ruleForm.emailNum"  style="width: 58%;float: left"></el-input><el-button type="primary" v-show="!isEmail" @click="getEmailNum" round>获取验证码</el-button><el-button type="primary" v-show="isEmail" disabled round>{{this.count}}</el-button>
              </el-form-item>
              <el-form-item class="button">
                <el-button type="primary" @click="submitForm('ruleForm')">找回密码</el-button>
                <el-button @click="toLogin" >返回登陆</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "UserAdd",
  components: {Header},
  data() {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isEmail:false,
      count: '',
      timer: null,
      ruleForm: {
        password:'',
        created: '',
        checkPass:'',
        email: '',
        emailNum:'',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        emailNum:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    file(){
      console.log(1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //判断验证码是否正确
          this.$http.get("/email/check/"+this.ruleForm.email+"/"+this.ruleForm.emailNum).then(res=>{
            if(res.data.data){
              this.$http.post("user/updatePassword",this.ruleForm).then(res=>{
                this.$alert('修改成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/login")
                  }
                });
              })
            }else{
              this.$alert('修改失败，验证码错误或超出有效时间', '提示', {
                confirmButtonText: '确定',
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push("/login");
    },
    getEmailNum(){
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

      if(this.ruleForm.email==="") {
        this.$message({
          showClose: true,
          message: '请输入邮箱',
          type: 'warning',
          offset: 100
        });
      }else if (!regEmail.test(this.ruleForm.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error',
          offset: 100
        })
      }else{
        this.isEmail=true;
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.isEmail = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.isEmail = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
        this.$http.get("/email/get?email="+this.ruleForm.email).then(res=>{
          let e=false;
          if (res.data.data){
            e=true;
            this.$notify({
              title: '发送成功',
              message: '邮件发送成功，请查看您的邮箱~',
              type: 'success',
              offset: 100
            });
          }else{
            e=true;
            this.$notify({
              title: '发送失败',
              message: '发送失败,请确认您的邮箱是否正确！',
              type: 'error',
              offset: 100
            });
          }
          setTimeout(() => {
            if (!e){
              this.$notify({
                title: '发送失败',
                message: '发送失败,请确认您的邮箱是否正确！或刷新网页',
                type: 'error',
                offset: 100
              });
            }
          }, 30000);

        })
      }
    }
  },
}
</script>

<style scoped>


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
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
