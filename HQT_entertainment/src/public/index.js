import router from '../router'
const comic = {
    //函数有参数传入，且有匿名函数回调
    start(value,callback){
        console.log('param^^',value);
        callback('success');
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
    }
}

export default comic;