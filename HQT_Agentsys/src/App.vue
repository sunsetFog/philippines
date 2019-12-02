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
/* mint-popup */
.mint-cell{
  overflow: visible;
}
.all_palm,.mint-switch,.mintui-back,.mint-field-core,.mint-radio-core,.mint-field-clear,.picker-item{
  cursor: pointer;
}
  body {
    background: #2e163b;
  }
  #app {
    -overflow: hidden;
    width: 100%;
    padding-bottom: 20px;
    box-sizing: border-box;
  }
  /* mint-cell */
#app .mint-cell-wrapper{
  background-image: none;
  border-bottom: 1px solid #2e163d;
}
#app .mint-field-core{
  height: 28px;
  font-size: 14px;
  text-indent: 10px;
  line-height: 28px;
  border-radius: 4px;
  background: #d2c1ed;
  color: #7f6ca3;
  border: 1px solid #6d5b8f;
}
#app input::-webkit-input-placeholder{
  color: #7f6ca3;
}
#app input:-moz-placeholder{
  color: #7f6ca3;
}
#app input:-o-input-placeholder{
  color: #7f6ca3;
}
#app input:-ms-input-placeholder{
  color: #7f6ca3;
}
.card {
  padding: 10px 10px 0px 10px;
  box-sizing: border-box;
}
.namestyle{
  position: relative;
}
  #app .mint-popup {
      min-height: 120px;
      background: #210723;
      color: #a16ec2;
      position: fixed;
      width: 356px;
      left: 50%;
      top: 50%;
      padding: 10px 30px;
      box-sizing: border-box;
      font-size: 12px;
    }

@media screen and (min-width: 768px) { /*当屏幕尺寸大于768px时，应用下面的CSS样式*/
  /* #app {
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
  } */
}
@media screen and (max-width: 768px) {
  /* body {
    background: #2e163b;;
  }
  #app {
    overflow: hidden;
    width: 100%;
  } */
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
        border: 1px solid #b02ab5;
        color: #b00cb3;
        font-family: 'Microsoft YaHei-Bold';
        font-size: 14px;
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
#app .mint-cell-value {
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
