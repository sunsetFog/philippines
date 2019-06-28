<template>
  <div class="container teamreport">
    <otherheader title="玩家搜索"></otherheader>


    <div class="card">
      <span class="teamreportsearch">高级搜索</span>
      <mt-field label="代理搜索" v-model="username"></mt-field>
  
    <div class="mint-cell-wrapper" style="background: white; border-top: 1px solid #2e163d;" v-if="datashow === 1">
      <span style="margin-right:20px;">日期选择</span>
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </div>

    <div class="mint-cell-wrapper" style="background: white; border-top: 1px solid #2e163d;" v-if="datashow === 2"  @click="opendate">
      <span style="margin-right:15px;">开始时间</span>
      <span style="color: #a9a9a9">{{starttime || '' ? starttime: '请选择开始时间'}}</span>
    </div>
    <mt-datetime-picker
    ref="picker"
    type="date"
    v-model="starttime">
  </mt-datetime-picker>

   <div class="mint-cell-wrapper" style="background: white; border-top: 1px solid #d9d9d9;" v-if="datashow === 2"  @click="opendate">
      <span style="margin-right:15px;">结束时间</span>
      <span style="color: #a9a9a9">{{endtime || '' ? endtime: '请选择结束时间'}}</span>
    </div>
    <mt-datetime-picker
    ref="picker"
    type="date"
    v-model="endtime">
  </mt-datetime-picker>
    </div>

    <div style="padding:0 20px;">
      <mt-button type="primary" size ='large'>搜索</mt-button>
    </div>
  
      
     



  </div>
</template>

<script>
import otherheader from '../layout/otherheader'
export default {
  // components: { MtHeader },
  data () {
    return {
      value: '',
      username: '',
      starttime: '',
      endtime: '',
      value6: '',
      datashow: 1
    }
  },
  components: { otherheader },
  created() {
    var width = document.body.offsetWidth
    if (width > 768) {
      this.datashow = 1
    } else {
      this.datashow = 2
    }
  },
  methods: {
    opendate () {
      this.$refs.picker.open()
    }
  }
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
    .teamreportsearch {
      display: block;
      background: white;
      line-height: 40px;
      color: blue;
      padding: 0 10px;
    }
  }
</style>
