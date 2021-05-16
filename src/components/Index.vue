
<template>
  <div>
    <div class="section" id="section1">
      <div class="fp-tablecell">
        <div class="page1">
          <div class="nav zoomIn" >
            <h1>风的季节</h1>
            <p>愿你历经千帆,归来仍是少年</p>
            <router-link to="/blogsAll"><a class="layui-btn layui-btn-normal" style="margin-top: 20px" href="#">Enter Blog</a></router-link>
          </div>
          <a class="next wow fadeInUp" data-wow-duration="2s" id="next" href="#section2"></a>
        </div>
      </div>
    </div>
    <div class="section" id="section2">
      <div class="fp-tablecell">
        <div class="page2">
          <div class="warp-box">
            <div class="new-article">
              <div class="inner wow fadeInDown" data-wow-delay=".2s">
                <h1>置顶文章</h1>
                <p>
                  很想给你写封信,告诉你这里的天气.
                  <br>昨夜的那场电影,还有我的心情.
                </p>
              </div>
            </div>
            <div class="layui-row">
              <div class="layui-col-xs12 layui-col-sm4 layui-col-md4  wow fadeInUp" style="padding: 0 10px">
                <div class="single-news">
                  <div class="news-head">
                    <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455716236,3549213073&fm=26&gp=0.jpg">
                    <router-link to="/blogDetail/31"><a href="#" class="link"><i class="fa fa-link"></i></a></router-link>
                  </div>
                  <div class="news-content">
                    <h4>
                      <router-link to="/blogDetail/31"><a href="#">
                        慢慢忘却
                      </a></router-link>
                    </h4>
                    <div class="date">
                      2021年5月7日
                    </div>
                    <p>
                    </p>
                    <router-link to="/blogDetail/31"><a href="#" class="btn">
                      阅读更多
                    </a></router-link>
                  </div>
                </div>
              </div>
              <div class="layui-col-xs12 layui-col-sm4 layui-col-md4  wow fadeInUp" style="padding: 0 10px">
                <div class="single-news">
                  <div class="news-head">
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4185388668,542479084&fm=26&gp=0.jpg">
                    <router-link to="/blogDetail/23"><a href="#" class="link"><i class="fa fa-link"></i></a></router-link>
                  </div>
                  <div class="news-content">
                    <h4>
                      <router-link to="/blogDetail/23"><a href="#">
                        SpringBoot笔记
                      </a></router-link>
                    </h4>
                    <div class="date">
                      2021年5月6日
                    </div>
                    <p>
                    </p>
                    <router-link to="/blogDetail/23"><a href="#" class="btn">
                      阅读更多
                    </a></router-link>
                  </div>
                </div>
              </div>
              <div class="layui-col-xs12 layui-col-sm4 layui-col-md4  wow fadeInUp" data-wow-delay=".4s" style="padding: 0 10px">
                <div class="single-news">
                  <div class="news-head">
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702920847,3662520481&fm=26&gp=0.jpg">
                    <router-link to="/blogDetail/26"><a href="#" class="link"><i class="fa fa-link"></i></a></router-link>
                  </div>
                  <div class="news-content">
                    <h4>
                      <router-link to="/blogDetail/26"><a href="#">
                        数据结构与算法
                      </a></router-link>
                    </h4>
                    <div class="date">
                      2021年5月6日
                    </div>
                    <p>
                    </p>
                    <router-link to="/blogDetail/26"><a href="#" class="btn">
                      阅读更多
                    </a></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section" id="section3">
      <div class="fp-tablecell">
        <div class="page3">
          <div class="warp-box">
            <div class="warp">
              <div class="inner">
                <div class="links">
                  <ul>
                    <li class="wow fadeInLeft" style="text-align: center;line-height: 100%" @click.prevent="about"><a href="">关于</a></li>
                    <li class="wow fadeInRight" ><a  href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=319991012@qq.com" target="_blank">联系</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section" id="section4">
      <div class="fp-tablecell">
        <div class="page4">
          <div class="warp-box">
            <div class="about">
              <div class="inner">
                <h1 class="wow fadeInLeft">风的季节</h1>
                <p class="wow fadeInRight">
                  爱好游戏，动漫。闲来无事时喜欢发呆放空自我，撸起代码就会废寝忘食。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer wow fadeInUp" id="contact">
      <div class="footer-top">
        <div class="container">
          <div class="layui-row">
            <div class="layui-col-xs12 layui-col-sm6 layui-col-md4">
              <div class="single-widget about">
                <div class="footer-logo">
                  <h2>风的季节</h2>
                </div>
                <p>愿你历经千帆，归来仍是少年。</p>
              </div>
            </div>
            <div class="layui-col-xs12 layui-col-sm6 layui-col-md4">
              <div class="single-widget">
                <h2>相关链接</h2>
                <ul class="social-icon">
                  <li class="active"><router-link to="/blogsAll"><a href="#"><i class="fa fa-book"></i>博文</a></router-link></li>
                  <li class="active"><router-link to="/message"><a href="#"><i class="fa fa-comments"></i>留言</a></router-link></li>
                  <li class="active"><router-link to="/log"><a href="#"><i class="fa fa-snowflake-o"></i>日志</a></router-link></li>
<!--                  <li class="active"><a href="#"><i class="fa fa-files-o"></i>归档</a></li>-->
                </ul>
              </div>
            </div>
            <div class="layui-col-xs12 layui-col-sm12 layui-col-md4">
              <div class="single-widget contact">
                <h2>联系我</h2>
                <ul class="list">
                  <li><i class="fa fa-map"></i>地址: 湖北省武汉市洪山区雄楚大道632号</li>
                  <li><i class="fa fa-qq"></i>QQ: 319991012 </li>
                  <li><i class="fa fa-envelope"></i>邮箱: 319991012@qq.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        <div class="container">
          <div class="layui-row">
            <div class="layui-col-xs12 layui-col-sm12 layui-col-md12 text-center">
              <p>Copyright &copy; 2018-2022 风的季节 All Rights Reserved V.3.1.3 蜀ICP备18008600号</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

</template>


<script>
export default {
  name: "Index.vue",
  methods:{
    about(){
      this.$router.push("/about")
    }
  }
}
</script>

<style scoped>
/*@import "../../static/html/css/master.css";*/
@import "../../static/html/layui/css/layui.css";
@import "../../static/html/font-awesome/css/font-awesome.min.css";
@import "../../static/html/css/index_style.css";
@import "../../static/html/css/animate.min.css";

</style>
