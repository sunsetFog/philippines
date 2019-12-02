<template>
  <div class="app-container">
       <el-tabs type='card' v-model="actionnamefruit" @tab-click='tabclickfruit'>
        <el-tab-pane label="1：基本设置">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth">
              <span>幸运水果机</span>
            </el-form-item>
            <el-form-item label="投注倒计时长" :label-width="formLabelWidth" prop='number'>
              <el-input v-model="form.number" type='number' style="width:140px"></el-input><span>秒</span>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth" prop="depict">
              <el-input v-model="form.depict" type="textarea" style="width:500px"></el-input>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label='0'>禁用</el-radio>
                <el-radio :label='1'>可用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-button type="primary" @click="sure(form)" v-if="gamesetsavebase">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="2：底注设置">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                    <el-col :span="2">
                      <el-button type="primary" round @click="add" v-if="gamesetwmgaddqbmoney"> 新增 </el-button>
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
                label="底注"
                prop="money">
              </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="depict"
              label="描述">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="text" size="small" v-if="gamesetwmgupdateqbmoney">修改</el-button>
                <el-button @click="del(scope.row)" type="text" size="small" v-if="gamesetwmgdelqbmoney">删除</el-button>
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
         <el-tab-pane label="3：单图开出概率">

           <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:18%;">
            <div class="cell">图案名称</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">大图概率：%</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">小图概率：%</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">BAR</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number7big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number7small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">双七</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number6big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number6small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">双星</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number5big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number5small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">西瓜</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number4big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number4small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">铃铛</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number3big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number3small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">柠檬</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number2big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number2small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">橘子</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number1big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number1small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">苹果</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number0big"></el-input>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form4.number0small"></el-input>
              </div>
            </td>
        </tr>
        <tr class="el-table__row" style="background: #bdd7ee;color:white;font-weight:800;font-size:22px;">
            <td crowspan="1" colspan="3" style="width:18%;">
              <div class="cell">合计：<span>{{count}}</span><span>%</span></div>
            </td>
        </tr>
        
        
      </tbody>
    </table>

    <div class="bottombutton">
      <el-button type="primary" @click="sure4" v-if='gamesetfruitsetrate'>提交</el-button>
      <el-button type="primary" @click="cz" v-if="gamesetfruitsetrate">重置</el-button>
    </div>
    
  </div>
</div>


        </el-tab-pane>
        <el-tab-pane label="4：LUCK送灯概率">

           <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:18%;">
            <div class="cell">送灯数量</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">概率：%</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">状态</div>
          </th>
           <th colspan='1' rowspan="1">
            <div class="cell">操作</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">8</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number8" v-if="inputshow"></el-input>
                <span v-else>{{form5.number8}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form5.number8s == 0">
                {{form5.number8s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number8s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number8s == 0" @click="form5.number8s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number8s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">7</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number7" v-if="inputshow"></el-input>
                <span v-else>{{form5.number7}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
               <div class="cell red" v-if="form5.number7s == 0">
                {{form5.number7s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number7s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number7s == 0" @click="form5.number7s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number7s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">6</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number'  v-model="form5.number6" v-if="inputshow"></el-input>
                <span v-else>{{form5.number6}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
               <div class="cell red" v-if="form5.number6s == 0">
                {{form5.number6s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number6s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number6s == 0" @click="form5.number6s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number6s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">5</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number5" v-if="inputshow"></el-input>
                <span v-else>{{form5.number5}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
               <div class="cell red" v-if="form5.number5s == 0">
                {{form5.number5s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number5s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number5s == 0" @click="form5.number5s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number5s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">4</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number4" v-if="inputshow"></el-input>
                <span v-else>{{form5.number4}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form5.number4s == 0">
                {{form5.number4s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number4s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number4s == 0" @click="form5.number4s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number4s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">3</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number3" v-if="inputshow"></el-input>
                <span v-else>{{form5.number3}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form5.number3s == 0">
                {{form5.number3s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number3s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number3s == 0" @click="form5.number3s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number3s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">2</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number2" v-if="inputshow"></el-input>
                <span v-else>{{form5.number2}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form5.number2s == 0">
                {{form5.number2s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number2s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number2s == 0" @click="form5.number2s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number2s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">1</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number1" v-if="inputshow"></el-input>
                <span v-else>{{form5.number1}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form5.number1s == 0">
                {{form5.number1s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number1s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form5.number1s == 0" @click="form5.number1s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number1s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">非LUCK</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form5.number0" v-if="inputshow"></el-input>
                <span v-else>{{form5.number0}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form5.number0s == 0">
                {{form5.number0s | status}}
              </div>
              <div class="cell green" v-else>
                {{form5.number0s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                
                <el-button class="green" v-if="form5.number0s == 0" @click="form5.number0s = 1">启用</el-button>
                <el-button class="red" v-else @click="form5.number0s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        
        <tr class="el-table__row" style="background: #bdd7ee;color:white;font-weight:800;font-size:22px;">
            <td crowspan="1" colspan="4" style="width:18%;">
              <div class="cell">合计：<span>{{count1}}</span><span>%</span></div>
            </td>
        </tr>
        
        
      </tbody>
    </table>

    <div class="bottombutton">
      <el-button type="primary" @click="change" v-if="!inputshow">修改概率</el-button>
      <el-button type="primary" @click="sure5" v-if="inputshow && gamesetfruitsetrate">保存</el-button>
      <el-button type="primary" @click="cz1" v-if="inputshow && gamesetfruitsetrate">重置概率</el-button>
    </div>
    
  </div>
</div>


        </el-tab-pane>
        <el-tab-pane label="5：多开概率">
          <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 70%;">
  <div class="el-table__header-wrapper">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%">
      <thead class="has-gutter">
        <tr>
          <th colspan='1' rowspan="1" style="width:18%;">
            <div class="cell">送灯数量</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">概率：%</div>
          </th>
          <th colspan='1' rowspan="1">
            <div class="cell">状态</div>
          </th>
           <th colspan='1' rowspan="1">
            <div class="cell">操作</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="el-table__body-wrapper is-scrolling-none">
    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">8</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number8" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number8}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form6.number8s == 0">
                {{form6.number8s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number8s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number8s == 0" @click="form6.number8s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number8s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">7</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number7" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number7}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
               <div class="cell red" v-if="form6.number7s == 0">
                {{form6.number7s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number7s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number7s == 0" @click="form6.number7s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number7s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">6</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number'  v-model="form6.number6" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number6}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
               <div class="cell red" v-if="form6.number6s == 0">
                {{form6.number6s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number6s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number6s == 0" @click="form6.number6s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number6s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">5</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number5" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number5}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
               <div class="cell red" v-if="form6.number5s == 0">
                {{form6.number5s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number5s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number5s == 0" @click="form6.number5s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number5s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">4</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number4" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number4}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form6.number4s == 0">
                {{form6.number4s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number4s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number4s == 0" @click="form6.number4s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number4s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">3</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number3" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number3}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form6.number3s == 0">
                {{form6.number3s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number3s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number3s == 0" @click="form6.number3s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number3s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">2</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number2" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number2}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form6.number2s == 0">
                {{form6.number2s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number2s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number2s == 0" @click="form6.number2s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number2s = 0">停用</el-button>
              </div>
            </td>
        </tr>
        <tr class="el-table__row">
            <td crowspan="1" colspan="1" style="width:18%;">
              <div class="cell">非多开</div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-input clearable style="width: 85%;" type='number' v-model="form6.number1" v-if="inputshow2"></el-input>
                <span v-else>{{form6.number1}}</span>
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell red" v-if="form6.number1s == 0">
                {{form6.number1s | status}}
              </div>
              <div class="cell green" v-else>
                {{form6.number1s | status}}
              </div>
            </td>
             <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button class="green" v-if="form6.number1s == 0" @click="form6.number1s = 1">启用</el-button>
                <el-button class="red" v-else @click="form6.number1s = 0">停用</el-button>
              </div>
            </td>
        </tr>
  
        
        <tr class="el-table__row" style="background: #bdd7ee;color:white;font-weight:800;font-size:22px;">
            <td crowspan="1" colspan="4" style="width:18%;">
              <div class="cell">合计：<span>{{count2}}</span><span>%</span></div>
            </td>
        </tr>
        
        
      </tbody>
    </table>

    <div class="bottombutton">
      <el-button type="primary" @click="change2" v-if="!inputshow2">修改概率</el-button>
      <el-button type="primary" @click="sure6" v-if="inputshow2 && gamesetfruitsetrate">保存</el-button>
      <el-button type="primary" @click="cz2" v-if="inputshow2 && gamesetfruitsetrate">重置概率</el-button>
    </div>
    
  </div>
</div>
          

        </el-tab-pane>

        <el-tab-pane label="6：开火车概率">
      <el-row>
        <el-form :inline="true" label-width="160px">
          <el-col :span="2">
            <el-button type="info" round @click="add7" v-if="gamesetfruitaddtrain"> 添加 </el-button>
          </el-col>
          <el-col :span='2'>
            <el-button type="info" round @click="edit7"> 编辑 </el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item label="连续图案数量">
                <el-select v-model="formInline.number" filterable clearable>
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="火车头位置编号">
               <el-select v-model="formInline.item" filterable clearable>
                <el-option
                  v-for="item in headlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="query7" v-if="gamesetfruitfruitratelist">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
<!-- :summary-method="getsummary" -->
    <!-- show-summary -->
    <el-table
    :data="tableData7"
  
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID">
    </el-table-column>

    <el-table-column
      label="连续图案数量">
      <template slot-scope="scope">
        <el-select v-model="scope.row.item" clearable filterable v-if="editshow">
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{scope.row.item | item}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="火车头位置编号">
      <template slot-scope="scope">
      <el-select v-model="scope.row.pos" clearable filterable v-if="editshow">
                <el-option
                  v-for="item in headlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{scope.row.pos | item}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="开火车概率:%">
      <template slot-scope="scope">
        <el-input v-model="scope.row.pr" type='number' filterable  v-if="editshow"></el-input>
        <span v-else>{{scope.row.pr}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="delet(scope.row)" v-if="gamesetfruitdeltrainrate && scope.row.id !=''">删除</el-button>
      </template>
      
    </el-table-column>
    <div slot="append" v-if="tableData7.length > 0">
      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
      <tbody>
      <tr class="el-table__row" style="background: #00cc99;color: black">
            <td crowspan="1" colspan="3">
              <div class="cell" style="text-align: center">
                <span>合计</span>
              </div>
            </td>

             <td crowspan="1" colspan="1">
              <div class="cell">
                {{count3}}
              </div>
            </td>
            <td crowspan="1" colspan="1">
              <div class="cell">
                <el-button type="primary" @click="sure7()" :disabled='count3=="100%"?false:true' v-if="gamesetfruitsetrate">保存并推送</el-button>
                <el-button @click="back7" v-if="editshow">取消</el-button>
              </div>
            </td>
        </tr>
      </tbody>
      </table>
  
    </div>
  </el-table>

        </el-tab-pane>
        <el-tab-pane label="7：投注项限红">
            <el-table
    :data="tableData8"
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
              prop="alot_bet_max_limit"
              label="投注项总限红">
            </el-table-column>
            <el-table-column
              prop="evot_bet_min_limit"
              label="投注项个人下限">
            </el-table-column>
            <el-table-column
              prop="evot_bet_max_limit"
              label="投注项个人上限">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="edit8(scope.row)" type="text" size="small" v-if="gamesetupdatebetitem">修改</el-button>
              </template>
            </el-table-column>
  </el-table>
        </el-tab-pane>
      </el-tabs>



           <el-dialog :title='title2'  :visible.sync="dialogFormVisible2" :before-close="reset2">
    <el-form :model="form2" :rules="rules2" ref="form2">

       <el-form-item label="投注项代码" :label-width="formLabelWidth" prop='code' v-if="name">
        <el-input v-model="form2.code" ></el-input>
      </el-form-item>
       <el-form-item label="投注项代码" :label-width="formLabelWidth" v-else>
        <span>{{betcode}}</span>
      </el-form-item>
       <el-form-item label="投注项名称" :label-width="formLabelWidth" prop='name'  v-if="name">
        <el-input v-model="form2.name"></el-input>
      </el-form-item>
       <el-form-item label="投注项名称" :label-width="formLabelWidth" v-else>
        <span>{{betname}}</span>
      </el-form-item>
       <el-form-item label="所有人每局最大下注限额" :label-width="formLabelWidth" prop='day'>
        <el-input v-model="form2.day" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
       <el-form-item label="每人每局最小下注限额" :label-width="formLabelWidth" prop='min'>
        <el-input v-model="form2.min" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
       <el-form-item label="每人每局最大下注限额" :label-width="formLabelWidth" prop='max'>
        <el-input v-model="form2.max" type='number' style='width:50%'></el-input> <span>元</span>
      </el-form-item>
                                           
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset2(form)">取 消</el-button>
      <el-button type="primary" @click="sure2(form)">确 定</el-button>
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

  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
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
    return {
      formInline: {
        item: '',
        number: ''
      },
      form: {
        depict: '',
        status: '',
        number: ''
      },
      currentPage: 1,
      tableData: [
      ],
      tableData7: [],
      tableData8: [],
      inputshow: false,
      inputshow2: false,
      tableData2: [],
      editshow: false,
      rules: {
        status: {required: true, message: '请选择状态', trigger: 'change'},
        number: {required: true, message: '请填写投注倒计时长', trigger: 'blur'},
      },
      form3: {
        status: 1,
        money: '',
        depict: ''
      },
      rules3: {
        status: [
          {required: true, message: '请选状态', trigger: 'change'}
        ],
        money: [
          {required: true, validator: zsrules, trigger: 'blur'}
        ]
      },
      total: 0,
      pagesize: 20,
      id: '',
      title2: '',
      dialogFormVisible2: false,
      form2: {
        code: '',
        name: '',
        day: '',
        min: '',
        max: ''
      },
      name: false,
      actionnamefruit: '',
      rules2: {
        code: {required: true, message: '请填写投注项代码', trigger: 'blur'},
        name: {required: true, message: '请填写投注项名称', trigger: 'blur'},
        day: {required: true, message: '请填写所有人每局最大下注限额', trigger: 'blur'},
        min: {required: true, message: '请填写每人每局最小下注限额', trigger: 'blur'},
        max: {required: true, message: '请填写每人每局最大下注限额', trigger: 'blur'},
      },
      form4: {
        number7big: '',
        number7small: '',
        number6big: '',
        number6small: '',
        number5big: '',
        number5small: '',
        number4big: '',
        number4small: '',
        number3big: '',
        number3small: '',
        number2big: '',
        number2small: '',
        number1big: '',
        number1small: '',
        number0big: '',
        number0small: ''
      },
      form5: {
        number8: '',
        number8s: '',
        number7: '',
        number7s: '',
        number6: '',
        number6s: '',
        number5: '',
        number5s: '',
        number4: '',
        number4s: '',
        number3: '',
        number3s: '',
        number2: '',
        number2s: '',
        number1: '',
        number1s: '',
        number0: '',
        number0s: '',
      },
      form6: {
        number8: '',
        number8s: '',
        number7: '',
        number7s: '',
        number6: '',
        number6s: '',
        number5: '',
        number5s: '',
        number4: '',
        number4s: '',
        number3: '',
        number3s: '',
        number2: '',
        number2s: '',
        number1: '',
        number1s: ''
      },
      name: false,
      formLabelWidth: '180px',
      betcode: '',
      betname: '',
      betid: '',
      list: [
        {
          id: '',
          name: '全部'
        },
        {
          id: '0',
          name: '不触发'
        },
        {
          id: '2',
          name: '2'
        },
        {
          id: '3',
          name: '3'
        },
        {
          id: '4',
          name: '4'
        },
        {
          id: '5',
          name: '5'
        },
        {
          id: '6',
          name: '6'
        },
        {
          id: '7',
          name: '7'
        },
        {
          id: '8',
          name: '8'
        }
      ],
      headlist: [
        {
          id: '',
          name: '全部'
        },
        {
          id: '0',
          name: '不触发'
        },
        {
          id: '2',
          name: '2'
        },
        {
          id: '3',
          name: '3'
        },
        {
          id: '4',
          name: '4'
        },
        {
          id: '5',
          name: '5'
        },
        {
          id: '6',
          name: '6'
        },
        {
          id: '7',
          name: '7'
        },
        {
          id: '8',
          name: '8'
        },
        {
          id: '9',
          name: '9'
        },
        {
          id: '10',
          name: '10'
        },
        {
          id: '11',
          name: '11'
        },
        {
          id: '12',
          name: '12'
        },
        {
          id: '13',
          name: '13'
        },
        {
          id: '14',
          name: '14'
        },
        {
          id: '15',
          name: '15'
        },
        {
          id: '16',
          name: '16'
        },
        {
          id: '17',
          name: '17'
        },
        {
          id: '18',
          name: '18'
        },
        {
          id: '19',
          name: '19'
        },
        {
          id: '20',
          name: '20'
        },
        {
          id: '21',
          name: '21'
        },
        {
          id: '22',
          name: '22'
        },
        {
          id: '23',
          name: '23'
        }
      ],
      title3: '',
      dialogFormVisible3: false,
      addshow: false,
      add7num: []
    }
  },
  created() {
    getinfo(this)
  },
  computed: {
    ...mapGetters([
      'gamesetsavebase',
      'gamesetwmgaddqbmoney',
      'gamesetwmgupdateqbmoney',
      'gamesetwmgdelqbmoney',
      'gamesetfruitsetrate',
      'gamesetfruitaddtrain',
      'gamesetfruitfruitratelist',
      'gamesetfruitdeltrainrate',
      'gamesetupdatebetitem'
    ]),
    count: function () {
     let num =  accAdd(this.form4.number7big,this.form4.number7small,this.form4.number6big,this.form4.number6small,this.form4.number5big,this.form4.number5small,this.form4.number4big,this.form4.number4small,this.form4.number3big,this.form4.number3small,this.form4.number2big,this.form4.number2small,this.form4.number1big,this.form4.number1small,this.form4.number0big,this.form4.number0small)
      return num
    },
    count1: function () {
      let num = accAdd(this.form5.number8, this.form5.number7,this.form5.number6, this.form5.number5,this.form5.number4, this.form5.number3,this.form5.number2,this.form5.number1,this.form5.number0)
      if (this.form5.number8s == 0) {
        num = accSub(num, this.form5.number8)
      }
      if (this.form5.number7s == 0) {
        num = accSub(num, this.form5.number7)
      }
      if (this.form5.number6s == 0) {
        num = accSub(num, this.form5.number6)
      }
      if (this.form5.number5s == 0) {
        num = accSub(num, this.form5.number5)
      }
      if (this.form5.number4s == 0) {
        num = accSub(num, this.form5.number4)
      }
      if (this.form5.number3s == 0) {
        num = accSub(num, this.form5.number3)
      }
      if (this.form5.number2s == 0) {
        num = accSub(num, this.form5.number2)
      }
      if (this.form5.number1s == 0) {
        num = accSub(num, this.form5.number1)
      }
      if (this.form5.number0s == 0) {
        num = accSub(num, this.form5.number0)
      }
      return num
    },
    count2: function () {
      let num = accAdd(this.form6.number8, this.form6.number7,this.form6.number6, this.form6.number5,this.form6.number4, this.form6.number3,this.form6.number2,this.form6.number1)
      if (this.form6.number8s == 0) {
        num = accSub(num, this.form6.number8)
      }
      if (this.form6.number7s == 0) {
        num = accSub(num, this.form6.number7)
      }
      if (this.form6.number6s == 0) {
        num = accSub(num, this.form6.number6)
      }
      if (this.form6.number5s == 0) {
        num = accSub(num, this.form6.number5)
      }
      if (this.form6.number4s == 0) {
        num = accSub(num, this.form6.number4)
      }
      if (this.form6.number3s == 0) {
        num = accSub(num, this.form6.number3)
      }
      if (this.form6.number2s == 0) {
        num = accSub(num, this.form6.number2)
      }
      if (this.form6.number1s == 0) {
        num = accSub(num, this.form6.number1)
      }
      return num
    },
    count3: function () {
      let that = this
        const values = that.tableData7.map(item => {
          return item.pr * 1
        })  
        // let sums = values.reduce((prev, curr) => {
        //   let num = accAdd(prev,curr)
        //     return num
        // }, 0)
        let sums = accAdd(...values)
        return sums + '%'
    }
  },
  filters: {
    status (val) {
      if (val == 0) {
        return '停用'
      }
      if (val == 1) {
        return '启用'
      }
    },
    item (val) {
      if (val == '0') {
        return '不触发'
      } else {
        return val
      }
    }
  },
  methods: {
    query () {
      let that = this
      this.currentPage = 1
      getlist(this)
    },
    query7() {
      let that = this
      request({
        url: that.public.url + '/gamesetfruit/fruitratelist',
        method: 'post',
        data: {
            type: 4,
            item: that.formInline.number,
            pos: that.formInline.item
        }
      }).then(res => {
       that.tableData7 = res.data
      }).catch(error => {
      })
    },
    sure7 () {
      let that = this
      request({
        url: that.public.url + '/gamesetfruit/setrate',
        method: 'post',
        data: {
            type: 4,
            param: that.tableData7
        }
      }).then(res => {
        if (res.code === 0) {
          that.$message.success('推送成功')  
        }
        that.query7()
      }).catch(error => {
      })
    },
    back7 () {
      let that = this
      // if (this.addshow) {
      //   let ids = this.add7num.join(',')
      //   request({
      //     url: that.public.url + '/gamesetfruit/deltrainrate',
      //     method: 'post',
      //     data: {
      //         ids: ids
      //     }
      //   }).then(res => {
      //     that.query7()
      //     that.add7num = []
      //   }).catch(error => {
      //   })
      // }
      that.query7()
      this.editshow = false
    },
    tabclickfruit () {
      if (this.actionnamefruit === '1') {
        getlist(this)
      }
      if (this.actionnamefruit === '2') {
        getfruitratelist(this,1)
      }
      if (this.actionnamefruit === '3') {
        getfruitratelist(this,2)
      }
      if (this.actionnamefruit === '4') {
        getfruitratelist(this,3)
      }
      if (this.actionnamefruit === '6') {
        getbetitemlist(this)
      }
    },
    cz () {
      getfruitratelist(this,1)
    },
    cz1 () {
      getfruitratelist(this,2)
      this.inputshow = false
    },
    cz2 () {
      getfruitratelist(this,3)
      this.inputshow2 = false
    },
    change () {
      this.inputshow = true
    },
    change2 () {
      this.inputshow2 = true
    },
    reset3 (form) {
      this.dialogFormVisible3 = false
      this.$refs.form3.resetFields()
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
    delet (row) {
      let that = this
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          request({
              url: that.public.url + '/gamesetfruit/deltrainrate',
              method: 'post',
              data: {
                  ids: row.id
              }
            }).then(res => {
              that.query7()
            }).catch(error => {
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    add7 () {
      let that = this
      that.editshow = true
      this.addshow = true
      that.tableData7.push({id:'',item: '',pos: '',pr: ''})
      //  request({
      //     url: that.public.url + '/gamesetfruit/addtrain',
      //     method: 'post',
      //     data: {
      //     }
      //   }).then(res => {
      //     that.add7num.push(res.data)
      //     that.query7()
      //   }).catch(error => {
      //   })
        
    },
    edit7 () {
      let that = this
      that.editshow = true
      this.addshow = false
    },
    sure () {
       let that = this
      this.$refs.form.validate((valid) => {
        if (valid) {
            request({
            url: that.public.url + '/gameset/savebase',
            method: 'post',
            data: {
                  game_id: 701,
                  depict: this.form.depict,
                  bet_count_down: this.form.number,
                  status: this.form.status,
                  type: 0
            }
          }).then(res => {
            that.$message({
              type: 'success',
              message: res.message
            })
            that.$refs.form.resetFields()
            getinfo(that)
          }).catch(error => {
          })
        } else {
          return false
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
                      game_id: 701,
                      money: this.form3.money,
                      status: this.form3.status,
                      depict: this.form3.depict
                    }
                  }).then(res => {
                    that.$refs.form3.resetFields()
                    that.dialogFormVisible3 = false
                    getlist(that)
                  }).catch(error => {
                  })
              }
            })
          } else {
            request({
              url: that.public.url + '/gamesetwmg/updateqbmoney',
              method: 'post',
              data: {
                game_id: 701,
                id: this.id3,
                money: this.form3.money,
                status: this.form3.status,
                depict: this.form3.depict
              }
            }).then(res => {
              that.$refs.form3.resetFields()
              that.dialogFormVisible3 = false
              getlist(that)
            }).catch(error => {
            })
          }
        }
      })
    },
    sure4 () {
      let that = this
      if (this.count != 100) {
        that.$message({
          type: 'error',
          message: '合计不为100%不能提交'
        })
        return false
      }
      let param = []
      if (this.form4.number7big*1 + this.form4.number7small*1 > 0) {
        if (this.form4.number7big === '') {
          this.form4.number7big = 0
        }
        if (this.form4.number7small === '') {
          this.form4.number7small = 0
        }
        param.push ({item: 7, pr_bigpic: this.form4.number7big, pr_smallpic:this.form4.number7small })
      }
      if (this.form4.number6big*1 + this.form4.number6small*1 > 0) {
        if (this.form4.number6big === '') {
          this.form4.number6big = 0
        }
        if (this.form4.number6small === '') {
          this.form4.number6small = 0
        }
        param.push ({item: 6, pr_bigpic: this.form4.number6big, pr_smallpic:this.form4.number6small })
      }
      if (this.form4.number5big*1 + this.form4.number5small*1 > 0) {
        if (this.form4.number5big === '') {
          this.form4.number5big = 0
        }
        if (this.form4.number5small === '') {
          this.form4.number5small = 0
        }
        param.push ({item: 5, pr_bigpic: this.form4.number5big, pr_smallpic:this.form4.number5small })
      }
      if (this.form4.number4big*1 + this.form4.number4small*1 > 0) {
        if (this.form4.number4big === '') {
          this.form4.number4big = 0
        }
        if (this.form4.number4small === '') {
          this.form4.number4small = 0
        }
        param.push ({item: 4, pr_bigpic: this.form4.number4big, pr_smallpic:this.form4.number4small })
      }
      if (this.form4.number3big*1 + this.form4.number3small*1 > 0) {
        if (this.form4.number3big === '') {
          this.form4.number3big = 0
        }
        if (this.form4.number3small === '') {
          this.form4.number3small = 0
        }
        param.push ({item: 3, pr_bigpic: this.form4.number3big, pr_smallpic:this.form4.number3small })
      }
      if (this.form4.number2big*1 + this.form4.number2small*1 > 0) {
        if (this.form4.number2big === '') {
          this.form4.number2big = 0
        }
        if (this.form4.number2small === '') {
          this.form4.number2small = 0
        }
        param.push ({item: 2, pr_bigpic: this.form4.number2big, pr_smallpic:this.form4.number2small })
      }
      if (this.form4.number1big*1 + this.form4.number1small*1 > 0) {
        if (this.form4.number1big === '') {
          this.form4.number1big = 0
        }
        if (this.form4.number1small === '') {
          this.form4.number1small = 0
        }
        param.push ({item: 1, pr_bigpic: this.form4.number1big, pr_smallpic:this.form4.number1small })
      }
      if (this.form4.number0big*1 + this.form4.number0small*1 > 0) {
        if (this.form4.number0big === '') {
          this.form4.number0big = 0
        }
        if (this.form4.number0small === '') {
          this.form4.number0small = 0
        }
        param.push ({item: 0, pr_bigpic: this.form4.number0big, pr_smallpic:this.form4.number0small })
      }
      request({
        url: that.public.url + '/gamesetfruit/setrate',
        method: 'post',
        data: {
              param: param,
              type: 1
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        })
        getfruitratelist(that,1)
      }).catch(error => {
      })
    },
    sure5 () {
      let that = this
      if (this.count1 != 100) {
        that.$message({
          type: 'error',
          message: '合计不为100%不能提交'
        })
        return false
      }
        if (this.form5.number8 === '') {
          this.form5.number8 = 0
        }
        if (this.form5.number7 === '') {
          this.form5.number7 = 0
        }
        if (this.form5.number6 === '') {
          this.form5.number6 = 0
        }
        if (this.form5.number5 === '') {
          this.form5.number5 = 0
        }
        if (this.form5.number4 === '') {
          this.form5.number4 = 0
        }
        if (this.form5.number3 === '') {
          this.form5.number3 = 0
        }
        if (this.form5.number2 === '') {
          this.form5.number2 = 0
        }
        if (this.form5.number1 === '') {
          this.form5.number1 = 0
        }
        if (this.form5.number0 === '') {
          this.form5.number0 = 0
        }
        let param = [
          {item: 8, pr: this.form5.number8 , status: this.form5.number8s },
          {item: 7, pr: this.form5.number7 , status: this.form5.number7s },
          {item: 6, pr: this.form5.number6 , status: this.form5.number6s },
          {item: 5, pr: this.form5.number5 , status: this.form5.number5s },
          {item: 4, pr: this.form5.number4 , status: this.form5.number4s },
          {item: 3, pr: this.form5.number3 , status: this.form5.number3s },
          {item: 2, pr: this.form5.number2 , status: this.form5.number2s },
          {item: 1, pr: this.form5.number1 , status: this.form5.number1s },
          {item: 0, pr: this.form5.number0 , status: this.form5.number0s },
        ]

      request({
        url: that.public.url + '/gamesetfruit/setrate',
        method: 'post',
        data: {
              param: param,
              type: 2
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        })
        getfruitratelist(that,2)
        that.inputshow = false
      }).catch(error => {
      })
    },
    sure6 () {
      let that = this
      if (this.count2 != 100) {
        that.$message({
          type: 'error',
          message: '合计不为100%不能提交'
        })
        return false
      }
        if (this.form6.number8 === '') {
          this.form6.number8 = 0
        }
        if (this.form6.number7 === '') {
          this.form6.number7 = 0
        }
        if (this.form6.number6 === '') {
          this.form6.number6 = 0
        }
        if (this.form6.number5 === '') {
          this.form6.number5 = 0
        }
        if (this.form6.number4 === '') {
          this.form6.number4 = 0
        }
        if (this.form6.number3 === '') {
          this.form6.number3 = 0
        }
        if (this.form6.number2 === '') {
          this.form6.number2 = 0
        }
        if (this.form6.number1 === '') {
          this.form6.number1 = 0
        }
        let param = [
          {item: 8, pr: this.form6.number8 , status: this.form6.number8s },
          {item: 7, pr: this.form6.number7 , status: this.form6.number7s },
          {item: 6, pr: this.form6.number6 , status: this.form6.number6s },
          {item: 5, pr: this.form6.number5 , status: this.form6.number5s },
          {item: 4, pr: this.form6.number4 , status: this.form6.number4s },
          {item: 3, pr: this.form6.number3 , status: this.form6.number3s },
          {item: 2, pr: this.form6.number2 , status: this.form6.number2s },
          {item: 0, pr: this.form6.number1 , status: this.form6.number1s },
        ]

      request({
        url: that.public.url + '/gamesetfruit/setrate',
        method: 'post',
        data: {
              param: param,
              type: 3
        }
      }).then(res => {
        that.$message({
          type: 'success',
          message: res.message
        })
        getfruitratelist(that,3)
        that.inputshow2 = false
      }).catch(error => {
      })
    },
    edit (row) {
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
    edit8 (row) {
      let that = this
        this.title2 = '投注项-修改'
        this.dialogFormVisible2 = true
        this.name = false
        this.betid = row.id
        request({
          url: that.public.url + '/gameset/getbetiteminfo',
          method: 'post',
          data: {
                id: row.id
          }
        }).then(res => {
          this.betcode = res.data.code
          this.betname= res.data.name
          this.form2.max = res.data.evot_bet_max_limit
          this.form2.min = res.data.evot_bet_min_limit
          this.form2.day = res.data.alot_bet_max_limit
        }).catch(error => {
        }) 
    },
    add (row) {
      this.title3 = '底注-新增'
      this.dialogFormVisible3 = true
    },
    reset2 () {
      this.dialogFormVisible2 = false
      this.$refs.form2.resetFields()
    },
    sure2 () {
      let that = this
        this.$refs.form2.validate((valid) => {
        if (valid) {
             request({
              url: that.public.url + '/gameset/updatebetitem',
              method: 'post',
              data: {
                    id: this.betid,
                    game_id: 701,
                    evot_bet_max_limit: this.form2.max,
                    evot_bet_min_limit: this.form2.min,
                    alot_bet_max_limit: this.form2.day
              }
            }).then(res => {
              that.$message({
                type: 'success',
                message: res.message
              })
              that.dialogFormVisible2 = false
              that.$refs.form2.resetFields()
              getbetitemlist(that)
            }).catch(error => {
            })


        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      let that = this
      this.pagesize = val
      this.currentPage = 1
      getlist(this)
    },
    handleCurrentChange(val) {
      let that = this
      this.currentPage = val *1
      getlist(this)
    }
  }
}

function getbetitemlist (that) {
  request({
    url: that.public.url + '/gameset/getbetitemlist',
    method: 'post',
    data: {
      game_id: 701
    }
  }).then(res => {
    that.tableData8 = res.data
  }).catch(error => {
  })
}

function getlist (that) {
  request({
    url: that.public.url + '/gamesetwmg/getqbmoneylist',
    method: 'post',
    data: {
      game_id: 701,
      pageno: that.currentPage,
      pagerows: that.pagesize
    }
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


function getinfo (that) {
  request({
      url: that.public.url + '/gameset/getgamenameinfo',
      method: 'post',
      data: {
        id: 701
      }
    }).then(res => {
      that.form.depict = res.data.depict
      that.form.number = res.data.bet_count_down
      that.form.status = res.data.status * 1
    }).catch(error => {
    })
}


function getfruitratelist(that, type) {
  request({
      url: that.public.url + '/gamesetfruit/fruitratelist',
      method: 'post',
      data: {
        type: type
      }
    }).then(res => {
      let data = res.data
      if (type == 1) {
        data.map(val => {
          if (val.item == '7') {
            that.form4.number7big = val.pr_bigpic
            that.form4.number7small = val.pr_smallpic
          }
          if (val.item == '6') {
            that.form4.number6big = val.pr_bigpic
            that.form4.number6small = val.pr_smallpic
          }
          if (val.item == '5') {
            that.form4.number5big = val.pr_bigpic
            that.form4.number5small = val.pr_smallpic
          }
          if (val.item == '4') {
            that.form4.number4big = val.pr_bigpic
            that.form4.number4small = val.pr_smallpic
          }
          if (val.item == '3') {
            that.form4.number3big = val.pr_bigpic
            that.form4.number3small = val.pr_smallpic
          }
          if (val.item == '2') {
            that.form4.number2big = val.pr_bigpic
            that.form4.number2small = val.pr_smallpic
          }
          if (val.item == '1') {
            that.form4.number1big = val.pr_bigpic
            that.form4.number1small = val.pr_smallpic
          }
          if (val.item == '0') {
            that.form4.number0big = val.pr_bigpic
            that.form4.number0small = val.pr_smallpic
          }
        })
      }
      if (type == 2) {
        data.map(val => {
          if (val.item == '8') {
            that.form5.number8 = val.pr
            that.form5.number8s = val.status
          }
          if (val.item == '7') {
            that.form5.number7 = val.pr
            that.form5.number7s = val.status
          }
          if (val.item == '6') {
            that.form5.number6 = val.pr
            that.form5.number6s = val.status
          }
          if (val.item == '5') {
            that.form5.number5 = val.pr
            that.form5.number5s = val.status
          }
          if (val.item == '4') {
            that.form5.number4 = val.pr
            that.form5.number4s = val.status
          }
          if (val.item == '3') {
            that.form5.number3 = val.pr
            that.form5.number3s = val.status
          }
          if (val.item == '2') {
            that.form5.number2 = val.pr
            that.form5.number2s = val.status
          }
          if (val.item == '1') {
            that.form5.number1 = val.pr
            that.form5.number1s = val.status
          }
          if (val.item == '0') {
            that.form5.number0 = val.pr
            that.form5.number0s = val.status
          }
        })
      }
      if (type == 3) {
        data.map(val => {
          if (val.item == '8') {
            that.form6.number8 = val.pr
            that.form6.number8s = val.status
          }
          if (val.item == '7') {
            that.form6.number7 = val.pr
            that.form6.number7s = val.status
          }
          if (val.item == '6') {
            that.form6.number6 = val.pr
            that.form6.number6s = val.status
          }
          if (val.item == '5') {
            that.form6.number5 = val.pr
            that.form6.number5s = val.status
          }
          if (val.item == '4') {
            that.form6.number4 = val.pr
            that.form6.number4s = val.status
          }
          if (val.item == '3') {
            that.form6.number3 = val.pr
            that.form6.number3s = val.status
          }
          if (val.item == '2') {
            that.form6.number2 = val.pr
            that.form6.number2s = val.status
          }
          if (val.item == '0') {
            that.form6.number1 = val.pr
            that.form6.number1s = val.status
          }
        })
      }
      
    }).catch(error => {
    })
}


function accAdd(...nums) {
			let maxLength = 0
			for (const i of nums) {
				const str = String(i)
				const index = str.indexOf('.')
				const length = index > -1 ? (str.length - (index + 1)) : 0
				if (length > maxLength) {
					maxLength = length
				}
			}
			const multiple = Math.pow(10, maxLength)
			return nums.map(item => item * multiple).reduce((prev, curr) => prev + curr) / multiple
		}





function accSub (num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    var result = Number((num1 * times - num2 * times) / times)
    return result;
};


var countDecimals = function(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { 
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
}

</script>

<style>
.bottombutton {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
