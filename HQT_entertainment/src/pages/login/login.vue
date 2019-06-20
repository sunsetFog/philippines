
<template>
  <section id="login">
      <div class="entertainment" style="height: 100%;">
          <img class="login_logo" src="../../../static/dream/login/logo_big.png"/>
            <div class="sign_frame" v-if="active_state==1">
                <div class="code_and_service">
                    <div class="customer_service"></div>
                </div>
                <div class="form_information">
                    <div class="account">
                        <span>账号:</span>
                        <input v-model="account_number" placeholder="请输入账号"></input>
                    </div>
                    <div class="password_enter">
                        <span>密码:</span>
                        <input v-model="password_number" placeholder="请输入登陆密码"></input>
                    </div>
                    <div class="remember_and_forget">
                        <div class="rectangle" @click="rememberMeans()"><img v-show="remember_checked" src="../../../static/dream/login/jizhu.png"/></div>
                        <span>记住密码</span>
                        <div class="rapid_registration" @click="rapidRegistration(2)">快速注册</div>
                        <span>忘记密码</span>
                    </div>
                    <div class="sign_in" @click="signIn"></div>
                    <div class="recommend"><span></span><span>推荐最优路线</span><span></span></div>
                    <div class="optimal" @click="rapidRegistration(3)"></div>
                    <div class="shortcut"></div>
                </div>
            </div>

            <div class="register_frame" v-if="active_state==2">
                <div class="theme">
                    <div class="theme_title">注册七宝游戏</div>
                    <div class="customer_service"></div>
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
                        <input style="width: 150px;float: left;" v-model="verification_code" placeholder="请输入验证码"></input>
                        <div class="very_code"></div>
                    </div>
                    <div class="user_name_right">验证码不能为空</div>
                </div>
                <div class="submission"><span></span></div>
                <div class="already_owned"><span @click="rapidRegistration(1)">已有账号登陆</span></div>
            </div>


            <div class="circuit_detection" v-if="active_state==3">
                <div class="testing_header">
                    <label>线路检测</label>
                    <img src="../../../static/dream/login/kuaisudenglu.png"/>
                    <span>快速登陆</span>
                </div>
            </div>
      </div>

  </section>
</template>

<script>
export default{
  data(){
    return{
        active_state: 1,
        account_number: 'test28',//登陆账号
        password_number: '123456',//登陆密码
        remember_checked: false,
        user_name: '',//用户名
        player_nickname: '',//玩家昵称
        login_password: '',//注册密码
        verification_code: '',//验证码
    }
  },
  watch:{
      remember_checked(cur,old){
          //console.log('checked',cur,old,this.remember_checked);
      }
  },
  created(){
      flashGameplayer();
      if(sessionStorage.getItem('checked')){
          if(sessionStorage.getItem('counts')==1){
              location.reload();
              sessionStorage.setItem('counts',2);
          }
          this.remember_checked = sessionStorage.getItem('checked');
      }
  },
  mounted(){
    this.$means.overallHeight('login');
  },
  methods: {
      rapidRegistration(index){
          this.active_state = index;
      },
      signIn(){
            var that = this;
            web.game_login(that.account_number,that.password_number,function() { 
                let val = web.game_getPlayer();
                sessionStorage.setItem('token',val.token);
                sessionStorage.removeItem('checked');
                that.$router.push({path: '/home'});
            });
            
      },
      rememberMeans(){
          if(this.remember_checked==false){
              this.remember_checked = true;
          }else{
              this.remember_checked = false;
          }
      }
  }
}
</script>

<style lang="less" scoped>
#login{
    width: 100%;
    padding-bottom: 165px;
    box-sizing: border-box;
    .mixin_image(url('../../../static/dream/login/bg_denglu.png'));
    @color_violet: #3d1351;//字体
    @color_label: #dbcbb7;//字体
    @color_green: #0f991a;//按钮背景
    @color_hover: #f85e0b;//hover
    @color_stroke: #143597;
    .entertainment{
        width: 100%;
        height: 100%;
        position: relative;
        .login_logo{
            .mixin_img(470px;110px);
            position: absolute;
            top: 95px;
            left: 50%;
            margin-left: -235px;
        }
        .sign_frame{
            width: 480px;
            height: 430px;
            .mixin_image(url('../../../static/dream/login/kuankuan.png'));
            position: absolute;
            top: 280px;
            left: 50%;
            margin-left: -240px;
            .code_and_service{
                width: 100%;
                height: 40px;
                position: relative;
                .customer_service{
                    width: 105px;
                    height: 34px;
                    .mixin_image(url('../../../static/dream/login/kefu.png'));
                    cursor: pointer;
                    position: absolute;
                    top: 3px;
                    right: 3px;
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
                    .mixin_image(url('../../../static/dream/login/juxingkuang.png'));
                    color: @color_white;
                    border-radius: 4px;
                    border: 1px solid #b1923f;
                    span{
                        .mixin_span(auto,50px,none,@color_label,left);
                        font-weight: 600;
                        font-size: 24px;
                        float: left;
                        font-weight: 600;
                        text-indent: 13px;
                        margin-right: 15px;
                    }
                    input{
                        .mixin_input(70%,48px);
                        background: none;
                        color: @color_label;
                        font-size: @font_size20;
                    }
                }
                .password_enter{
                    margin-top: 15px;
                }
                .remember_and_forget{
                    width: 100%;
                    height: 35px;
                    position: relative;
                    font-size: @font_size16;
                    .rectangle{
                        width: 18px;
                        height: 18px;
                        .mixin_image(url('../../../static/dream/login/fuxuankuang.png'));
                        position: absolute;
                        top: 50%;
                        left: 5px;
                        margin-top: -9px;
                        padding: 2px 0px 0px 2px;
                        box-sizing: border-box;
                        cursor: pointer;
                        img{
                            .mixin_img(13px,13px);
                            float: left;
                        }
                    }
                    span:nth-of-type(1){
                        .mixin_span(auto,35px,none,@color_violet,center);
                        position: absolute;
                        top: 0px;
                        left: 30px;
                    }
                    span:nth-of-type(2){
                        .mixin_span(auto,25px,none,@color_violet,center);
                        position: absolute;
                        top: 50%;
                        right: 0px;
                        margin-top: -12.5px;
                        cursor: pointer;
                    }
                    span:nth-of-type(2):hover{
                        color: @color_hover;
                    }
                    .rapid_registration{
                        height: 25px;
                        line-height: 25px;
                        position: absolute;
                        top: 50%;
                        left: 280px;
                        margin-top: -12.5px;
                        cursor: pointer;
                        color: @color_violet;
                    }
                }
                .sign_in{
                    .mixin_button(100%,50px,none,auto);
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: 600;
                    .mixin_image(url('../../../static/dream/login/denglu.png'));
                }
                .sign_in:hover{
                    .mixin_image(url('../../../static/dream/login/denglu_hover.png'));
                }
                .recommend{
                    .mixin_div(100%,50px,none,@color_violet,center);
                    position: relative;
                    span:nth-of-type(1){
                        .mixin_span(75px,10px,none,@color_violet,left);
                        position: absolute;
                        left: 62px;
                        top: 15px;
                        border-bottom: 1px solid @color_violet;
                    }
                    span:nth-of-type(2){
                        .mixin_span(125px,50px,none,@color_violet,center);
                        position: absolute;
                        left: 137px;
                        top: 0px;
                        font-size: @font_size17;
                    }
                    span:nth-of-type(3){
                        .mixin_span(75px,10px,none,@color_violet,left);
                        position: absolute;
                        left: 262px;
                        top: 15px;
                        border-bottom: 1px solid @color_violet;
                    }
                }
                .optimal{
                    width: 100%;
                    height: 50px;
                    .mixin_image(url('../../../static/dream/login/xuanxian.png'));
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600; 
                }
                .optimal:hover{
                    .mixin_image(url('../../../static/dream/login/xuanxian_hover.png'));
                }
                .shortcut{
                    .mixin_div(100%,35px,none,auto,center);
                    cursor: pointer;
                    .mixin_image(url('../../../static/dream/login/tuijianxianlu.png'));
                    font-size: 16px;
                    font-weight: 600;
                    margin-top: 20px;
                }
                .shortcut:hover{
                    .mixin_image(url('../../../static/dream/login/tuijianxianlu_hover.png'));
                }
            }
        }
        .register_frame{
            width: 755px;
            height: 430px;
            .mixin_image(url('../../../static/dream/login/kuankuan.png'));
            position: absolute;
            top: 280px;
            left: 50%;
            margin-left: -377.5px;
            padding: 0px 0px 0px 30px;
            box-sizing: border-box;
            .theme{
                width: 100%;
                height: 70px;
                position: relative;
                .theme_title{
                    .mixin_div(200px,70px,none,#4cf200,center);
                    font-weight: 600;
                    font-size: 30px;
                    text-shadow: @color_stroke 2px 2px 0,@color_stroke 2px 2px 0,@color_stroke 2px 2px 0,@color_stroke 2px 2px 0;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                }
                .customer_service{
                    width: 105px;
                    height: 34px;
                    .mixin_image(url('../../../static/dream/login/kefu.png'));
                    cursor: pointer;
                    position: absolute;
                    top: 3px;
                    right: 3px;
                }
            }
            .user_name,.nickname,.sign_password,.verification_code{
                width: 100%;
                height: 50px;
                .user_name_left{
                    .mixin_float(55%,50px,left);
                    .mixin_image(url('../../../static/dream/login/juxingkuang.png'));
                    span{
                        .mixin_span(30%,50px,none,@color_label,right);
                        font-weight: 600;
                        float: left;
                        font-size: 24px;
                    }
                    input{
                        .mixin_input(70%,48px);
                        background: none;
                        color: @color_label;
                        font-size: 20px;
                    }
                    .very_code{
                        .mixin_float(80px,48px,right);
                    }
                }
                .user_name_right{
                    width: 45%;
                    height: 50px;
                    float: right;
                    color: @color_violet;
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
                span{
                    .mixin_span(405px,50px,none,@color_white,left);
                    margin: 0 auto;
                    .mixin_image(url('../../../static/dream/login/zhucetijiao.png'));
                }
            }
            .already_owned{
                width: 100%;
                height: 45px;
                span{
                    .mixin_span(auto,30px,none,@color_violet,center);
                    margin-top: 10px;
                    cursor: pointer;
                }
            }
        }

        .circuit_detection{
            width: 660px;
            height: 450px;
            .mixin_image(url('../../../static/dream/login/kuankuan.png'));
            position: absolute;
            top: 280px;
            left: 50%;
            margin-left: -330px;
            padding: 10px 30px 0px 30px;
            box-sizing: border-box;
            .testing_header{
                width: 100%;
                height: 65px;
                label{
                    .mixin_span(auto,65px,none,@color_violet,left);
                    float: left;
                    font-size: 24px;
                }
                span{
                    .mixin_span(auto,65px,none,#e8e7ed,left);
                    float: right;
                    margin-right: 5px;
                    font-size: @font_size16;
                    text-shadow: 2px 2px @color_stroke;
                }
                img{
                    .mixin_img(50px,50px);
                    float: right;
                    margin-top: 7.5px;
                }
            }
        }
    }


}
</style>
