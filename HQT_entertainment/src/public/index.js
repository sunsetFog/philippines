const comic = {
    //函数有参数传入，且有匿名函数回调
    start(value,callback){
        console.log('param^^',value);
        callback('success');
    },
    overallHeight(value){
        let overallApp = document.getElementById(value);
        if(value == 'app'){
            overallApp.style.minHeight = document.body.clientHeight+'px';
        }else{
            overallApp.style.height = document.body.clientHeight+'px';
        }
    }
}

export default comic;