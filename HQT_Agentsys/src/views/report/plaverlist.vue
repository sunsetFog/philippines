<template>
  <div class="container plaverreport">
    <mt-header title="玩家列表">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

        <!-- <mt-button slot="right" @click="search">
        <i class="mintui mintui-search"></i>
          搜索
        </mt-button> -->
    </mt-header>

    <div class="card">
        <mt-cell :title="name">
        <img slot="icon" src="../../../static/user.png" width="30" height="30">
      </mt-cell>
    </div>
  

      <div v-infinite-scroll='loadmore'>
     <div class="card namestyle" v-for="(item, index) in newlist" :key="index">
        <mt-cell :title="item.account_type === '1'? '游客'+item.player_name:'玩家'+item.player_name" is-link :to="'/playerinfo?'+ item.player_id">
        </mt-cell>
        <div class="boxposition">
          <p>流水：<span class="fontcolorb">{{item.flow}}</span></p>
          <p>不活跃时长：<span class="fontcolorr">{{item.last_login_day}}</span></p>
        </div>
         
      </div>
  </div>
      
        <p style="color:red;text-align:center;">没有更多数据了</p>
     



  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
export default {
  data () {
    return {
      value: '',
      list: [],
      pageno: 1,
      pagenum: 1,
      id: '',
      newlist: []
    }
  },
   computed: {
    ...mapGetters([
      'name',
    ]),
  },
  components: { otherheader },
  created() {
    var url = window.location.href;
    if (url.indexOf('?')!='-1') {
      this.id = url.split('?')[1]
    }
    getlist(this, this.pageno)
  },
  methods: {
    back () {
      this.$router.push({path: '/plaverreport'})
    },
    loadmore () {
      if (this.pageno < this.pagenum) {
        this.pageno ++
        getlist(this, this.pageno)
      }
    },
    search () {
      this.$router.push({path: '/playerreportsearch'})
    }
  }
}
function getlist (that, pageno) {
  request({
      url: that.public.url + '/playerreport/getplayerlist',
      method: 'post',
      data: {
        pageno: pageno,
        pagerows: 15,
        agent_id: that.id
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
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    border-left: 2px solid #d9d9d9;
    border-right: 2px solid #d9d9d9;
    border-radius: 12px;
    position: relative;
  }
  .mark1 {
    position: absolute;
    left: 80px;
    top: 15px;
  }
  .threecell {
    float: left;
    flex: 1;
    border-right: 1px solid #d9d9d9;
    text-align: center;
  }
  .plaverreport {
    .mint-cell-wrapper {
      height: 70px;
    }
    .fontcolorb .mint-cell-label {
      color: blue;
    }
    .fontcolorr .mint-cell-label {
      color: red;
    }
    .mint-cell-label {
      font-size: 20px;
    }
    .namestyle .mint-cell-text {
      background: blue;
      color: white;
      padding: 20px 10px;
    }
    .boxposition {
      position: absolute;
      left: 140px;
      top: 0;
      font-size: 12px;
    }
  }
  .mint-header {
  background-color: #304156!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
