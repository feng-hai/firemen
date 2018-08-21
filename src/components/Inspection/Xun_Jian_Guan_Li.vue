<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-select placeholder="联网单位" :style="{width: '120px'}" clearable>
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="巡检人" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="点位名称" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="任务状态" :style="{width: '120px'}">
              <el-option v-for="item in managerStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width: '300px'}">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table">
        <el-table-column prop="name" label="序号" min-width="80">
        </el-table-column>
        <el-table-column label="发布时间" min-width="120">
        </el-table-column>
        <el-table-column label="点位名称" min-width="70">
        </el-table-column>
        <el-table-column label="巡检区域" min-width="100">
        </el-table-column>
        <el-table-column label="任务类型" min-width="150">
        </el-table-column>
        <el-table-column prop="icon_uri" label="任务状态" min-width="120">
        </el-table-column>
        <el-table-column prop="menu_type" label="楼层" min-width="100">
        </el-table-column>
        <el-table-column label="地址" min-width="100">
        </el-table-column>
        <el-table-column label="巡检人" min-width="100">
        </el-table-column>
        <el-table-column label="巡检完成时间" min-width="100">
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total">
        </el-pagination>
      </div>
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
      tableData: [],
      unitData: {},
      searchForm: {
        name: '',
        unit: '',
        human: '',
        point: '',
        status: '',
        datetime: ''
      },
      searchFormForHttp: {
        name: '',
        unit: '',
        human: '',
        point: '',
        status: '',
        datetime: ''
      },
      managerStatus: [{
        value: 0,
        label: '已发布'
      }, {
        value: 1,
        label: '巡检中'
      }, {
        value: 2,
        label: '巡检完成'
      }, {
        value: 3,
        label: '已过期'
      }],
      addDialogVisible: false,
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      }
    }
  },
  methods: {
    handleDetail() {
      this.detailDialogVisible = true;
    },
    getPatrolManager() {
      this.tableData = [];
      this.$http.get(Urlmaps.patrol_manager, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          unit_unid: this.searchFormForHttp.unit,
          open_id: this.searchFormForHttp.human,
          point_name: this.searchFormForHttp.point,
          status: this.searchFormForHttp.status
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          // this.tableData = response.data.patrols;
          this.page.total = response.data.count;
        } else {
          this.page.total = 0;
        }

      }).catch((error) => {
        this.page.total = 0;
      });
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
            this.$set(this.unitData, unitInfo.unid, unitInfo);
            // this.unitData[unitInfo.unid] = unitInfo;
          }

        } else {}

      }).catch((error) => {});
    }
  },
  mounted() {
    this.getUnitInfo();
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
