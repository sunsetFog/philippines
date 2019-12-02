<template>
  <div class="app-container gamename">


  <el-tabs tab-position="left" style="height: 750px;overflow-y: scroll;" type='border-card' v-model="actionname" @tab-click='tabclick'>
    <el-tab-pane label="全部游戏列表">
       <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="6">
            <el-form-item label="游戏名称">
                <el-input v-model="formInline.name" placeholder="请输入要查询的关键词" clearable></el-input>                
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
                <el-select v-model="formInline.status" filterable clearable>
                <el-option
                  v-for="item in statuslist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query" v-if="gamenamegetlist">查询</el-button>
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
    :cell-class-name='cell'
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      width='60'
      label="ID">
    </el-table-column>
    <el-table-column
      prop="name"
      label="游戏名称">
    </el-table-column>
    <el-table-column
      label="游戏性质">
      <template slot-scope="scope">
        {{scope.row.nature | nature}}
      </template>
    </el-table-column>
     
    <el-table-column
      prop="depict"
      label="描述">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small"  @click="tz(scope.row)" >设置</el-button>
        <el-button type="text" size="small"  @click="cz(scope.row)" >游戏重载设置</el-button>
        <el-button @click="up(scope.row)" type="text" size="small" v-if="scope.row.status === '禁用'" class="green">启用</el-button>
        <el-button @click="down(scope.row)" type="text" size="small" v-if="scope.row.status === '正常'" class="red">停用</el-button>
      </template>
    </el-table-column>
  </el-table>

<div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[20,50,200]"
      :page-size="pagesize"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
    </el-tab-pane>
    <el-tab-pane label="百家乐（经典场）设置">
      <bjlclassic></bjlclassic>
    </el-tab-pane>
    <el-tab-pane label="百家乐（彩票场）设置">
       <bjllottery></bjllottery>
    </el-tab-pane>
    <el-tab-pane label="红黑大战（经典场）设置">
      <hhclassic></hhclassic>
    </el-tab-pane>
    <el-tab-pane label="百人牛牛（经典场）设置">
      <brclassic></brclassic>
    </el-tab-pane>
    <el-tab-pane label="百人牛牛（彩票场）设置">
      <brlottery></brlottery>
    </el-tab-pane>

    <el-tab-pane label="水浒传设置">
      <el-tabs type='card'  v-model="actionname1" @tab-click='tabclick1'>
        <el-tab-pane label="第1步：基本设置" style="width:600px;">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>水浒传游戏</span>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth" prop="depict">
              <el-input v-model="form.depict" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label='0'>禁用</el-radio>
                <el-radio :label='1'>可用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-button type="primary" @click="sure(form)">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="第2步：投注项">
            
        <el-tabs v-model="actionname3" @tab-click='tabclick3'>
        <el-tab-pane label="玩家获胜概率">
          <el-table
            :data="tableData2"
            border
            style="width: 100%">
              <el-table-column
                label="代码"
                prop="code">
              </el-table-column>
            <el-table-column
              prop="name"
              label="投注项名称">
            </el-table-column>
            <el-table-column
              prop="win_rate"
              label="玩家获胜概率">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                {{scope.row.status}}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="限红设置">
          <span>比倍下注上限：</span><el-input type='number' style="width:400px" clearable v-model="bzmax"></el-input><span>元</span><br/>
          <el-button type='primary' style='margin-left:200px;margin-top:20px;' @click="suresx">保存</el-button>
        </el-tab-pane>
        </el-tabs>
            

        </el-tab-pane>
        <el-tab-pane label="第3步：底注设置">

          <div class="query">
            <el-row>
              <el-form :inline="true" label-width="80px">
                <el-col :span="6">
                 <el-button type="info" round @click="add">新增 + </el-button>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div class="pagingbox">
          <div class="paging">
            <el-pagination
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :current-page.sync="currentPage3"
            :page-size="pagesize3"
            background
            layout="prev, next, jumper"
            :total="total3">
          </el-pagination>
          </div>
          </div>

          <el-table
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column
            prop="money"
            label="底注">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              {{scope.row.status}}
            </template>
          </el-table-column>
          <el-table-column
            prop="depict"
            label="描述">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="edit3(scope.row)" >修改</el-button>
              <el-button type="text" size="small"  @click="del(scope.row)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      <div class="pagingbox">
        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :current-page.sync="currentPage3"
            :page-sizes="[20,50,200]"
            :page-size="pagesize3"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="total3">
          </el-pagination>
        </div>
      </div>
        </el-tab-pane>
        <el-tab-pane label="第4步：全盘奖库">
          <el-tabs  @tab-click='handclick' v-model='activename'>
              <el-tab-pane label="当前奖库">
                 <el-table
          :data="tableData4"
          border
          style="width: 100%">
          <el-table-column
            prop="qbmoney"
            label="底注">
          </el-table-column>
          <el-table-column
            prop="shz"
            label="水浒传">
          </el-table-column>
          <el-table-column
            prop="zyt"
            label="忠义堂">
          </el-table-column>
          <el-table-column
            prop="ttxd"
            label="替天行道">
          </el-table-column>
          <el-table-column
            prop="sj"
            label="宋江">
          </el-table-column>
          <el-table-column
            prop="lc"
            label="林冲">
          </el-table-column>
          <el-table-column
            prop="lzs"
            label="鲁智深">
          </el-table-column>
          <el-table-column
            prop="do"
            label="刀">
          </el-table-column>

          <el-table-column
            prop="qa"
            label="枪">
          </el-table-column><el-table-column
            prop="ft"
            label="斧头">
          </el-table-column><el-table-column
            prop="rw"
            label="人物">
          </el-table-column><el-table-column
            prop="bq"
            label="兵器">
          </el-table-column><el-table-column
            prop="fqpj"
            label="非全屏奖">
          </el-table-column>
          <el-table-column
            prop="pubp_total"
            label="总计">
          </el-table-column>
        </el-table>
             </el-tab-pane>
            <el-tab-pane label="初始奖库">
              <div class="cs">
                <el-form :model="form4" :rules="rules4" ref="form4">
      
              <el-form-item label="水浒传" :label-width="formLabelWidth" prop="shz">
                <el-input v-model="form4.shz" type='number'></el-input>
              </el-form-item>
               <el-form-item label="忠义堂" :label-width="formLabelWidth" prop="zyt">
                <el-input v-model="form4.zyt" type='number'></el-input>
              </el-form-item>
               <el-form-item label="替天行道" :label-width="formLabelWidth" prop="ttxd">
                <el-input v-model="form4.ttxd" type='number'></el-input>
              </el-form-item>
               <el-form-item label="宋江" :label-width="formLabelWidth" prop="sj">
                <el-input v-model="form4.sj" type='number'></el-input>
              </el-form-item>
               <el-form-item label="林冲" :label-width="formLabelWidth" prop="lc">
                <el-input v-model="form4.lc" type='number'></el-input>
              </el-form-item>
               <el-form-item label="鲁智深" :label-width="formLabelWidth" prop="lzs">
                <el-input v-model="form4.lzs" type='number'></el-input>
              </el-form-item>
               <el-form-item label="刀" :label-width="formLabelWidth" prop="do">
                <el-input v-model="form4.do" type='number'></el-input>
              </el-form-item>
               <el-form-item label="枪" :label-width="formLabelWidth" prop="qa">
                <el-input v-model="form4.qa" type='number'></el-input>
              </el-form-item>
               <el-form-item label="斧头" :label-width="formLabelWidth" prop="ft">
                <el-input v-model="form4.ft" type='number'></el-input>
              </el-form-item>
               <el-form-item label="人物" :label-width="formLabelWidth" prop="rw">
                <el-input v-model="form4.rw" type='number'></el-input>
              </el-form-item>
               <el-form-item label="兵器" :label-width="formLabelWidth" prop="bq">
                <el-input v-model="form4.bq" type='number'></el-input>
              </el-form-item>
               <el-form-item label="非全屏奖" :label-width="formLabelWidth" prop='fqpj'>
                <el-input v-model="form4.fqpj" type='number'></el-input>
              </el-form-item>
               <el-form-item :label-width="formLabelWidth">
                <el-button type="primary" @click="sure4(form4)">保存</el-button>
              </el-form-item>
              
              
            </el-form>
              </div>
                
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="第5步：普通奖库">
          <el-tabs>
              <el-tab-pane label="当前奖库">

                 <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          
          <el-col :span="6">
            <el-form-item label="底注">
                <el-select v-model="formInline5.status" filterable clearable>
                <el-option
                  v-for="item in moneylist"
                  :key="item.id"
                  :label="item.money"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="倍数">
                <el-input v-model="formInline5.name" placeholder="请输入要查询的关键词" type='number' clearable></el-input>                
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query5">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange5"
      @current-change="handleCurrentChange5"
      :current-page.sync="currentPage5"
      :page-size="pagesize5"
      background
      layout="prev, next, jumper"
      :total="total5">
    </el-pagination>
    </div>
    </div>
                 <el-table
          :data="tableData5"
          border
          style="width: 100%">
          <el-table-column
            prop="qbmoney"
            label="底注">
          </el-table-column>
           <el-table-column
        label="奖励倍数">
        <template slot-scope="scope">
          {{scope.row.multiple | multiple}}
        </template>
      </el-table-column>
          <!-- <el-table-column
            prop=""
            label="奖励倍数">
          </el-table-column> -->
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="ntg_pic_num"
            label="不带彩金图案数量">
          </el-table-column>
          <el-table-column
            prop="tg_pic_num"
            label="带彩金图案数量">
          </el-table-column>
        </el-table>


        <div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange5"
      @current-change="handleCurrentChange5"
      :current-page.sync="currentPage5"
      :page-sizes="[20,50,200]"
      :page-size="pagesize5"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total5">
    </el-pagination>
  </div>
</div>
             </el-tab-pane>
             <el-tab-pane label="初始奖库">
                         <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="2">
            <el-button type="info" round @click="add5">新增 + </el-button>
          </el-col>

           <el-col :span="9">
            <el-upload
              class="upload-demo"
              :action="action"
              :headers='token'
              :on-exceed="exceed"
              :on-success='success'
              :on-error='error'
              :show-file-list='showfile'
              :before-upload='before'
              multiple
              :limit="1"
              :file-list="fileList">
              <el-button  type="warning" >导入文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件,且文件大小不超过5m</div>
            </el-upload>
          </el-col>



          <el-col :span="6">
            <el-form-item label="倍数">
                <el-input v-model="formInline5_2.name" placeholder="请输入要查询的关键词" type='number' clearable></el-input>                
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="query5_2">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange5_2"
      @current-change="handleCurrentChange5_2"
      :current-page.sync="currentPage5_2"
      :page-size="pagesize5_2"
      background
      layout="prev, next, jumper"
      :total="total5_2">
    </el-pagination>
    </div>
    </div>
                 <el-table
          :data="tableData5_2"
          :cell-class-name='cell2'
          border
          style="width: 100%">
          <el-table-column
          label="奖励倍数">
          <template slot-scope="scope">
            <span>{{scope.row.multiple | multiple}}</span>
          </template>
        </el-table-column>
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="ntg_pic_num"
            label="不带彩金图案数量">
          </el-table-column>
          <el-table-column
            prop="tg_pic_num"
            label="带彩金图案数量">
          </el-table-column>

          <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit5(scope.row)" type="text" size="small"  v-if="scope.row.multiple !=-1">修改</el-button>
            <el-button type="text" size="small" @click="delet5(scope.row)" v-if="scope.row.multiple !=-1">删除</el-button>
          </template>
        </el-table-column>
        </el-table>


        <div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange5_2"
      @current-change="handleCurrentChange5_2"
      :current-page.sync="currentPage5_2"
      :page-sizes="[20,50,200]"
      :page-size="pagesize5_2"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total5_2">
    </el-pagination>
  </div>
</div>

             </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="第6步：上限奖励库">

          <el-tabs>
              <el-tab-pane label="当前奖库">

                 <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          
          <el-col :span="6">
            <el-form-item label="底注">
                <el-select v-model="formInline6.status" filterable clearable>
                <el-option
                  v-for="item in moneylist"
                  :key="item.id"
                  :label="item.money"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="上限倍数">
                <el-input v-model="formInline6.name" placeholder="请输入要查询的关键词" type='number' clearable></el-input>                
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query6">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange6"
      @current-change="handleCurrentChange6"
      :current-page.sync="currentPage6"
      :page-size="pagesize6"
      background
      layout="prev, next, jumper"
      :total="total6">
    </el-pagination>
    </div>
    </div>
                 <el-table
          :data="tableData6"
          border
          style="width: 100%">
          <el-table-column
            prop="qbmoney"
            label="底注">
          </el-table-column>
          <el-table-column
          label="上限倍数">
          <template slot-scope="scope">
            <span>{{scope.row.multiple_u_limit | multiple}}</span>
          </template>
        </el-table-column>
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>
  
        </el-table>


        <div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange6"
      @current-change="handleCurrentChange6"
      :current-page.sync="currentPage6"
      :page-sizes="[20,50,200]"
      :page-size="pagesize6"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total6">
    </el-pagination>
  </div>
</div>
             </el-tab-pane>
             <el-tab-pane label="初始奖库">
                         <div class="query">
      <el-row>
        <el-form :inline="true" label-width="80px">
          <el-col :span="3">
            <el-button type="info" round @click="add6">新增 + </el-button>
          </el-col>


          <el-col :span="6">
            <el-form-item label="上限倍数">
                <el-input v-model="formInline6_2.name" placeholder="请输入要查询的关键词" type='number' clearable></el-input>                
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="query6_2">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="pagingbox">
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange6_2"
      @current-change="handleCurrentChange6_2"
      :current-page.sync="currentPage6_2"
      :page-size="pagesize6_2"
      background
      layout="prev, next, jumper"
      :total="total6_2">
    </el-pagination>
    </div>
    </div>
                 <el-table
          :data="tableData6_2"
          border
          style="width: 100%">
          <el-table-column
          label="上限倍数">
          <template slot-scope="scope">
            <span>{{scope.row.multiple_u_limit | multiple}}</span>
          </template>
        </el-table-column>
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>

          <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit6(scope.row)" type="text" size="small" v-if="scope.row.multiple_u_limit !=-1">修改</el-button>
            <el-button type="text" size="small" @click="delet6(scope.row)" v-if="scope.row.multiple_u_limit !=-1">删除</el-button>
          </template>
        </el-table-column>
        </el-table>


        <div class="pagingbox">
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange6_2"
      @current-change="handleCurrentChange6_2"
      :current-page.sync="currentPage6_2"
      :page-sizes="[20,50,200]"
      :page-size="pagesize6_2"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="total6_2">
    </el-pagination>
  </div>
</div>

             </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="第7步：彩金游戏次数" style="width:600px;">
            <el-tabs  @tab-click='handclick2' v-model='activename2'>
              <el-tab-pane label="当前奖库">
                      <el-table
                        :data="tableData7"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="qbmoney"
                          label="底注">
                        </el-table-column>
                        <el-table-column
                          prop="cjyxcs"
                          label="彩金剩余次数">
                        </el-table-column>
                      </el-table>
              </el-tab-pane>
              <el-tab-pane label="初始奖库">
                    <el-form :model="form7" :rules="rules7" ref="form7">
                      <el-form-item label="彩金游戏次数" :label-width="formLabelWidth" prop="num">
                        <el-input v-model="form7.num" type="number"></el-input>
                      </el-form-item>
                      <el-form-item :label-width="formLabelWidth">
                        <el-button type="primary" @click="sure7(form7)">保存配置</el-button>
                      </el-form-item>
                    </el-form>
              </el-tab-pane>
            </el-tabs>
        

        </el-tab-pane>
        <el-tab-pane label="完成：初始奖库">
          <el-form style="margin-top:20px;">
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="cs(1)">初始化（全盘奖库）</el-button>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="cs(2)">初始化（普通奖库）</el-button>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="cs(3)">初始化（彩金游戏次数）</el-button>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="cs(4)">初始化（彩金游戏上限奖励库）</el-button>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="cs(5)">初始化（全部）</el-button>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="cspic">生成（普通奖库）开奖图案</el-button>
            </el-form-item>
            
          </el-form>

        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="幸运水果机">
      <fruit></fruit>
    </el-tab-pane>
     <el-tab-pane label="龙虎斗（经典场）">
      <dragonclassic></dragonclassic>
    </el-tab-pane>
     <el-tab-pane label="龙虎斗（彩票场）">
      <dragonlottery></dragonlottery>
    </el-tab-pane>
    <el-tab-pane label="全民捕鱼（新手场）">
      <fish></fish>
    </el-tab-pane>
    <el-tab-pane label="全民捕鱼（贵宾场）">
      <vipfish></vipfish>
    </el-tab-pane>
    <el-tab-pane label="全民捕鱼（富豪场）">
      <richfish></richfish>
    </el-tab-pane>
    <el-tab-pane label="斗地主设置">
      <landlord></landlord>
    </el-tab-pane>
    <el-tab-pane label="红包扫雷设置">
      <redenvelope></redenvelope>
    </el-tab-pane>
    <el-tab-pane label="疯狂斗牛设置">
      <creazycow></creazycow>
    </el-tab-pane>
     <el-tab-pane label="彩票牛牛设置">
      <lotterycow></lotterycow>
    </el-tab-pane>
     <el-tab-pane label="抢庄牛牛设置">
      <qznn></qznn>
    </el-tab-pane>
     <el-tab-pane label="二八杠设置">
      <twoEight></twoEight>
    </el-tab-pane>
  </el-tabs>


  <el-dialog :title='title'  :visible.sync="dialogFormVisible" :before-close="reset">
    <el-form :model="form2" :rules="rules2" ref="form2">
      
      <el-form-item label="投注项代码" :label-width="formLabelWidth">
        <span>{{code}}</span>
      </el-form-item>
      <el-form-item label="投注项名称" :label-width="formLabelWidth">
        <span>{{name}}</span>
      </el-form-item>
      <el-form-item label="玩家获胜概率" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form2.name" type='number'></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-radio-group v-model="form2.status">
            <el-radio :label='0'>禁用</el-radio>
            <el-radio :label='1'>可用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset(form2)">取 消</el-button>
      <el-button type="primary" @click="sure2(form2)">确 定</el-button>
    </div>

  </el-dialog>


    <el-dialog :title='title3'  :visible.sync="dialogFormVisible3" :before-close="reset3">
    <el-form :model="form3" :rules="rules3" ref="form3">
      
      <el-form-item label="底注：" :label-width="formLabelWidth" prop="money">
              <el-input v-model="form3.money" type='number'></el-input>
            </el-form-item>
            <el-form-item label="描述：" :label-width="formLabelWidth" prop="depict">
              <el-input v-model="form3.depict" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
              <el-radio-group v-model="form3.status">
                <el-radio :label='0'>禁用</el-radio>
                <el-radio :label='1'>可用</el-radio>
              </el-radio-group>
            </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset3(form3)">取 消</el-button>
      <el-button type="primary" @click="sure3(form3)">确 定</el-button>
    </div>

  </el-dialog>


     <el-dialog :title='title5'  :visible.sync="dialogFormVisible5" :before-close="reset5">
    <el-form :model="form5" :rules="rules5" ref="form5">
      
      <el-form-item label="奖励倍数：" :label-width="formLabelWidth" prop="money">
          <el-input v-model="form5.money" type='number'></el-input>
          <span class="red" v-if="noget">未中奖</span>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
          <el-input v-model="form5.num" type='number'></el-input>
      </el-form-item>
      <el-form-item label="不带彩金图案" :label-width="formLabelWidth" prop="npic">
          <el-input v-model="form5.npic" type='number'></el-input>
      </el-form-item>
      <el-form-item label="带彩金图案" :label-width="formLabelWidth" prop='pic'>
          <el-input v-model="form5.pic" type='number'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset5(form5)">取 消</el-button>
      <el-button type="primary" @click="sure5(form5)">确 定</el-button>
    </div>

  </el-dialog>


  
     <el-dialog :title='title6'  :visible.sync="dialogFormVisible6" :before-close="reset6">
    <el-form :model="form6" :rules="rules6" ref="form6">
      
      <el-form-item label="上限倍数：" :label-width="formLabelWidth" prop="money">
          <el-input v-model="form6.money" type='number'></el-input>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
          <el-input v-model="form6.num" type='number'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset6(form6)">取 消</el-button>
      <el-button type="primary" @click="sure6(form6)">确 定</el-button>
    </div>

  </el-dialog>


  <el-dialog :title='title8'  :visible.sync="dialogFormVisible8" :before-close="reset8">
    <el-form :model="form8" :rules="rules8" ref="form8">
      
      <el-form-item label="底注选择" :label-width="formLabelWidth" prop="type">

          <el-checkbox :indeterminate="isIndeterminate" v-model="form8.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form8.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item, key) in moneylist" :label="item.money" :key="key">{{item.money}}</el-checkbox>
          </el-checkbox-group>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset8(form8)">取 消</el-button>
      <el-button type="primary" @click="sure8(form8)">确 定</el-button>
    </div>

  </el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { getToken } from '../../utils/auth'
import bjlclassic from '../game/bjlclassic'
import bjllottery from '../game/bjllottery'
import hhclassic from '../game/hhclassic'
import brclassic from '../game/brclassic'
import brlottery from '../game/brlottery'
import fruit from '../game/fruit'
import dragonclassic from '../game/dragonclassic'
import dragonlottery from '../game/dragonlottery'
import fish from '../game/fish'
import vipfish from '../game/vipfish'
import richfish from '../game/richfish'
import landlord from '../game/landlord'
import redenvelope from '../game/redenvelope'
import creazycow from '../game/creazycow'       
import lotterycow from '../game/lotterycow'  
import qznn from '../game/qznn'  
import twoEight from '../game/twoEight'  
export default {
  data() {
    var zsrules = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入值'));
      } else {
        if (value *1 < 0) {
          callback(new Error('值为正数'))
        } else {
          callback();
        }
      }
    }
    var moneyrules = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入值'));
      } else {
        if (value *1 < 0) {
          callback(new Error('请输入正数'))
        } else {
          callback();
        }
      }
    }
    var typerules = (rule, value, callback) => {
      if (this.form8.checkedCities.length === 0) {
        callback(new Error('请至少选择一个'));
      } else {
        callback();
      }
    }
    return {
      isIndeterminate: true,
      formInline: {
        status: '',
        name: ''
      },
      fileList: [],
      showfile: false,
      formInline2: {
        status: '',
        name: ''
      },
      statuslist: [
        {name: '禁用', type: '0'},
        {name: '可用', type: '1'},
      ],
      actionname: '',
      actionname1: '',
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible3: false,
      form: {
        status: 1,
        depict: ''
      },
      noget: false,
      form2: {
        status: 1,
        name: ''
      },
      form3: {
        status: 1,
        money: '',
        depict: ''
      },
      form4: {
        shz: '',
        zyt: '',
        ttxd: '',
        sj: '',
        lc: '',
        lzs: '',
        do: '',
        qa: '',
        ft: '',
        rw: '',
        bq: '',
        fqpj: ''
      },
      bzmax: '',
      rules: {
        status: [
          {required: true, message: '请选状态', trigger: 'change'}
        ]
      },
      rules2: {
        status: [
          {required: true, message: '请选状态', trigger: 'change'}
        ],
        name: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ]
      },
      rules3: {
        status: [
          {required: true, message: '请选状态', trigger: 'change'}
        ],
        money: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ]
      },
      rules4: {
        shz: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        zyt: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        ttxd: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        sj: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        lc: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        lzs: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        do: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        qa: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        ft: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        rw: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        bq: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        fqpj: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ]
      },
      rules5: {
        money: [
          {required: true, validator: moneyrules, trigger: 'blur'}
        ],
        num: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        npic: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ],
        pic: [
          {required: false}
        ],
      },
      rules6: {
        money: [
          {required: true, validator: moneyrules, trigger: 'blur'}
        ],
        num: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ]
      },
      rules7: {
        num: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ]
      },
      rules8: {
        type: [
          {required: true, validator: typerules, trigger: 'change', type: 'array'}
        ]
      },
      formLabelWidth: '180px',
      title: '',
      total: 0,
      pagesize: 20,
      total2: 0,
      pagesize2: 20,
      currentPage2: 1,
      tableData2: [],
      total3: 0,
      pagesize3: 20,
      currentPage3: 1,
      tableData3: [],
      id: '',
      code: '',
      name: '',
      title3: '',
      id3: '',
      tableData4: [],
      activename: '',
      activename2: '',
      moneylist: [],
      formInline5: {
        name: '',
        status: ''
      },
      total5: 0,
      pagesize5: 20,
      currentPage5: 1,
      tableData5: [],
      total5_2: 0,
      pagesize5_2: 20,
      currentPage5_2: 1,
      tableData5_2: [],
      formInline5_2: {
        name: ''
      },
      title5: '',
      dialogFormVisible5: false,
      form5: {
        money: '',
        num: '',
        npic: '',
        pic: ''
      },
      id5: '',
      formInline6: {
        name: '',
        status: ''
      },
      total6: 0,
      pagesize6: 20,
      currentPage6: 1,
      tableData6: [],
      tableData7: [],
      id6_2: '',
      formInline6_2: {
        name: '',
      },
      total6_2: 0,
      pagesize6_2: 20,
      currentPage6_2: 1,
      tableData6_2: [],
      title6: '',
      dialogFormVisible6: false,
      form6: {
        money: '',
        num: ''
      },
      form7: {
        num: ''
      },
      form8: {
        checkAll: false,
        checkedCities: []
      },
      title8: '',
      dialogFormVisible8: false,
      type8: '',
      actionname3: '',
      bzid: ''
    }
  },
  created() {  
    getmoneylist(this)
    let that = this
    if (!this.gamename.length && this.gamename.length != 0) {
      that.currentPage = this.gamename.currentPage
      that.pagesize = this.gamename.pagesize
      that.formInline.status = this.gamename.status
      that.formInline.name = this.gamename.name
      getlist(this)
    }
  },
  components: {
    bjlclassic,
    bjllottery,
    hhclassic,
    brclassic,
    brlottery,
    fruit,
    dragonclassic,
    dragonlottery,
    fish,
    vipfish,
    richfish,
    landlord,
    redenvelope,
    creazycow,
    lotterycow,
    qznn,
    twoEight,
  },
  computed: {
    ...mapGetters([
      'gamenameupdate',
      'gamenamedel',
      'gamenameadd',
      'gamenamegetlist',
      'gamename'
    ]),
    token () {
      return {
        'X-Token': getToken()
      }
    },
    action () {
      return this.public.url + '/gamesetwmg/import'
    }
  },
  watch: {
    'form5.money': function (val) {
      if (val == '0') {
        this.noget = true
      } else {
        this.noget = false
      }
    }
  },
  filters: {
    type (val) {
      if (val === '0') {
        return '禁用'
      }
      if (val === '1') {
        return '正常'
      }
    },
    nature (val) {
      if (val === '1') {
        return '人机类游戏'
      }
      if (val === '2') {
        return '人人类游戏'
      }
    },
    multiple(val) {
      if (val == '0') {
        return '0(未中奖)'
      } else if(val == '-1'){
        return '合计'
      } else {
        return val
      }
    },
  },
  methods: {
    exceed(file) {
      if (file.length > 1) {
        this.$message({
          message: '一次只能上传一个文件',
          type: 'warning'
        });
      }
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 4 && row.status === '禁用') {
        return 'red'
      }
      if (columnIndex === 4 && row.status === '正常') {
        return 'green'
      }
    },
    cell2 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0 && row.multiple == '0') {
        return 'red'
      }
    },
    before(file) {		
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'xls'
				const extension2 = testmsg === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
				if(!extension && !extension2) {
					this.$message({
						message: '上传文件只能是xls、xlsx格式',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过5MB!',
						type: 'warning'
					});
				}
				return extension || extension2 && isLt2M
    },
    success(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'success'
      });
    },
    error(res,file,fileList) {
      this.$message({
        message: res.message,
        type: 'error'
      });
    },
    handleCheckAllChange(val) {
      let newlist = this.moneylist.map(val =>{
        return val.money
      })
      this.form8.checkedCities = val ? newlist : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let newlist = this.moneylist.map(val =>{
        return val.money
      })
      let checkedCount = value.length;
      this.form8.checkAll = checkedCount === newlist.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < newlist.length;
    },
    tabclick (tab, event) {
      if (this.actionname === '0') {
        let that = this
        this.currentPage = 1
        getlist(that)
        let setgamename = {
            'currentPage': that.currentPage,
            'pagesize': that.pagesize,
            'status': that.formInline.status,
            'name': that.formInline.name
          }
        this.$store.commit('setgamename', setgamename)
      }
      if (this.actionname === '6') {
        getgameinfo(this, 601, 0)
      }
    },
    tabclick1 (tab, event) {
      if(this.actionname1 === '1') {
         getlist2(this)
      }
      if(this.actionname1 === '2') {
         getlist3(this)
      }
      if(this.actionname1 === '3') {
         getlist4(this)
         getlist4_2(this)
      }
      if(this.actionname1 === '6') {
         getnum(this)
         getlist7(this)
      }
    },
    cs (type) {
     this.dialogFormVisible8 = true
     this.type8 = type
     if (type === 1) {
       this.title8 = '初始化全盘奖库'
     }
     if (type === 2) {
       this.title8 = '初始化普通奖库'
     }
     if (type === 3) {
       this.title8 = '初始化彩金游戏次数'
     }
     if (type === 4) {
       this.title8 = '初始化彩金游戏上限奖励库'
     }
     if (type === 5) {
       this.title8 = '初始化全部'
     }
    },
    cspic () {
       let that = this
      this.$confirm('生成（普通奖库）开奖图案需要较长时间, 您是否确认生成?', '确认信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/gamesetwmg/makegenpattern',
              method: 'post',
              data: {
              }
            }).then(res => {
              // getlist3(that)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消生成'
          });
        });
    },
    reset (form) {
      this.dialogFormVisible = false
      this.$refs.form2.resetFields()
    },
    reset3 (form) {
      this.dialogFormVisible3 = false
      this.$refs.form3.resetFields()
    },
    reset5 (form) {
      this.dialogFormVisible5 = false
      this.$refs.form5.resetFields()
    },
    reset6 (form) {
      this.dialogFormVisible6 = false
      this.$refs.form6.resetFields()
    },
    reset8 (form) {
      this.dialogFormVisible8 = false
      this.form8.checkedCities = []
      this.form8.checkAll = false
      // this.$refs.form8.resetFields()
    },
    add (row) {
      this.title3 = '底注-新增'
      this.dialogFormVisible3 = true
    },
    add5 () {
      this.title5 = '普通奖库-新增'
      this.dialogFormVisible5 = true
    },
    add6 () {
      this.title6 = '上限奖励库-新增'
      this.dialogFormVisible6 = true
    },
    edit3 (row) {
      this.title3 = '底注-编辑'
      this.dialogFormVisible3 = true
      this.id3 = row.id
      if (row.status === '正常') {
        this.form3.status = 1
      } else {
        this.form3.status = 0
      }
      this.form3.money = row.money
      this.form3.depict = row.depict
    },
    edit5 (row) {
      this.title5 = '普通奖库-编辑'
      this.dialogFormVisible5 = true
      this.id5 = row.id
      this.form5.money = row.multiple
      this.form5.num = row.num
      this.form5.npic = row.ntg_pic_num
      this.form5.pic = row.tg_pic_num
    },
    edit6 (row) {
      this.title6 = '上限奖励库-编辑'
      this.dialogFormVisible6 = true
      this.id6 = row.id
      this.form6.money = row.multiple_u_limit
      this.form6.num = row.num
    },
    handclick () {
      if(this.activename === '1') {
        let that = this
         getlist4_2(that)
      }
    },
    handclick2 () {
      if(this.activename2 === '0') {
        let that = this
         getlist7(that)
      }
    },
    del (row) {
       let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/gamesetwmg/delqbmoney',
              method: 'post',
              data: {
                  id: row.id
              }
            }).then(res => {
              getlist3(that)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    tabclick3 () {
    },
    suresx () {
      let that = this
      request({
        url: that.public.url + '/gameset/updatebetitem',
        method: 'post',
        data: {
            id: this.bzid,
            alot_bet_max_limit: this.bzmax
        }
      }).then(res => {
        that.$message.success(res.message)
        getlist2(that)
      }).catch(error => {
      })
    },
    delet5 (row) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/gamesetwmg/deldefgenprize',
              method: 'post',
              data: {
                  id: row.id
              }
            }).then(res => {
              getlist5(that, 0)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    delet6 (row) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/gamesetwmg/deldefhsgprize',
              method: 'post',
              data: {
                  id: row.id
              }
            }).then(res => {
              getlist6(that, 0)
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    tz (row) {
      if (row.name==='水浒传' || row.id == '601') {
        this.actionname = '6'
        getgameinfo(this, 601, 0)
      }
      if (row.name==='百家乐' || row.id == '201' && row.type=='1') {
        this.actionname = '1'
      }
      if (row.name==='百家乐（彩票场）' || row.id == '201' && row.type=='2') {
        this.actionname = '2'
      }
      if (row.name==='红黑大战' || row.id == '301') {
        this.actionname = '3'
      }
      if (row.name==='百人牛牛' || row.id == '101' && row.type=='1') {
        this.actionname = '4'
      }
      if (row.name==='百人牛牛(彩票场)' || row.id == '101' && row.type=='2') {
        this.actionname = '5'
      }
      if (row.name==='水果机' || row.id == '701') {
        this.actionname = '7'
      }
      if (row.name==='龙虎斗' || row.id == '801' && row.type=='1') {
        this.actionname = '8'
      }
      if (row.name==='龙虎斗（彩票场）'|| row.id == '801' && row.type=='2') {
        this.actionname = '9'
      }
      if (row.name==='全民捕鱼平民场'|| row.id == '501') {
        this.actionname = '10'
      }
      if (row.name==='全民捕鱼贵宾场'|| row.id == '502') {
        this.actionname = '11'
      }
      if (row.name==='全民捕鱼富豪场'|| row.id == '503') {
        this.actionname = '12'
      }
      if (row.name==='斗地主'|| row.id == '401') {
        this.actionname = '13'
      }
      if (row.name==='红包扫雷'|| row.id == '91') {
        this.actionname = '14'
      }
      if (row.name==='疯狂斗牛'|| row.id == '901') {
        this.actionname = '15'
      }
    },
    cz (row) {
      let that = this
      var lottery = 0
      if (row.name==='百家乐（彩票场）') {
        lottery = 2
      }
      if (row.name==='百家乐') {
        lottery = 1
      }
      if (row.name==='百人牛牛(彩票场)') {
        lottery = 2
      }
      if (row.name==='百人牛牛') {
        lottery = 1
      }
      if (row.name==='龙虎斗（彩票场）') {
        lottery = 2
      }
      if (row.name==='龙虎斗') {
        lottery = 1
      }
      this.$confirm('二次确认', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gamename/restartload',
            method: 'post',
            data: {
                id: row.id,
                type: lottery
            }
          }).then(res => {
            that.$message.success(res.message)
            getlist(that)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
    },
    up(row) {
      let that = this
      var lottery = 0
      if (row.id == '101' && row.type =='2') {
        lottery = 2
      }
      if (row.id == '101' && row.type =='1') {
        lottery = 1
      }
      if (row.id == '201' && row.type =='2') {
        lottery = 2
      }
      if (row.id == '201' && row.type =='1') {
        lottery = 1
      }
      if (row.id == '801' && row.type =='2') {
        lottery = 2
      }
      if (row.id == '801' && row.type =='1') {
        lottery = 1
      }
      this.$confirm('此操作将启用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gameset/updategamestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 1,
                type: lottery
            }
          }).then(res => {
            getlist(that)
            getgameinfo(that,row.id,lottery)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
    },
    down(row) {
      let that = this
      var lottery = 0
      if (row.id == '101' && row.type =='2') {
        lottery = 2
      }
      if (row.id == '101' && row.type =='1') {
        lottery = 1
      }
      if (row.id == '201' && row.type =='2') {
        lottery = 2
      }
      if (row.id == '201' && row.type =='1') {
        lottery = 1
      }
      if (row.id == '801' && row.type =='2') {
        lottery = 2
      }
      if (row.id == '801' && row.type =='1') {
        lottery = 1
      }
      this.$confirm('此操作将停用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        request({
            url: that.public.url + '/gameset/updategamestatus',
            method: 'post',
            data: {
                id: row.id,
                status: 0,
                type: lottery
            }
          }).then(res => {
            getlist(that)
            getgameinfo(that,row.id,lottery)
          }).catch(error => {
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },
    edit (row) {
      this.title = '投注项-修改'
      this.dialogFormVisible = true
      this.code = row.code
      this.name = row.name
      this.id = row.id
      this.form2.name = row.win_rate
      if (row.status === '禁用') {
        this.form2.status = 0
      } else {
        this.form2.status = 1
      }
    },
    query () {
      let that = this
      this.currentPage = 1
      getlist(that)
      let setgamename = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'status': that.formInline.status,
          'name': that.formInline.name
        }
      this.$store.commit('setgamename', setgamename)
    },
    query2 () {
      let that = this
      this.currentPage2 = 1
      getlist2(that)
    },
    query5 () {
      let that = this
      this.currentPage5 = 1
      getlist5(that, 1)
    },
    query5_2 () {
      let that = this
      this.currentPage5_2 = 1
      getlist5(that, 0)
    },
    query6 () {
      let that = this
      this.currentPage6 = 1
      getlist6(that, 1)
    },
    query6_2 () {
      let that = this
      this.currentPage6_2 = 1
      getlist6(that, 0)
    },
    sure (form) {
      let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
             request({
              url: that.public.url + '/gameset/savebase',
              method: 'post',
              data: {
                    game_id: 601,
                    depict: this.form.depict,
                    status: this.form.status,
                    type: 0
              }
            }).then(res => {
              getlist(that)
              getgameinfo(that, 601, 0)
            }).catch(error => {
            })
        }
      })
    },
    sure7 (form) {
      let that = this
      this.$refs.form7.validate((valid) => {
        if (valid) {
             request({
              url: that.public.url + '/gamesetwmg/savedefcjyxcs',
              method: 'post',
              data: {
                    cjyxcs: this.form7.num
              }
            }).then(res => {
              getnum(that)
            }).catch(error => {
            })
        }
      })
    },
    sure8 (form) {
      let that = this
      this.$refs.form8.validate((valid) => {
        if (valid) {
          var qgbm_ids = []
          for (var i= 0;i < this.moneylist.length;i++) {
            var id = this.moneylist[i].money
            for (var j= 0;j < this.form8.checkedCities.length;j++) {
              var ids = this.form8.checkedCities[j]
              if (id === ids) {
                qgbm_ids.push(this.moneylist[i].id)
              }
            }
          }
          let newqgbm_ids = qgbm_ids.join(',')
             request({
              url: that.public.url + '/gamesetwmg/initprize',
              method: 'post',
              data: {
                    type: this.type8,
                    gqbm_ids: newqgbm_ids
              }
            }).then(res => {
              that.dialogFormVisible8 = false
              that.form8.checkedCities = []
              that.form8.checkAll = false
              that.$message({
                type: 'success',
                message: '初始化成功'
              });
            }).catch(error => {
            })
        }
      })
    },
    sure2 (form) {
      let that = this
      this.$refs.form2.validate((valid) => {
        if (valid) {
             request({
              url: that.public.url + '/gameset/updatebetitem',
              method: 'post',
              data: {
                id: this.id,
                win_rate: this.form2.name,
                status: this.form2.status
              }
            }).then(res => {
              that.$refs.form2.resetFields()
              that.dialogFormVisible = false
              getlist2(that)
            }).catch(error => {
            })
        }
      })
    },
    sure3 (form) {
      let that = this
      this.$refs.form3.validate((valid) => {
        if (valid) {
          if (this.title3 === '底注-新增') {
            let that = this
            this.$refs.form3.validate((valid) => {
              if (valid) {
                  request({
                    url: that.public.url + '/gamesetwmg/addqbmoney',
                    method: 'post',
                    data: {
                      game_id: 601,
                      money: this.form3.money,
                      status: this.form3.status,
                      depict: this.form3.depict
                    }
                  }).then(res => {
                    that.$refs.form3.resetFields()
                    that.dialogFormVisible3 = false
                    getlist3(that)
                  }).catch(error => {
                  })
              }
            })
          } else {
            request({
              url: that.public.url + '/gamesetwmg/updateqbmoney',
              method: 'post',
              data: {
                game_id: 601,
                id: this.id3,
                money: this.form3.money,
                status: this.form3.status,
                depict: this.form3.depict
              }
            }).then(res => {
              that.$refs.form3.resetFields()
              that.dialogFormVisible3 = false
              getlist3(that)
            }).catch(error => {
            })
          }
        }
      })
    },
    sure4 (form) {
      let that = this
      this.$refs.form4.validate((valid) => {
        if (valid) {
             request({
              url: that.public.url + '/gamesetwmg/savedefpubprize',
              method: 'post',
              data: {
                shz: this.form4.shz,
                zyt: this.form4.zyt,
                ttxd: this.form4.ttxd,
                sj: this.form4.sj,
                lc: this.form4.lc,
                lzs: this.form4.lzs,
                do: this.form4.do,
                qa: this.form4.qa,
                ft: this.form4.ft,
                rw: this.form4.rw,
                bq: this.form4.bq,
                fqpj: this.form4.fqpj
              }
            }).then(res => {
              that.$refs.form4.resetFields()
              getlist4(that)
            }).catch(error => {
            })
        }
      })
    },
    sure5 (from) {
      let that = this
      this.$refs.form5.validate((valid) => {
        if (valid) {
          if (this.title5 === '普通奖库-新增') {
            let that = this
            this.$refs.form5.validate((valid) => {
              if (valid) {
                  request({
                    url: that.public.url + '/gamesetwmg/adddefgenprize',
                    method: 'post',
                    data: {
                      multiple: this.form5.money,
                      num: this.form5.num,
                      ntg_pic_num: this.form5.npic,
                      tg_pic_num: this.form5.pic
                    }
                  }).then(res => {
                    that.$refs.form5.resetFields()
                    that.dialogFormVisible5 = false
                    getlist5(that, 0)
                  }).catch(error => {
                  })
              }
            })
          } else {
            request({
              url: that.public.url + '/gamesetwmg/updatedefgenprize',
              method: 'post',
              data: {
                id: this.id5,
                multiple: this.form5.money,
                num: this.form5.num,
                ntg_pic_num: this.form5.npic,
                tg_pic_num: this.form5.pic
              }
            }).then(res => {
              that.$refs.form5.resetFields()
              that.dialogFormVisible5 = false
              getlist5(that, 0)
            }).catch(error => {
            })
          }
        }
      })
    },
    sure6 (from) {
      let that = this
      this.$refs.form6.validate((valid) => {
        if (valid) {
          if (this.title6 === '上限奖励库-新增') {
            let that = this
            this.$refs.form6.validate((valid) => {
              if (valid) {
                  request({
                    url: that.public.url + '/gamesetwmg/adddefhsgprize',
                    method: 'post',
                    data: {
                      multiple_u_limit: this.form6.money,
                      num: this.form6.num,
                    }
                  }).then(res => {
                    that.$refs.form6.resetFields()
                    that.dialogFormVisible6 = false
                    getlist6(that, 0)
                  }).catch(error => {
                  })
              }
            })
          } else {
            request({
              url: that.public.url + '/gamesetwmg/updatedefhsgprize',
              method: 'post',
              data: {
                id: this.id6,
                multiple_u_limit: this.form6.money,
                num: this.form6.num
              }
            }).then(res => {
              that.$refs.form6.resetFields()
              that.dialogFormVisible6 = false
              getlist6(that, 0)
            }).catch(error => {
            })
          }
        }
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
      let setgamename = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'status': that.formInline.status,
          'name': that.formInline.name
        }
      this.$store.commit('setgamename', setgamename)
    },
    handleCurrentChange(val) {
      this.currentPage = val *1
      getlist(this)
      let setgamename = {
          'currentPage': that.currentPage,
          'pagesize': that.pagesize,
          'status': that.formInline.status,
          'name': that.formInline.name
        }
      this.$store.commit('setgamename', setgamename)
    },
    handleSizeChange2(val) {
      this.pagesize2 = val
      this.currentPage2 = 1
      getlist2(this)
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val *1
      getlist2(this)
    },
    handleSizeChange3(val) {
      this.pagesize3 = val
      this.currentPage3 = 1
      getlist3(this)
    },
    handleCurrentChange3(val) {
      this.currentPage3 = val *1
      getlist3(this)
    },
    handleSizeChange5(val) {
      this.pagesize5 = val
      this.currentPage5 = 1
      getlist5(that, 1)
    },
    handleCurrentChange5(val) {
      this.currentPage5 = val *1
      getlist5(this, 1)
    },
    handleSizeChange5_2(val) {
      this.pagesize5_2 = val
      this.currentPage5_2 = 1
      getlist5(this, 0)
    },
    handleCurrentChange5_2(val) {
      this.currentPage5_2 = val *1
      getlist5(this, 0)
    },
    handleSizeChange6(val) {
      this.pagesize6 = val
      this.currentPage6 = 1
      getlist6(this, 1)
    },
    handleCurrentChange6(val) {
      this.currentPage6 = val *1
      getlist6(this, 1)
    },
    handleSizeChange6_2(val) {
      this.pagesize6_2 = val
      this.currentPage6_2 = 1
      getlist6(this, 0)
    },
    handleCurrentChange6_2(val) {
      this.currentPage6_2 = val *1
      getlist6(this, 0)
    }
  }
}


function getlist (that) {
  let data = {
    name: that.formInline.name,
    status: that.formInline.status,
    pageno: that.currentPage,
    pagerows: that.pagesize
  }
  request({
    url: that.public.url + '/gameset/getgamelist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData = res.data.list
    that.total = res.data.rownum *1
    that.currentPage = res.data.pageno * 1
  }).catch(error => {
  })
}
function getlist2 (that) {
  let data = {
    betitem: that.formInline2.name,
    status: that.formInline2.status,
    pageno: that.currentPage2,
    pagerows: that.pagesize2,
    game_id: 601
  }
  request({
    url: that.public.url + '/gameset/getbetitemlist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData2 = res.data
    that.bzmax = res.data[0].alot_bet_max_limit
    that.bzid = res.data[0].id
  }).catch(error => {
  })
}


 function getlist3 (that) {
   let data = {
    pageno: that.currentPage3,
    pagerows: that.pagesize3,
    game_id: 601
  }
  request({
    url: that.public.url + '/gamesetwmg/getqbmoneylist',
    method: 'post',
    data: data
  }).then(res => {
    that.tableData3 = res.data.list
    that.total3 = res.data.rownum *1
    that.currentPage3 = res.data.pageno * 1
  }).catch(error => {
  })
 }

  function getlist7 (that) {
  request({
    url: that.public.url + '/gamesetwmg/getpubprizelist',
    method: 'post',
    data: {
      type: 1
    }
  }).then(res => {
    that.tableData7 = res.data
  }).catch(error => {
  })
 }


  function getlist4 (that) {
  request({
    url: that.public.url + '/gamesetwmg/getpubprizelist',
    method: 'post',
    data: {
      type: 1
    }
  }).then(res => {
    that.tableData4 = res.data
  }).catch(error => {
  })
 }

  function getlist4_2 (that) {
   request({
          url: that.public.url + '/gamesetwmg/getpubprizelist',
          method: 'post',
          data: {
            type: 0
          }
        }).then(res => {
          that.form4.shz = res.data[0].shz
          that.form4.zyt = res.data[0].zyt
          that.form4.ttxd = res.data[0].ttxd
          that.form4.sj = res.data[0].sj
          that.form4.lc = res.data[0].lc
          that.form4.lzs = res.data[0].lzs
          that.form4.do = res.data[0].do
          that.form4.qa = res.data[0].qa
          that.form4.ft = res.data[0].ft
          that.form4.rw = res.data[0].rw
          that.form4.bq = res.data[0].bq
          that.form4.fqpj = res.data[0].fqpj
        }).catch(error => {
        })
 }

   function getlist5 (that, type) {
     let data = {
       type: type
     }
     if (type === 1) {
       data.gqbm_id = that.formInline5.status
       data.pageno = that.currentPage5
       data.pagerows = that.pagesize5
       data.multiple = that.formInline5.name
     } else {
       data.pageno = that.currentPage5_2
       data.pagerows = that.pagesize5_2
       data.multiple = that.formInline5_2.name
     }
  request({
    url: that.public.url + '/gamesetwmg/getgenprizelist',
    method: 'post',
    data: data
  }).then(res => {
    if (type === 0) {
      that.tableData5_2 = res.data.list
      that.total5_2 = res.data.rownum *1
    that.currentPage5_2 = res.data.pageno * 1
    } else {
      that.tableData5 = res.data.list
      that.total5 = res.data.rownum *1
    that.currentPage5 = res.data.pageno * 1
    }
  }).catch(error => {
  })
 }


 function getlist6 (that, type) {
     let data = {
       type: type
     }
     if (type === 1) {
       data.gqbm_id = that.formInline6.status
       data.pageno = that.currentPage6
       data.pagerows = that.pagesize6
       data.multiple_u_limit = that.formInline6.name
     } else {
       data.pageno = that.currentPage6_2
       data.pagerows = that.pagesize6_2
       data.multiple_u_limit = that.formInline6_2.name
     }
  request({
    url: that.public.url + '/gamesetwmg/gethsgprizelist',
    method: 'post',
    data: data
  }).then(res => {
    if (type === 0) {
      that.tableData6_2 = res.data.list
      that.total6_2 = res.data.rownum *1
      that.currentPage6_2 = res.data.pageno * 1
    } else {
      that.tableData6 = res.data.list
      that.total6 = res.data.rownum *1
      that.currentPage6 = res.data.pageno * 1
    }
  }).catch(error => {
  })
 }

 function getmoneylist (that) {
    request({
    url: that.public.url + '/gamesetwmg/getqbmoneys',
    method: 'post',
    data: {
      game_id: 601
    }
  }).then(res => {
    that.moneylist = res.data.list
  }).catch(error => {
  })
 }


  function getgameinfo (that,id,status) {
    request({
    url: that.public.url + '/gameset/getgamenameinfo',
    method: 'post',
    data: {
      id: id,
      type: status
    }
  }).then(res => {
    if (id === 601) {
      that.form.depict = res.data.depict
      that.form.status = res.data.status*1 
    }
  }).catch(error => {
  })
 }

 function getnum (that) {
   request({
    url: that.public.url + '/gamesetwmg/getdefcjyxcs',
    method: 'post'
  }).then(res => {
      that.form7.num = res.data.cjyxcs
  }).catch(error => {
  })
 }


</script>

<style>
  .paging {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
 .gamename .el-textarea__inner {
    height: 200px!important;
  }
  .cs .el-input__inner {
    width: 200px!important;
  }
</style>
