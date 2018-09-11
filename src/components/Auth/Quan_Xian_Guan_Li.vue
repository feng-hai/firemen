<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <el-row>
      <el-col class="tree_wrapper">
        <el-tree :data="data" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick" ref="tree" node-key="unid" highlight-current></el-tree>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="19" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">{{selectedTreeData.label}}</el-button>
          </el-form-item>
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
        <el-table-column prop="name" label="名称" min-width="180">
        </el-table-column>
        <el-table-column label="所属分组" min-width="180">
          <template slot-scope="scope">
            {{ domainData[scope.row.domain_unid].name }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
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

      <!-- 新增界面 -->
      <el-dialog title="权限管理" :visible.sync="addDialogFormVisible" label-position="top">
        <el-row :gutter="12">
          <el-col :span="11">
            <el-form :model="addForm" ref="addForm">
              <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
                <el-select v-model="addForm.domain" placeholder="请选择所属分组">
                  <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单权限" prop="menu" :label-width="formLabelWidth" hidden>
                <el-input v-model="addForm.menu" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="13">
            <el-tree :data="menuData" node-key="unid" ref="addTree" show-checkbox default-expand-all :style="{height: '250px', overflow: 'auto'}"></el-tree>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClose">取 消</el-button>
          <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑界面 -->
      <el-dialog title="权限管理" :visible.sync="editDialogFormVisible" label-position="top">
        <el-row :gutter="12">
          <el-col :span="11">
            <el-form :model="editForm" ref="editForm">
              <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
                <el-select v-model="editForm.domain" placeholder="请选择所属分组">
                  <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单权限" prop="menu" :label-width="formLabelWidth" hidden>
                <el-input v-model="editForm.menu" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="13">
            <el-tree :data="menuData" node-key="unid" ref="editTree" show-checkbox default-expand-all :style="{height: '250px', overflow: 'auto'}"></el-tree>
          </el-col>
        </el-row>
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
      data: [],
      domainData: {},
      menuData: [],
      selectedTreeData: {},
      tableData: [],
      tableLoading: false,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        name: '',
        domain: '',
        menu: ''
      },
      editForm: {
        unid: '',
        name: '',
        domain: '',
        menu: ''
      },
      formLabelWidth: '120px',
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
      this.getPrivilegeInfo();
    },
    handleSearchClear() {
      this.getPrivilegeInfo();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getPrivilegeInfo();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getPrivilegeInfo();
    },
    addSubmit: function() {
      this.addLoading = true;

      var params = new URLSearchParams();
      params.append('name', this.addForm.name);
      params.append('domain_unid', this.addForm.domain);

      this.$http.post('https://api.renxingzuche.com/bigger/security/privilege', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.searchText = '';
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$refs.addForm.resetFields();
          this.$message('新增成功');
          this.getPrivilegeInfo();
        } else {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$refs.addForm.resetFields();
          this.$message('新增错误');
        }

      }).catch((error) => {
        this.addLoading = false;
        this.addDialogFormVisible = false;
        this.$refs.addForm.resetFields();
        this.$message('新增错误');
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
      params.append('domain_unid', this.editForm.domain);

      this.$http.put('https://api.renxingzuche.com/bigger/security/privilege/' + this.editForm.unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.editLoading = false;
        this.editDialogFormVisible = false;
        this.$refs.editForm.resetFields();
        if (response.status == 200) {
          this.$message('编辑成功');
          this.getPrivilegeInfo();
        } else {
          this.$message('编辑错误');
        }

      }).catch((error) => {
        this.editLoading = false;
        this.editDialogFormVisible = false;
        this.$message('编辑错误');
        this.$refs.editForm.resetFields();
      });
    },
    handleEdit: function(index, row) {
      this.editDialogFormVisible = true;
      this.editForm.unid = row.unid;
      this.editForm.name = row.name;
      this.editForm.domain = row.domain_unid;
      this.editForm.menu = row.menu;
    },
    handleDelete: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deletePrivilegeInfo(row.unid);
      }).catch(() => {

      });
    },
    handleNodeClick: function(data) {
      this.selectedTreeData = data;
      this.searchText = '';
      this.getPrivilegeInfo();
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
          this.data = this.build(response.data.collection);
          this.selectedTreeData = this.data[0];

          this.getPrivilegeInfo();
        } else {}

      }).catch((error) => {});
    },
    getPrivilegeInfo: function() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get('https://api.renxingzuche.com/bigger/security/privilege', {
        params: {
          domain_unid: this.selectedTreeData.unid,
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
          this.tableData = response.data.collection;
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
    deletePrivilegeInfo: function(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/security/privilege/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getPrivilegeInfo();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    getMenuInfo() {
      this.$http.get('https://api.renxingzuche.com/bigger/security/menu', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.menuData = this.build(response.data.collection);
        } else {}
      }).catch((error) => {});
    },
    bindMenu(privilegeId, menuId) {
      var params = new URLSearchParams();
      params.append('open_id', openId);
      params.append('privilege_unid', privilegeId);

      return this.$http.put('https://api.renxingzuche.com/bigger/security/openid_privilege_map/bind', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    build: function(menuList) {
      let temp = {};
      let ans = [];
      for (let i in menuList) {
        temp[menuList[i].unid] = {
          label: menuList[i].name,
          unid: menuList[i].unid,
          superUnid: menuList[i].super_unid
        };
      }
      for (let i in temp) {
        if (temp[i].superUnid) {
          if (!temp[temp[i].superUnid].children) {
            temp[temp[i].superUnid].children = new Array();
          }
          temp[temp[i].superUnid].children.push(temp[i]);
        } else {
          ans.push(temp[i]);
        }
      }
      return ans;
    }
  },
  mounted() {
    this.getDomainInfo();
    this.getMenuInfo();
  }
}
</script>

<style scoped>
.left .filter_wrapper {
  padding: 6px;
  background-color: #d83232;
  border-radius: 4px;
}

.left .tree_wrapper {
  padding: 6px;
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
}

.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}
</style>
