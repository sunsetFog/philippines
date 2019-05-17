<template>
  <div class="container daydegrees">
    <mt-header title="日度报表">
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
        <span>
          <img slot="icon" src="../../../static/mark.png" width="20" height="20"  @click="show = !show">
        </span>
        <mt-popup
          v-model="show"
          popup-transition='popup-fade'
        >
        团队总流水:团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）<br/>
        团队税收收益:团队的税收收益总额（团队总流水*计税税率*团队最高代理分红额度）
        </mt-popup>
      </mt-cell>
    </div>
    
     <p style="color:red;text-align:center;">∗ 仅展示近一个月内的报表数据</p>

        <div v-infinite-scroll='loadmore'>
        <div class="card namestyle"  v-for="(item, index) in newlist" :key="index">
        <mt-cell :title="item.date" is-link :to="'/dayinfo?'+ item.date">
        </mt-cell>
        <div class="boxposition">
          <p>团队总流水：<span class="fontcolorb">{{item.team_flow}}</span></p>
          <p>个人税收收益：<span class="fontcolorr">{{item.team_tax}}</span></p>
        </div>
      </div>
        </div>

      
       <p style="color:red;text-align:center;">没有更多数据了</p>



  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { request } from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      value: '',
      show:false,
      list: [],
      pageno: 1,
      pagenum: 1,
      newlist: []
    }
  },
  components: { otherheader },
  computed: {
    ...mapGetters([
      'name',
    ]),
  },
  created() {
    getlist(this, this.pageno)
  },
  methods: {
    back () {
      this.$router.push({path: '/'})
    },
    search () {
      this.$router.push({path: '/daydegreessearch'})
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
      url: that.public.url + '/dayreport/getagentlist',
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
  .daydegrees .card {
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
  .daydegrees {
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
