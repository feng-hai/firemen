<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :model="searchForm" :inline="true">
          <el-form-item>
            <el-select v-model="searchForm.unit" placeholder="联网单位" :style="{width: '160px'}" value-key="unid" clearable @change="handleSearchChange" @clear="handleSearchClear">
              <el-option v-for="(item, key) of unitData" :key="key" :label="item.name" :value="key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table" v-loading="tableLoading">
        <el-table-column label="联网单位" min-width="70">
          <template slot-scope="scope">
          {{unitData[scope.row.unit_unid] ? unitData[scope.row.unit_unid].name : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="fm_type.name" label="小组类别" min-width="70">
        </el-table-column>
        <el-table-column label="组长姓名" min-width="70">
          <template slot-scope="scope">
          {{userData[scope.row.leader_open_id] ? userData[scope.row.leader_open_id].name_first : ''}}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" min-width="70">
          <template slot-scope="scope">
          {{userData[scope.row.leader_open_id] ? userData[scope.row.leader_open_id].cellphone : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="datime_sys" label="创建时间" min-width="70">
        </el-table-column>
        <el-table-column label="创建人" min-width="70">
          <template slot-scope="scope">
          {{userData[scope.row.open_id] ? userData[scope.row.open_id].name_first : ''}}
          </template>
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
    </el-row>
    <!-- 新增/编辑界面 -->
    <el-dialog title="新增应急小组人员" :visible.sync="submitDialogVisible">
      <el-row>
        <el-col :span="24">
          <el-form :model="submitForm" ref="submitForm" :rules="submitFormRule" label-position="top">
            <el-form-item prop="type" label="小组类别" label-width="120px">
              <el-select v-model="submitForm.type" :style="{width: '200px'}">
                <el-option v-for="item of typeData" :key="item.unid" :label="item.name" :value="item.aiid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="unit" label="联网单位" label-width="120px">
              <el-select v-model="submitForm.unit" :style="{width: '200px'}" @change="handleUnitChangeInAdd">
                <el-option v-for="item of unitData" :key="item.unid" :label="item.name" :value="item.unid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="leader" label="组长" label-width="120px">
              <el-select v-model="submitForm.leader" :style="{width: '200px'}" v-loading="leaderLoading">
                <el-option v-for="item of leaderData" :key="item.unid" :label="item.name_first" :value="item.unid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-dialog>
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
      searchForm: {
        unit: ''
      },
      unitData: {},
      userData: {},
      typeData: {},
      leaderData: {},
      leaderLoading: false,
      submitDialogVisible: false,
      submitForm: {
        mode: '',
        type: '',
        unid: '',
        unit: '',
        leader: ''
      },
      submitFormRule: {
        type: [{
          required: true,
          message: '请输入小组类别',
          trigger: 'change'
        }],
        unit: [{
          required: true,
          message: '请选择联网单位',
          trigger: 'change'
        }],
        leader: [{
          required: true,
          message: '请输入组长',
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
      this.getErt();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getErt();
    },
    handleSearchChange(val) {
      this.getErt();
    },
    handleSearchClear() {
      this.getErt();
    },
    handleUnitChangeInAdd(val) {
      this.getUnitOpneid(val);
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
          }
        } else {}

      }).catch((error) => {});
    },
    getUser: function() {
      this.$http.get(Urlmaps.user, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var openid of response.data.collection) {
            this.$set(this.userData, openid.unid, openid);
          }
        } else {}

      }).catch((error) => {});
    },
    getType: function() {
      this.$http.get(Urlmaps.type, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var type of response.data.collection) {
            this.$set(this.typeData, type.unid, type);
          }

        } else {}

      }).catch((error) => {});
    },
    handleAdd() {
      this.submitForm = {
        mode: 'add',
        type: '',
        unid: '',
        unit: '',
        leader: ''
      }
      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handleEdit(index, row) {

      this.submitForm = {
        mode: 'edit',
        type: row.fm_type.aiid,
        unid: row.unid,
        unit: row.unit_unid,
        leader: row.leader_open_id
      }
      this.getUnitOpneid(row.unit_unid);

      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handleSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          if (this.submitForm.mode == "add") {
            var params = new URLSearchParams();
            params.append('type_id', this.submitForm.type);
            params.append('unit_unid', this.submitForm.unit);
            params.append('leader_open_id', this.submitForm.leader);

            this.$http.post(Urlmaps.ert, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 201) {
                this.submitDialogVisible = false;
                this.$message('新增成功');
                this.getErt();
              } else {
                this.submitDialogVisible = false;
                this.$message('新增失败');
                this.getErt();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('新增失败');
              this.getErt();
            });
          } else {
            var params = new URLSearchParams();
            params.append('type_id', this.submitForm.type);
            params.append('unit_unid', this.submitForm.unit);
            params.append('leader_open_id', this.submitForm.leader);

            this.$http.put(Urlmaps.ert + '/' + this.submitForm.unid, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 200) {
                this.submitDialogVisible = false;
                this.$message('修改成功');
                this.getErt();
              } else {
                this.submitDialogVisible = false;
                this.$message('修改失败');
                this.getErt();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('修改失败');
              this.getErt();
            });
          }
        } else {
          return false;
        }
      });
    },
    async getUnitOpneid(unid) {
      this.submitForm.leader = '';
      this.leaderData = {};
      this.leaderLoading = true;
      await this.$http.get(Urlmaps.unit + "/" + unid + "/openid", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.leaderLoading = false;
        if (response.status == 200) {
          for (var leader of response.data.collection) {
            this.$set(this.leaderData, leader.unid, leader);
          }
        } else {}

      }).catch((error) => {
        this.leaderLoading = false;
      });
    },
    getErt: function() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.ert, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          unit_unid: this.searchForm.unit
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
    }
  },
  created() {
    this.getUser();
    this.getType();
    this.getUnitInfo();
    this.getErt();
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
