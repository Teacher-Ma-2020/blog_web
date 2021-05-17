<template>
  <div style="background-image: url(https://yssimage.oss-cn-hangzhou.aliyuncs.com/bg9.jpg);height: 1000px">
    <Header></Header>
      <div style="max-width: 500px;height: 70%;background-color: white;margin: 0 auto;text-align: center;border-radius: 15px;position:relative;top: 20px" class="zoomIn">
        <div style="position: relative;top: 20px">
          <div class="text">注册</div>
          <el-container>
            <el-main >
              <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="add_width">
                <el-form-item  label="头像"  required  >
                  <el-select v-model="ruleForm.avatar" placeholder="请选择" class="photo" style="width: 50%"  >
                    <el-option
                      v-for="item in options"
                      :key="item.avatar"
                      :label="item.label"
                      :value="item.avatar">
                    </el-option>
                  </el-select>
                  <el-avatar :size="50" :src="ruleForm.avatar" ></el-avatar>

                </el-form-item>
                <el-form-item label="用户名"  prop="username" required>
                  <el-input v-model="ruleForm.username"   ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                  <el-input type="password" v-model="ruleForm.password" autocomplete="off"  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" required>
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" required>
                  <el-input v-model="ruleForm.email"  ></el-input>
                </el-form-item>
                <el-form-item prop="emailNum" label="验证码" required>
                  <el-input v-model="ruleForm.emailNum"  style="width: 58%;float: left"></el-input><el-button type="primary" v-show="!isEmail" @click="getEmailNum" round>获取验证码</el-button><el-button type="primary" v-show="isEmail" disabled round>{{this.count}}</el-button>
                </el-form-item>
                <el-form-item label="生日" required>
                  <el-col >
                    <el-form-item prop="created"  >
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.created" style="float: left" ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item class="button">
                  <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
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
    var validateName=(rule, value, callback)=>{
      this.$http.get("/user/name/"+value).then(res=>{
        if(res.data.data!=null){
          callback(new Error("用户名已注册"))
        }else{
          callback();
        }
      })
    }

    var validateEmail=(rule, value, callback)=>{
      this.$http.get("/user/email/"+value).then(res=>{
        if(res.data.data!=null){
          callback(new Error("用户名已注册"))
        }else{
          callback();
        }
      })
    }

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
      imageUrl: '',
      options: [{
        avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=278856886,2004647430&fm=26&gp=0.jpg',
        label: '亚索'
      }, {
        avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=226155697,3281875826&fm=26&gp=0.jpg',
        label: '盖伦'
      }, {
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1261637132,3246613046&fm=26&gp=0.jpg',
        label: '剑圣'
      }, {
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4141903456,648428796&fm=26&gp=0.jpg',
        label: '赵信'
      }, {
        avatar: 'https://ss1.baidu.com/6ON1bjeh1BF3odCf/it/u=2707198734,661233760&fm=15&gp=0.jpg',
        label: '金克斯'
      }, {
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2722445516,1571741308&fm=26&gp=0.jpg',
        label: 'vn'
      }, {
        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2400920312,4079163394&fm=26&gp=0.jpg',
        label: '艾希'
      }, {
        avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2054917199,2785902222&fm=26&gp=0.jpg',
        label: '妮蔻'
      },{
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4214578008,3346099245&fm=15&gp=0.jpg',
        label: '妖姬'
      }],
      avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=278856886,2004647430&fm=26&gp=0.jpg',
      isEmail:false,
      count: '',
      timer: null,
      ruleForm: {
        username: '',
        password:'',
        created: '',
        checkPass:'',
        email: '',
        avatar:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=278856886,2004647430&fm=26&gp=0.jpg',
        emailNum:'',
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
          { validator: validateName, message: "用户名已注册"}
        ],
        created: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        qwe: [
          { required: true, message: '请选择头像',trigger: 'change'  }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: validateEmail, message: "邮箱已注册"}
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
              this.$http.post("user/save",this.ruleForm).then(res=>{
                console.log(res);
                this.$alert('注册成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/login")
                  }
                });
              })
            }else{
              this.$alert('注册失败，验证码错误或超出有效时间', '提示', {
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
          message: '请输入验证码',
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
