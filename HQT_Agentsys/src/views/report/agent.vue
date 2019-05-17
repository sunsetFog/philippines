<template>
  <div class="container agent">
    <mt-header title="代理管理">
        <mt-button slot="left" @click="back">
        <i class="mintui mintui-back"></i>
        </mt-button>

    </mt-header>

    <div class="card">
        <mt-cell :title="name">
        <img slot="icon" src="../../../static/user.png" width="30" height="30">
      </mt-cell>
    </div>


  <div v-infinite-scroll='loadmore'>
     <div class="card namestyle" v-for="(item, index) in newlist" :key="index" @click="getid(item.user_id,index)">
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
      id="showposition"
      popup-transition='popup-fade'
      >
      <div class="mint-cell" @click="getinfo">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
           <div class="mint-cell-title">
            查看详情
          </div>
        </div>
        </div>
        
      </div>

      <div class="mint-cell" @click="update">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
           <div class="mint-cell-title">
            调整分成比例和配额
          </div>
        </div>
        </div>
        
      </div>

       <div class="mint-cell" @click="show=!show">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
           <div class="mint-cell-title">
            取消
          </div>
        </div>
        </div>
        
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
      var showposition = document.getElementById('showposition')
      showposition.style.top= 180+(70+10)*(index*1 + 1) + 'px'
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
  .agent .card {
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
  .agent {
    .showposition {
          left: 60%;
    // width: 20%;
    .mint-cell-text {
      font-size: 15px;
    }
    }
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
      display: inline-block;
      font-size: 12px;
      width: 18%;
    }
    .boxposition {
      position: absolute;
      left: 26%;
      top: 0;
      font-size: 12px;
      // display: flex;
      // flex-direction: column;
      p {
        margin: 5px;
      }
    }
  }
  .mint-header {
    background-color: #304156!important;
    height: 60px !important;
    font-size: 21px !important;
  }
</style>
