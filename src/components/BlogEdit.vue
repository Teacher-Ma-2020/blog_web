<template>
  <div >
    <Header></Header>
    <br/><br/>
    <div class="content" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo">
        <el-dialog
          title="发布文章"
          :visible.sync="dialogVisible"
          width="50%"
          style="min-width: 300px"
          :before-close="handleClose2">

          <center >
            <table >
              <tr>
                <th width="30%" colspan="2" style="text-align: center;top: 50%">选择封面</th>
              </tr>
              <tr>
                <th style="width: 150px">
                  <p >
                    <el-select v-model="value"  placeholder="请选择封面"  >
                      <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>

                      </el-option-group>
                    </el-select>
                  </p>

                </th>
                <th rowspan="2">
                  <br/>
                  <div class="block">
                    <el-image  style="width: 250px" :src="value"></el-image>
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  <br/>
                  <br/>
                  <el-upload
                    style="text-align: left;"
                    :on-change="handleChange"
                    class="upload-demo"
                    :file-list="fileList"
                    action="http://121.43.55.23:8082/file/upload"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button size="small" style="text-align: left;position: relative;bottom: 40px;height: 40px;width: 150px" type="success" plain>自定义上传头像</el-button>
                  </el-upload>
                </th>
              </tr>
              <tr>
                <th colspan="2"> <el-divider></el-divider></th>
              </tr>
              <tr>
                <th width="30%">添加标签</th>
                <th>
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                </th>
              </tr>

            </table>
          </center>


          <span slot="footer" class="dialog-footer" >
            <el-button type="primary"  style="display:block;margin:0 auto"  @click="add">立即发布</el-button>
          </span>
        </el-dialog>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="内容" prop="content">
          <br>
          <mavon-editor v-model="ruleForm.content" ></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check('ruleForm')">立即发布</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "BlogEdit.vue",
  components: {Header},
  data() {
    return {
      options: [{
        label: '技术',
        options: [{
          value: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702920847,3662520481&fm=26&gp=0.jpg',
          label: 'JAVA'
        }, {
          value: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3333570781,1529734517&fm=26&gp=0.jpg',
          label: 'Web前端'
        }, {
          value: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1992957895,1857964234&fm=26&gp=0.jpg',
          label: 'C/C++'
        }, {
          value: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2469633999,360727979&fm=26&gp=0.jpg',
          label: 'Python'
        }, {
          value: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=965628896,650805426&fm=26&gp=0.jpg',
          label: 'Spring'
        }, {
          value: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2655750139,1295830505&fm=15&gp=0.jpg',
          label: 'SpringMvc'
        }, {
          value: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1848890862,3489121475&fm=26&gp=0.jpg',
          label: 'Mybatis'
        }, {
          value: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4185388668,542479084&fm=26&gp=0.jpg',
          label: 'SpringBoot'
        }, {
          value: 'https://ss1.baidu.com/6ON1bjeh1BF3odCf/it/u=3322633560,3972377570&fm=27&gp=0.jpg',
          label: 'SpringCloud'
        }]
      }, {
        label: '生活',
        options: [{
          value: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455716236,3549213073&fm=26&gp=0.jpg',
          label: '文章'
        }, {
          value: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885943155,1626385572&fm=26&gp=0.jpg',
          label: '日记'
        }, {
          value: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=47680904,667119599&fm=11&gp=0.jpg',
          label: '天气'
        }, {
          value: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=238771295,4007404481&fm=26&gp=0.jpg',
          label: '植物'
        }, {
          value: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2626653714,97930641&fm=26&gp=0.jpg',
          label: '旅游'
        }, {
          value: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2164183130,1694053844&fm=26&gp=0.jpg',
          label: '远方'
        }]
      }],
      value: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702920847,3662520481&fm=26&gp=0.jpg',
      dialogVisible: false,
      dynamicTags: ['博客'],
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        id:'',
        title: '',
        description: '',
        content:'',
        avatar:''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
        content: [
          { required: true,trigger: 'blur' }
        ],
      },
      fileList: []
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {

      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleClose2(done) {
      this.$confirm('放弃提交？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    check(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = true
          }
      })
    },
    add(){
      this.ruleForm.avatar=this.value;
      this.ruleForm.dynamicTags=this.dynamicTags;
      this.submitForm('ruleForm')
      this.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/blog/edit",this.ruleForm,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res=>{
            this.$alert('发布成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push("/blogsAll")
              }
            });
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
        this.value="http://18163126.top:8080/img/"+fileList[0].response.data;
        this.$notify({
          title: '',
          message: '封面上传成功',
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
    const blogId=this.$route.params.blogId
    if(blogId){
      this.$http.get("/blog/"+blogId).then(res=>{
        const blog=res.data.data;
        this.ruleForm.id=blogId;
        this.ruleForm.title=blog.title;
        this.ruleForm.description=blog.description;
        this.ruleForm.content=blog.content;
        console.log(blog)
        this.value=blog.avatar;
        this.dynamicTags=blog.dynamicTags;

      })
    }
  }
}
</script>

<style scoped>
@import "../../static/html/font-awesome/css/font-awesome.min.css";
@import "../../static/html/css/blog.css";
.content{
  text-align: center;
  margin: 0 auto;
  width: 95%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
