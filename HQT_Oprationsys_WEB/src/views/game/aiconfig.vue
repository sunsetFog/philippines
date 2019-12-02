<template>
  <div class="app-container">
    <el-tabs tab-position="left" type="border-card" @tab-click="cardTab"  style="height: 100vh;overflow-y: scroll;">
      <el-tab-pane :label="label_list[0].title">
        <bjl :game_scene_id="label_list[0].scene" :game_duration="label_list[0].duration" :game_title="label_list[0].title" :ref="label_list[0].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[1].title">
        <bjl :game_scene_id="label_list[1].scene" :game_duration="label_list[1].duration" :game_title="label_list[1].title" :ref="label_list[1].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[2].title">
        <bjl :game_scene_id="label_list[2].scene" :game_duration="label_list[2].duration" :game_title="label_list[2].title" :ref="label_list[2].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[3].title">
        <bjl :game_scene_id="label_list[3].scene" :game_duration="label_list[3].duration" :game_title="label_list[3].title" :ref="label_list[3].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[4].title">
        <bjl :game_scene_id="label_list[4].scene" :game_duration="label_list[4].duration" :game_title="label_list[4].title" :ref="label_list[4].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[5].title">
        <bjl :game_scene_id="label_list[5].scene" :game_duration="label_list[5].duration" :game_title="label_list[5].title" :ref="label_list[5].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[6].title">
        <bjl :game_scene_id="label_list[6].scene" :game_duration="label_list[6].duration" :game_title="label_list[6].title" :ref="label_list[6].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[7].title">
        <bjl :game_scene_id="label_list[7].scene" :game_duration="label_list[7].duration" :game_title="label_list[7].title" :ref="label_list[7].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[8].title">
        <bjl :game_scene_id="label_list[8].scene" :game_duration="label_list[8].duration" :game_title="label_list[8].title" :ref="label_list[8].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[9].title">
        <bjl :game_scene_id="label_list[9].scene" :game_duration="label_list[9].duration" :game_title="label_list[9].title" :ref="label_list[9].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[10].title">
        <bjl :game_scene_id="label_list[10].scene" :game_duration="label_list[10].duration" :game_title="label_list[10].title" :ref="label_list[10].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[11].title">
        <bjl :game_scene_id="label_list[11].scene" :game_duration="label_list[11].duration" :game_title="label_list[11].title" :ref="label_list[11].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[12].title">
        <bjl :game_scene_id="label_list[12].scene" :game_duration="label_list[12].duration" :game_title="label_list[12].title" :ref="label_list[12].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[13].title">
        <bjl :game_scene_id="label_list[13].scene" :game_duration="label_list[13].duration" :game_title="label_list[13].title" :ref="label_list[13].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[14].title">
        <bjl :game_scene_id="label_list[14].scene" :game_duration="label_list[14].duration" :game_title="label_list[14].title" :ref="label_list[14].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[15].title">
        <bjl :game_scene_id="label_list[15].scene" :game_duration="label_list[15].duration" :game_title="label_list[15].title" :ref="label_list[15].ref"/>
      </el-tab-pane>
      <el-tab-pane label="红包扫雷设置">
        <redenvelopepz/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[17].title">
        <bjl3 :game_scene_id="label_list[17].scene" :game_duration="label_list[17].duration" :game_title="label_list[17].title" :ref="label_list[17].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[18].title">
        <bjl2 :game_scene_id="label_list[18].scene" :game_duration="label_list[18].duration" :game_title="label_list[18].title" :ref="label_list[18].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[19].title">
        <bjl2 :game_scene_id="label_list[19].scene" :game_duration="label_list[19].duration" :game_title="label_list[19].title" :ref="label_list[19].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[20].title">
        <bjl2 :game_scene_id="label_list[20].scene" :game_duration="label_list[20].duration" :game_title="label_list[20].title" :ref="label_list[20].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[21].title">
        <bjl :game_scene_id="label_list[21].scene" :game_duration="label_list[21].duration" :game_title="label_list[21].title" :ref="label_list[21].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[22].title">
        <bjl :game_scene_id="label_list[22].scene" :game_duration="label_list[22].duration" :game_title="label_list[22].title" :ref="label_list[22].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[23].title">
        <bjl :game_scene_id="label_list[23].scene" :game_duration="label_list[23].duration" :game_title="label_list[23].title" :ref="label_list[23].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[24].title">
        <bjl :game_scene_id="label_list[24].scene" :game_duration="label_list[24].duration" :game_title="label_list[24].title" :ref="label_list[24].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[25].title">
        <bjl :game_scene_id="label_list[25].scene" :game_duration="label_list[25].duration" :game_title="label_list[25].title" :ref="label_list[25].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[26].title">
        <bjl :game_scene_id="label_list[26].scene" :game_duration="label_list[26].duration" :game_title="label_list[26].title" :ref="label_list[26].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[27].title">
        <bjl4 :game_scene_id="label_list[27].scene" :game_duration="label_list[27].duration" :game_title="label_list[27].title" :ref="label_list[27].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[28].title">
        <bjl4 :game_scene_id="label_list[28].scene" :game_duration="label_list[28].duration" :game_title="label_list[28].title" :ref="label_list[28].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[29].title">
        <bjl4 :game_scene_id="label_list[29].scene" :game_duration="label_list[29].duration" :game_title="label_list[29].title" :ref="label_list[29].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[30].title">
        <bjl4 :game_scene_id="label_list[30].scene" :game_duration="label_list[30].duration" :game_title="label_list[30].title" :ref="label_list[30].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[31].title">
        <bjl4 :game_scene_id="label_list[31].scene" :game_duration="label_list[31].duration" :game_title="label_list[31].title" :ref="label_list[31].ref"/>
      </el-tab-pane>
       <!-- <el-tab-pane :label="label_list[32].title">
        <bjl4 :game_scene_id="label_list[32].scene" :game_duration="label_list[32].duration" :game_title="label_list[32].title" :ref="label_list[32].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[33].title">
        <bjl4 :game_scene_id="label_list[33].scene" :game_duration="label_list[33].duration" :game_title="label_list[33].title" :ref="label_list[33].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[34].title">
        <bjl4 :game_scene_id="label_list[34].scene" :game_duration="label_list[34].duration" :game_title="label_list[34].title" :ref="label_list[34].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[35].title">
        <bjl4 :game_scene_id="label_list[35].scene" :game_duration="label_list[35].duration" :game_title="label_list[35].title" :ref="label_list[35].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[36].title">
        <bjl4 :game_scene_id="label_list[36].scene" :game_duration="label_list[36].duration" :game_title="label_list[36].title" :ref="label_list[36].ref"/>
      </el-tab-pane>
       <el-tab-pane :label="label_list[37].title">
        <bjl4 :game_scene_id="label_list[37].scene" :game_duration="label_list[37].duration" :game_title="label_list[37].title" :ref="label_list[37].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[38].title">
        <bjl4 :game_scene_id="label_list[38].scene" :game_duration="label_list[38].duration" :game_title="label_list[38].title" :ref="label_list[38].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[39].title">
        <bjl4 :game_scene_id="label_list[39].scene" :game_duration="label_list[39].duration" :game_title="label_list[39].title" :ref="label_list[39].ref"/>
      </el-tab-pane>
      <el-tab-pane :label="label_list[40].title">
        <bjl4 :game_scene_id="label_list[40].scene" :game_duration="label_list[40].duration" :game_title="label_list[40].title" :ref="label_list[40].ref"/>
      </el-tab-pane> -->
    </el-tabs>
      




  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import bjl from './bjl'
import bjl2 from './bjl2'
import bjl3 from './bjl3'
import bjl4 from './bjl4'
import redenvelopepz from './redenvelopepz'
export default {
  data() {
    return {
        label_list: [
          {title: '百家乐（经典场）设置',scene: 201,duration: 0,ref: 'type0'},
          {title: '百家乐彩票（30秒场）设置',scene: 202,duration: 30,ref: 'type1'},
          {title: '百家乐彩票（60秒场）设置',scene: 202,duration: 60,ref: 'type2'},
          {title: '百家乐彩票（120秒场）设置',scene: 202,duration: 120,ref: 'type3'},
          {title: '百家乐彩票（300秒场）设置',scene: 202,duration: 300,ref: 'type4'},
          {title: '百人牛牛（经典场）设置',scene: 101,duration: 0,ref: 'type5'},
          {title: '百人牛牛彩票（90秒场）设置',scene: 102,duration: 90,ref: 'type6'},
          {title: '百人牛牛彩票（300秒场）设置',scene: 102,duration: 300,ref: 'type7'},
          {title: '百人牛牛彩票（1200秒场）设置',scene: 102,duration: 1200,ref: 'type8'},
          {title: '龙虎斗（经典场）设置',scene: 801,duration: 0,ref: 'type9'},
          {title: '龙虎斗彩票（30秒场）设置',scene: 802,duration: 30,ref: 'type10'},
          {title: '龙虎斗彩票（60秒场）设置',scene: 802,duration: 60,ref: 'type11'},
          {title: '龙虎斗彩票（120秒场）设置',scene: 802,duration: 120,ref: 'type12'},
          {title: '龙虎斗彩票（300秒场）设置',scene: 802,duration: 300,ref: 'type13'},
          {title: '红黑大战设置',scene: 301,duration: 0,ref: 'type14'},
          {title: '幸运水果机设置',scene: 701,duration: 0,ref: 'type15'},
          {title: '红包扫雷设置',scene: 0,duration: 0,ref: 'type16'},
          {title: '水浒传设置',scene: 601,duration: 0,ref: 'type17'},
          {title: '全民捕鱼（新手场）设置',scene: 501,duration: 0,ref: 'type18'},
          {title: '全民捕鱼（贵宾场）设置',scene: 502,duration: 0,ref: 'type19'},
          {title: '全民捕鱼（富豪场）设置',scene: 503,duration: 0,ref: 'type20'},
          {title: '疯狂斗牛设置',scene: 901,duration: 0,ref: 'type21'},
          {title: '彩票牛牛（30秒场）设置',scene: 1001,duration: 30,ref: 'type22'},
          {title: '彩票牛牛（60秒场）设置',scene: 1001,duration: 60,ref: 'type23'},
          {title: '彩票牛牛（120秒场）设置',scene: 1001,duration: 120,ref: 'type24'},
          {title: '彩票牛牛（300秒场）设置',scene: 1001,duration: 300,ref: 'type25'},
          {title: '彩票牛牛（1200秒场）设置',scene: 1001,duration: 1200,ref: 'type26'},
          {title: '抢庄牛牛（场次1）设置',scene: 1101,duration: 0,ref: 'type27'},
          {title: '抢庄牛牛（场次2）设置',scene: 1102,duration: 0,ref: 'type28'},
          {title: '抢庄牛牛（场次3）设置',scene: 1103,duration: 0,ref: 'type29'},
          {title: '抢庄牛牛（场次4）设置',scene: 1104,duration: 0,ref: 'type30'},
          {title: '抢庄牛牛（场次5）设置',scene: 1105,duration: 0,ref: 'type31'},
          // {title: '二八杆（新手房）设置',scene: 1105,duration: 0,ref: 'type32'},
          // {title: '二八杆（初级房）设置',scene: 1105,duration: 0,ref: 'type33'},
          // {title: '二八杆（中级房）设置',scene: 1105,duration: 0,ref: 'type34'},
          // {title: '二八杆（高级房）设置',scene: 1105,duration: 0,ref: 'type35'},
          // {title: '二八杆（至尊房）设置',scene: 1105,duration: 0,ref: 'type36'},
          // {title: '二八杆（王者房）设置',scene: 1105,duration: 0,ref: 'type37'},
          // {title: '斗地主1元场设置',scene: 1105,duration: 0,ref: 'type38'},
          // {title: '斗地主10元场设置',scene: 1105,duration: 0,ref: 'type39'},
          // {title: '斗地主20元场设置',scene: 1105,duration: 0,ref: 'type40'},
        ],
        save_key: ['0']
    }
  },
  created(){
    this.save_key = ['0'];
  },
  mounted(){
    this.$refs[this.label_list[0].ref].communication();
  },
  computed: {
    ...mapGetters([
      
    ])
  },
  components: {
    bjl,
    bjl2,
    bjl3,
    bjl4,
    redenvelopepz,
  },
  watch: {
  },
  filters: {
  },
  methods: {
   cardTab(val,res){
    //  console.log('key&',this.save_key,val.index);
     if(this.save_key.indexOf(val.index)==-1 && val.index!='16'){
      //  console.log('success');
       this.save_key.push(val.index);
       this.$refs[this.label_list[val.index].ref].communication();
     }
   }
  }
}








</script>

<style>

</style>
