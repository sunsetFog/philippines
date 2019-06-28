<template>
  <div class="container">
    <mt-header title="注册链接">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

        <mt-button slot="right"   @click="add">
        <img src="../../../static/jia.png" style="width:30px;height:30px;">
        </mt-button>
    </mt-header>

    <div v-infinite-scroll='loadmore' >
       <div class="card" v-for="(item, index) in newlist" :key="index">
      <span class="http">{{item.url}}</span>
      <div class="card">
        <div style="display: flex; background: white;">
            <mt-button type="primary" size="small"  style="flex: 1; margin:10px;" @click="copy(item.url)">复制链接</mt-button>
            <mt-button type="primary" size="small" style="flex: 1;margin:10px;" @click="yulan(item.url)">预览链接</mt-button>
        </div>
      </div>
      <div class="card" style="text-align: center;margin:10px;padding: 10px;background: white;">
        

        <!-- <div id="qrcode">二维码位置</div> -->
        <vueqr :size='text' :text='item.url'></vueqr>
      </div>
      <div class="card">
        <mt-cell title="注册时间" :value="item.create_time">
        </mt-cell>
      </div>
      </div>
    </div>
   




  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
import vueqr from 'vue-qr'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      text: 200,
      list: [],
      newlist: [],
      pageno: 1,
      pagenum: 1
    }
  },
  components: { otherheader, vueqr },
  created() {
    getlist(this, 1)
  },
   computed: {
    ...mapGetters([
      'name',
    ]),
  },
  mounted() {
  },
  methods: {
    yulan (url) {
      openWindow(url)
    },
    add() {
      let that = this
    request({
        url: this.public.url + '/agentaccount/addseourl',
        method: 'post',
        data: {
        }
      }).then(res => {
        var width = document.body.offsetWidth
        if (width > 768) {
          Message({
          message: '新增成功',
            type: 'success'
            })
        } else {
          Toast({
              message: '新增成功'
            })
        }
          getaddlist(that,1)
      }).catch(error => {
      })
    },
    loadmore () {
      if (this.pageno < this.pagenum) {
        this.pageno ++
        getlist(this, this.pageno)
      }
    },
    back () {
      this.$router.go(-1)
    },
    copy (url) {
      var e = document.createElement('input');
      e.value = url;
      document.body.appendChild(e)
      e.select();
      let tag = document.execCommand('Copy')
      e.style.display = 'none'
      var width = document.body.offsetWidth
        if (width > 768) {
       Message({
          message: '复制成功',
            type: 'success'
          })
        } else {
          Toast({
              message: '复制成功'
            })
        }
    }
  },
  filters: {
  }
}
function openWindow(url) {
  window.open(url)
}
function getaddlist (that, pageno) {
  request({
        url: that.public.url + '/agentaccount/getseourllist',
        method: 'post',
        data: {
          pageno: pageno,
          pagerows: 15
        }
      }).then(res => {
        that.newlist = res.data.list
        that.pageno = res.data.pageno
        that.pagenum = res.data.pagenum
      }).catch(error => {
      })
}
function getlist (that, pageno) {
  request({
        url: that.public.url + '/agentaccount/getseourllist',
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
  .card {
    margin: 10px;
    border-top: 1px solid #2e163d;
    border-bottom: 1px solid #2e163d;
    border-left: 2px solid #2e163d;
    border-right: 2px solid #2e163d;
    border-radius: 12px;
    position: relative;
  }
  .mark {
    position: absolute;
    left: 120px;
    top: 14px;
  }
  .smallcell {
    width: 50%;
    float: left;
  }
  .smallcell .mint-cell-text{
    font-size: 12px;
    font-weight: 600;
  }
  .threecell {
    float: left;
    flex: 1;
    border-right: 1px solid #2e163d;
    text-align: center;
  }
  .http {
    display: block;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
    .mint-header {
  background-color: #513663!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
