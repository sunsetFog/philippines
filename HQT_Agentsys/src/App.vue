<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <DashBoard></DashBoard>
  </div>
</template>

<script>
import DashBoard from '@/views/layout/dashboard'

export default {
  name: 'App',
  components: { DashBoard }
}
</script>

<style>
@media screen and (min-width: 768px) { /*当屏幕尺寸大于768px时，应用下面的CSS样式*/
  #app {
    width: 768px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #f2f2f3;
    overflow-x: hidden;
    overflow-y: auto; 
  }
}
@media screen and (max-width: 768px) {
  body {
    background: #f2f2f3;
  }
  #app {
    overflow: hidden;
    width: 100%;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
