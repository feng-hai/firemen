<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <el-row>
      <el-table class="table no_header_table" :data="tableDataLeft" ref="table" highlight-current-row @row-click="handleUnitSelect">
        <el-table-column prop="name" label="">
        </el-table-column>
      </el-table>
    </el-row>
  </el-col>
  <el-col :span="19" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">{{rightTitle}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchText" placeholder="请输入内容" :style="{width: '180px'}" clearable @keydown.enter.native="handleSearchEnter" @clear="handleSearchClear">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-table class="table" :data="tableDataRight" border ref="table" v-loading="tableLoading">
        <el-table-column prop="name" label="视频名称" min-width="180">
        </el-table-column>
        <el-table-column label="所属区域" min-width="180">
          <template slot-scope="scope">
            {{areaData[scope.row.bs_unid] ? areaData[scope.row.bs_unid].name : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="protocol" label="协议" min-width="100">
        </el-table-column>
        <el-table-column prop="IP4" label="IPv4" min-width="180">
        </el-table-column>
        <el-table-column prop="port" label="端口" min-width="80">
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-edit"
            @click="handleEdit(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-delete"
            @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total" @size-change="handleSizeChange" @current-change="handlePageChange" @prev-click="handlePageChange"
          @next-click="handlePageChange">
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
      searchText: '',
      filters: {
        name: ''
      },
      typeData: {},
      rightTitle: '',
      areaData: {},
      selectedRow: {},
      tableDataLeft: [],
      tableDataRight: [],
      tableLoading: false,
      assetDialogFormVisible: false,
      assetDialogLoading: false,
      assetForm: {
        unid: '',
        name: '',
        vendor: '',
        system: '',
        type: '',
        model: '',
        curator: '',
        startDatetime: '',
        endDatetime: ''
      },
      formLabelWidth: '120px',
      datePicker: [],
      page: {
        total: 0,
        current: 0,
        size: 5
      }
    }
  },
  methods: {
    getUnitInfo() {
      this.tableDataLeft = [];
      this.$http.get(Urlmaps.unit, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var unitInfo of response.data.collection) {
            this.tableDataLeft.push(unitInfo);
          }
          this.selectedRow = this.tableDataLeft[0];
          this.rightTitle = this.tableDataLeft[0].name;
        } else {}

      }).catch((error) => {});
    },
    getCamera() {
      this.tableDataRight = [];
      this.$http.get(Urlmaps.camera, {
        params: {
          unit_unid: this.selectedRow.unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.tableDataRight = response.data.collection;
          this.page.total = response.data.collection.length;
        } else {}

      }).catch((error) => {});
    },
    getBuildStruct() {

      this.$http.get(Urlmaps.build, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var build of response.data.collection) {
            this.areaData[build.unid] = build;
          }
        } else {}

      }).catch((error) => {});
    },
  },
  async mounted() {
    await this.getBuildStruct();
    await this.getUnitInfo();
    await this.getCamera();
  }
}
</script>

<style scoped>
.left .search_wrapper {
  padding: 7px 12px 7px 2px;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  border-radius: 4px 4px 0 0;
}

.left .table {
  border: 1px solid #dfdfdf;
}

.left .new_wrapper {
  padding: 7px 2px;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  border-radius: 0 0 4px 4px;
}

.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.right .table {
  margin-top: 10px;
  border: 1px solid #ebeef5;
}
</style>
