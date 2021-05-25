<template>
  <div class="m-content" style="background-color: white" v-loading.fullscreen.lock="isLoad">
    <br/>
    <br/>

    <header class="gird-header">
      <div class="header-fixed">
        <div class="header-inner">
          <a href="javascript:void(0)" class="header-logo"  id="logo">ZCJ</a>
          <nav class="nav" >
            <ul>
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/blogsAll">博文</router-link></li>
              <li><router-link to="/blogadd">发表</router-link></li>
              <li><router-link :to="{name:'BlogsId',params:{blogId:this.userID}}" style="text-decoration: none;">管理</router-link></li>
              <router-link to="/messAge"><li><a >留言</a></li></router-link>
              <router-link to="/log"><li><a >开发日志</a></li></router-link>
              <router-link to="/about"><li><a >关于</a></li></router-link>
            </ul>
          </nav>

          <span class="el-dropdown-link">
            <a style="margin: 5px auto" class="blog-user">

              <span class="el-dropdown-link">
              <el-dropdown >
                <span class="el-dropdown-link" style="font-size: 17px">
                  <el-avatar :size="50" :src="user.avatar"></el-avatar>{{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu  slot="dropdown"  style="width: 100px;text-align: center">
                  <router-link to="/login"><el-dropdown-item v-if="!hasLogin" >登陆</el-dropdown-item></router-link>
                  <router-link to="/userAdd" ><el-dropdown-item v-if="!hasLogin" >注册</el-dropdown-item></router-link>
                  <router-link to="/user" ><el-dropdown-item>个人信息</el-dropdown-item></router-link>
                  <router-link to="/userUpdate" ><el-dropdown-item>修改信息</el-dropdown-item></router-link>
                  <router-link to="/blogadd"><el-dropdown-item>发表博客</el-dropdown-item></router-link>
                  <router-link :to="{name:'BlogsId',params:{blogId:this.userID}}" style="text-decoration: none;"><el-dropdown-item>管理博客</el-dropdown-item></router-link>
                  <span @click="logout" v-if="hasLogin"><el-dropdown-item >退出</el-dropdown-item></span>
                </el-dropdown-menu>
              </el-dropdown>
              </span>
            </a>
          </span>


        </div>
      </div>
    </header>
  </div>


</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      user:{
        username:"请先登陆",
        avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
      hasLogin:false,
      activeIndex: '1',
      activeIndex2: '1',
      userID:"",
      input:"",
      isLoad:false
    }
  },
  methods:{
    logout(){
      this.hasLogin=false;
      this.isLoad=true;
      this.$http.get("/logout",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res=>{
        this.isLoad=false;
        this.$store.commit("REMOVE_INFO")
        this.$router.push("/login")
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    if (this.$store.getters.getUser.id!=null){
      this.user.username=this.$store.getters.getUser.username;
      this.user.avatar=this.$store.getters.getUser.avatar;
      this.userID=this.$store.getters.getUser.id;
      this.hasLogin=true;
    }else{
      this.hasLogin=false;
    }
  }
}
</script>

<style scoped>

@import "../../static/html/layui/css/layui.css";
@import "../../static/html/css/master.css";
@import "../../static/html/css/gloable.css";
@import "../../static/html/css/nprogress.css";


  .m-content{
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .maction{
    margin: 10px 0;
  }
  .head5{
    float: right;
    font-size: 15px;
  }
  .headImg{
    position: relative;
    left: 300px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
