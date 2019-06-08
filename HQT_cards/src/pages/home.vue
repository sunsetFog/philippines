<template>
    <section id="home">
          <div class="header_info">
            <div class="head_content">
              <div class="welcome" v-if="playerInfo"><img src="../../static/dream/Forma1.png"/>欢迎你,{{playerInfo.playerInfo.nickname}}</div>
              <div class="reserve">
                  <ul>
                    <li v-for="(item,index) in header_list" :class="{'reserve_border':index!=3}">{{item.title}}</li>
                  </ul>
              </div>

            </div>
            </div>
          </div>

          <div class="login_header">
              <div class="dream_contain">
                  <div class="dream_logo"></div>
                  <div class="dream_login">
                      <div class="nickname"><input type="text" placeholder="请输入用户名" maxlength="30"/></div>
                      <div class="password"><input type="text" placeholder="请输入密码" maxlength="30"/></div>
                      <button class="sign_in"></button>
                      <button class="register"></button>
                  </div>
              </div>
          </div>

          <div class="tabs_bar">
          <div class="tabs_content">
            <div class="tabs_right">
                <ul>
                  <li v-for="(item,index) in tabs_bar" :class="{'tabs_active':item.active}" @click="tabBarChange(index)">
                      {{item.title}}
                  </li>
                </ul>
            </div>          
          </div>

          <template>
            <router-view></router-view>
          </template>


          <div class="fixed_bar">
            <ul>
              <li v-for="(item,index) in fixed_bar" @click="fixedMeans(index)" @mouseover="fixedOver(index)" @mouseout="fixedOut(index)">
                <img :src="item.url"/>
              </li>
            </ul>
          </div>




          </div>
    </section>
</template>

<script>
  export default {
    name: 'Main',
    data () {
      return {
        header_list: [{title: '优惠活动大厅'},{title: '下载中心'},{title: '线路检测'},{title: '安全退出'}],
        tabs_bar: [{title: '首页',active: false,path: '/home'},{title: '棋牌游戏',active: false,path: '/cards'},{title: '电子竞技',active: false,path: '/lottery/afteryards'},{title: '真人娱乐',active: false,path: '/realperson'},{title: '体育竞技',active: false,path: '/sports'},{title: '优惠活动',active: false,path: '/videogame'},{title: 'vip俱乐部',active: false,path: '/baoyou'},{title: '管理中心',active: false,path: '/mcenter/crux'}],
        fixed_bar: [{url: '../../static/dream/jiangyuan_nomal.png'},{url: '../../static/dream/kefu_nomal.png'},{url: '../../static/dream/zhiding_nomal.png'}],
        playerInfo: ''
        
      }
    },
    created(){
      this.tabs_bar[this.$route.meta.navigation].active = true;
      if('undefined' != typeof web){
          this.playerInfo = web.game_getPlayer();
          // console.log('home====',this.playerInfo);
      }
    },
    watch: {
        $route(to,from){
          this.tabEmptyActive();
          this.tabs_bar[to.meta.navigation].active = true;
        }
    },
    methods:{
      //导航栏
      tabBarChange(index){
        this.tabEmptyActive();
        this.tabs_bar[index].active = true;
        this.$router.push({path: this.tabs_bar[index].path});
      },
      //初始tab
      tabEmptyActive(){
        for(let i=0;i<this.tabs_bar.length;i++){
          this.tabs_bar[i].active = false;
        }
      },
      //返回顶部
      backTop() {
        var scrollHight = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        if (scrollHight > 50) {
          document.documentElement.scrollTop = document.body.scrollTop = (scrollHight - 100)
            setTimeout(() => {
              this.backTop()
              }, 2)
        } else {
          document.documentElement.scrollTop = document.body.scrollTop = 0
        }
      },
      //固定定位
      fixedMeans(index){
        if(index==2){
          this.backTop();
        }
      },
      fixedOver(index){
        if(index==0){
          this.fixed_bar[index].url = '../../static/dream/jiangyuan_hover.png';
        }else if(index==1){
          this.fixed_bar[index].url = '../../static/dream/kefu_hover.png';
        }else if(index==2){
          this.fixed_bar[index].url = '../../static/dream/zhiding_hover.png';
        }
      },
      fixedOut(index){
        if(index==0){
          this.fixed_bar[index].url = '../../static/dream/jiangyuan_nomal.png';
        }else if(index==1){
          this.fixed_bar[index].url = '../../static/dream/kefu_nomal.png';
        }else if(index==2){
          this.fixed_bar[index].url = '../../static/dream/zhiding_nomal.png';
        }
      },
    },
    beforeCreate(){
      if (!sessionStorage.getItem('token')){
        this.$router.push({name:'Login'});
      }
    }
  }
</script>


<style lang="less" scoped>
#home{
  .tabs_active{
    color: #ffea00;
    .mixin_image(url('../../static/dream/tabs_active.png'));
    font-size: @font_size16;;
  }
  .fixed_bar{
    width: 136px;
    height: 160px;
    .mixin_image(url('../../static/dream/xuanfuchuang.png'));
    border-radius: 4px;
    position: fixed;
    right: 20px;
    top: 400px;
    ul{
      li{
        .mixin_li(135px,53px);
        cursor: pointer;
        padding: 15px 33px;
        box-sizing: border-box;
        img{
          .mixin_img(100%,100%);
          float: left;
        }
      }
    }
  }


  text-align: left;
  .header_info{
    width: 100%;
    height: 35px;
    background: #210723;
    .head_content{
      width: 1210px;
      height: 30px;
      margin: 0 auto;
      color: @color_orange;
      font-size: @font_size12;
      line-height: 35px;
      .welcome{
        .mixin_float(180px,100%,left);
        img{
          .mixin_img(13px,13px);
          margin-right: 7px;
        }
      }
      .reserve{
        .mixin_float(auto,100%,right);
        padding-top: 8px;
        box-sizing: border-box;
        .reserve_border{
          border-right: 1px solid @color_orange;
        }
        ul{
          height: 15px;
          li{
            .mixin_li(auto,15px);
            padding: 0px 12px;
            box-sizing: border-box;
            cursor: pointer;
          }
          li:hover{
            color: #eb2020;
          }
        }
      }
    }
  }


  .login_header{
    .mixin_div(100%,110px,#1b0722,auto,left);
    .dream_contain{
      .mixin_div(1210px,110px,none,auto,left);
      margin: 0 auto;
      .dream_logo{
        .mixin_float(280px,110px,left);
        .mixin_image(url('../../static/dream/logo.png'));
      }
      .dream_login{
        .mixin_float(930px,110px,right);
        position: relative;
        .nickname,.password{
          width: 190px;
          height: 45px;
          position: absolute;
          top: 38px;
          padding: 8px 0px 0px 45px;
          box-sizing: border-box;
          input{
            .mixin_input(142px,28px);
            float: left;
            background: none;
            color: @color_white;
          }
        }
        .nickname{
          left: 290px;
          .mixin_image(url('../../static/dream/zhanghao.png'));
        }
        .password{
          left: 490px;
          .mixin_image(url('../../static/dream/mima.png'));
        }
        .sign_in{
          .mixin_button(110px,45px,none,auto);
          border-radius: 0px;
          position: absolute;
          left: 690px;
          top: 38px;
          .mixin_image(url('../../static/dream/dengru_nomal.png'));
        }
        .sign_in:hover{
          .mixin_image(url('../../static/dream/dengru_hover.png'));
        }
        .register{
          .mixin_button(110px,45px,none,auto);
          border-radius: 0px;
          position: absolute;
          left: 810px;
          top: 38px;
          .mixin_image(url('../../static/dream/zhuce_nomal.png'));
        }
        .register:hover{
          .mixin_image(url('../../static/dream/zhuce_hover.png'));
        }
      }
    }
  }

  .tabs_bar{
    width: 100%;
    height: 60px;
    .mixin_image(url('../../static/dream/tab_image.png'));
    .tabs_content{
      width: 1100px;
      height: 60px;
      margin: 0 auto;
      .tabs_right{
        width: 100%;
        height: 60px;
        ul{
          color: @color_white;
          li{
            .mixin_li(12.5%,60px);
            cursor: pointer;
            font-size: @font_size16;
          }
          li:hover{
            color: #ffea00;
            .mixin_image(url('../../static/dream/tabs_active.png'));
          }
        }
      }
    }

  }
}
</style>
