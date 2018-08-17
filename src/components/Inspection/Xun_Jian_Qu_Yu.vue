<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :model="searchForm" :inline="true">
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="巡检分区" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.unit" placeholder="联网单位" :style="{width: '160px'}" clearable>
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
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
      <el-table class="table" :data="tableData" border ref="table" v-loading="tableLoading">
        <el-table-column prop="name" label="巡检区域" min-width="100">
        </el-table-column>
        <el-table-column prop="note" label="备注" min-width="120">
        </el-table-column>
        <el-table-column prop="datime_sys" label="添加时间" min-width="70">
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

      <!-- 新增/编辑界面 -->
      <el-dialog :title="(submitForm.type == 'add' ? '新增' : '编辑') + '巡检分区'" :visible.sync="submitDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form :rules="submitFormRule" :model="submitForm" ref="submitForm" label-position="top">
              <el-form-item prop="name" label="巡检分区" :label-width="120">
                <el-input v-model="submitForm.name" :style="{width: '200px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="unit" label="联网单位" :label-width="120">
                <el-select v-model="submitForm.unit" clearable :style="{width: '200px'}">
                  <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="note" label="备注" :label-width="120">
                <el-input v-model="submitForm.note" :style="{width: '200px'}">
                </el-input>
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

export default {
  data() {
    return {
      tableData: [],
      tableLoading: false,
      unitData: {},
      searchForm: {
        name: '',
        unit: ''
      },
      searchFormForHttp: {
        name: '',
        unit: ''
      },
      submitDialogVisible: false,
      submitForm: {
        type: '',
        unid: '',
        name: '',
        unit: '',
        note: ''
      },
      submitFormRule: {
        name: [{
          required: true,
          message: '请输入巡检分区',
          trigger: 'change'
        }],
        unit: [{
          required: true,
          message: '请选择联网单位',
          trigger: 'change'
        }],
        note: [{
          required: true,
          message: '请输入备注',
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
  methods: {
    handleSizeChange(size) {
      this.page.size = size;
      this.getPatrolArea();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getPatrolArea();
    },
    handleSearch() {
      this.page.current = 0;
      this.searchFormForHttp = this.searchForm;
      this.getPatrolArea();
    },
    handleAdd() {
      this.submitForm = {
        type: 'add',
        unid: '',
        name: '',
        unit: '',
        note: ''
      }
      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handleEdit(index, row) {
      this.submitForm = {
        type: 'edit',
        unid: row.unid,
        name: row.name,
        unit: row.unit_unid,
        note: row.note
      }
      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handleSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          if (this.submitForm.type == "add") {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('note', this.submitForm.note);
            params.append('unit_unid', this.submitForm.unit);

            this.$http.post(Urlmaps.patrol_area, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 201) {
                this.submitDialogVisible = false;
                this.$message('新增成功');
                this.getPatrolArea();
              } else {
                this.submitDialogVisible = false;
                this.$message('新增失败');
                this.getPatrolArea();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('新增失败');
              this.getPatrolArea();
            });
          } else {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('note', this.submitForm.note);
            params.append('unit_unid', this.submitForm.unit);

            this.$http.put(Urlmaps.patrol_area + '/' + this.submitForm.unid, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 200) {
                this.submitDialogVisible = false;
                this.$message('修改成功');
                this.getPatrolArea();
              } else {
                this.submitDialogVisible = false;
                this.$message('修改失败');
                this.getPatrolArea();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('修改失败');
              this.getPatrolArea();
            });
          }
        } else {
          return false;
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deletePatrolArea(row.unid);
      }).catch(() => {
        this.getPatrolArea();
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
    getPatrolArea() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.patrol_area, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          name: this.searchFormForHttp.name,
          unit_unid: this.searchFormForHttp.unit
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
    deletePatrolArea(unid) {
      this.$http.delete(Urlmaps.patrol_area + '/' + unid, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getPatrolArea();
        } else {
          this.$message('删除失败');
          this.getPatrolArea();
        }

      }).catch((error) => {
        this.$message('删除失败');
        this.getPatrolArea();
      });
    }
  },
  mounted() {
    this.getUnitInfo();
    this.getPatrolArea();
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
