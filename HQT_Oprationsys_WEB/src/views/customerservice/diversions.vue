<template>
  <div class="app-container mail">
    <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
              <el-button type="info" round @click="add" v-if="gamemovetextadd">添加</el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="效果级别">
              <el-select v-model="formInline.type" filterable clearable>
                <el-option
                  v-for="item in typelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="优先级">
              <el-select v-model="formInline.frist" filterable clearable>
                <el-option
                  v-for="item in fristlist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="播放开关">
              <el-select v-model="formInline.play" filterable clearable>
                <el-option
                  v-for="item in playlist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
          <!-- <el-col :span="2">
            <el-button type="primary" @click="again" v-if="gamemovetextrepeatpush">重推</el-button>
          </el-col> -->
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamemovetextgetlist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          background
          layout="prev, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        width='80'
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
      width='80'
        prop="effect_level"
        label="效果级别">
      </el-table-column>
      <el-table-column
      width='80'
        prop="priority_level"
        label="优先级">
      </el-table-column>
      <!-- <el-table-column
      width='80'
        prop="loop_count"
        label="循环次数">
      </el-table-column> -->
      <el-table-column
      width='80'
        prop="loop_speed"
        label="播放速度">
      </el-table-column>
      <el-table-column
      width='80'
        label="定时播放">
        <template slot-scope="scope">
          {{scope.row.is_timing_play | is_timing_play}}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="播放内容">
      </el-table-column>
      <el-table-column
      width='80'
        label="播放开关">
        <template slot-scope="scope">
          {{scope.row.switch | play}}
        </template>
      </el-table-column>
      <el-table-column
      width='120'
        prop="push_status"
        label="推送情况">
      </el-table-column>
      <el-table-column
        fixed="right"
        width='200'
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="again(scope.row)" v-if="gamemovetextrepeatpush" class="red">重推</el-button>
          <el-button type="text" size="small" @click="edit(scope.row.id)" v-if="gamemovetextupdate">编辑</el-button>
          <el-button type="text" size="small" @click="view(scope.row.id)" v-if="gamemovetextgetinfo">查看</el-button>
          <el-button type="text" size="small" @click="delet(scope.row.id)" v-if="gamemovetextdel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagingbox">
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[50,100,200]"
          :page-size="pagesize"
          background
          layout="sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>


    <el-dialog title='跑马灯 查看' :visible.sync="dialogFormVisible">
      <el-form>


        <el-form-item label="效果级别" :label-width="formLabelWidth">
          {{form.effect_level}}
        </el-form-item>
        <el-form-item label="优先级" :label-width="formLabelWidth">
          {{form.priority_level}}
        </el-form-item>
        <!-- <el-form-item label="循环次数" :label-width="formLabelWidth">
          {{form.loop_count}}
        </el-form-item> -->
        <el-form-item label="播放速度" :label-width="formLabelWidth">
          {{form.loop_speed}}
        </el-form-item>
        <el-form-item label="定时播放" :label-width="formLabelWidth">
          {{form.is_timing_play | is_timing_play}}
        </el-form-item>
        <el-form-item label="播放开始时间" :label-width="formLabelWidth" v-if="form.is_timing_play === '1'">
          {{form.play_from_time}}
        </el-form-item>
        <el-form-item label="播放结束时间" :label-width="formLabelWidth" v-if="form.is_timing_play === '1'">
          {{form.play_to_time}}
        </el-form-item>
        <el-form-item label="播放内容" :label-width="formLabelWidth">
          {{form.content}}
        </el-form-item>


        <el-form-item label="播放开关" :label-width="formLabelWidth">
          {{form.switch | play}}
        </el-form-item>


      </el-form>

    </el-dialog>


     <el-dialog :title="title" :visible.sync="dialogFormVisible2" :before-close="reset">
      <el-form :model="form2" :rules="rules2" ref="form2">
        <el-form-item label="效果级别" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form2.type" clearable>
            <el-option
              v-for="item in typelist2"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" :label-width="formLabelWidth" prop="frist">
          <el-select v-model="form2.frist" clearable>
            <el-option
              v-for="item in fristlist2"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="循环次数" :label-width="formLabelWidth" prop="number">
          <el-input v-model="form2.number" style="width:300px" type='number'></el-input><span>次</span>
        </el-form-item> -->
        <el-form-item label="播放速度" :label-width="formLabelWidth" prop="speed">
          <el-input v-model="form2.speed" style="width:300px" type='number'></el-input><span>像素/16ms</span>
        </el-form-item>
        <el-form-item label="定时播放" :label-width="formLabelWidth" prop="name">
          <el-checkbox v-model="form2.checkbox" style="position: absolute;left: -90px;"></el-checkbox>
          <span>开始时间：</span>
          <el-date-picker
            v-model="form2.value1"
            type='datetime'
          >
          </el-date-picker>
          <span>至 结束时间：</span>
          <el-date-picker
            v-model="form2.value2"
            type='datetime'
          >
          </el-date-picker>
          <el-input v-model="form2.input" style="width:300px;margin-top:8px" type='number'></el-input><span>秒循环一次</span>
        </el-form-item>
        <el-form-item label="播放次数" :label-width="formLabelWidth">
          <el-input v-model="form2.num" style="width:200px" type='number' :disabled="form2.checkbox"></el-input><span>次，每次间隔</span><el-input v-model="form2.time" :disabled="form2.checkbox" style="width:200px" type='number'></el-input><span>秒</span>
        </el-form-item>
        <el-form-item label="播放内容" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form2.content" type='textarea' placeholder='必填。公告内容'></el-input>
        </el-form-item>
         <el-form-item label="播放开关" :label-width="formLabelWidth" prop="radio">
             <el-radio-group v-model="form2.radio">
                 <el-radio :label='"1"'>开启</el-radio>
                 <el-radio :label='"0"'>停用</el-radio>
             </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset(form)">取 消</el-button>
        <el-button type="primary" @click="sure(form)">提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import request from '@/utils/request'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        formInline: {
          type: '',
          frist: '',
          play: ''
        },
        currentPage: 1,
        tableData: [
        ],
        dialogFormVisible: false,
        typelist: [
          {name: '全部', type: ''},
          {name: '1', type: '1'},
          {name: '2', type: '2'},
          {name: '3', type: '3'}
        ],
        typelist2: [
          {name: '1', type: '1'},
          {name: '2', type: '2'},
          {name: '3', type: '3'}
        ],
        fristlist: [
          {name: '全部', type: ''},
          {name: '1', type: '1'},
          {name: '2', type: '2'},
          {name: '3', type: '3'},
          {name: '4', type: '4'},
        ],
        fristlist2: [
          {name: '1', type: '1'},
          {name: '2', type: '2'},
          {name: '3', type: '3'},
          {name: '4', type: '4'},
        ],
        playlist: [
          {name: '全部', type: ''},
          {name: '开启', type: '1'},
          {name: '停用', type: '0'}
        ],
        form: {},
        rules: {},
        formLabelWidth: '120px',
        total: 0,
        pagesize: 50,
        id: '',
        title: '',
        dialogFormVisible2: false,
        form2: {
            type: '',
            frist: '',
            number: '',
            speed: '',
            checkbox: false,
            value1: '',
            value2: '',
            input: '',
            content: '',
            radio: '',
            num: '',
            time: ''
        },
        rules2: {
            type: [
                {required: true, message: '请选择效果级别', trigger: 'change'}
            ],
            frist: [
                {required: true, message: '请选择优先级', trigger: 'change'}
            ],
            number: [
                {required: true, message: '请输入循环次数', trigger: 'blur'}
            ],
            speed: [
                {required: true, message: '请输入循环速度', trigger: 'blur'}
            ],
            content: [
                {required: true, message: '请输入内容', trigger: 'blur'}
            ],
            radio: [
                {required: true, message: '请选择播放开关', trigger: 'change'}
            ],
        }
      }
    },
    created() {
      let that = this
      if (!this.diversions.length && this.diversions.length != 0) {
        that.formInline.type = this.diversions.type
        that.currentPage = this.diversions.currentPage
        that.pagesize = this.diversions.pagesize
        that.formInline.frist = this.diversions.frist
        that.formInline.play = this.diversions.play
        getlist(that)
      }
    },
    computed: {
      ...mapGetters([
        'gamemovetextgetlist',
        'gamemovetextdel',
        'gamemovetextadd',
        'gamemovetextupdate',
        'gamemovetextgetinfo',
        'diversions',
        'gamemovetextrepeatpush'
      ])
    },
    watch: {
      // 'form2.checkbox': function (val) {
      //   if (val) {
      //     this.form2.num = ''
      //     this.form2.time = ''
      //   }
      // }
    },
    filters: {
      play(val) {
        if (val === '0') {
          return '关闭'
        }
        if (val === '1') {
          return '开启'
        }
      },
      is_timing_play (val) {
        if (val === '0') {
          return '否'
        }
        if (val === '1') {
          return '是'
        }
      }
    },
    methods: {
      view(id) {
        this.id = id
        this.dialogFormVisible = true
        let that = this
        request({
          url: that.public.url + '/gamemovetext/getinfo',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          that.form = res.data
        }).catch(error => {
        })
      },
      edit (id) {
        this.title = '跑马灯 编辑'
        this.dialogFormVisible2 = true
        this.id = id
        let that = this
        request({
          url: that.public.url + '/gamemovetext/getinfo',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          that.form2.type = res.data.effect_level
          that.form2.frist = res.data.priority_level
          // that.form2.number = res.data.loop_count
          that.form2.speed = res.data.loop_speed
          that.form2.content = res.data.content
          that.form2.radio = res.data.switch
          if (res.data.is_timing_play === '0') {
              // 不定时播放
              that.form2.checkbox = false
              that.form2.num = res.data.loop_count
              that.form2.time = res.data.one_interval_sec
          } else {
              that.form2.checkbox = true
              that.form2.input = res.data.one_loop_sec
              that.form2.value1 = new Date(res.data.play_from_time)
              that.form2.value2 = new Date(res.data.play_to_time)
          }
        }).catch(error => {
        })
      },
      add () {
        this.title = '跑马灯 添加'
        this.dialogFormVisible2 = true
      },
      delet (id) {
        let that = this
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
            request({
                url: that.public.url + '/gamemovetext/del',
                method: 'post',
                data: {
                    id: id
                }
            }).then(res => {
            getlist(that)
            }).catch(error => {
            })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
            });
        });
        },
      sure () {
          let that = this
            this.$refs.form2.validate((valid) => {
            if (valid) {
                if (this.title === '跑马灯 添加') {
                    let is_timing_play = ''
                    let play_from_time = ''
                    let play_to_time = ''
                    let one_loop_sec = ''
                    let num = ''
                    let time = ''
                    if (that.form2.checkbox) {
                        // 定时播放
                        if (that.form2.value1) {
                            var start = that.form2.value1.getTime() /1000
                            play_from_time = parseTime(start)
                        } else {
                            this.$message.error('请选择开始时间')
                            return false
                        }
                        if (that.form2.value2) {
                            var end = that.form2.value2.getTime() /1000
                            play_to_time = parseTime(end)
                        } else {
                            this.$message.error('请选择开始时间')
                            return false
                        }
                        if (start > end) {
                            this.$message.error('开始时间要小于结束时间')
                            return false
                        }
                        is_timing_play = 1
                        if (that.form2.input === '' && that.form2.input * 1< 0) {
                            this.$message.error('请填写多少秒循环一次且循环次数时间必须大于0')
                            return false
                        }
                        one_loop_sec = that.form2.input
                        num = ''
                        time = ''
                    } else {
                        is_timing_play = 0
                        play_from_time = ''
                        play_to_time = ''
                        one_loop_sec = ''
                        num = that.form2.num
                        time = that.form2.time
                    }
                    request({
                        url: that.public.url + '/gamemovetext/add',
                        method: 'post',
                        data: {
                            effect_level: that.form2.type,
                            priority_level: this.form2.frist,
                            // loop_count: this.form2.number,
                            loop_speed: this.form2.speed,
                            is_timing_play: is_timing_play,
                            play_from_time: play_from_time,
                            play_to_time: play_to_time,
                            one_loop_sec: one_loop_sec,
                            content: this.form2.content,
                            switch: this.form2.radio,
                            loop_count: num,
                            one_interval_sec: time
                        }
                    }).then(res => {
                        that.$message({
                            type: 'success',
                            message: res.message
                        });
                        that.dialogFormVisible2 = false
                        that.form2.value1 = ''
                        that.form2.value2 = ''
                        that.form2.input = ''
                        that.form2.num = ''
                        that.form2.time = ''
                        that.form2.checkbox = false
                        that.$refs.form2.resetFields()
                        getlist(that)
                    }).catch(error => {
                    })
                } else {
                    let is_timing_play = ''
                    let play_from_time = ''
                    let play_to_time = ''
                    let one_loop_sec = ''
                    let num = ''
                    let time = ''
                    if (that.form2.checkbox) {
                        // 定时播放
                        if (that.form2.value1) {
                            var start = that.form2.value1.getTime() /1000
                            play_from_time = parseTime(start)
                        } else {
                            this.$message.error('请选择开始时间')
                            return false
                        }
                        if (that.form2.value2) {
                            var end = that.form2.value2.getTime() /1000
                            play_to_time = parseTime(end)
                        } else {
                            this.$message.error('请选择开始时间')
                            return false
                        }
                        if (start > end) {
                            this.$message.error('开始时间要小于结束时间')
                            return false
                        }
                        is_timing_play = 1
                        if (that.form2.input === '' && that.form2.input * 1< 0) {
                            this.$message.error('请填写多少秒循环一次且循环次数时间必须大于0')
                            return false
                        }
                        one_loop_sec = that.form2.input
                        num = ''
                        time = ''
                    } else {
                        is_timing_play = 0
                        play_from_time = ''
                        play_to_time = ''
                        one_loop_sec = ''
                        num = that.form2.num
                        time = that.form2.time
                    }
                    request({
                        url: that.public.url + '/gamemovetext/update',
                        method: 'post',
                        data: {
                            effect_level: that.form2.type,
                            priority_level: this.form2.frist,
                            // loop_count: this.form2.number,
                            loop_speed: this.form2.speed,
                            is_timing_play: is_timing_play,
                            play_from_time: play_from_time,
                            play_to_time: play_to_time,
                            one_loop_sec: one_loop_sec,
                            content: this.form2.content,
                            switch: this.form2.radio,
                            id: this.id,
                            loop_count: num,
                            one_interval_sec: time
                        }
                    }).then(res => {
                        that.$message({
                            type: 'success',
                            message: res.message
                        });
                        that.dialogFormVisible2 = false
                        that.form2.value1 = ''
                        that.form2.value2 = ''
                        that.form2.input = ''
                        that.form2.num = ''
                        that.form2.time = ''
                        that.form2.checkbox = false
                        that.$refs.form2.resetFields()
                        getlist(that)
                    }).catch(error => {
                    })
                }
               
            } else {
            return false
            }
        })
      },
      again (row) {
        let that = this
         request({
              url: that.public.url + '/gamemovetext/repeatpush',
              method: 'post',
              data: {
                id: row.id
              }
          }).then(res => {
            that.$message.success(res.message)
            getlist(that)
          }).catch(error => {
          })
      },
      reset () {
        let that = this
        this.dialogFormVisible2 = false
        this.$refs.form2.resetFields()
        that.form2.value1 = ''
        that.form2.value2 = ''
        that.form2.input = ''
        that.form2.num = ''
        that.form2.time = ''
        that.form2.checkbox = false
      },
      query() {
        let that = this
        this.currentPage = 1
        getlist(that)
        let setdiversions = {
          'type': that.formInline.type,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'frist': that.formInline.frist,
          'play': that.formInline.play
        }
      this.$store.commit('setdiversions', setdiversions)
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.currentPage = 1
        let that = this
        getlist(that)
        let setdiversions = {
          'type': that.formInline.type,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'frist': that.formInline.frist,
          'play': that.formInline.play
        }
      this.$store.commit('setdiversions', setdiversions)
      },
      handleCurrentChange(val) {
        this.currentPage = val * 1
        let that = this
        getlist(that)
        let setdiversions = {
          'type': that.formInline.type,
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'frist': that.formInline.frist,
          'play': that.formInline.play
        }
      this.$store.commit('setdiversions', setdiversions)
      }
    }
  }


  function getlist(that) {
    let data = {
      effect_level: that.formInline.type,
      pageno: that.currentPage,
      pagerows: that.pagesize,
      priority_level: that.formInline.frist,
      switch: that.formInline.play
    }
    request({
      url: that.public.url + '/gamemovetext/getlist',
      method: 'post',
      data: data
    }).then(res => {
      that.tableData = res.data.list
      that.total = res.data.rownum * 1
      that.currentPage = res.data.pageno * 1
    }).catch(error => {
    })
  }


function parseTime(time) {
    var date = new Date(time *1000);
    let y = date.getFullYear() + '-'
    let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let d = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
    let h = (date.getHours()<10?'0'+(date.getHours()):date.getHours()) + ':';
    let i = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
    let s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
    return y+m+d+h+i+s
}

</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

</style>
