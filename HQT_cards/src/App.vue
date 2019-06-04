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
        document.title = to.meta.title;
        if(to.path != '/login'&&from.path == '/'){
          sessionStorage.setItem('checked',true);
          sessionStorage.setItem('counts',1);
          this.$router.push({path: '/login'});
          return;
        }else if(to.path == '/cards'){
            purpleMagic(3);
        }else{
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
