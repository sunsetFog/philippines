<template>
  <div class="container plaverreport" id="plaverreport">
    <mt-header title="玩家报表">
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
    <div class="card">
      <mt-cell title="玩家报表">
          
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="团队玩家" :label="num"  class="threecell fontcolorb">
        </mt-cell>
        <mt-cell title="团队流水" :label="flow"  class="threecell fontcolorr">
        </mt-cell>
      </div>
    </div>

     <p style="color:red;text-align:center;">∗ 仅展示近一个月内的报表数据</p>
  
        <div class="card namestyle">
        <mt-cell :title="agent_name" is-link :to="'/plaverlist?'+ agent_id">
        </mt-cell>
        <div class="boxposition">
          <p>直属玩家：<span class="fontcolorb">{{total_upalyer_num}}</span></p>
          <p>直属流水：<span class="fontcolorr">{{total_upalyer_flow}}</span></p>
        </div>
      </div>

      <div v-infinite-scroll='loadmore'>
     <div class="card namestyle" v-for="(item, index) in newlist" :key="index">
        <mt-cell :title=item.agent_name is-link :to="'/plaverlist?'+ item.agent_id">
        </mt-cell>
        <div class="boxposition">
          <p>团队玩家：<span class="fontcolorb">{{item.agent_palyer_num}}</span></p>
          <p>团队流水：<span class="fontcolorr">{{item.agent_team_flow}}</span></p>
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
      num: '',
      flow: '',
      agent_name: '',
      total_upalyer_num: '',
      total_upalyer_flow: '',
      list: [],
      pageno: 1,
      pagenum: 1,
      id: '',
      agent_id: '',
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
    getincome(this)
    getlist(this, this.pageno)
  },
  mounted() {

  },
  methods: {
    back () {
      this.$router.push({path: '/'})
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
function getincome (that) {
  request({
      url: that.public.url + '/playerreport/getteamincome',
      method: 'post',
      data: {
      }
    }).then(res => {
      that.flow = res.data.team_palyer_flow
      that.num = res.data.team_palyer_num.toString()
      that.agent_name = res.data.agent_name
      that.agent_id = res.data.agent_id
      that.total_upalyer_flow = res.data.total_upalyer_flow
      that.total_upalyer_num = res.data.total_upalyer_num
    }).catch(error => {
    })
}

function getlist (that, pageno) {
  request({
      url: that.public.url + '/playerreport/getlist',
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
