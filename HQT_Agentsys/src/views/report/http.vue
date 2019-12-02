<template>
  <div class="container" id="guanlilianjie">
    <mt-header title="管理链接">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

        <!-- <mt-button slot="right"   @click="add">
        <img src="../../../static/jia.png" style="width: 1.875rem;height: 1.875rem">
        </mt-button> -->
    </mt-header>

    <div v-infinite-scroll='loadmore' >
       <div class="card" v-for="(item, index) in newlist" :key="index">
          <span class="http">{{item.url}}</span>
          <div>
            <div style="background: white;padding: 0.625rem 0rem;box-sizing: border-box;">
                <mt-button type="primary" size="small" class="all_palm" @click="copy(item.url)">复制链接</mt-button>
                <mt-button type="primary" size="small" class="all_palm" @click="yulan(item.url)">预览链接</mt-button>
                <mt-button type="primary" size="small" class="all_palm" @click="del(item.id)">删除此链接</mt-button>
            </div>
          </div>
          <div class="erweima">
            

            <!-- <div id="qrcode">二维码位置</div> -->
            <vueqr :size='text' :text='item.url'></vueqr>
          </div>
          <div>
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
import {
  getweb
} from '@/utils/auth'
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
      if(getweb() == 'true') {
        openWindow(url)
      } else {
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
          //ios
          openWindow(url)
        } else {
          //andriod
          document.location = 'js://openUrl?url=' + url
        }
        
      }
    },
    del (id) {
      let that = this
      request({
          url: this.public.url + '/agentaccount/delseourl',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          var width = document.body.offsetWidth
          if (width > 768) {
            Message({
            message: '删除成功',
              type: 'success'
              })
          } else {
            Toast({
                message: '删除成功'
              })
          }
          getaddlist(that,1)
        }).catch(error => {
        })
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
#guanlilianjie{
    .mint-button--primary{
        background: #d4c3b2;
        border: 1px solid #b02ab5;
        color: #b00cb3;
        font-family: 'Microsoft YaHei-Bold';
        font-size: 14px;
        font-weight: 600;
        margin-left: 17px;
    }
    .erweima{
      width: 100%;
      height: 200px;
      text-align: center;
      margin: 10px 0px;
      background: white;
      img{
        width: 200px;
        height: 200px;
      }
    }
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
  }
    .mint-header {
  background-color: #513663!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
