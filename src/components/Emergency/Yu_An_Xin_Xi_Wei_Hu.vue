<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :model="searchForm" :inline="true">
          <el-select v-model="searchForm.unit" placeholder="联网单位" :style="{width: '160px'}" clearable @change="handleSearchChange" @clear="handleSearchClear">
            <el-option v-for="item of unitData" :key="item.unid" :label="item.name" :value="item.unid">
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
        <el-table-column prop="name" label="预案名称" min-width="70">
        </el-table-column>
        <el-table-column label="创建人" min-width="70">
          <template slot-scope="scope">
          {{userData[scope.row.open_id] ? userData[scope.row.open_id].name_first : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="datime_sys" label="创建时间" min-width="70">
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-look"
            :style="{padding: '0px'}"
            @click="handlePreview(scope.$index, scope.row)">
            </el-button>
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
    <el-dialog title="巡检分区" :visible.sync="submitDialogVisible">
      <el-row>
        <el-col :span="24">
          <el-form :rules="submitFormRule" :model="submitForm" ref="submitForm" label-position="top">
            <el-form-item prop="unit" label="联网单位" label-width="120px">
              <el-select v-model="submitForm.unit" clearable :style="{width: '200px'}" :disabled="submitForm.type == 'preview' ? true : false">
                <el-option v-for="item of unitData" :key="item.unid" :label="item.name" :value="item.unid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name" label="预案名称" label-width="120px">
              <el-input v-model="submitForm.name" :style="{width: '200px'}" :disabled="submitForm.type == 'preview' ? true : false">
              </el-input>
            </el-form-item>
            <el-form-item v-if="submitForm.type == 'preview'" label="创建人" label-width="120px">
              <el-input v-model="submitForm.human" :style="{width: '200px'}" disabled>
              </el-input>
            </el-form-item>
            <el-form-item v-if="submitForm.type == 'preview'" label="创建时间" label-width="120px">
              <el-input v-model="submitForm.date" :style="{width: '200px'}" disabled>
              </el-input>
            </el-form-item>
            <el-form-item prop="content" label="预案流程" label-width="120px">
              <quill-editor v-if="submitForm.type != 'preview'" :options="quillOption" v-model="submitForm.content" class="editer">
              </quill-editor>
              <div v-if="submitForm.type == 'preview'" v-html="submitForm.content"></div>
            </el-form-item>
            <el-form-item prop="content_1" label="小组分工" label-width="120px">
              <quill-editor v-if="submitForm.type != 'preview'" :options="quillOption" v-model="submitForm.content_1" class="editer">
              </quill-editor>
              <div v-if="submitForm.type == 'preview'" v-html="submitForm.content_1"></div>
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

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {
  quillEditor
} from 'vue-quill-editor'

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
      submitDialogVisible: false,
      submitForm: {
        type: '',
        unid: '',
        name: '',
        unit: '',
        human: '',
        date: '',
        content: '',
        content_1: ''
      },
      submitFormRule: {
        name: [{
          required: true,
          message: '请输入预案名称',
          trigger: 'change'
        }],
        unit: [{
          required: true,
          message: '请选择联网单位',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请输入预案流程',
          trigger: 'change'
        }],
        content_1: [{
          required: true,
          message: '请输入小组分工',
          trigger: 'change'
        }]
      },
      quillOption: {
        placeholder: '请输入...'
      },
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    handleSizeChange(size) {
      this.page.size = size;
      this.getEmergency();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getEmergency();
    },
    handleSearchChange(val) {
      this.getEmergency();
    },
    handleSearchClear() {
      this.getEmergency();
    },
    handleAdd() {
      this.submitForm = {
        type: 'add',
        unid: '',
        name: '',
        unit: '',
        human: '',
        date: '',
        content: '',
        content_1: ''
      }
      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handlePreview(index, row) {
      this.submitForm = {
        type: 'preview',
        unid: row.unid,
        name: row.name,
        unit: row.unit_unid,
        human: this.userData[row.open_id].name_first,
        date: row.datime_sys,
        content: row.content,
        content_1: row.content_1
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
        human: '',
        date: '',
        content: row.content,
        content_1: row.content_1
      }
      if (this.$refs['submitForm']) {
        this.$refs['submitForm'].resetFields();
      }
      this.submitDialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteEmergency(row.unid);
      }).catch(() => {
        this.$message('删除失败');
        this.getEmergency();
      });
    },
    handleSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          if (this.submitForm.type == "add") {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('unit_unid', this.submitForm.unit);
            params.append('open_id', JSON.parse(sessionStorage.getItem(
              'user')).unid);
            params.append('content', this.submitForm.content);
            params.append('content_1', this.submitForm.content_1);

            this.$http.post(Urlmaps.emergency, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 201) {
                this.submitDialogVisible = false;
                this.$message('新增成功');
                this.getEmergency();
              } else {
                this.submitDialogVisible = false;
                this.$message('新增失败');
                this.getEmergency();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('新增失败');
              this.getEmergency();
            });
          } else {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('unit_unid', this.submitForm.unit);
            params.append('open_id', JSON.parse(sessionStorage.getItem(
              'user')).unid);
            params.append('content', this.submitForm.content);
            params.append('content_1', this.submitForm.content_1);

            this.$http.put(Urlmaps.emergency + '/' + this.submitForm.unid, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 200) {
                this.submitDialogVisible = false;
                this.$message('修改成功');
                this.getEmergency();
              } else {
                this.submitDialogVisible = false;
                this.$message('修改失败');
                this.getEmergency();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('修改失败');
              this.getEmergency();
            });
          }
        } else {
          return false;
        }
      });
    },
    deleteEmergency(unid) {
      this.$http.delete(Urlmaps.emergency + '/' + unid, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getEmergency();
        } else {
          this.$message('删除失败');
          this.getEmergency();
        }

      }).catch((error) => {
        this.$message('删除失败');
        this.getEmergency();
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
    getEmergency: function() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.emergency, {
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
  mounted() {
    this.getUser();
    this.getUnitInfo();
    this.getEmergency();
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
