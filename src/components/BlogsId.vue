<template>
  <div v-loading.fullscreen.lock="isLoad">
<!--    <div class="header">-->
<!--    </div>-->
    <Header></Header>
    <div class="block">
      <br/>
      <br/>
      <div style="margin: 0 auto;text-align: center;font-size: 30px"><span style="color: dodgerblue">{{this.username}}</span>  博客管理</div>
      <div class="mpage" style="color: #409EFF;font-size: 25px" v-if="this.blogs.length==0"><br/>{{text}}</div><br/>
      <el-timeline>
        <el-timeline-item style="height: 150px" :timestamp="blog.created" placement="top" v-for="blog in blogs" :key="blog.id">
          <el-card style="height: 130px;">
            <h3>
              <router-link  class="font" :to="{name:'BlogDetail',params:{blogId: blog.id}}">{{ blog.title }}</router-link>
            </h3>
            <span class="ml20" style="float: right">
              <i class="fa fa-comments fs-16"></i>
              <a class="num fc-grey">{{blog.commentCount}}</a>
            </span>
            <span class="read" style="float: right">
                <i class="fa fa-eye fs-16"></i>
                <i class="num">{{blog.view}}</i>&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            <p><i class="el-icon-user-solid">:{{blog.userName}}</i></p>

            <span v-if="username" class="but" style="float: right">
              <router-link :to="{name:'BlogDetail',params:{blogId: blog.id}}">
                <el-link>
                <i class="el-icon-zoom-in">查看</i>
                </el-link>

              </router-link>
              &nbsp;
              <router-link :to="{name:'BlogEdit',params:{blogId:blog.id}}">
                <el-link icon="el-icon-edit">
                  编辑
                </el-link>
              </router-link>&nbsp;

              <el-link @click="remove(blog.id)">
                <i class="el-icon-delete"></i>删除
              </el-link>
            </span>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-pagination class="mpage"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "BlogsId",
  data() {
    return {
      isLoad:true,
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      radio: '1',
      userID:'',
      username:'',
      text:"快去发表一篇属于您的博客吧~",
      isLogin:''
    }
  },
  components: {Header},
  methods: {
    page(currentPage) {
        this.$http.get("/blogSelf?currentPage=" +currentPage+"&userID="+this.userID).then(res => {
          console.log(res);
          this.blogs = res.data.data.records;
          this.currentPage = res.data.data.current;
          this.total = res.data.data.total;
          this.pageSize = res.data.data.size;
        })

    },
    all(){
      this.page(1)
    },
    self(){
      this.isLoad=true;
      this.$http.get("/blogSelf?currentPage=" +1+"&userID="+this.userID).then(res => {
        this.blogs = res.data.data.records;
        this.currentPage = res.data.data.current;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.size;
        console.log(this.blogs);
        this.isLoad=false;
      })
    },
    remove(id){
      this.$http.get("/deleteBlog/"+id,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
        this.$alert('删除成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push("/blogs");
          }
        });
      })
    }
  },
  created() {
    if(this.$store.getters.getUser==null) {
      this.$router.push("/login")
    }
    this.page(1)
    this.username=this.$store.getters.getUser.username
    this.userID=this.$store.getters.getUser.id
    this.self()
  }
}
</script>

<style scoped>
@import "../../static/html/font-awesome/css/font-awesome.min.css";
.mpage{
  text-align: center;
  margin: 0 auto;
}
.block{
  max-width: 60%;
  margin: 0 auto;
  margin-bottom: 50px;
}
.font{
  text-decoration: none;
  color: dodgerblue;
}
#button{
  text-align: right;
}
</style>
