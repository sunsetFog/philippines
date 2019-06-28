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
    background: #2e163b;
    overflow-x: hidden;
    overflow-y: auto; 
  }
}
@media screen and (max-width: 768px) {
  body {
    background: #2e163b;;
  }
  #app {
    overflow: hidden;
    width: 100%;
  }
}
#app {
  font-family: 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #dbcbb7;
}
#app input {
  font-family: 'Microsoft YaHei';
}
#app .mint-button--primary{
  background: #d4c3b2;
    border: 2px solid #b02ab5;
    color: #b00cb3;
    font-family: 'Microsoft YaHei-Bold';
    font-size: 16px;
    font-weight: 600;
}
#app .mint-switch-core::after{
  background-color: #a16ec2;
  width: 28px;
  height: 27px;
}
#app .mint-switch-core::before {
  background-color: #210723;
}
#app .mint-switch-core{
  background-color: #210723;
  border: 1px solid #210723;
  width: 50px;
  height: 29px;
}
#app .mint-cell {
  background-color: #513663;
}
#app .mint-switch-input:checked + .mint-switch-core{
  border-color: #210723;
  background-color: #210723;
}
#app .mint-cell-wrapper{
  background-image: none;
  border-bottom: 1px solid #2e163d;
}
#app .mint-cell-value {
  color: #dbcbb7;
}
#app input {
  background: #513663;
  color: #dbcbb7;
}
#app .mint-header-title{
      color: #dbcbb7;
}
#app .mint-header {
      padding: 0px 22px;
}
#app .mint-cell-allow-right::after{
  border-right: solid 2px #a16ec2;
  border-top: solid 2px #a16ec2;
}
input:-ms-input-placeholder{color: #dbcbb7;font-family: 'Microsoft YaHei';}/* Internet Explorer 10+ */ 
input::-webkit-input-placeholder{color: #dbcbb7;font-family: 'Microsoft YaHei';}/* WebKit browsers */
input::-moz-placeholder{color: #dbcbb7;font-family: 'Microsoft YaHei';}/* Mozilla Firefox 4 to 18 */ 
input:-moz-placeholder{color: #dbcbb7;font-family: 'Microsoft YaHei';}/* Mozilla Firefox 19+ */ 
/* #app .mint-button-text{
  color: #dbcbb7;
} */
body {
  margin: 0;
}
</style>
