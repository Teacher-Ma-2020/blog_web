<template>
  <div>
    <Header></Header>
    <div class="header">
    </div>
    <div class="doc-container" id="doc-container">
      <div class="container-fixed">
        <div class="timeline-box shadow" STYLE="border-radius: 15px;">
          <div class="timeline-main" >
            <h1><i class="fa fa-clock-o"></i>日记</h1>
            <div class="timeline-line"></div>
            <div class="timeline-year">
              <h2><a class="yearToggle">开发日志</a><i class="fa fa-caret-down fa-fw"></i></h2>
              <div class="timeline-month" >
                <ul>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-5-6</p>
                    </div>
                    <p class="dot-circle animated"><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">项目上线，修复了部分bug，功能后续待完善</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-5-5</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">博客添加了封面和标签,以及搜索功能</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-5-4</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">添加了用户的信息查看，以及基本的信息修改</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-5-2</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">添加了邮箱验证码校验</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-4-28</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">博客页面添加了浏览量、评论等功能，完善了用户登陆、注册模块等前端布局</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-4-25</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">完善博客详情页面的查询、浏览，以及用户模块的管理博客页面的开发</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-4-23</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p style="text-align: left;">使用前端资源重构项目，并设计了更多的模块，且完成了留言模块的开发</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-3-22</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p><span>使用Element-UI，完成前端的基本布局，并于后端接口进行对接</span></p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-3-18</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p><span>后端完成基本的接口，包括博客的增删改查，用户的注册、登陆、退出等</span></p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date">2021-3-15</p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight re"><p>博客项目构建，完成建库建表</p></div>
                  </li>

                </ul>
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div class="timeline-line"></div>
            <div class="timeline-year">
              <h2><a class="yearToggle">一路向北</a><i class="fa fa-caret-down fa-fw"></i></h2>
              <div class="timeline-month">
                <ul>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight">愿你历经千帆，归来仍是少年。</div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p><span>没人在乎你怎样在深夜痛哭，也没人在乎你辗转反侧的要熬几个秋。外人只看结果，自己要独撑过程。等我们都明白了这个道理，便不会再在人前矫情，四处诉说以求宽慰。</span></p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p><span>当你的才华还撑不起你的野心时，那你就应该静下心来学习。</span></p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p>愿你岁月无波澜，敬我余生不悲欢！</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p><span>林花谢了春红，太匆匆，无奈朝来寒雨晚来风。</span><span>胭脂泪，相留醉，几时重？自是人生长恨水长东。&nbsp; &nbsp;&nbsp;</span><span></span></p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p style="text-align: left;"><span>今生今世，我们所走的路都错了，时间不对，地点也不对&nbsp; &nbsp; &nbsp;</span>来生，我们再会，来生，我会等你&nbsp; &nbsp;&nbsp;</p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p><span>人面不知何处去，桃花依旧笑春风。</span></p></div>
                    <div class="clear"></div>
                  </li>
                  <li>
                    <div class="h4 animated fadeInLeft">
                      <p class="date"></p>
                    </div>
                    <p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
                    <div class="content animated fadeInRight"><p>风的季节</p></div>
                    <div class="clear"></div>
                  </li>

                </ul>
              </div>
            </div>
            <h1 style="padding-top:4px;padding-bottom:2px;margin-top:40px;"><i class="fa fa-hourglass-end"></i>THE END</h1>
          </div>
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
  name: "Log",
  components: {Header}
}
</script>

<style scoped>
@import "../../static/html/css/timeline.css";
@import "../../static/html/font-awesome/css/font-awesome.min.css";
@import "../../static/html/css/master.css";
@import "../../static/html/css/animate.min.css";

.re{
}
</style>
