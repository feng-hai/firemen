<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="searchText" placeholder="请输入内容" :style="{width: '180px'}" clearable @keydown.enter.native="handleSearchEnter" @clear="handleSearchClear">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="addDialogFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table" v-loading="tableLoading">
        <!-- <el-table-column type="selection" width="35">
        </el-table-column> -->
        <el-table-column prop="name" label="名称" width="250">
        </el-table-column>
        <el-table-column prop="sort_index" label="排序字段" width="100">
        </el-table-column>
        <el-table-column label="分组唯一编号" min-width="100">
          <template slot-scope="scope">
            {{ domainData[scope.row.domain_unid].name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="代码" min-width="180">
        </el-table-column>
        <el-table-column prop="icon_uri" label="图标" min-width="250">
        </el-table-column>
        <el-table-column label="操作" width="180">
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
      <el-dialog title="按钮信息" :visible.sync="addDialogFormVisible" width="40%">
        <el-form :model="addForm" ref="addForm">
          <el-form-item label="按钮名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="sort" :label-width="formLabelWidth">
            <el-input v-model="addForm.sort" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
            <el-select v-model="addForm.domain" placeholder="请选择所属分组">
              <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon" :label-width="formLabelWidth">
            <el-input v-model="addForm.icon" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code" :label-width="formLabelWidth">
            <el-input v-model="addForm.code" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClose">取 消</el-button>
          <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑界面 -->
      <el-dialog title="按钮信息" :visible.sync="editDialogFormVisible" width="40%">
        <el-form :model="editForm" ref="editForm">
          <el-form-item label="按钮名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="sort" :label-width="formLabelWidth">
            <el-input v-model="editForm.sort" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
            <el-select v-model="editForm.domain" placeholder="请选择所属分组">
              <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon" :label-width="formLabelWidth">
            <el-input v-model="editForm.icon" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code" :label-width="formLabelWidth">
            <el-input v-model="editForm.code" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit" :loading="editLoading">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      domainData: {},
      buttonData: {},
      tableData: [],
      tableLoading: false,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        name: '',
        sort: '',
        domain: '',
        icon: '',
        code: ''
      },
      editForm: {
        unid: '',
        name: '',
        sort: '',
        domain: '',
        icon: '',
        code: ''
      },
      formLabelWidth: '80px',
      addLoading: false,
      editLoading: false,
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      }
    }
  },
  methods: {
    handleSearchEnter(event) {
      event.preventDefault();
      this.getButtonInfo();
    },
    handleSearchClear() {
      this.getButtonInfo();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getButtonInfo();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getButtonInfo();
    },
    addSubmit: function() {
      this.addLoading = true;

      var params = new URLSearchParams();
      params.append('name', this.addForm.name);
      params.append('inx', this.addForm.sort);
      params.append('domain_unid', this.addForm.domain);
      params.append('icon_uri', this.addForm.icon);
      params.append('code', this.addForm.code);

      this.$http.post('https://api.renxingzuche.com/bigger/security/button', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$refs.addForm.resetFields();
          this.$message('新增成功');
          this.getButtonInfo();
        } else {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$refs.addForm.resetFields();
          this.$message('新增失败');
        }
      }).catch((error) => {
        this.addLoading = false;
        this.addDialogFormVisible = false;
        this.$refs.addForm.resetFields();
        this.$message('新增失败');
      });
    },
    addClose: function() {
      this.addDialogFormVisible = false;
      this.$refs.addForm.resetFields();
    },
    editSubmit: function() {
      this.editLoading = true;

      var params = new URLSearchParams();
      params.append('name', this.editForm.name);
      params.append('inx', this.editForm.sort);
      params.append('domain_unid', this.editForm.domain);
      params.append('icon_uri', this.editForm.icon);
      params.append('code', this.editForm.code);

      this.$http.put('https://api.renxingzuche.com/bigger/security/button/' + this.editForm.unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {

        if (response.status == 200) {
          this.editLoading = false;
          this.editDialogFormVisible = false;
          this.$refs.editForm.resetFields();
          this.$message('编辑成功');
          this.getButtonInfo();
        } else {
          this.editLoading = false;
          this.editDialogFormVisible = false;
          this.$refs.editForm.resetFields();
          this.$message('编辑失败');
        }

      }).catch((error) => {
        this.editLoading = false;
        this.editDialogFormVisible = false;
        this.$refs.editForm.resetFields();
        this.$message('编辑失败');
      });
    },
    handleEdit: function(index, row) {
      this.editDialogFormVisible = true;
      this.editForm.unid = row.unid;
      this.editForm.name = row.name;
      this.editForm.sort = row.sort_index;
      this.editForm.domain = row.domain_unid;
      this.editForm.icon = row.icon_uri;
      this.editForm.code = row.code;
    },
    handleDelete: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteButtonInfo(row.unid);
      }).catch(() => {

      });
    },
    getDomainInfo: function() {
      this.$http.get('https://api.renxingzuche.com/bigger/domain', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var domain of response.data.collection) {
            this.domainData[domain.unid] = domain;
          }
          this.getButtonInfo();
        } else {}

      }).catch((error) => {});
    },
    getButtonInfo() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get('https://api.renxingzuche.com/bigger/security/button', {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          q: this.searchText
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var button of response.data.collection) {
            this.tableData.push(button);
            this.buttonData[button.unid] = button;
          }
          this.page.total = response.data.count;
        } else {
          this.page.total = 0;
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        this.page.total = 0;
      });
    },
    deleteButtonInfo: function(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/security/button/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getButtonInfo();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    }
  },
  mounted() {
    this.getDomainInfo();
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
