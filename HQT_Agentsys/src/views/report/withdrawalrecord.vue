<template>
  <div class="container">
    <mt-header title="提现记录">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

    </mt-header>



  <div v-infinite-scroll='loadmore'>
      <div class="card" v-for="(item, index) in newlist" :key="index">
        <mt-cell :title="item.create_time">
        </mt-cell>
        <mt-cell title="订单编号" :value="item.order_no">
        </mt-cell>
        <mt-cell title="提现金额" :value="item.money">
        </mt-cell>
        <mt-cell title="取现去向" :value="item.to_cardno">
        </mt-cell>
        <mt-cell title="订单状态">
          <span>{{item.audit_status}}</span>
        </mt-cell>
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
      pagenum: 1
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
      url: that.public.url + '/paywithdraw/getlist',
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
  .mint-header {
    background-color: #513663!important;
    height: 60px!important;
    font-size: 21px!important;
  }
</style>
