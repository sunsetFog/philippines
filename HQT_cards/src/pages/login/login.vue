
<template>
  <section id="login">
      <div class="sign_frame" v-if="active_state==1">
          <div class="code_and_service">
              <div class="sweep_code">扫码登陆</div>
              <div class="customer_service">在线客服</div>
          </div>
          <div class="form_information">
              <div class="account">
                  <span>账号:</span>
                  <input v-model="account_number" placeholder="请输入账号"></input>
              </div>
              <div class="password_enter">
                  <span>密码:</span>
                  <input v-model="password_number" placeholder="请输入密码"></input>
              </div>
              <div class="remember_and_forget">
                  <input v-model="remember_checked" type="checkbox"></input>
                  <span>记住密码</span>
                  <div class="rapid_registration" @click="rapidRegistration(2)">快速注册</div>
                  <span>忘记密码</span>
              </div>
              <div class="sign_in" @click="signIn">登陆</div>
              <div class="recommend">推荐最优路线</div>
              <div class="optimal">一键选择最优路线</div>
              <div class="shortcut">登陆太慢?点我选择最优线路</div>
          </div>
      </div>

      <div class="register_frame" v-if="active_state==2">
          <div class="theme">
              <div class="theme_title">注册七宝游戏</div>
              <div class="customer_service">在线客服</div>
          </div>
          <div class="user_name">
              <div class="user_name_left">
                  <span>用户名:</span>
                  <input v-model="user_name" placeholder="请输入用户名"></input>
              </div>
              <div class="user_name_right">由字母或数字组成的6-16个字母,不能连续4个相同字符，首字符不能为字母o或数字0</div>
          </div>
          <div class="nickname">
              <div class="user_name_left">
                  <span>玩家昵称:</span>
                  <input v-model="player_nickname" placeholder="请输入玩家昵称"></input>
              </div>
              <div class="user_name_right">由2至6个字母组成</div>
          </div>
          <div class="sign_password">
              <div class="user_name_left">
                  <span>登陆密码:</span>
                  <input v-model="login_password" placeholder="请输入登陆密码"></input>
              </div>
              <div class="user_name_right">字母和数字组成6-16个字符（必须包含数字和字母）且连续三位字符不相同</div>
          </div>
          <div class="verification_code">
              <div class="user_name_left">
                  <span>验证码:</span>
                  <input style="width: 100px;float: left;" v-model="verification_code" placeholder="请输入验证码"></input>
                  <div class="very_code"></div>
              </div>
              <div class="user_name_right">验证码不能为空</div>
          </div>
          <div class="submission"><button>提交</button></div>
          <div class="already_owned"><span @click="rapidRegistration(1)">已有账号登陆</span></div>
      </div>

      <div class="download_game">
          <div class="download_mode" v-for="(item,index) in download_mode_list" :class="{'download_margin':index!=3}">
              <div class="theme_picture"><img src=""/></div>
              <div class="download_title">{{item.title}}</div>
              <div class="download_explain">{{item.explain}}</div>
          </div>
      </div>
      <div class="bottom_content"></div>
  </section>
</template>

<script>
export default{
  data(){
    return{
        active_state: 1,
        account_number: 'test035',//登陆账号
        password_number: '123456',//登陆密码
        remember_checked: false,
        user_name: '',//用户名
        player_nickname: '',//玩家昵称
        login_password: '',//注册密码
        verification_code: '',//验证码
        download_mode_list: [
            {url: '',title: '快熟登陆下载',explain: '桌面一键启动'},{url: '',title: '电脑客户端下载',explain: '更稳定更流畅'},
            {url: '',title: '手机客户端下载',explain: '点击进入下载界面'},{url: '',title: '挂机软件下载',explain: '挂机赚钱轻松赢'}],
    }
  },
  watch:{
      remember_checked(cur,old){
          //console.log('checked',cur,old,this.remember_checked);
      }
  },
  created(){
      if(sessionStorage.getItem('checked')){
          if(sessionStorage.getItem('counts')==1){
              location.reload();
              sessionStorage.setItem('counts',2);
          }
          this.remember_checked = sessionStorage.getItem('checked');
      }
  },
  methods: {
      rapidRegistration(index){
          this.active_state = index;
      },
      signIn(){
            var that = this;
            web.game_login(this.account_number,this.password_number,function() { 
                let val = web.game_getPlayer();
                sessionStorage.setItem('token',val.token);
                sessionStorage.removeItem('checked');
                that.$router.push({path: '/home'});
            });
            
      }
  }
}
</script>

<style lang="less" scoped>
#login{
    width: 100%;
    height: 100%;
    position: relative;
    .sign_frame{
        width: 480px;
        height: 430px;
        background: #2d325c;
        border-radius: 4px;
        border: 1px solid #b09249;
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -240px;
        .code_and_service{
            width: 100%;
            height: 40px;
            position: relative;
            .mixin_service(){
                .mixin_div(100px,30px,#0069b7,#f8ffff,center);
                border-radius: 4px;
                border: 1px solid #b98f39;
            }
            .sweep_code{
                .mixin_service();
                position: absolute;
                top: 0px;
                left: 0px;
            }
            .customer_service{
                .mixin_service();
                position: absolute;
                top: 0px;
                right: 0px;
            }
        }
        .form_information{
            width: 100%;
            height: 390px;
            padding: 20px 30px 0px 30px;
            box-sizing: border-box;
            .account,.password_enter{
                width: 100%;
                height: 50px;
                background: #dedede;
                border-radius: 4px;
                border: 1px solid #b1923f;
                span{
                    .mixin_span(20%,50px,none,auto,center);
                    font-weight: 600;
                    font-size: 16px;
                    float: left;
                }
                input{
                    .mixin_input(80%,48px);
                    background: #dedede;
                }
            }
            .password_enter{
                margin-top: 15px;
            }
            .remember_and_forget{
                width: 100%;
                height: 35px;
                position: relative;
                input{
                    .mixin_input(15px,15px);
                    width: 15px;
                    height: 15px;
                    background: #dedede;
                    border-radius: 1px;
                    border: 1px solid #b1923f;
                    position: absolute;
                    top: 50%;
                    left: 5px;
                    margin-top: -7.5px;
                }
                span:nth-of-type(1){
                    .mixin_span(auto,35px,none,#eaedfe,center);
                    position: absolute;
                    top: 0px;
                    left: 30px;
                }
                span:nth-of-type(2){
                    .mixin_span(auto,25px,none,#eaedfe,center);
                    position: absolute;
                    top: 50%;
                    right: 0px;
                    margin-top: -12.5px;
                    cursor: pointer;
                }
                .rapid_registration{
                    height: 25px;
                    line-height: 25px;
                    position: absolute;
                    top: 50%;
                    left: 290px;
                    color: #eaedfe;
                    margin-top: -12.5px;
                    cursor: pointer;
                }
            }
            .sign_in{
                .mixin_button(100%,50px,#b5913b,auto);
                border: 1px solid #fffcf7;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
            }
            .recommend{
                .mixin_div(100%,50px,none,#c5b869,center);
            }
            .optimal{
                .mixin_div(100%,50px,#00a0ed,#fef5ee,center);
                cursor: pointer;
                border: 1px solid #fffcf7;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600; 
            }
            .shortcut{
                .mixin_div(100%,35px,none,#fef5ee,center);
                cursor: pointer;
                border: 1px solid #019eed;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                margin-top: 20px;
            }
        }
    }
    .register_frame{
        width: 755px;
        height: 430px;
        background: #2d325c;
        border-radius: 4px;
        border: 1px solid #b09249;
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -377.5px;
        padding: 0px 0px 0px 30px;
        box-sizing: border-box;
        .theme{
            width: 100%;
            height: 70px;
            position: relative;
            .theme_title{
                .mixin_div(200px,70px,none,#e3aa27,center);
                font-weight: 600;
                font-size: 28px;
                position: absolute;
                top: 0px;
                left: 0px;
            }
            .customer_service{
                .mixin_div(100px,30px,#0069b7,#f8ffff,center);
                border-radius: 4px;
                border: 1px solid #b98f39;
                position: absolute;
                top: 0px;
                right: 0px;
            }
        }
        .user_name,.nickname,.sign_password,.verification_code{
            width: 100%;
            height: 50px;
            .user_name_left{
                .mixin_float(55%,50px,left);
                background: #dedede;
                border-radius: 4px;
                border: 1px solid #b1923f;
                span{
                    .mixin_span(25%,50px,none,auto,center);
                    font-weight: 600;
                    font-size: 16px;
                    float: left;
                }
                input{
                    .mixin_input(75%,48px);
                    background: #dedede;
                }
                .very_code{
                    .mixin_float(80px,48px,right);
                }
            }
            .user_name_right{
                width: 45%;
                height: 50px;
                float: right;
                color: #979ca0;
                text-align: left;
                padding: 6px 0px 0px 10px;
                box-sizing: border-box;
            }
        }
        .nickname,.sign_password,.verification_code{
            margin-top: 15px;
        }
        .submission{
            width: 100%;
            height: 50px;
            margin-top: 15px;
            button{
                .mixin_button(405px,50px,#b5913b,auto);
                border: 1px solid #fffcf7;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                margin: 0 auto;
            }
        }
        .already_owned{
            width: 100%;
            height: 45px;
            span{
                .mixin_span(auto,30px,none,#d9c46b,center);
                margin-top: 10px;
                cursor: pointer;
            }
        }
    }
    .download_game{
        width: 975px;
        height: 200px;
        position: absolute;
        top: 665px;
        left: 50%;
        margin-left: -487.5px;
        .download_margin{
            margin-right: 50px;
        }
        .download_mode{
            width: 205px;
            height: 200px;
            border-radius: 4px;
            border: 1px solid #b4903a;
            background: #2b325c;
            padding: 5px 30px 0px 30px;
            box-sizing: border-box;
            float: left;
            .theme_picture{
                width: 100%;
                min-height: 110px;
                img{
                    width: 100%;
                    min-height: 110px;
                }
            }
        }
        .download_title{
            .mixin_div(100%,25px,none,#f9ffff,center);
        }
        .download_explain{
            .mixin_div(100%,25px,none,#888ca7,center);
            font-size: 12px;
        }
    }
    .bottom_content{
        width: 100%;
        height: 120px;
        position: absolute;
        left: 0px;
        top: 885px;
        background: #979ca0;
        border-top: 1px solid #b49239;
        .mixin_image(url('../../../static/cards/bottom.png'));
    }
}
</style>
