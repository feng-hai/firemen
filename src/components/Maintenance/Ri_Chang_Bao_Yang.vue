<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" ref="searchForm" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="输入计划名称" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="选择状态" :style="{width: '120px'}" clearable>
              <el-option v-for="item in maintainStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.unit" placeholder="选择联网单位" :style="{width: '130px'}" clearable>
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.human" placeholder="输入创建人" :style="{width: '120px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="searchForm.datetime" type="daterange" :style="{width: '300px'}" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}" @click="addDialogVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table" v-loading="tableLoading">
        <el-table-column type="expand">
        </el-table-column>
        <el-table-column prop="name" label="计划名称" min-width="100">
        </el-table-column>
        <el-table-column prop="maintain_num" label="保养数量" min-width="120">
        </el-table-column>
        <el-table-column prop="done_num" label="完成数量" min-width="70">
        </el-table-column>
        <el-table-column prop="done_percent" label="完成比例" min-width="150">
        </el-table-column>
        <el-table-column prop="open_id" label="创建人" min-width="120">
        </el-table-column>
        <el-table-column prop="datime_sys" label="创建时间" min-width="100">
        </el-table-column>
        <el-table-column prop="datime_begin" label="开始时间" min-width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="100">
          <template slot-scope="scope">
            <template v-for="item in maintainStatus">
              <template v-if="item.value == scope.row.status">{{item.label}}</template>
          </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-look"
            :style="{padding: '0px'}"
            @click="handleDetail(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total" @size-change="handleSizeChange" @current-change="handlePageChange" @prev-click="handlePageChange"
          @next-click="handlePageChange">
        </el-pagination>
      </div>

      <!-- 新增界面 -->
      <el-dialog title="新增计划" :visible.sync="addDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form ref="addForm" :model="addForm" label-position="top" label-width="120px">
              <el-form-item label="计划名称">
                <el-input class="width_200" v-model="addForm.name" placeholder="计划名称">
                </el-input>
              </el-form-item>
              <el-form-item label="联网单位">
                <el-select class="width_200" v-model="addForm.unit" placeholder="选择联网单位" clearable>
                  <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker class="width_200" v-model="addForm.start_datetime" type="date" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker class="width_200" v-model="addForm.end_datetime" type="date" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="具体位置">
                <el-table class="table" :data="addForm.location" border ref="table">
                  <el-table-column type="selection">
                  </el-table-column>
                  <el-table-column prop="name" label="保养系统" min-width="100">
                  </el-table-column>
                  <el-table-column prop="num" label="设备数量" min-width="120">
                    <template slot-scope="scope">
                      <el-input placeholder="0"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="addDialogLoading" @click="addMaintain">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 详细界面 -->
      <el-dialog title="日常保养详细" :visible.sync="detailDialogVisible" :fullscreen="true">
        <el-row>
          <el-col :span="24" class="toolbar">
            <el-form :model="searchDailyForm" ref="searchDailyForm" :inline="true">
              <el-form-item>
                <el-input v-model="searchDailyForm.name" placeholder="设备名" :style="{width: '160px'}" clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchDailyForm.system" placeholder="系统" :style="{width: '120px'}" clearable>
                  <el-option v-for="item in maintainSystem" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchDailyForm.status" placeholder="状态" :style="{width: '120px'}" clearable>
                  <el-option v-for="item in maintainStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchDailyForm.reject" placeholder="有无驳回" clearable :style="{width: '120px'}" clearable>
                  <el-option v-for="item in maintainDailyReject" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="searchDailyForm.human" placeholder="保养人" :style="{width: '120px'}" clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="searchDailyForm.verify" placeholder="核实人" :style="{width: '120px'}" clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker v-model="searchDailyForm.datetime" type="daterange" :style="{width: '300px'}" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" clearable>
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button :style="{borderRadius: '4px'}" @click="handleDailySearch">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row :style="{marginTop: '10px'}">
          <el-table class="table" :data="dailyTableData" border ref="table">
            <el-table-column type="expand">
            </el-table-column>
            <el-table-column label="保养现场照片" min-width="100">
              <template slot-scope="scope">
                <img :src="scope.row.url" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="设备名称" min-width="120">
            </el-table-column>
            <el-table-column prop="addr" label="设备地址" min-width="70">
            </el-table-column>
            <el-table-column label="系统名称" min-width="100">
              <template slot-scope="scope">
                <template v-for="item in maintainSystem">
                  <template v-if="item.id == scope.row.system_id">{{item.name}}</template>
              </template>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="保养描述" min-width="150">
            </el-table-column>
            <el-table-column prop="open_id" label="保养人" min-width="120">
            </el-table-column>
            <el-table-column prop="datime_sys" label="录入时间" min-width="100">
            </el-table-column>
            <el-table-column prop="verify_open_id" label="核实人" min-width="100">
            </el-table-column>
            <el-table-column prop="datime_verify" label="核实时间" min-width="100">
            </el-table-column>
            <el-table-column label="有无驳回" min-width="100">
              <template slot-scope="scope">
                <template v-for="item in maintainDailyReject">
                  <template v-if="item.value == scope.row.reject">{{item.label}}</template>
              </template>
              </template>
            </el-table-column>
            <el-table-column label="状态" min-width="100">
              <template slot-scope="scope">
                <template v-for="item in maintainDailyStatus">
                  <template v-if="item.value == scope.row.status">{{item.label}}</template>
              </template>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" :style="{marginTop: '10px'}">
            <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="dailyPage.total" @size-change="handleDailySizeChange" @current-change="handleDailyPageChange" @prev-click="handleDailyPageChange"
              @next-click="handleDailyPageChange">
            </el-pagination>
          </div>
        </el-row>
      </el-dialog>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
import {
  Urlmaps
} from '@/config/config.js'

export default {
  data() {
    return {
      unitData: {},
      tableData: [],
      dailyTableData: [],
      tableLoading: false,
      addDialogVisible: false,
      detailDialogVisible: false,
      addDialogLoading: false,
      maintainStatus: [{
        value: 1,
        label: '未开始'
      }, {
        value: 2,
        label: '保养中'
      }, {
        value: 3,
        label: '已完成'
      }, {
        value: 4,
        label: '已过期'
      }],
      maintainDailyReject: [{
        value: 0,
        label: '有'
      }, {
        value: 1,
        label: '无'
      }],
      maintainDailyStatus: [{
        value: 1,
        label: '待处理'
      }, {
        value: 2,
        label: '审核中'
      }, {
        value: 3,
        label: '已完成'
      }, {
        value: 4,
        label: '驳回'
      }],
      maintainSystem: [{
        id: 1,
        name: '自动报警'
      }, {
        id: 2,
        name: '电气火灾漏电'
      }, {
        id: 3,
        name: '湿式自动喷水'
      }, {
        id: 4,
        name: '防排烟'
      }, {
        id: 5,
        name: '消火栓'
      }, {
        id: 6,
        name: '水炮'
      }, {
        id: 7,
        name: '应急照明'
      }, {
        id: 8,
        name: '疏散指示'
      }, {
        id: 9,
        name: '自动喷水_预'
      }, {
        id: 10,
        name: '气体灭火'
      }, {
        id: 11,
        name: '联动控制'
      }],
      searchForm: {
        name: '',
        status: '',
        unit: '',
        human: '',
        datetime: ''
      },
      searchFormForHttp: {
        name: '',
        status: '',
        unit: '',
        human: '',
        datetime: ''
      },
      addForm: {
        name: '',
        unit: '',
        start_datetime: '',
        end_datetime: '',
        location: [{
          id: 1,
          name: '自动报警',
          num: 0
        }, {
          id: 2,
          name: '电气火灾漏电',
          num: 0
        }, {
          id: 3,
          name: '湿式自动喷水',
          num: 0
        }, {
          id: 4,
          name: '防排烟',
          num: 0
        }, {
          id: 5,
          name: '消火栓',
          num: 0
        }, {
          id: 6,
          name: '水炮',
          num: 0
        }, {
          id: 7,
          name: '应急照明',
          num: 0
        }, {
          id: 8,
          name: '疏散指示',
          num: 0
        }, {
          id: 9,
          name: '自动喷水_预',
          num: 0
        }, {
          id: 10,
          name: '气体灭火',
          num: 0
        }, {
          id: 11,
          name: '联动控制',
          num: 0
        }]
      },
      maintainDailyUnid: '',
      searchDailyForm: {
        name: '',
        system: '',
        status: '',
        reject: '',
        human: '',
        verify: '',
        datetime: ''
      },
      searchDailyFormForHttp: {
        name: '',
        system: '',
        status: '',
        reject: '',
        human: '',
        verify: '',
        datetime: ''
      },
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      },
      dailyPage: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.page.size = size;
      this.getMaintain();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getMaintain();
    },
    handleDailySizeChange(size) {
      this.dailyPage.size = size;
      this.getMaintainDaily();
    },
    handleDailyPageChange(page) {
      this.dailyPage.current = page - 1;
      this.getMaintainDaily();
    },
    handleDetail(index, row) {
      this.maintainDailyUnid = row.unid;
      this.getMaintainDaily();
      this.detailDialogVisible = true;
    },
    handleSearch() {
      this.page.current = 0;
      this.searchFormForHttp = this.searchForm;
      this.getMaintain();
    },
    handleDailySearch() {
      this.dailyPage.current = 0;
      this.searchDailyFormForHttp = this.searchDailyForm;
      this.getMaintainDaily();
    },
    getMaintain() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.maintain, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          type: 1,
          name: this.searchFormForHttp.name,
          status: this.searchFormForHttp.status,
          unit_unid: this.searchFormForHttp.unit,
          open_id: this.searchFormForHttp.human,
          datime_begin: this.searchFormForHttp.datetime == null ? '' : this.searchFormForHttp.datetime[0],
          datime_end: this.searchFormForHttp.datetime == null ? '' : this.searchFormForHttp.datetime[1]
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.tableLoading = false;
        if (response.status == 200) {
          this.tableData = response.data.collection;
          this.page.total = response.data.count;
        } else {
          this.page.total = 0;
        }

      }).catch((error) => {
        this.tableLoading = false;
        this.page.total = 0;
      });
    },
    getMaintainDaily() {
      this.dailyTableData = [];
      this.$http.get(Urlmaps.maintain_daily, {
        params: {
          page_id: this.dailyPage.current,
          page_size: this.dailyPage.size,
          maintain_unid: this.maintainDailyUnid,
          name: this.searchDailyFormForHttp.name,
          system_id: this.searchDailyFormForHttp.system,
          status: this.searchDailyFormForHttp.status,
          reject: this.searchDailyFormForHttp.reject,
          open_id: this.searchDailyFormForHttp.human,
          verify_open_id: this.searchDailyFormForHttp.verify,
          datime_begin: this.searchDailyFormForHttp.datetime == null ? '' : this.searchDailyFormForHttp.datetime[0],
          datime_end: this.searchDailyFormForHttp.datetime == null ? '' : this.searchDailyFormForHttp.datetime[1]
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.dailyTableData = response.data.collection;
          this.dailyPage.total = response.data.count;
        } else {
          this.dailyPage.total = 0;
        }

      }).catch((error) => {
        this.dailyPage.total = 0;
      });
    },
    addMaintain() {
      this.addLoading = true;
      var params = new URLSearchParams();
      params.append('name', this.addForm.name);
      params.append('unit_unid', this.addForm.unit);
      params.append('location', this.addForm.location);
      params.append('datime_begin', this.addForm.start_datetime);
      params.append('datime_end', this.addForm.end_datetime);
      params.append('type', "1");

      this.$http.post(Urlmaps.maintain, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.addLoading = false;
        this.addDialogVisible = false;
        this.$message('新增成功');
        this.getMaintain();
      }).catch((error) => {});
    },
    getUnitInfo: function() {
      this.$http.get(Urlmaps.unit, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var unitInfo of response.data.collection) {
            this.unitData[unitInfo.unid] = unitInfo;
          }
        } else {}

      }).catch((error) => {});
    }
  },
  mounted() {
    this.getUnitInfo();
    this.getMaintain();
  }
}
</script>

<style scoped>
.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}
</style>
