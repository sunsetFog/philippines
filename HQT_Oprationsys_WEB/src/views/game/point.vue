<template>
  <div class="app-container point">
       <el-tabs type='card'  v-model="actionname" @tab-click='tabclick'>
        <el-tab-pane label="App">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel" v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData"
            :cell-class-name='cell'
            :span-method="objectmethod"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="游戏大厅">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline2.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline2.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline2.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query2" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel2"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData2"
            :cell-class-name='cell'
            :span-method="objectmethod2"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>

        <el-tab-pane label="百家乐经典场">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline3.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline3.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline3.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query3" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel3"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData3"
            :cell-class-name='cell'
            :span-method="objectmethod3"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="百家乐彩票场">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline4.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline4.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline4.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query4" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel4"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData4"
            :cell-class-name='cell'
            :span-method="objectmethod4"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="百人牛牛经典场">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline5.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline5.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline5.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query5" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel5"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData5"
            :cell-class-name='cell'
            :span-method="objectmethod5"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="百人牛牛彩票场">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline6.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline6.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline6.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query6" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel6"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData6"
            :cell-class-name='cell'
            :span-method="objectmethod6"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="红黑大战">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline7.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline7.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline7.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query7" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel7"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData7"
            :cell-class-name='cell'
            :span-method="objectmethod7"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="水浒传">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline8.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline8.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline8.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query8" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel8"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData8"
            :cell-class-name='cell'
            :span-method="objectmethod8"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
         <el-tab-pane label="斗地主">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline9.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline9.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline9.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query9" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel9"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData9"
            :cell-class-name='cell'
            :span-method="objectmethod9"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="幸运水果机">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline10.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline10.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline10.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query10" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel10"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData10"
            :cell-class-name='cell'
            :span-method="objectmethod10"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
         <el-tab-pane label="龙虎斗经典场">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline11.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline11.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline11.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query11" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel11"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData11"
            :cell-class-name='cell'
            :span-method="objectmethod11"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="龙虎斗彩票场">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline12.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline12.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline12.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query12" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel12"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData12"
            :cell-class-name='cell'
            :span-method="objectmethod12"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
         <el-tab-pane label="红包扫雷">
          <div class="query">
              <el-row>
                <el-form :inline="true" label-width="80px">
                   <el-col :span="6">
                      <el-form-item label="玩家渠道">
                          <el-select v-model="formInline13.org" clearable>
                            <el-option
                              v-for="item in statuslist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                   <el-col :span="8">
                    <el-form-item label="日期">
                      <el-date-picker
                      v-model="formInline13.time"
                      type="daterange"
                      :editable="false"
                      range-separator="-"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属模块">
                        <el-select v-model="formInline13.model" clearable>
                            <el-option
                              v-for="(item, key) in modellist"
                              :key="key"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click="query13" v-if="gameclickstatgetlist">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="excel13"  v-if="gameclickstatdownloadlist">导出</el-button>
                  </el-col>
                </el-form>
              </el-row>
            </div>
            <span>备注：列表仅展示最后7天，可导出90天的记录。</span>
            <el-table
            :data="tableData13"
            :cell-class-name='cell'
            :span-method="objectmethod13"
            border
            style="width: 100%">
              <el-table-column
                label="所属模块"
                prop="module_name">
              </el-table-column>
              <el-table-column
              prop="event_name"
              label="点击事件">
            </el-table-column>
            <el-table-column
              :prop="seven"
              :label='seven'>
            </el-table-column>
            <el-table-column
              :prop="six"
              :label="six">
            </el-table-column>
            <el-table-column
              :prop="five"
              :label="five">
            </el-table-column>
             <el-table-column
              :prop="four"
              :label="four">
            </el-table-column>
             <el-table-column
              :prop="three"
              :label="three">
            </el-table-column>
             <el-table-column
              :prop="two"
              :label="two">
            </el-table-column>
             <el-table-column
              :prop="one"
              :label="one">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计">
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>





  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formInline: {
        model: '',
        time: '',
        org: ''
      },
      tableData: [
      ],
      formInline2: {
        model: '',
        time: '',
        org: ''
      },
      tableData2: [
      ],
      formInline3: {
        model: '',
        time: '',
        org: ''
      },
      tableData3: [
      ],
      formInline4: {
        model: '',
        time: '',
        org: ''
      },
      tableData4: [
      ],
      formInline5: {
        model: '',
        time: '',
        org: ''
      },
      tableData5: [
      ],
      formInline6: {
        model: '',
        time: '',
        org: ''
      },
      tableData6: [
      ],
      formInline7: {
        model: '',
        time: '',
        org: ''
      },
      tableData7: [
      ],
      formInline8: {
        model: '',
        time: '',
        org: ''
      },
      tableData8: [
      ],
      formInline9: {
        model: '',
        time: '',
        org: ''
      },
      tableData9: [
      ],
      formInline10: {
        model: '',
        time: '',
        org: ''
      },
      tableData10: [
      ],
      formInline11: {
        model: '',
        time: '',
        org: ''
      },
      tableData11: [
      ],
      formInline12: {
        model: '',
        time: '',
        org: ''
      },
      tableData12: [
      ],
      formInline13: {
        model: '',
        time: '',
        org: ''
      },
      tableData13: [
      ],
      id: '',
      statuslist: [],
      modellist: [
      ],
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
      seven: '',
      actionname: '',
      num: 0,
      spanarry: [],
      num2: 0,
      spanarry2: [],
      num3: 0,
      spanarry3: [],
      num4: 0,
      spanarry4: [],
      num5: 0,
      spanarry5: [],
      num6: 0,
      spanarry6: [],
      num7: 0,
      spanarry7: [],
      num8: 0,
      spanarry8: [],
      num9: 0,
      spanarry9: [],
      num10: 0,
      spanarry10: [],
      num11: 0,
      spanarry11: [],
      num12: 0,
      spanarry12: [],
      num13: 0,
      spanarry13: []
    }
  },
  created() {
    getaccount(this)
    getlist(this)
    // let one = new Date();
    // one.setTime(one.getTime() - 24*60*60*1000);
    // this.one = one.getFullYear()+'-'+(one.getMonth()+1 < 10 ? '0'+(one.getMonth()+1) : one.getMonth()+1)+'-'+(one.getDate()<10?'0'+(one.getDate()):one.getDate())
    // let two = new Date();
    // two.setTime(two.getTime() - 24*60*60*1000*2);
    // this.two = two.getFullYear()+'-'+(two.getMonth()+1 < 10 ? '0'+(two.getMonth()+1) : two.getMonth()+1)+'-'+(two.getDate()<10?'0'+(two.getDate()):two.getDate())
    // let three = new Date();
    // three.setTime(three.getTime() - 24*60*60*1000*3);
    // this.three = three.getFullYear()+'-'+(three.getMonth()+1 < 10 ? '0'+(three.getMonth()+1) : three.getMonth()+1)+'-'+(three.getDate()<10?'0'+(three.getDate()):three.getDate())
    // let four = new Date();
    // four.setTime(four.getTime() - 24*60*60*1000*4);
    // this.four = four.getFullYear()+'-'+(four.getMonth()+1 < 10 ? '0'+(four.getMonth()+1) : four.getMonth()+1)+'-'+(four.getDate()<10?'0'+(four.getDate()):four.getDate())
    // let five = new Date();
    // five.setTime(five.getTime() - 24*60*60*1000*5);
    // this.five = five.getFullYear()+'-'+(five.getMonth()+1 < 10 ? '0'+(five.getMonth()+1) : five.getMonth()+1)+'-'+(five.getDate()<10?'0'+(five.getDate()):five.getDate())
    // let six = new Date();
    // six.setTime(six.getTime() - 24*60*60*1000*6);
    // this.six = six.getFullYear()+'-'+(six.getMonth()+1 < 10 ? '0'+(six.getMonth()+1) : six.getMonth()+1)+'-'+(six.getDate()<10?'0'+(six.getDate()):six.getDate())
    // let seven = new Date();
    // seven.setTime(seven.getTime() - 24*60*60*1000*7);
    // this.seven = seven.getFullYear()+'-'+(seven.getMonth()+1 < 10 ? '0'+(seven.getMonth()+1) : seven.getMonth()+1)+'-'+(seven.getDate()<10?'0'+(seven.getDate()):seven.getDate())
    

    let one = new Date();
    one.setTime(one.getTime());
    this.one = one.getFullYear()+'-'+(one.getMonth()+1 < 10 ? '0'+(one.getMonth()+1) : one.getMonth()+1)+'-'+(one.getDate()<10?'0'+(one.getDate()):one.getDate())
    let two = new Date();
    two.setTime(two.getTime() - 24*60*60*1000*1);
    this.two = two.getFullYear()+'-'+(two.getMonth()+1 < 10 ? '0'+(two.getMonth()+1) : two.getMonth()+1)+'-'+(two.getDate()<10?'0'+(two.getDate()):two.getDate())
    let three = new Date();
    three.setTime(three.getTime() - 24*60*60*1000*2);
    this.three = three.getFullYear()+'-'+(three.getMonth()+1 < 10 ? '0'+(three.getMonth()+1) : three.getMonth()+1)+'-'+(three.getDate()<10?'0'+(three.getDate()):three.getDate())
    let four = new Date();
    four.setTime(four.getTime() - 24*60*60*1000*3);
    this.four = four.getFullYear()+'-'+(four.getMonth()+1 < 10 ? '0'+(four.getMonth()+1) : four.getMonth()+1)+'-'+(four.getDate()<10?'0'+(four.getDate()):four.getDate())
    let five = new Date();
    five.setTime(five.getTime() - 24*60*60*1000*4);
    this.five = five.getFullYear()+'-'+(five.getMonth()+1 < 10 ? '0'+(five.getMonth()+1) : five.getMonth()+1)+'-'+(five.getDate()<10?'0'+(five.getDate()):five.getDate())
    let six = new Date();
    six.setTime(six.getTime() - 24*60*60*1000*5);
    this.six = six.getFullYear()+'-'+(six.getMonth()+1 < 10 ? '0'+(six.getMonth()+1) : six.getMonth()+1)+'-'+(six.getDate()<10?'0'+(six.getDate()):six.getDate())
    let seven = new Date();
    seven.setTime(seven.getTime() - 24*60*60*1000*6);
    this.seven = seven.getFullYear()+'-'+(seven.getMonth()+1 < 10 ? '0'+(seven.getMonth()+1) : seven.getMonth()+1)+'-'+(seven.getDate()<10?'0'+(seven.getDate()):seven.getDate())
  },
  computed: {
    ...mapGetters([
      'gameclickstatgetlist',
      'gameclickstatdownloadlist'
    ])
  },
  watch: {
  },
  filters: {
  },
  methods: {
    query () {
      let that = this
      if (that.formInline.time && this.formInline.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist(this)
      }
    },
    query2 () {
      let that = this
      if (that.formInline2.time && this.formInline2.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist2(this)
      }
    },
    query3 () {
      let that = this
      if (that.formInline3.time && this.formInline3.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist3(this)
      }
    },
    query4 () {
      let that = this
      if (that.formInline4.time && this.formInline4.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist4(this)
      }
    },
    query5 () {
      let that = this
      if (that.formInline5.time && this.formInline5.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist5(this)
      }
    },
    query6 () {
      let that = this
      if (that.formInline6.time && this.formInline6.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist6(this)
      }
    },
    query7 () {
      let that = this
      if (that.formInline7.time && this.formInline7.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist7(this)
      }
    },
    query8 () {
      let that = this
      if (that.formInline8.time && this.formInline8.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist8(this)
      }
    },
    query9 () {
      let that = this
      if (that.formInline9.time && this.formInline9.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist9(this)
      }
    },
    query10 () {
      let that = this
      if (that.formInline10.time && this.formInline10.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist10(this)
      }
    },
    query11 () {
      let that = this
      if (that.formInline11.time && this.formInline11.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist11(this)
      }
    },
    query12 () {
      let that = this
      if (that.formInline12.time && this.formInline12.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist12(this)
      }
    },
    query13 () {
      let that = this
      if (that.formInline13.time && this.formInline13.time.length > 0) {
        this.$message.warning('列表仅展示最后7天，可导出90天的记录,请不要输入时间查询')
      }else {
        getlist13(this)
      }
    },
    tabclick () {
      if (this.actionname == 0) {
        getlist(this)
      }
      if (this.actionname == 1) {
        getlist2(this)
      }
      if (this.actionname == 2) {
        getlist3(this)
      }
      if (this.actionname == 3) {
        getlist4(this)
      }
      if (this.actionname == 4) {
        getlist5(this)
      }
      if (this.actionname == 5) {
        getlist6(this)
      }
      if (this.actionname == 6) {
        getlist7(this)
      }
      if (this.actionname == 7) {
        getlist8(this)
      }
      if (this.actionname == 8) {
        getlist9(this)
      }
      if (this.actionname == 9) {
        getlist10(this)
      }
      if (this.actionname == 10) {
        getlist11(this)
      }
      if (this.actionname == 11) {
        getlist12(this)
      }
      if (this.actionname == 12) {
        getlist13(this)
      }
    },
    arry () {
      this.spanarry = []
      this.tableData.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry.push(1)
          this.num = 0
        } else {
          if (item.module_name === this.tableData[index - 1].module_name) {
            this.spanarry[this.num] += 1;
            this.spanarry.push(0)
          } else {
            this.spanarry.push(1)
            this.num = index
          }
        }
      })
    },
    arry2 () {
      this.spanarry2 = []
      this.tableData2.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry2.push(1)
          this.num2 = 0
        } else {
          if (item.module_name === this.tableData2[index - 1].module_name) {
            this.spanarry2[this.num2] += 1;
            this.spanarry2.push(0)
          } else {
            this.spanarry2.push(1)
            this.num2 = index
          }
        }
      })
    },
    arry3 () {
      this.spanarry3 = []
      this.tableData3.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry3.push(1)
          this.num3 = 0
        } else {
          if (item.module_name === this.tableData3[index - 1].module_name) {
            this.spanarry3[this.num3] += 1;
            this.spanarry3.push(0)
          } else {
            this.spanarry3.push(1)
            this.num3 = index
          }
        }
      })
    },
    arry4 () {
      this.spanarry4 = []
      this.tableData4.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry4.push(1)
          this.num4 = 0
        } else {
          if (item.module_name === this.tableData4[index - 1].module_name) {
            this.spanarry4[this.num4] += 1;
            this.spanarry4.push(0)
          } else {
            this.spanarry4.push(1)
            this.num4 = index
          }
        }
      })
    },
    arry5 () {
      this.spanarry5= []
      this.tableData5.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry5.push(1)
          this.num5 = 0
        } else {
          if (item.module_name === this.tableData5[index - 1].module_name) {
            this.spanarry5[this.num5] += 1;
            this.spanarry5.push(0)
          } else {
            this.spanarry5.push(1)
            this.num5 = index
          }
        }
      })
    },
    arry6 () {
      this.spanarry6 = []
      this.tableData6.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry6.push(1)
          this.num6 = 0
        } else {
          if (item.module_name === this.tableData6[index - 1].module_name) {
            this.spanarry6[this.num6] += 1;
            this.spanarry6.push(0)
          } else {
            this.spanarry6.push(1)
            this.num6 = index
          }
        }
      })
    },
    arry7 () {
      this.spanarry7 = []
      this.tableData7.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry7.push(1)
          this.num7 = 0
        } else {
          if (item.module_name === this.tableData7[index - 1].module_name) {
            this.spanarry7[this.num7] += 1;
            this.spanarry7.push(0)
          } else {
            this.spanarry7.push(1)
            this.num7 = index
          }
        }
      })
    },
    arry8 () {
      this.spanarry8 = []
      this.tableData8.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry8.push(1)
          this.num8 = 0
        } else {
          if (item.module_name === this.tableData8[index - 1].module_name) {
            this.spanarry8[this.num8] += 1;
            this.spanarry8.push(0)
          } else {
            this.spanarry8.push(1)
            this.num8 = index
          }
        }
      })
    },
    arry9 () {
      this.spanarry9 = []
      this.tableData9.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry9.push(1)
          this.num9 = 0
        } else {
          if (item.module_name === this.tableData9[index - 1].module_name) {
            this.spanarry9[this.num9] += 1;
            this.spanarry9.push(0)
          } else {
            this.spanarry9.push(1)
            this.num9 = index
          }
        }
      })
    },
    arry10 () {
      this.spanarry10 = []
      this.tableData10.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry10.push(1)
          this.num10 = 0
        } else {
          if (item.module_name === this.tableData10[index - 1].module_name) {
            this.spanarry10[this.num10] += 1;
            this.spanarry10.push(0)
          } else {
            this.spanarry10.push(1)
            this.num10 = index
          }
        }
      })
    },
    arry11 () {
      this.spanarry11 = []
      this.tableData11.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry11.push(1)
          this.num11 = 0
        } else {
          if (item.module_name === this.tableData11[index - 1].module_name) {
            this.spanarry11[this.num11] += 1;
            this.spanarry11.push(0)
          } else {
            this.spanarry11.push(1)
            this.num11 = index
          }
        }
      })
    },
    arry12 () {
      this.spanarry12 = []
      this.tableData12.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry12.push(1)
          this.num12 = 0
        } else {
          if (item.module_name === this.tableData12[index - 1].module_name) {
            this.spanarry12[this.num12] += 1;
            this.spanarry12.push(0)
          } else {
            this.spanarry12.push(1)
            this.num12 = index
          }
        }
      })
    },
    arry13 () {
      this.spanarry13 = []
      this.tableData13.forEach((item,index) => {
        item.index = index
        if (index === 0) {
          this.spanarry13.push(1)
          this.num13 = 0
        } else {
          if (item.module_name === this.tableData13[index - 1].module_name) {
            this.spanarry13[this.num13] += 1;
            this.spanarry13.push(0)
          } else {
            this.spanarry13.push(1)
            this.num13 = index
          }
        }
      })
    },
    objectmethod ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod2 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry2[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod3 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry3[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod4 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry4[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod5 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry5[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod6 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry6[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod7 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry7[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod8 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry8[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod9 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry9[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod10 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry10[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod11 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry11[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod12 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry12[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectmethod13 ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        let _row = this.spanarry13[rowIndex]
        let _col = _row>0?1:0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    excel () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline.time && that.formInline.time.length > 0) {
        start = parseTime(that.formInline.time[0].getTime() /1000)
        end = parseTime((that.formInline.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 10,
          begindate: start,
          enddate: end,
          org_id: that.formInline.org,
          module: that.formInline.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel2 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline2.time && that.formInline2.time.length > 0) {
        start = parseTime(that.formInline2.time[0].getTime() /1000)
        end = parseTime((that.formInline2.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 11,
          begindate: start,
          enddate: end,
          org_id: that.formInline2.org,
          module: that.formInline2.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel3 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline3.time && that.formInline3.time.length > 0) {
        start = parseTime(that.formInline3.time[0].getTime() /1000)
        end = parseTime((that.formInline3.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 201,
          begindate: start,
          enddate: end,
          org_id: that.formInline3.org,
          module: that.formInline3.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel4 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline4.time && that.formInline4.time.length > 0) {
        start = parseTime(that.formInline4.time[0].getTime() /1000)
        end = parseTime((that.formInline4.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 202,
          begindate: start,
          enddate: end,
          org_id: that.formInline4.org,
          module: that.formInline4.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel5 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline5.time && that.formInline5.time.length > 0) {
        start = parseTime(that.formInline5.time[0].getTime() /1000)
        end = parseTime((that.formInline5.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 101,
          begindate: start,
          enddate: end,
          org_id: that.formInline5.org,
          module: that.formInline5.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel6 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline6.time && that.formInline6.time.length > 0) {
        start = parseTime(that.formInline6.time[0].getTime() /1000)
        end = parseTime((that.formInline6.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 102,
          begindate: start,
          enddate: end,
          org_id: that.formInline6.org,
          module: that.formInline6.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel7 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline7.time && that.formInline7.time.length > 0) {
        start = parseTime(that.formInline7.time[0].getTime() /1000)
       end = parseTime((that.formInline7.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 301,
          begindate: start,
          enddate: end,
          org_id: that.formInline7.org,
          module: that.formInline7.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel8 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline8.time && that.formInline8.time.length > 0) {
        start = parseTime(that.formInline8.time[0].getTime() /1000)
        end = parseTime((that.formInline8.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 601,
          begindate: start,
          enddate: end,
          org_id: that.formInline8.org,
          module: that.formInline8.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel9 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline9.time && that.formInline9.time.length > 0) {
        start = parseTime(that.formInline9.time[0].getTime() /1000)
        end = parseTime((that.formInline9.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 401,
          begindate: start,
          enddate: end,
          org_id: that.formInline9.org,
          module: that.formInline9.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel10 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline10.time && that.formInline10.time.length > 0) {
        start = parseTime(that.formInline10.time[0].getTime() /1000)
        end = parseTime((that.formInline10.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 701,
          begindate: start,
          enddate: end,
          org_id: that.formInline10.org,
          module: that.formInline10.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel11 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline11.time && that.formInline11.time.length > 0) {
        start = parseTime(that.formInline11.time[0].getTime() /1000)
        end = parseTime((that.formInline11.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 801,
          begindate: start,
          enddate: end,
          org_id: that.formInline11.org,
          module: that.formInline11.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel12 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline12.time && that.formInline12.time.length > 0) {
        start = parseTime(that.formInline12.time[0].getTime() /1000)
        end = parseTime((that.formInline12.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 802,
          begindate: start,
          enddate: end,
          org_id: that.formInline12.org,
          module: that.formInline12.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    excel13 () {
      let that = this
      var start = ''
      var end = ''  
      if (that.formInline13.time && that.formInline13.time.length > 0) {
        start = parseTime(that.formInline13.time[0].getTime() /1000)
        end = parseTime((that.formInline13.time[1].getTime() + (24*60*60*1000 - 1))/1000)
      }
      request({
        url: that.public.url + '/gameclickstat/downloadlist',
        method: 'post',
        data: {
          mid: 91,
          begindate: start,
          enddate: end,
          org_id: that.formInline13.org,
          module: that.formInline13.model,
        }
      }).then(res => {
        window.location.href = that.public.url + res.data
      }).catch(error => {
      })
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        return 'bagreen'
      }
      if (columnIndex === 1) {
        return 'bagreen'
      }
    },
  }
}


function getlist (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 10,
      org_id: that.formInline.org,
      module: that.formInline.model,
    }
  }).then(res => {
    that.tableData = res.data.data
    that.modellist = res.data.modellist
    that.arry()
  }).catch(error => {
  })
}


function getlist2 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 11,
      org_id: that.formInline2.org,
      module: that.formInline2.model,
    }
  }).then(res => {
    that.tableData2 = res.data.data
    that.modellist = res.data.modellist
    that.arry2()
  }).catch(error => {
  })
}
function getlist3 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 201,
      org_id: that.formInline3.org,
      module: that.formInline3.model,
    }
  }).then(res => {
    that.tableData3 = res.data.data
    that.modellist = res.data.modellist
    that.arry3()
  }).catch(error => {
  })
}
function getlist4 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 202,
      org_id: that.formInline4.org,
      module: that.formInline4.model,
    }
  }).then(res => {
    that.tableData4 = res.data.data
    that.modellist = res.data.modellist
    that.arry4()
  }).catch(error => {
  })
}
function getlist5 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 101,
      org_id: that.formInline5.org,
      module: that.formInline5.model,
    }
  }).then(res => {
    that.tableData5 = res.data.data
    that.modellist = res.data.modellist
    that.arry5()
  }).catch(error => {
  })
}
function getlist6 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 102,
      org_id: that.formInline6.org,
      module: that.formInline6.model,
    }
  }).then(res => {
    that.tableData6 = res.data.data
    that.modellist = res.data.modellist
    that.arry6()
  }).catch(error => {
  })
}
function getlist7 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 301,
      org_id: that.formInline7.org,
      module: that.formInline7.model,
    }
  }).then(res => {
    that.tableData7 = res.data.data
    that.modellist = res.data.modellist
    that.arry7()
  }).catch(error => {
  })
}
function getlist8 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 601,
      org_id: that.formInline8.org,
      module: that.formInline8.model,
    }
  }).then(res => {
    that.tableData8 = res.data.data
    that.modellist = res.data.modellist
    that.arry8()
  }).catch(error => {
  })
}
function getlist9 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 401,
      org_id: that.formInline9.org,
      module: that.formInline9.model,
    }
  }).then(res => {
    that.tableData9 = res.data.data
    that.modellist = res.data.modellist
    that.arry9()
  }).catch(error => {
  })
}
function getlist10 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 701,
      org_id: that.formInline10.org,
      module: that.formInline10.model,
    }
  }).then(res => {
    that.tableData10 = res.data.data
    that.modellist = res.data.modellist
    that.arry10()
  }).catch(error => {
  })
}
function getlist11 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 801,
      org_id: that.formInline11.org,
      module: that.formInline11.model,
    }
  }).then(res => {
    that.tableData11 = res.data.data
    that.modellist = res.data.modellist
    that.arry11()
  }).catch(error => {
  })
}

function getlist12 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 802,
      org_id: that.formInline12.org,
      module: that.formInline12.model,
    }
  }).then(res => {
    that.tableData12 = res.data.data
    that.modellist = res.data.modellist
    that.arry12()
  }).catch(error => {
  })
}

function getlist13 (that) {
  request({
    url: that.public.url + '/gameclickstat/getlist',
    method: 'post',
    data: {
      mid: 91,
      org_id: that.formInline13.org,
      module: that.formInline13.model,
    }
  }).then(res => {
    that.tableData13 = res.data.data
    that.modellist = res.data.modellist
    that.arry13()
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


function getaccount (that) {
  request({
    url: that.public.url + '/backend/org/getorglist',
    method: 'post',
    data: {
    }
  }).then(res => {
    let all = {id: "", name: "全部"}
    that.statuslist = res.data
    that.statuslist.unshift(all)
  }).catch(error => {
  })
}


</script>

<style>
.point .bagreen {
  background: green;
  color:black;
}
</style>
