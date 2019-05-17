<template>
  <div class="container gamereport">
    <mt-header title="游戏记录">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

    </mt-header>

  <div class="card center">
    <mt-cell title="税收记录">
      <img slot="icon" src="../../../static/mark.png" width="20" height="20" class="mark" @click="popup = !popup">
        <mt-popup
          v-model="popup"
          popup-transition='popup-fade'
        >
        游戏流水：当前操作提供的游戏流水总额<br/>
        税收收益：当前操作提供给代理的税收收益总额（游戏流水*计税税率*（代理分红比-下级代理分红比））
        </mt-popup>
    </mt-cell>
  </div>
    

  <p style="color:red;text-align:center;">∗ 仅展示近一个月内的记录</p>
  <div v-infinite-scroll='loadmore'>
      <div class="card" v-for="(item, index) in newlist" :key="index">
        <mt-cell :title="item.play_time">
        </mt-cell>
        <mt-cell title="订单编号" :value="item.order_no">
        </mt-cell>
        <mt-cell title="游戏id" :value="item.game_id">
        </mt-cell>
        <mt-cell title="游戏名称" :value="item.play_name">
        </mt-cell>
         <mt-cell title="游戏房间" :value="item.play_room">
        </mt-cell>
         <mt-cell title="游戏流水" :value="item.flow">
        </mt-cell>
         <mt-cell title="税收收益" :value="item.tax">
        </mt-cell>
        <!-- <mt-cell title="订单状态">
          <span>{{item.status | status}}</span>
        </mt-cell> -->
      </div>
     
  </div>

    <p style="color:red;text-align:center;">没有更多数据了</p>
       
     



  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
export default {
  data () {
    return {
      list: [],
      newlist: [],
      pageno: 1,
      pagenum: 1,
      popup: false
    }
  },
  created() {
    getlist(this, this.pageno)
  },
  computed: {
    ...mapGetters([
      'name',
    ]),
  },
  filters: {
    status (val) {
      if (val === '0') {
        return '提款成功'
      }
      if (val === '1') {
        return '发起请求'
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    loadmore () {
      if (this.pageno < this.pagenum) {
        this.pageno ++
        getlist(this, this.pageno)
      }
    }
  }
}
function getlist (that, pageno) {
  request({
      url: that.public.url + '/playerreport/getplaylist',
      method: 'post',
      data: {
        pageno: pageno,
        pagerows: 15
      }
    }).then(res => {
      that.list = res.data.list
        that.list.map ((item)=>{
          that.newlist.push(item)
        }) 
      that.pageno = res.data.pageno
      that.pagenum = res.data.pagenum
    }).catch(error => {
    })
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .gamereport .card {
    margin: 10px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    border-left: 2px solid #d9d9d9;
    border-right: 2px solid #d9d9d9;
    border-radius: 12px;
    position: relative;
    .mint-popup {
      position: absolute;
      width: 80%;
      left: 50%;
      top: 120%;
      background: #26a2ff;
      color: white;
          padding: 2% 8%;
      font-size: 12px;
    }
    .v-modal {
    background: white;
    opacity:0;
  }
  .mark {
    position: absolute;
    left: 65%;
    top: 15px;
  }
  }
  .mint-header {
    background-color: #304156!important;
    height: 60px!important;
    font-size: 21px!important;
  }
   .gamereport .center .mint-cell-title {
    text-align: center;
  }
</style>
