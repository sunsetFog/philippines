<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  watch: {
    $route(to, from){
        // console.log('watch~~~',to,from);
        document.title = to.meta.title;
        let beforeRouterArr = ['/login','/neutralgear'];
        if(beforeRouterArr.indexOf(to.path)==-1&&from.path == '/'){
          sessionStorage.setItem('counts',1);
          this.$router.push({path: '/neutralgear'});
        }else if(to.path == '/game'){
            purpleMagic(3);
            window.dispatchEvent(new Event('resize'));
        }else if(to.path != '/game'){
            purpleMagic(2);
        }
    }
  }
}
</script>


<style lang="less">
@import './assets/app.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*公共样式--开始*/
html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
  margin: 0;
  padding: 0;
}
*{box-sizing: border-box;}
html, body {
  min-height: 100%;
  height:100% !important;
}

body {
  font-family: "Microsoft YaHei" !important;
  font-size:14px !important;
  color:#333 !important;
}
h1, h2, h3, h4, h5, h6{font-weight:normal;}
ul, ol, li{
  list-style: none;
}
img {
  border: none;
  vertical-align: middle;
}

a {
  text-decoration: none;
  color: #232323;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
}

input, textarea,button{
  outline: none;
  border: none;
}

textarea {
  resize: none;
  overflow: auto;
}

</style>
