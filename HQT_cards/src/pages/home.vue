<template>
    <section id="home">
          <div class="header_info">
            <div class="head_content">
              <div class="welcome"><span v-if="playerInfo">欢迎你,{{playerInfo.playerInfo.nickname}}</span></div>
              <div class="reserve"><span>预留信息:</span><span>安全退出</span></div>
              <div class="balance"><span>余额:</span><span>￥0.0000</span></div>
              <div class="refresh"><span>刷新</span></div>
              <div class="rechange"><Button size="small" style="background: #16a2d5;color: #edebf0;">充值</Button></div>
              <div class="drawing"><Button size="small" style="background: #7f6c5b;color: #edebf0;">提款</Button></div>
              <div class="customer_service">客服</div>
            </div>
            </div>
          </div>
          <div class="tabs_bar">
          <div class="tabs_content">
            <div class="tabs_left"><img src=""/></div>
            <div class="tabs_right">
                <ul>
                  <li v-for="(item,index) in tabs_bar" :class="{'tabs_active':item.active}" @click="tabBarChange(index)">
                    <router-link :to="{path: item.path}">
                      <span>{{item.title}}</span>
                    </router-link>
                  </li>
                </ul>
            </div>          
          </div>

          <template>
            <router-view></router-view>
          </template>


          <div class="fixed_bar">
            <ul>
              <li v-for="(item,index) in fixed_bar">
              <img :src="item.url"/>
              <span>{{item.title}}</span>
              </li>
              <li style="background: none;" @click="backTop()"><img src=""/><span>TOP</span></li>
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
        tabs_bar: [{title: '首页',active: false,path: '/home'},{title: '棋牌',active: false,path: '/cards'},{title: '彩票',active: false,path: '/lottery'},{title: '真人',active: false,path: '/realperson'},{title: '体育',active: false,path: '/sports'},{title: '电玩',active: false,path: '/videogame'},{title: '宝友',active: false,path: '/baoyou'},{title: '管理中心',active: false,path: '/mcenter'}],
        fixed_bar: [{title: '客服',url: ''},{title: 'APP',url: ''},{title: '我的',url: ''},{title: '聊天',url: ''},{title: '帮助',url: ''},{title: '声音',url: ''},{title: 'PC',url: ''},{title: '充值',url: ''}],
        playerInfo: ''
        
      }
    },
    created(){
      this.tabs_bar[this.$route.meta.navigation].active = true;
      if('undefined' != typeof web){
          this.playerInfo = web.game_getPlayer();
          console.log('home====',this.playerInfo);
      }
    },
    methods:{
      //导航栏
      tabBarChange(index){
        for(let i=0;i<this.tabs_bar.length;i++){
          this.tabs_bar[i].active = false;
        }
        this.tabs_bar[index].active = true;
      },
      //返回顶部
      backTop() {
        var scrollHight = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        if (scrollHight > 50) {
          document.documentElement.scrollTop = document.body.scrollTop = (scrollHight - 15)
            setTimeout(() => {
              this.backTop()
              }, 2)
        } else {
          document.documentElement.scrollTop = document.body.scrollTop = 0
        }
      }
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
    color: black;
    background: #c2a060;
    font-size: 18px;
  }
  .fixed_bar{
    width: 64px;
    height: 590px;
    background: #293952;
    border-radius: 4px;
    position: fixed;
    right: 5px;
    top: 235px;
    ul{
      li{
        width: 60px;
        height: 60px;
        border-radius: 4px;
        background: #3f65a3;
        margin-top: 5px;
        margin-left: 2px;
        text-align: center;
        img{
          width: 30px;
          height: 30px;
          margin-top: 6px;
        }
        span{
          width: 100%;
          height: 25px;
          line-height: 25px;
          color: white;
          display: inline-block;
        }
      }
    }
  }


  text-align: left;
  .header_info{
    width: 100%;
    height: 35px;
    background: #1f201a;
    .head_content{
      width: 1020px;
      height: 35px;
      margin: 0 auto;
      -background: white;
      color: white;
      line-height: 35px;
      .welcome{
        width: 180px;
        float: left;
      }
      .reserve{
        width: 150px;
        float: left;
        margin-left: 20px;
        span:nth-of-type(2){
          margin-left: 15px;
          text-decoration: underline;
        }
      }
      .balance{
        width: 110px;
        float: left;
        margin-left: 270px;
      }
      .refresh{
        width: 65px;
        float: left;
        margin-left: 10px;
      }
      .rechange{
        width: 55px;
        float: left;
        margin-left: 15px;
        text-align: center;
      }
      .drawing{
        width: 55px;
        float: left;
        margin-left: 10px;
        text-align: center;
      }
      .customer_service{
        width: 60px;
        float: left;
        margin-left: 15px;
      }
    }
  }
  .tabs_bar{
    width: 100%;
    height: 60px;
    background: #2e230f;
    .tabs_content{
      width: 1100px;
      height: 60px;
      margin: 0 auto;
      .tabs_left{
        width: 15%;
        height: 60px;
        float: left;
        img{
          width: 100px;
          height: 60px;
          float: right;
          margin-right: 50px;
        }
      }
      .tabs_right{
        width: 85%;
        height: 60px;
        float: right;
        ul{
          color: white;
          li{
            width: 12.5%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            float: left;
            span{
              width: 100%;
              height: 100%;
              display: inline-block;
            }
            a{
              color: white;
            }
          }
          li:hover{
            color: black;
            background: #c2a060;
          }
        }
      }
    }

  }
}
</style>
