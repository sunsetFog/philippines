<template>
    <section id="home">
          <div class="header_info">
            <div class="head_content">
              <div class="reserve">
                  <ul>
                    <li v-for="(item,index) in header_list" :class="{'reserve_border':index!=2}" @click="lineMeans(index)">{{item.title}}</li>
                  </ul>
              </div>
                  <div class="dream_login" v-if="safeActive">
                      <div class="nickname"><input v-model="account_number" type="text" placeholder="账号" maxlength="30"/></div>
                      <div class="password"><input type="password" v-model="password_number" placeholder="密码" maxlength="30"/></div>
                      <button class="sign_in" @click="signIn"></button>
                      <button class="register"></button>
                  </div>
                  <div class="recharge_example" v-if="!safeActive">
                    <div class="example_contain">
                      <button class="drawing" @click="rechargeMeans(2)"></button>
                      <button class="recharge" @click="rechargeMeans(1)"></button>
                      <span class="exit_login" @click="safeExit()">安全退出</span>
                      <div class="balance"><span>余额&nbsp;:</span><span v-if="player_info">￥{{money.toFixed(2)}}</span></div>
                      <div class="welcome" v-if="player_info"><img src="../../static/dream/home/zhanghu.png"/><span>欢迎你,{{player_info.playerInfo.nickname}}</span></div>
                    </div>
                  </div>

            </div>
            </div>
          </div>


          <div class="navigation_bar">
          <div class="tabs_content">
            <div class="tabs_left">
                <img src="../../static/dream/home/logo3.png"/>
            </div>
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


          <div class="fixed_bar" v-show="fixed_state">
            <ul>
              <li v-for="(item,index) in fixed_bar" @click="fixedMeans(index)" @mouseover="fixedOver(index)" @mouseout="fixedOut(index)">
                <img :src="item.url"/>
              </li>
            </ul>
          </div>




          </div>

        <recharge ref="recharge"></recharge>
        <withdrawal ref="withdrawal"></withdrawal>
        <manage-bank ref="manageBank"></manage-bank>
        <add-bank ref="addBank"></add-bank>
        <manage-alipay ref="manageAlipay"></manage-alipay>
        <add-alipay ref="addAlipay"></add-alipay>
        <know ref="know"></know>
    </section>
</template>

<script>
  export default {
    name: 'Main',
    data () {
      return {
        header_list: [{title: '优惠活动大厅'},{title: '下载中心'},{title: '线路检测'}],
        tabs_bar: [{title: '首页',active: false,path: '/home'},{title: '电子竞技',active: false,path: '/afteryards'},{title: '真人娱乐',active: false,path: '/realperson'},{title: '体育竞技',active: false,path: '/sports'},{title: '优惠活动',active: false,path: '/videogame'},{title: '代理系统',active: false,path: '/agentsystem'},{title: '管理中心',active: false,path: '/crux'}],
        fixed_bar: [{url: '../../static/dream/home/jiangyuan-nomal.png'},{url: '../../static/dream/home/kefu_nomal.png'},{url: '../../static/dream/home/zhiding_nomal.png'}],
        fixed_state: true,
        player_info: '',
        money: '',
        safeActive: false,
        account_number: '',//登陆账号
        password_number: '',//登陆密码
      }
    },
    created(){
      this.tabs_bar[this.$route.meta.navigation].active = true;
      if('undefined' != typeof web){
          this.player_info = web.game_getPlayer();
          this.money = this.player_info.money/10000;
          console.log('player@@@##',this.player_info);
      }
    },
    watch: {
        $route(to,from){
          this.tabEmptyActive();
          this.tabs_bar[to.meta.navigation].active = true;
          if(to.path=='/game'){
            this.fixed_state = false;
          }else{
            this.fixed_state = true;
          }
        }
    },
    methods:{
        hostMeans(value,response,count){
            if(value=='managebank'){
                this.$refs.manageBank.changeMeans();
            }else if(value=='addbank'){
                this.$refs.addBank.changeMeans();
            }else if(value=='managealipay'){
                this.$refs.manageAlipay.changeMeans();
            }else if(value=='addalipay'){
                this.$refs.addAlipay.changeMeans();
            }else if(value=='know'){
                this.$refs.know.changeMeans(response);
            }else if(value=='mail'){
                if(response=='get'){
                    this.$refs.mail.getJson();
                }else if(response=='readed'){
                    this.count_readed = count;
                }else{
                    this.$refs.consult.changeMeans('mail',response);
                }
            }else if(value=='notice'){
                if(response=='get'){
                    this.$refs.notice.getJson();
                }else{
                    this.$refs.consult.changeMeans('notice',response);
                }
            }else if(value=='withdrawal'){
                if(response=='bank'){
                    this.$refs.withdrawal.getBankJson();
                }else if(response=='alipay'){
                    this.$refs.withdrawal.getAlipayJson();
                }
            }
        },
        rechargeMeans(index){
          web.game_exit_scene(function(value){});
          if(index==1){
            this.$refs.recharge.changeMeans();
          }else if(index==2){
            this.$refs.withdrawal.changeMeans(this.money.toFixed(2));
          }
        },
        //导航栏
        tabBarChange(index){
          this.tabEmptyActive();
          this.tabs_bar[index].active = true;
          if(index==0||index==5||index==6){
            this.$router.push({path: this.tabs_bar[index].path});
          }else{
            this.$message.success('敬请期待！');
          }
          web.game_exit_scene(function(value){});
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
          if(index==0){
              window.open('https://www.manycai.com/index/index');
          }else if(index==1){
              if(this.player_info.playerInfo.sex==1){
                var sex = '男';
              }else if(this.player_info.playerInfo.sex==2){
                var sex = '女';
              }
              let json = {
                  enterurl: window.location.host+this.$route.path,
                  userId: this.player_info.uid,//用户id
                  loginname: this.player_info.loginame,//登录名
                  grade: this.player_info.playerInfo.vip,//用户等级
                  name: this.player_info.nickname,//用户名称
                  gender: sex,//性别
                  mobileNo: '',//手机号
                  memo: '备注信息',//备注信息
                  hashCode: '',//用于防篡改的hash码
                  timestamp: new Date().getTime(),//当前时间戳
                  key: 'live800Key'//你在live800设置的加密key
              }
              json.hashCode = this.$md5(encodeURIComponent(json.enterurl+json.userId+json.loginname+json.grade+json.name+json.gender+json.mobileNo+json.memo+json.hashCode+json.timestamp+json.key).toUpperCase()).toUpperCase();
              //encode()
              //encodeURI()
              let infoValue = "userId=" + json.userId + "&loginname=" + json.loginname + "&grade=" + json.grade+ "&name=" + json.name
                              + "&gender=" + json.gender + "&mobileNo=" + json.mobileNo + "&memo=" + json.memo + "&hashCode="+ json.hashCode
                              + "&timestamp=" + json.timestamp + "&key=" + json.key;
                              // console.log('hash',json.hashCode);
                              console.log('url$$$',infoValue);
              window.open("https://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=12698&enterurl=&codeType=custom&info="+encodeURIComponent(infoValue));
              // window.open("https://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=12698&enterurl=&codeType=custom&info=userId%3D440297033%26loginname%3Dtest28%26name%3DtestN28%26timestamp%3D1563358352994%26key%3Dlive800Key&s=1");
          }else if(index==2){
            this.backTop();
          }
        },
        fixedOver(index){
          if(index==0){
            this.fixed_bar[index].url = '../../static/dream/home/jiangyuan-hover.png';
          }else if(index==1){
            this.fixed_bar[index].url = '../../static/dream/home/kefu_hover.png';
          }else if(index==2){
            this.fixed_bar[index].url = '../../static/dream/home/zhiding_hover.png';
          }
        },
        fixedOut(index){
          if(index==0){
            this.fixed_bar[index].url = '../../static/dream/home/jiangyuan-nomal.png';
          }else if(index==1){
            this.fixed_bar[index].url = '../../static/dream/home/kefu_nomal.png';
          }else if(index==2){
            this.fixed_bar[index].url = '../../static/dream/home/zhiding_nomal.png';
          }
        },
        safeExit(){
            var that = this;
            web.game_exit_scene(function(value){});
            web.game_exit(function(){
              that.account_number = '';
              that.password_number = '';
              that.safeActive = true;
              sessionStorage.removeItem('token');
            })
        },
        signIn(){
            var that = this;
              if(that.account_number==''&&that.password_number==''){
                  that.$message.error('请输入账号和密码!');
                  return;
              }else if(that.account_number == ''){
                  that.$message.error('请输入账号!');
                  return;
              }else if(that.password_number == ''){
                  that.$message.error('请输入密码!');
                  return;
              }
            web.game_login(that.account_number,that.password_number,window.location.host,function() {
                let val = web.game_getPlayer();
                sessionStorage.setItem('token',val.token);
                sessionStorage.setItem('account_number',that.account_number);
                sessionStorage.setItem('password_number',that.password_number);
                that.safeActive = false;
                that.$router.push({path: '/home'});
                that.player_info = web.game_getPlayer();
            });
        },
        lineMeans(index){
          web.game_exit_scene(function(value){});
          if(index==2){
            this.$router.push({name: 'Login',params:{line: 'line'}});
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
    color: #ffea00;
    .mixin_image(url('../../static/dream/home/tabs_active.png'));
    font-size: @font_size16;;
  }
  .fixed_bar{
    width: 136px;
    height: 180px;
    .mixin_image(url('../../static/dream/home/xuanfuchuang.png'));
    border-radius: 4px;
    position: fixed;
    right: 20px;
    top: 400px;
    z-index: 10;
    ul{
      li{
        .mixin_li(135px,53px);
        cursor: pointer;
        padding: 15px 33px;
        box-sizing: border-box;
      }
      li:nth-of-type(1){
        height: 73px;
        padding: 5px 25px;
        box-sizing: border-box;
        img{
          .mixin_img(100%,100%);
          float: left;
        }
      }
      li:nth-of-type(2){
        height: 53px;
        img{
          .mixin_img(100%,100%);
          float: left;
        }
      }
      li:nth-of-type(3){
        height: 53px;
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
    height: 50px;
    background: #210723;
    .head_content{
      width: 1200px;
      height: 50px;
      margin: 0 auto;
      color: @color_tone1;
      line-height: 50px;
      .reserve{
        .mixin_float(auto,100%,left);
        padding: 17px 0px 0px 0px;
        box-sizing: border-box;
        .reserve_border{
          border-right: 1px solid @color_tone1;
        }
        ul{
          height: 15px;
          li{
            .mixin_li(auto,15px);
            padding: 0px 12px;
            box-sizing: border-box;
            cursor: pointer;
          }
          li:nth-of-type(1){
            padding: 0px 12px 0px 0px;
            box-sizing: border-box;
          }
          li:hover{
            color: #eb2020;
          }
        }
      }
      .dream_login{
        .mixin_float(500px,50px,left);
        margin-left: 278px;
        position: relative;
        .nickname,.password{
          width: 142px;
          height: 32px;
          position: absolute;
          top: 8px;
          input{
            .mixin_input(142px,32px);
            float: left;
            background: #3d1351;
            color: #ac24df;
            border: 1px solid #913cc9;
          }
        }
        .nickname{
          left: 180px;
        }
        .password{
          left: 334px;
        }
        .sign_in{
          .mixin_button(84px,34px,none,auto);
          position: absolute;
          left: 486px;
          top: 8px;
          .mixin_image(url('../../static/dream/home/dengru_nomal.png'));
        }
        .sign_in:hover{
          .mixin_image(url('../../static/dream/home/dengru_hover.png'));
        }
        .register{
          .mixin_button(84px,34px,none,auto);
          position: absolute;
          left: 580px;
          top: 8px;
          .mixin_image(url('../../static/dream/home/zhuce_nomal.png'));
        }
        .register:hover{
          .mixin_image(url('../../static/dream/home/zhuce_hover.png'));
        }
      }
      .recharge_example{
        .mixin_float(260px,50px,right);
        position: relative;
        .example_contain{
          width: 600px;
          height: 50px;
          position: absolute;
          top: 0px;
          left: -341px;
          .welcome{
            .mixin_float(auto,100%,right);
            margin-right: 15px;
              img{
                .mixin_img(14px,14px);
                margin: -5px 8px 0px 0px;
              }
              span{
                .mixin_span(auto,50px,none,@color_tone1,left);
              }
          }
          .balance{
            .mixin_div(auto,50px,none,#732c94,left);
            float: right;
          }
          .exit_login{
            .mixin_span(auto,50px,none,#eb2020,left);
            text-decoration: underline;
            float: right;
            margin-left: 15px;
            cursor: pointer;
          }
          .recharge{
            margin: 8px 0px 0px 15px;
            .mixin_button(84px,34px,none,@color_white);
            float: right;
            border-radius: 4px;
            cursor: pointer;
            .mixin_image(url('../../static/dream/home/chongzhiup_nomal.png'));
          }
          .recharge:hover{
              .mixin_image(url('../../static/dream/home/chongzhiup_hover.png'));
          }
          .drawing{
            margin: 8px 0px 0px 10px;
            .mixin_button(84px,34px,none,@color_white);
            float: right;
            cursor: pointer;
            border-radius: 4px;
            .mixin_image(url('../../static/dream/home/tikuan_nomal.png'));
          }
          .drawing:hover{
              .mixin_image(url('../../static/dream/home/tikuan_hover.png'));
          }
        }
        
      }


    }
  }


  .navigation_bar{
    width: 100%;
    height: 95px;
    .mixin_image(url('../../static/dream/home/tab_image.png'));
    .tabs_content{
      width: 1200px;
      height: 95px;
      margin: 0 auto;
      .tabs_left{
        .mixin_float(200px,100%,left);
        position: relative;
        img{
            .mixin_img(300px,70px);
            position: absolute;
            top: 11px;
            left: -150px;
        }
      }
      .tabs_right{
        .mixin_float(1000px,100%,right);
        ul{
          color: @color_white;
          li{
            .mixin_li(14.28%,95px);
            cursor: pointer;
            font-size: @font_size16;
          }
          li:hover{
            color: #ffea00;
            .mixin_image(url('../../static/dream/home/tabs_active.png'));
          }
        }
      }
    }

  }
}
</style>
