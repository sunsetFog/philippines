<template>
  <div class="container daydegrees">
    <mt-header title="日度报表">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

        <!-- <mt-button slot="right" @click="search">
        <i class="mintui mintui-search"></i>
          搜索
        </mt-button> -->
    </mt-header>

    <div class="card">
        <mt-cell :title="name">
        <img slot="icon" src="../../../static/user.png" style="width: 1.875rem;height: 1.875rem">
        <span>
          <img slot="icon" src="../../../static/mark.png" style="width: 1.25rem;height: 1.25rem" class="all_palm" @click="show = !show">
        </span>
        <mt-popup
          v-model="show"
          popup-transition='popup-fade'
        >
        <div style="text-align: center;line-height: 1.875rem;">团队总流水</div>
        <div style="line-height: 1.25rem;">团队所有玩家提供的流水总额（直属玩家流水+下级团队玩家流水）
        团队税收收益:团队的税收收益总额（团队总流水*计税税率*团队最高代理分红额度）</div>
        </mt-popup>
      </mt-cell>
    </div>
    
     <p style="color:red;text-align:center;">∗ 仅展示近一个月内的报表数据</p>

        <div v-infinite-scroll='loadmore'>
        <div class="card namestyle"  v-for="(item, index) in newlist" :key="index">
        <mt-cell :title="item.adate" is-link :to="'/dayinfo?'+ item.adate">
        </mt-cell>
        <div class="boxposition">
          <p>团队总流水：<span class="fontcolorb">{{item.team_flow}}</span></p>
          <p>团队税收收益：<span class="fontcolorr">{{item.team_tax}}</span></p>
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
  .daydegrees{
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
    border-right: 1px solid #2e163d;
    text-align: center;
  }
  .daydegrees {
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
      top: 10px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .mint-header {
  background-color: #513663!important;
  height: 60px!important;
  font-size: 21px!important;
}
</style>
