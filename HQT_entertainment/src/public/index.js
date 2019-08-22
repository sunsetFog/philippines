import router from '../router';
import { Message } from 'element-ui';
import cache from '../vuex/vuex.js';
const comic = {
    validateTextLength (value) {
        // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
        let mat = value.match(cnReg)
        let length
        if (mat) {
        length = (mat.length + (value.length - mat.length) * 0.5)
        return length
        } else {
        return value.length * 0.5
        }
    },
    isMoblie: function (value) {
		return !/^1\d{10}$/.test(value);
	},
    judgeToken(){
        if(!sessionStorage.getItem('token')){
            Message.error('请先登录');
            return false;
        }
    },
    //当前时间转时间戳（精确到毫秒）
    timeStamp(){
        return new Date().getTime();
    },
    //时间戳转时间  https://www.cnblogs.com/zhaojunhao/p/9630315.html
    getLocalTime(nS) {    
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");     
    },
    overallHeight(value){
        let overallApp = document.getElementById(value);
        // console.log('jianting###',overallApp);
        if(overallApp!=null){
            overallApp.style.height = document.body.clientHeight+'px';
        }
    },
    //函数有参数传入，且有匿名函数回调
    amateur_login(value,callback){//登陆
        callback();
    },
    amateur_getPlayer(value,callback){//玩家信息
        console.log('param^^',value);
        if(value=='head'){
            return {setAvatar:function(head){
                cache.commit('playerInfo',{title: 'head',params: head});
            }}
        }else if(value=='frame'){
            return {setAvatarBox:function(frame){
                cache.commit('playerInfo',{title: 'frame',params: frame});
            }}
        }else if(value=='sex'){
            return {setSex:function(sex){
                cache.commit('playerInfo',{title: 'sex',params: sex});
            }}
        }else{
            return cache.state.player_info;
        }
    },
    amateur_startGame(gameName){//进入游戏

    },
    amateur_back2GameFromLobby(isBack){//重新登录到大厅，是否回到上局游戏

    },
    amateur_relogin(){//游戏重连

    },
    amateur_clear(){//掉线不重连

    },
    amateur_agent_url(callback){//获取代理系统url
        callback();
    },
    amateur_get_email(page,callback){//获取邮件
        let json = {
            list: cache.state.email_list,
            nowpage: 1,
            totalpages: 1,
            totalrows: cache.state.email_list.length
        }
        callback(json);
    },
    amateur_get_email_single(id,callback){//获取单条邮件信息
        cache.commit('emailReaded',id);
        let json = {
            list: cache.state.email_list,
            nowpage: 1,
            totalpages: 1,
            totalrows: cache.state.email_list.length
        }
        callback(json);
    },
    amateur_get_email_add(obj,callback){//暂无-增加邮件
        cache.commit('emailAdd',obj);
        callback(cache.state.email_list);
    },
    amateur_get_email_dele(id,callback){//删除邮件
        cache.commit('emailDelete',id);
        let json = {
            list: cache.state.email_list,
            nowpage: 1,
            totalpages: 1,
            totalrows: cache.state.email_list.length
        }
        callback(json);
    },
    amateur_get_email_modify(obj,callback){//暂无-修改邮件
        cache.commit('emailModify',obj);
        callback(cache.state.email_list);
    },
    amateur_get_message(page,callback){//获取公告
        let json = {
            list: cache.state.notice_list,
            nowpage: 1,
            totalpages: 1,
            totalrows: cache.state.notice_list.length
        }
        callback(json);
    },
    amateur_get_message_single(id,callback){//获取单条公告信息
        cache.commit('noticeReaded',id);
        let json = {
            list: cache.state.notice_list,
            nowpage: 1,
            totalpages: 1,
            totalrows: cache.state.notice_list.length
        }
        callback(json);
    },
    amateur_get_message_dele(id,callback){//删除公告
        cache.commit('noticeDelete',id);
        let json = {
            list: cache.state.notice_list,
            nowpage: 1,
            totalpages: 1,
            totalrows: cache.state.notice_list.length
        }
        callback(json);
    },
    amateur_recharge_types(callback){//充值类型
        callback({pay_types: cache.state.pay_types});
    },
    amateur_recharge_url(money,pay_channel,bank_code,pay_type,callback){//充值链接
        callback({payurl: cache.state.payurl});
    },
    amateur_recharge_recods(type,callback){//充值记录
        callback({list: cache.state.record_list});
    },
    amateur_bank_lists(type,callback){//获取银行卡和支付宝
        if(type==1){
            callback({list: cache.state.bank_card});
            return;
        }else if(type==2){
            callback({list: cache.state.alipay_list});
            return;
        }
    },
    amateur_bindBank(type,cardholder,bankname,cardno,callback){//提款-添加银行和支付宝
        if(type==1){
            let json = {
                bank_id: Math.floor(Math.random()*1000000),
                bank_name: bankname,
                cardholder: cardholder,
                cardno: cardno
            }
            cache.commit('bankAdd',json);
            callback({list: cache.state.bank_card});
        }else if(type==2){
            let json = {
                bank_id: Math.floor(Math.random()*1000000),
                bank_name: '支付宝',
                cardholder: cardholder,
                cardno: cardno
            }
            cache.commit('alipayAdd',json);
            callback({list: cache.state.alipay_list});
        }
    },
    amateur_unBindBank(type,bankid,callback){//提款-解绑银行卡和支付宝
        if(type==1){
            cache.commit('bankDelete',bankid);
            callback({list: cache.state.bank_card});
        }else if(type==2){
            cache.commit('alipayDelete',bankid);
            callback({list: cache.state.alipay_list});
        }
    },
    amateur_drawout(money,bankid,callback){//提款
        callback();
    },
    amateur_safeMoney(money,password,callback){//保险箱-存入金额
        callback();
    },
    amateur_takeMoney(money,password,callback){//保险箱-取出金额
        callback();
    },
    amateur_resetLoginPass_tel(loginame,new_pwd,captcha,callback){//重置登录密码(手机号注册)
        callback();
    },
    amateur_resetLoginPass_noTel(loginame,new_pwd,old_pwd,callback){//重置登录密码(非手机号注册)
        callback();
    },
    amateur_initMoneyPass(new_pwd,callback){//初始化资金密码
        callback();
    },
    amateur_resetMoneyPass_tel(new_pwd,captcha,callback){//重置资金密码(手机号注册)
        callback();
    },
    amateur_resetMoneyPass_noTel(new_pwd,old_pwd,callback){//重置资金密码(非手机号注册)
        callback();
    },
    amateur_getCaptcha_bindTel(callback){//获取验证码(已绑定手机号)
        callback();
    },
    amateur_updateName(nickname,callback){//修改昵称
        cache.commit('playerInfo',{title: 'nickname',params: nickname});
        callback();
    },
    amateur_updateAvatar(avatar,callback){//修改头像
        callback();
    },
    amateur_updateFrame(avatar_frame,callback){//修改头像框
        callback();
    },
    amateur_updateSex(sex,callback){//修改性别
        callback();
    }
}

export default comic;