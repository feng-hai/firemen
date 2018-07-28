<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="巡检计划" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="添加人" :style="{width: '160px'}" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="联网单位" :style="{width: '130px'}">
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width: '300px'}">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}" @click="addDialogVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table">
        <el-table-column prop="name" label="序号" min-width="100">
        </el-table-column>
        <el-table-column porp="line_id" label="巡检路线" min-width="120">
        </el-table-column>
        <el-table-column prop="area_num" label="巡检区域数量" min-width="70">
        </el-table-column>
        <el-table-column prop="open_id" label="添加人" min-width="100">
        </el-table-column>
        <el-table-column prop="datime_sys" label="添加时间" min-width="150">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-edit"
            :style="{padding: '0px'}"
            @click="handleEdit(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-delete"
            :style="{padding: '0px'}"
            @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total">
        </el-pagination>
      </div>

      <!-- 新增界面 -->
      <el-dialog title="新增计划" :visible.sync="addDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form label-position="top">
              <el-form-item label="巡检计划" prop="name" :label-width="120">
                <el-input :style="{width: '160px'}">
                </el-input>
              </el-form-item>
              <el-form-item label="巡检开始日期" prop="name" :label-width="120">
                <el-date-picker type="date" placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="巡检时间段 " prop="name " :label-width="120 ">
                <el-time-picker is-range range-separator="至 " start-placeholder="开始时间 " end-placeholder="结束时间 " placeholder="选择时间范围 ">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="巡检周期 " prop="name " :label-width="120 ">
                <el-input :style="{width: '160px'}">
                </el-input>
              </el-form-item>
              <el-form-item label="具体位置 ">
                <el-table class="table " :data="tableData " border ref="table ">
                  <el-table-column type="selection ">
                  </el-table-column>
                  <el-table-column prop="name " label="保养系统 " min-width="100 ">
                  </el-table-column>
                  <el-table-column label="设备数量 " min-width="120 ">
                    <template slot-scope="scope ">
                      <el-input placeholder="0 "></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </el-col>
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
      tableData: [],
      searchForm: {
        name: '',
        human: '',
        unit: '',
        datetime: ''
      },
      searchFormForHttp: {
        name: '',
        human: '',
        unit: '',
        datetime: ''
      },
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
    getPatrol() {
      this.tableData = [];
      this.$http.get(Urlmaps.patrol, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          name: this.searchFormForHttp.name,
          unit_unid: this.searchFormForHttp.unit,
          open_id: this.searchFormForHttp.human
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.tableData = response.data.collection;
          this.page.total = response.data.count;
        } else {
          this.page.total = 0;
        }

      }).catch((error) => {
        this.page.total = 0;
      });
    }
  },
  mounted() {
    this.getPatrol();
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
