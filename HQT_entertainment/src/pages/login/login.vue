
<template>
  <section id="login">
      <div class="entertainment">
          <img class="login_logo" src="../../../static/dream/login/logo_big.png"/>
          <img class="big_fish" src="../../../static/dream/login/fish.png"/>
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
                        <input type="password" maxlength="20" v-model="password_number" placeholder="请输入登陆密码"></input>
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
                        <input type="password" maxlength="20" v-model="login_password" placeholder="请输入登陆密码"></input>
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
                    <img @click="rapidRegistration(1)" src="../../../static/dream/login/kuaisudenglu.png"/>
                    <span>快速登陆</span>
                </div>
                <div class="example_detection">
                    <div class="line_content" v-for="(item,index) in line_list">
                        <div class="line_data" v-if="item.state==1">
                            <img :src="item.circular1"/>
                            <span :style="{color: item.color}">{{item.title}}</span>
                            <div class="progress_bar" :style="{backgroundImage: item.signal1}">
                                <div :style="{width: item.width,backgroundImage: item.progress1}"></div>
                            </div>
                            <span :style="{color: item.color}">0.169秒</span>
                            <img :src="item.type1"/>
                            <img :src="item.enter1"/>
                        </div>
                        <div class="line_data" v-if="item.state==2">
                            <img :src="item.circular2"/>
                            <span :style="{color: item.color}">{{item.title}}</span>
                            <div class="progress_bar" :style="{backgroundImage: item.signal2}">
                                <div :style="{width: item.width,backgroundImage: item.progress2}"></div>
                            </div>
                            <span :style="{color: item.color}">0.169秒</span>
                            <img :src="item.type2"/>
                            <img :src="item.enter2"/>
                        </div>
                        <div class="line_data" v-if="item.state==3">
                            <img :src="item.circular3"/>
                            <span :style="{color: item.color}">{{item.title}}</span>
                            <div class="progress_bar" :style="{backgroundImage: item.signal3}">
                                <div :style="{width: item.width,backgroundImage: item.progress3}"></div>
                            </div>
                            <span :style="{color: item.color}">0.169秒</span>
                            <img :src="item.type3"/>
                            <img :src="item.enter3"/>
                        </div>
                    </div>
                </div>
            </div>
            
      </div>
    <footers :vip_foot="vip_foot"></footers>
  </section>
</template>

<script>
import footers from '../../components/footer.vue';
export default{
    components: {footers},
  data(){
    return{
        vip_foot: false,
        active_state: 1,
        account_number: '',//登陆账号
        password_number: '',//登陆密码
        remember_checked: false,
        user_name: '',//用户名
        player_nickname: '',//玩家昵称
        login_password: '',//注册密码
        verification_code: '',//验证码
        line_list: [
            {state: 1,title: '线路1',color: '#1dc570',time: '0.169秒',width: '70%'},
            {state: 1,title: '线路1',color: '#1dc570',time: '0.169秒',width: '40%'},
            {state: 1,title: '线路1',color: '#1dc570',time: '0.169秒',width: '50%'},
            {state: 2,title: '线路2',color: '#ff9f00',time: '0.169秒',width: '25%'},
            {state: 2,title: '线路2',color: '#ff9f00',time: '0.169秒',width: '90%'},
            {state: 3,title: '线路3',color: '#f71210',time: '0.169秒',width: '80%'},
            {state: 3,title: '线路3',color: '#f71210',time: '0.169秒',width: '30%'},
            {state: 3,title: '线路3',color: '#f71210',time: '0.169秒',width: '100%'}
        ],
    }
  },
  watch:{
      remember_checked(cur,old){
          //console.log('checked',cur,old,this.remember_checked);
      }
  },
  mounted(){
      this.$means.overallHeight('login');
  },
  created(){
      purpleMagic(2);
    //   console.log('@@@route%%%',this.$route);
      if(typeof this.$route.params.line!="undefined"){
          this.rapidRegistration(3);
      }else{
          flashGameplayer();
      }
      if(localStorage.getItem('account')){
          this.account_number = localStorage.getItem('account');
          this.password_number = localStorage.getItem('password');
          this.remember_checked = true;
      }else{
          this.account_number = '';
          this.password_number = '';
          this.remember_checked = false;
      }
      
      for(let i=0;i<this.line_list.length;i++){
          this.line_list[i].circular1 = '../../../static/dream/login/luxian1.png';
          this.line_list[i].circular2 = '../../../static/dream/login/luxian2.png';
          this.line_list[i].circular3 = '../../../static/dream/login/luxian3.png';
          this.line_list[i].signal1 = 'url(../../../static/dream/login/luxian1jindu.png)';
          this.line_list[i].signal2 = 'url(../../../static/dream/login/luxian2jindu.png)';
          this.line_list[i].signal3 = 'url(../../../static/dream/login/luxian3jindu.png)';
          this.line_list[i].type1 = '../../../static/dream/login/luxian1shuoming.png';
          this.line_list[i].type2 = '../../../static/dream/login/luxian2shuoming.png';
          this.line_list[i].type3 = '../../../static/dream/login/luxian3shuoming.png';
          this.line_list[i].enter1 = '../../../static/dream/login/luxian1jinru.png';
          this.line_list[i].enter2 = '../../../static/dream/login/luxian2jinru.png';
          this.line_list[i].enter3 = '../../../static/dream/login/luxian3jinru.png';
          this.line_list[i].progress1 =  'url(../../../static/dream/login/luxian11jindu.png)';
          this.line_list[i].progress2 = 'url(../../../static/dream/login/luxian22jindu.png)';
          this.line_list[i].progress3 = 'url(../../../static/dream/login/luxian33jindu.png)';
      }
    //   console.log('lin++list%%',this.line_list);
  },
  methods: {
      rapidRegistration(index){
          this.active_state = index;
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
            if(refreshWeb.state=='init'){
                web.game_login(that.account_number,that.password_number,function() { 
                    if(that.remember_checked==true){
                        localStorage.setItem('account',that.account_number);
                        localStorage.setItem('password',that.password_number);
                    }else{
                        localStorage.removeItem('account');
                        localStorage.removeItem('password');
                    }
                    sessionStorage.setItem('account_number',that.account_number);
                    sessionStorage.setItem('password_number',that.password_number);
                    let val = web.game_getPlayer();
                    sessionStorage.setItem('token',val.token);
                    that.$router.push({path: '/home'});
                });
            }else{
                that.$message.error('加载中');
            }
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
    .mixin_image(url('../../../static/dream/login/bg_denglu.jpg'));
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
            .mixin_img(790px;170px);
            position: absolute;
            top: 70px;
            left: 50%;
            margin-left: -395px;
        }
        .big_fish{
            .mixin_img(426px;487px);
            position: absolute;
            left: 0px;
            bottom: 0px;
        }
        .sign_frame{
            width: 480px;
            height: 430px;
            .mixin_image(url('../../../static/dream/login/kuankuan.png'));
            position: absolute;
            top: 290px;
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
                .customer_service:hover{
                    .mixin_image(url('../../../static/dream/login/kefu_hover.png'));
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
            top: 290px;
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
                    text-shadow: 2px 2px 0px @color_stroke;
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
                .customer_service:hover{
                    .mixin_image(url('../../../static/dream/login/kefu_hover.png'));
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
            .mixin_image(url('../../../static/dream/login/luxiankuan.png'));
            position: absolute;
            top: 290px;
            left: 50%;
            margin-left: -330px;
            padding: 10px 30px 0px 30px;
            box-sizing: border-box;
            .testing_header{
                width: 100%;
                height: 60px;
                label{
                    .mixin_span(auto,60px,none,@color_violet,left);
                    float: left;
                    font-size: 24px;
                }
                span{
                    .mixin_span(auto,60px,none,#e8e7ed,left);
                    float: right;
                    margin-right: 5px;
                    font-size: @font_size16;
                    text-shadow: 1px 1px 2px @color_stroke;
                }
                img{
                    .mixin_img(50px,50px);
                    float: right;
                    margin-top: 3px;
                }
            }
            .example_detection{
                width: 580px;
                height: 350px;
                margin: 5px 0px 0px 10px;
                padding: 12px 0px 0px 22px;
                box-sizing: border-box;
                .line_content{
                    width: 100%;
                    height: 30px;
                    margin-bottom: 10px;
                    .line_data{
                        width: 100%;
                        height: 30px;
                        img:nth-of-type(1){
                            .mixin_img(10px,10px);
                            float: left;
                            margin-top: 10px;
                        }
                        span:nth-of-type(1){
                            .mixin_span(80px,30px,none,@color_white,left);
                            float: left;
                            margin-left: 10px;
                        }
                        .progress_bar{
                            .mixin_float(152px,20px,left);
                            margin-top: 5px;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            div{
                                height: 20px;
                                background: none;
                                background-size: 152px 20px;
                            }
                        }
                        span:nth-of-type(2){
                            .mixin_span(90px,30px,none,@color_white,center);
                            float: left;
                        }
                        img:nth-of-type(2){
                            .mixin_img(50px,25px);
                            float: left;
                            margin-top: 2px;
                        }
                        img:nth-of-type(3){
                            .mixin_img(70px,30px);
                            float: left;
                            margin-left: 70px;
                        }
                    }
                }
            }
        }
    }


}
</style>
