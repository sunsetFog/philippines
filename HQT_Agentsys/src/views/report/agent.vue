<template>
  <div class="container agent">
    <mt-header title="代理管理">
        <mt-button slot="left" class="all_palm" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

    </mt-header>

    <div class="card">
        <mt-cell :title="name">
        <img slot="icon" src="../../../static/user.png" style="width: 1.875rem;height: 1.875rem">
      </mt-cell>
    </div>


  <div v-infinite-scroll='loadmore'>
     <div class="card namestyle all_palm" v-for="(item, index) in newlist" :key="index" @click="getid(item.user_id,index)">
        <mt-cell :title=item.login_name is-link>
        </mt-cell>
        <div class="boxposition">
          <!-- <p>日工资：<span class="fontcolorb">{{item.day_wages}}</span></p> -->
          <p>团队流水（税收）分成：<span class="fontcolorr">{{item.reward_team}}</span></p>
          <p>创建时间：<span class="fontcolorr">{{item.create_time}}</span></p>
          <!-- <p>分红：<span class="fontcolorr">{{item.bonus}}</span></p> -->
        </div>
         
      </div>
      <mt-popup
      v-model="show"
      class="showposition"
      style="background: none;"
      popup-transition='popup-fade'
      >
      <div class="chakanxiangqing" @click="getinfo">
            查看详情
      </div>

      <div class="chakanxiangqing" @click="update">
            调整税收比例
      </div>

       <div class="chakanxiangqing" @click="show=!show">
            取消
      </div>
      </mt-popup>
     
  </div>
   <p style="color:red;text-align:center;" v-if="pshow">没有更多数据了</p>
       
     



  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
import { mapGetters } from 'vuex'
import { request } from '@/utils/request'
export default {
  data () {
    return {
      list: [],
      newlist: [],
      pageno: 1,
      pagenum: 1,
      pshow: false,
      show: false,
      id: ''
    }
  },
  components: { otherheader },
  created() {
    getlist(this, this.pageno)
  },
  computed: {
    ...mapGetters([
      'name',
    ]),
  },
  methods: {
    back () {
      this.$router.push({path: '/'})
    },
    loadmore () {
      if (this.pageno < this.pagenum) {
        this.pshow = false
        this.pageno ++
        getlist(this, this.pageno)
      } else {
        this.pshow = true
      }
    },
    getid (id,index) {
      this.id = id
      this.show = !this.show
    },
    getinfo () {
      this.$router.push({path: '/agentgetinfo', query: {id: this.id}})
    },
    update () {
      this.$router.push({path: '/updateagent', query: {id: this.id}})
    }
  }
}
function getlist (that, pageno) {
  request({
      url: that.public.url + '/agentaccount/getlist',
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
  .agent {
    .showposition {
    .mint-cell-text {
      font-size: 15px;
    }
    }
    .mint-cell-wrapper {
      height: 70px;
    }
    .chakanxiangqing{
      width: 100%;
      height: 50px;
      background: white;
      text-align: center;
      line-height: 50px;
      margin-bottom: 2px;
      font-size: 15px;
      color: #732c94;
      cursor: pointer;
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
      display: inline-block;
      font-size: 12px;
      width: 18%;
    }
    .boxposition {
      position: absolute;
      left: 26%;
      top: 10px;
      font-size: 12px;
      cursor: pointer;
      // display: flex;
      // flex-direction: column;
      // p {
      //   margin: 5px;
      // }
    }
  }
  .mint-header {
    background-color: #513663!important;
    height: 60px !important;
    font-size: 21px !important;
  }
</style>
