<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" ref="searchForm" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="巡检计划" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.human" placeholder="添加人" :style="{width: '160px'}" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.unit" placeholder="联网单位" :style="{width: '130px'}" clearable>
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="searchForm.datetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width: '300px'}">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table">
        <el-table-column prop="line_id" label="序号" min-width="100">
        </el-table-column>
        <el-table-column prop="name" label="巡检路线" min-width="120">
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
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total" @size-change="handleSizeChange" @current-change="handlePageChange" @prev-click="handlePageChange"
          @next-click="handlePageChange">
        </el-pagination>
      </div>

      <!-- 新增界面 -->
      <el-dialog title="新增计划" :visible.sync="submitDialogVisible" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form :model="submitForm" ref="submitForm" :rules="submitFormRule" label-position="top">
              <el-form-item prop="unit" label="联网单位">
                <el-select v-model="submitForm.unit" clearable :style="{width: '220px'}">
                  <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="巡检计划" prop="name">
                <el-input :style="{width: '220px'}" v-model="submitForm.name">
                </el-input>
              </el-form-item>
              <el-form-item label="巡检开始日期" prop="date">
                <el-date-picker type="date" placeholder="开始日期" v-model="submitForm.date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="巡检时间段" prop="time">
                <el-time-picker is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" v-model="submitForm.time">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="巡检周期" prop="period">
                <el-input :style="{width: '160px'}" v-model.number="submitForm.period" auto-complete="off">
                </el-input>
                <el-select style="width: 100px;" v-model="submitForm.datetimePeriod">
                  <el-option label="周" :value="1"></el-option>
                  <el-option label="日" :value="2"></el-option>
                  <el-option label="时" :value="3"></el-option>
                  <el-option label="分" :value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务提醒周期" prop="remind">
                <el-input :style="{width: '160px'}" v-model.number="submitForm.remind" auto-complete="off">
                </el-input>
                <el-select style="width: 100px;" v-model="submitForm.datetimeRemind">
                  <el-option label="日" :value="2"></el-option>
                  <el-option label="时" :value="3"></el-option>
                  <el-option label="分" :value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="巡检过期时间" prop="expire">
                <el-input :style="{width: '160px'}" v-model.number="submitForm.expire">
                </el-input>
                <el-select style="width: 100px;" v-model="submitForm.datetimeExpire">
                  <el-option label="周" :value="1"></el-option>
                  <el-option label="日" :value="2"></el-option>
                  <el-option label="时" :value="3"></el-option>
                  <el-option label="分" :value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="巡检区域" prop="areas">
                <el-select style="width: 160px;" value-key="unid" v-model="submitForm.area">
                  <el-option v-for="item in patrolArea" :key="item.unid" :label="item.name" :value="item">
                  </el-option>
                </el-select>
                <el-button icon="el-icon-plus" @click="addPatrolArea"></el-button>
              </el-form-item>
              <el-form-item label="巡检顺序(拖拽排序)">
                <SortableList helperClass="helper" lockAxis="y" v-model="submitForm.areas">
                  <SortableItem v-for="(item, index) in submitForm.areas" :index="index" :key="item.unid" :item="item.name" />
                </SortableList>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="submitDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </div>
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
    var checkInt = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        callback();
      }
    };
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
      unitData: {},
      patrolArea: {},
      submitDialogVisible: false,
      submitForm: {
        type: '',
        unid: '',
        unit: '',
        name: '',
        date: '',
        time: '',
        period: '',
        datetimePeriod: 1,
        remind: '',
        datetimeRemind: 2,
        expire: '',
        datetimeExpire: 1,
        area: '',
        areas: []
      },
      submitFormRule: {
        unit: [{
          required: true,
          message: '请选择联网单位',
          trigger: 'change'
        }],
        name: [{
          required: true,
          message: '请输入巡检计划',
          trigger: 'change'
        }],
        date: [{
          type: 'date',
          required: true,
          message: '请选择巡检开始日期',
          trigger: 'change'
        }],
        period: [{
          required: true,
          message: '请输入巡检周期',
          trigger: 'change'
        }, {
          validator: checkInt,
          trigger: 'blur'
        }],
        remind: [{
          required: true,
          message: '请输入任务提醒周期',
          trigger: 'change'
        }, {
          validator: checkInt,
          trigger: 'blur'
        }],
        expire: [{
          required: true,
          message: '请输入巡检过期时间',
          trigger: 'change'
        }, {
          validator: checkInt,
          trigger: 'blur'
        }],
        areas: [{
          type: 'array',
          required: true,
          message: '请至少选择一个巡检区域',
          trigger: 'change'
        }]
      },
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      }
    }
  },
  components: {
    SortableItem,
    SortableList,
  },
  methods: {
    handleSearch() {
      this.page.current = 0;
      this.searchFormForHttp = this.searchForm;
      this.getPatrol();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getPatrol();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getPatrol();
    },
    handleDetail() {
      this.detailDialogVisible = true;
    },
    addPatrolArea() {
      this.submitForm.areas.push(this.submitForm.area);
    },
    handleAdd() {
      this.submitForm = {
        type: 'add',
        unid: '',
        unit: '',
        name: '',
        date: '',
        time: '',
        period: '',
        datetimePeriod: 1,
        remind: '',
        datetimeRemind: 2,
        expire: '',
        datetimeExpire: 1,
        area: '',
        areas: []
      }
      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handleEdit(index, row) {

      this.$http.get(Urlmaps.patrol_area, {
        params: {
          patrol_unid: row.unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.submitForm = {
            type: 'edit',
            unid: row.unid,
            unit: row.unit_unid,
            name: row.name,
            date: new Date(this.$moment(row.datime_sys, 'YYYY-MM-DD HH:mm:ss')),
            time: [new Date(this.$moment(row.datime_begin, 'YYYY-MM-DD HH:mm:ss')), new Date(this.$moment(row.datime_end, 'YYYY-MM-DD HH:mm:ss'))],
            period: parseInt(row.period),
            datetimePeriod: parseInt(row.datime_period),
            remind: parseInt(row.remind),
            datetimeRemind: parseInt(row.datime_remind),
            expire: parseInt(row.expire),
            datetimeExpire: parseInt(row.datime_expire),
            area: '',
            areas: response.data.collection
          }
          if (this.$refs['submitForm']) {
            this.$refs['submitForm'].resetFields();
          }
          this.submitDialogVisible = true;
        } else {
          this.$message('查询巡检区域出错');
        }

      }).catch((error) => {
        this.$message('查询巡检区域出错');
      });
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deletePatrol(row.unid);
      }).catch(() => {
        this.getPatrol();
      });
    },
    handleSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          if (this.submitForm.type == "add") {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            let date = this.$moment(this.submitForm.date).format('YYYY-MM-DD');
            params.append('datime_sys', date);
            params.append('datime_begin', date + ' ' + this.$moment(this.submitForm.time[0]).format('HH:mm:ss'));
            params.append('datime_end', date + ' ' + this.$moment(this.submitForm.time[1]).format('HH:mm:ss'));
            params.append('unit_unid', this.submitForm.unit);
            params.append('period', this.submitForm.period);
            params.append('datime_period', this.submitForm.datetimePeriod);
            params.append('remind', this.submitForm.remind);
            params.append('datime_remind', this.submitForm.datetimeRemind);
            params.append('expire', this.submitForm.expire);
            params.append('datime_expire', this.submitForm.datetimeExpire);
            let areaArray = [];
            for (let item of this.submitForm.areas) {
              areaArray.push(item.unid);
            }
            params.append('area', areaArray);

            this.$http.post(Urlmaps.patrol, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 201) {
                this.submitDialogVisible = false;
                this.$message('新增成功');
                this.getPatrol();
              } else {
                this.submitDialogVisible = false;
                this.$message('新增失败');
                this.getPatrol();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('新增失败');
              this.getPatrol();
            });
          } else {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('datime_sys', this.$moment(this.submitForm.date).format('YYYY-MM-DD'));
            params.append('datime_begin', this.$moment(this.submitForm.time[0]).format('HH:mm:ss'));
            params.append('datime_end', this.$moment(this.submitForm.time[1]).format('HH:mm:ss'));
            params.append('unit_unid', this.submitForm.unit);
            params.append('period', this.submitForm.period);
            params.append('datime_period', this.submitForm.datetimePeriod);
            params.append('remind', this.submitForm.remind);
            params.append('datime_remind', this.submitForm.datetimeRemind);
            params.append('expire', this.submitForm.expire);
            params.append('datime_expire', this.submitForm.datetimeExpire);
            let areaArray = [];
            for (let item of this.submitForm.areas) {
              areaArray.push(item.unid);
            }
            params.append('area', areaArray);

            this.$http.put(Urlmaps.patrol + '/' + this.submitForm.unid, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 200) {
                this.submitDialogVisible = false;
                this.$message('修改成功');
                this.getPatrol();
              } else {
                this.submitDialogVisible = false;
                this.$message('修改失败');
                this.getPatrol();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('修改失败');
              this.getPatrol();
            });
          }
        } else {
          return false;
        }
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
            this.unitData[unitInfo.unid] = unitInfo;
          }

        } else {}

      }).catch((error) => {});
    },
    getPatrol() {
      this.tableData = [];
      this.$http.get(Urlmaps.patrol, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          name: this.searchFormForHttp.name,
          unit_unid: this.searchFormForHttp.unit,
          open_id: this.searchFormForHttp.humana,
          name: this.searchFormForHttp.name,
          datime_begin: this.searchFormForHttp.datetime == null ? '' : this.searchFormForHttp.datetime[0],
          datime_end: this.searchFormForHttp.datetime == null ? '' : this.searchFormForHttp.datetime[1]
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
    deletePatrol(unid) {
      this.$http.delete(Urlmaps.patrol + '/' + unid, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getPatrol();
        } else {
          this.$message('删除失败');
          this.getPatrol();
        }

      }).catch((error) => {
        this.$message('删除失败');
        this.getPatrol();
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
    this.getUnitInfo();
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
  padding-left: 8px;
}

.helper {
  opacity: 1;
  visibility: visible;
  z-index: 9999;
  list-style: none;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
}
</style>
