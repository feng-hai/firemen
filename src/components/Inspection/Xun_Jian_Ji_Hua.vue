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
      <el-dialog title="新增计划" :visible.sync="addDialogVisible" label-widt="120px">
        <el-row>
          <el-col :span="24">
            <el-form label-position="top">
              <el-form-item label="巡检计划" prop="name">
                <el-input :style="{width: '160px'}">
                </el-input>
              </el-form-item>
              <el-form-item label="巡检开始日期" prop="name">
                <el-date-picker type="date" placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="巡检时间段" prop="name">
                <el-time-picker is-range range-separator="至 " start-placeholder="开始时间 " end-placeholder="结束时间 " placeholder="选择时间范围 ">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="巡检周期" prop="name">
                <el-input :style="{width: '160px'}">
                </el-input>
                <el-select style="width: 100px;">
                  <el-option label="周"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务提醒周期" prop="name">
                <el-input :style="{width: '160px'}">
                </el-input>
                <el-select style="width: 100px;">
                  <el-option></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="巡检过期时间" prop="name">
                <el-input :style="{width: '160px'}">
                </el-input>
                <el-select style="width: 100px;">
                  <el-option></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="巡检区域">
                <el-select style="width: 160px;">
                  <el-option v-for="item in patrolArea" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
                <el-button icon="el-icon-plus"></el-button>
              </el-form-item>
              <el-form-item label="巡检顺序(拖拽排序)">
                <SortableList lockAxis="y" v-model="items">
                  <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" />
                </SortableList>
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

import {
  ContainerMixin,
  ElementMixin
} from 'vue-slicksort';

const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}}</li>
  `
};

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
      patrolArea: {},
      addDialogVisible: false,
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      },
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8'
      ]
    }
  },
  components: {
    SortableItem,
    SortableList,
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
    },
    getPatrolArea() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.patrol_area, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.tableLoading = false;
        if (response.status == 200) {
          for (var area of response.data.collection) {
            this.patrolArea[area.unid] = area;
          }
        } else {}

      }).catch((error) => {
        this.tableLoading = false;
        this.page.total = 0;
      });
    }
  },
  mounted() {
    this.getPatrolArea();
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

.list-item {
  width: 160px;
  border: 1px solid #dcdfe6;
  margin-bottom: 5px;
  height: 32px;
  border-radius: 4px;
}
</style>
