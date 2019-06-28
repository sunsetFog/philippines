<template>
  <div class="container teamreport">
    <mt-header title="团队报表">
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
      <mt-cell title="团队报表" is-link :to="'/teaminfo?'+id">
          
      </mt-cell>
      <div style="display: flex">
        <mt-cell title="团队总流水（总计）" :label="team_flow"  class="threecell fontcolorb">
        </mt-cell>
        <mt-cell title="个人税收收益" :label="team_tax"  class="threecell fontcolorr">
        </mt-cell>
      </div>
    </div>

     <p style="color:red;text-align:center;">∗ 仅展示近一个月内的报表数据</p>

      <!-- <div class="card namestyle">
        <mt-cell :title="name" is-link :to="'/teaminfo?'+id">
        </mt-cell>
        <div class="boxposition">
          <p>团队总流水：<span class="fontcolorb">{{team_flow}}</span></p>
          <p>个人税收收益：<span class="fontcolorr">{{team_tax}}</span></p>
        </div>
      </div> -->
  <div v-infinite-scroll='loadmore'>
     <div class="card namestyle" v-for="(item, index) in newlist" :key="index">
        <mt-cell :title="item.agent_name" is-link :to="'/teaminfo?'+item.agent_id">
        </mt-cell>
        <div class="boxposition">
          <p>团队总流水：<span class="fontcolorb">{{item.team_flow}}</span></p>
          <p>个人税收收益：<span class="fontcolorr">{{item.self_tax}}</span></p>
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
      team_flow: '',
      team_tax: '',
      list: [],
      newlist: [],
      pageno: 1,
      pagenum: 1,
      id: ''
    }
  },
   computed: {
    ...mapGetters([
      'name',
    ]),
  },
  components: { otherheader },
  created() {
    let that = this
    getlist(this,1)
  },
  methods: {
    back () {
      this.$router.push({path: '/'})
    },
    search () {
      this.$router.push({path: '/teamreportsearch'})
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
      url: that.public.url + '/teamreport/getlist',
      method: 'post',
      data: {
        pageno: pageno,
        pagerows: 15
      }
    }).then(res => {
      that.team_flow = res.data.list[0].team_flow
      that.team_tax = res.data.list[0].team_tax.toString()
      that.newlist= res.data.list
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
  .mark1 {
    position: absolute;
    left: 80px;
    top: 15px;
  }
  .threecell {
    float: left;
    flex: 1;
    border-right: 1px solid #2e163d;
    text-align: center;
  }
  .teamreport {
    .mint-cell-wrapper {
      height: 70px;
    }
    .fontcolorb .mint-cell-label {
       color: #ffea00;
    }
    .fontcolorr .mint-cell-label {
      color: red;
    }
    .mint-cell-label {
      font-size: 20px;
    }
    .namestyle .mint-cell-text {
      background: #2e163d;
      color: #855aa1;
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
  background-color: #513663!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
