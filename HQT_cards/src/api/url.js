  //常规模块
  const http = 'http://47.106.77.12/hs2f';
  const url = {
    //验证验证码
    index_sendYanzhengma: http + '/index/sendYanzhengma',
    //注册
    baoming_saveRegInfo: http + '/index/saveRegInfo',
    //登录
    index_checkLogin: http +'/index/checkLogin',
    //检查手机是否存在数据库
    index_checkUserTel:http +'/index/checkUserTel',
    //修改密码
    index_savePassword:http + '/index/savePassword',
    //新建档案
    baoming_addDangan:http +'/baoming/addDangan',
    //获取档案信息
    baoming_getDangan:http+'/baoming/getDangan',
    //修改档案信息
    baoming_saveDangan:http+ '/baoming/saveDangan',
  }

  export default{url}