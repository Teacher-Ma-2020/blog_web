<template>
  <div style="background-image: url(https://yssimage.oss-cn-hangzhou.aliyuncs.com/bg9.jpg);height: 1000px">
    <Header></Header>
    <div style="width: 30%;min-width: 300px;height: 70%;background-color: white;margin: 0 auto;text-align: center;border-radius: 15px;position:relative;top: 20px">
      <div style="position: relative;top: 20px">
        <div  class="text">信息修改</div>

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
                <el-avatar :size="100" :src="ruleForm.avatar" ></el-avatar>
                <el-upload
                  style="text-align: left"
                  :on-change="handleChange"
                  class="upload-demo"
                  :file-list="fileList"
                  action="http://121.43.55.23:8082/file/upload"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-button size="small" style="text-align: left;position: relative;bottom: 40px" type="primary">自定义上传头像</el-button>
                </el-upload>

              </el-form-item>
              <el-form-item label="用户名" v-if="!isUser"  required>
                <el-input v-model="ruleForm.username" disabled  style="width: 58%;float: left" ></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password"  v-if="!isPass"  required>
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width:58%;float: left" disabled  ></el-input><el-button type="success" @click="isPass=true;ruleForm.password=''" round>修改密码</el-button>
              </el-form-item>

              <el-form-item label="新密码"  prop="password"  v-if="isPass" required>
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" v-if="isPass" required>
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" style="text-align: left" required>
                <el-input v-model="ruleForm.email" disabled  style="width: 58%;float: left" ></el-input>
              </el-form-item>
              <el-form-item prop="emailNum" label="验证码" required>
                <el-input v-model="ruleForm.emailNum"  style="width: 58%;float: left"></el-input><el-button type="primary" v-show="!isEmail" @click="getEmailNum" round>获取验证码</el-button><el-button type="primary" v-show="isEmail" disabled round>{{this.count}}</el-button>
              </el-form-item>
              <el-form-item class="button">
                <br/>
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                <router-link to="/user"><el-button >返回信息</el-button></router-link>
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
  name: "UserUpdate",
  components: {Header},
  inject: ['reload'],
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
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/d153e662307f41b18d2c7188d689518d.jpeg',
        label: '阿卡丽'
      }, {
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/73db30575ec347f59eae64ef069ddee9.jpeg',
        label: '盲僧'
      }, {
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/cc303a648439498fa1ce8c2cec3e55d5.jpeg',
        label: '阿狸'
      }, {
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/8b8cad5c0e70458d9024a4b64542606e.jpeg',
        label: '刀妹'
      }, {
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/e2eb516023d34923abaf67768fe4ad0d.jpeg',
        label: '诺手'
      }, {
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/485bdf862fdb48709268707526ceaf1f.jpeg',
        label: '锐雯'
      }, {
        avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20190515/07240014b17a471799e50af9cfd00b71.jpeg',
        label: '男枪'
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
      isPass:false,
      isUser:false,
      user_c:"user_chess",
      pass_c:"password",
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
        emailNum:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      fileList: []
    };
  },
  methods: {
    logout() {
      this.$http.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(123);
        this.$store.commit("REMOVE_INFO")
        this.$router.push("/login")
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          //判断验证码是否正确
          this.$http.get("/email/check/"+this.ruleForm.email+"/"+this.ruleForm.emailNum).then(res=>{
            if(res.data.data){
              this.$http.post("user/update",this.ruleForm).then(res=>{
                console.log(res);
                this.$alert('请重新登陆', '修改成功', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.logout();
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
          message: '请输入邮箱',
          type: 'warning',
          offset: 100
        });
      }else if (!regEmail.test(this.ruleForm.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
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
          if (res.data.data){
            this.$notify({
              title: '发送成功',
              message: '邮件发送成功，请查看您的邮箱~',
              type: 'success',
              offset: 100
            });
          }else{
            this.$notify({
              title: '发送失败',
              message: '发送失败,请确认您的邮箱是否正确！',
              type: 'error',
              offset: 100
            });
          }
        })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type==='image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error({
          message:"上传头像图片只能是 JPG/PNG 格式!",
          type:"error",
          offset: 100
        });
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleChange(file, fileList) {
      this.fileList = [file]
      if (fileList[0].response!=null){
        this.ruleForm.avatar="http://18163126.top:8080/img/"+fileList[0].response.data;
        this.$notify({
          title: '',
          message: '头像上传成功',
          type: 'success',
          offset: 100
        });
      }
    },
  },
  created() {
    if(this.$store.getters.getUser==null) {
      this.$router.push("/login")
    }
    this.$http.get("/user/findName/"+this.$store.getters.getUser.id).then(res=>{
    console.log(res.data.data);
    this.ruleForm=res.data.data;

  })
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

