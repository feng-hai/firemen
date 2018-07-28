<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <el-row>
      <el-col class="tree_wrapper">
        <el-tree :data="data" highlight-current default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
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
        <el-table-column prop="name_login" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="name_first" label="名字" min-width="80">
        </el-table-column>
        <el-table-column label="角色" min-width="180">
          <template slot-scope="scope">
            {{ scope.row.privilege_name ? scope.row.privilege_name : '-' }}
          </template>
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
      <el-dialog title="用户管理" :visible.sync="addDialogFormVisible" label-position="top">
        <el-form :model="addForm" ref="addForm">
          <el-form-item label="用户名称" prop="nameLogin" :label-width="formLabelWidth">
            <el-input v-model="addForm.nameLogin" auto-complete="off" placeholder="登录名称"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="nameFirst" :label-width="formLabelWidth">
            <el-input v-model="addForm.nameFirst" auto-complete="off" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
            <el-select v-model="addForm.domain" placeholder="请选择所属分组">
              <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能角色" prop="privilege" :label-width="formLabelWidth">
            <el-select v-model="addForm.privilege" placeholder="请选择角色">
              <el-option v-for="item in privilegeData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联网单位" prop="unit" :label-width="formLabelWidth">
            <el-select v-model="addForm.unit" multiple collapse-tags placeholder="请选择联网单位">
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClose">取 消</el-button>
          <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑界面 -->
      <el-dialog title="用户管理" :visible.sync="editDialogFormVisible" label-position="top">
        <el-form :model="editForm" ref="editForm">
          <el-form-item label="用户名称" prop="nameLogin" :label-width="formLabelWidth">
            <el-input v-model="editForm.nameLogin" auto-complete="off" placeholder="登录名称"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="nameFirst" :label-width="formLabelWidth">
            <el-input v-model="editForm.nameFirst" auto-complete="off" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
            <el-select v-model="editForm.domain" placeholder="请选择所属分组">
              <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能角色" prop="privilege" :label-width="formLabelWidth">
            <el-select v-model="editForm.privilege" placeholder="请选择角色">
              <el-option v-for="item in privilegeData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联网单位" prop="unit" :label-width="formLabelWidth">
            <el-select v-model="editForm.unit" multiple collapse-tags placeholder="请选择联网单位">
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
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
      privilegeData: {},
      unitData: {},
      data: [],
      domainData: {},
      selectedTreeData: {},
      tableData: [],
      tableLoading: false,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      unitDialogFormVisible: false,
      addForm: {
        nameLogin: '',
        nameFirst: '',
        domain: '',
        privilege: '',
        unit: ''
      },
      editForm: {
        nameLogin: '',
        nameFirst: '',
        domain: '',
        oldPrivilege: '',
        privilege: '',
        oldUnit: '',
        unit: '',
        unid: ''
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
      this.getUserInfo();
    },
    handleSearchClear() {
      this.getUserInfo();
    },
    addSubmit: function() {
      this.addLoading = true;

      var params = new URLSearchParams();
      params.append('name_login', this.addForm.nameLogin);
      params.append('name_first', this.addForm.nameFirst);
      params.append('domain_unid', this.addForm.domain);

      this.$http.post('https://api.renxingzuche.com/bigger/openid', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.searchText = '';
          let unid = response.headers.location.substring(response.headers.location.lastIndexOf("/") + 1);

          var actions = [];
          actions.push(this.bindPrivilege(unid, this.addForm.privilege));
          actions.push(this.bindUnit(unid, this.addForm.unit.join(",")));

          this.$http.all(actions).then(this.$http.spread((res1, res2) => {
            if (res1.status == 200 && res2.status == 200) {

              this.addLoading = false;
              this.addDialogFormVisible = false;
              this.$refs.addForm.resetFields();
              this.$message('新增成功');
              this.getUserInfo();
            } else {
              this.addLoading = false;
              this.addDialogFormVisible = false;
              this.$message('新增失败');
              this.$refs.addForm.resetFields();
            }
          })).catch((error) => {
            this.addLoading = false;
            this.addDialogFormVisible = false;
            this.$message('新增失败');
            this.$refs.addForm.resetFields();
          });

        } else {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$message('新增失败');
          this.$refs.addForm.resetFields();
        }

      }).catch((error) => {
        this.addLoading = false;
        this.addDialogFormVisible = false;
        this.$message('新增失败');
        this.$refs.addForm.resetFields();
      }).finally(function() {

      });
    },
    addClose: function() {
      this.addDialogFormVisible = false;
      this.$refs.addForm.resetFields();
    },
    editSubmit: function() {
      this.editLoading = true;

      var params = new URLSearchParams();
      params.append('name_login', this.editForm.nameLogin);
      params.append('name_first', this.editForm.nameFirst);
      params.append('domain_unid', this.editForm.domain);

      this.$http.put('https://api.renxingzuche.com/bigger/openid/' + this.editForm.unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {

        if (response.status == 200) {

          this.unbindPrivilege(this.editForm.unid, this.editForm.oldPrivilege).then((response) => {

            if (response.status == 200) {
              // 解绑成功

              // 合成联网单位
              var a = new Set(this.editForm.oldUnit);
              var b = new Set(this.editForm.unit);
              var differenceABSet = new Set([...a].filter(x => b.has(x)));
              var needUnbindSet = new Set([...a].filter(x => !differenceABSet.has(x)));
              var needbindSet = new Set([...b].filter(x => !differenceABSet.has(x)));

              var actions = [];

              actions.push(this.bindPrivilege(this.editForm.unid, this.editForm.privilege));

              if (needUnbindSet.size > 0) {
                actions.push(this.unbindUnit(this.editForm.unid, (Array.from(needUnbindSet)).join(",")));
              }

              if (needbindSet.size > 0) {
                actions.push(this.bindUnit(this.editForm.unid, (Array.from(needbindSet)).join(",")));
              }

              this.$http.all(actions).then((response) => {
                let result = true;
                for (var res of response) {
                  if (res.status != 200) {
                    result = false;
                  }
                }
                if (result) {
                  this.editLoading = false;
                  this.editDialogFormVisible = false;
                  this.$refs.editForm.resetFields();
                  this.$message('编辑成功');
                  this.getUserInfo();
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
      this.getUserUnitInfo(row.unid).then((response) => {
        if (response.status == 200) {
          var units = [];
          for (var unitInfo of response.data.collection) {
            units.push(unitInfo.unid);
          }
          this.editForm.oldUnit = units;
          this.editForm.unit = units;
          this.editForm.nameLogin = row.name_login;
          this.editForm.nameFirst = row.name_first;
          this.editForm.domain = row.domain_unid;
          this.editForm.oldPrivilege = row.privilege_unid;
          this.editForm.privilege = row.privilege_unid;
          this.editForm.unid = row.unid;
        } else {}
      });
    },
    handleDelete: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteUserInfo(row.unid);
      }).catch(() => {

      });
    },
    handleNodeClick: function(data) {
      this.selectedTreeData = data;
      this.searchText = '';
      this.getUserInfo();
    },
    getDomainInfo: function() {
      this.$http.get('https://api.renxingzuche.com/bigger/domain', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.data = this.build(response.data.collection);
          this.selectedTreeData = this.data[0];

          this.getUserInfo();
        } else {}

      }).catch((error) => {});
    },
    getPrivilegeInfo: function() {
      this.$http.get('https://api.renxingzuche.com/bigger/security/privilege', {
        params: {
          domain_unid: this.selectedTreeData.unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var privilege of response.data.collection) {
            this.privilegeData[privilege.unid] = privilege;
          }
        } else {}

      }).catch((error) => {});
    },
    getUnitInfo: function() {
      this.$http.get('https://api.renxingzuche.com/bigger/unit_info', {
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
    handleSizeChange(size) {
      this.page.size = size;
      this.getUserInfo();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getUserInfo();
    },
    getUserInfo: function() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get('https://api.renxingzuche.com/bigger/openid', {
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
    deleteUserInfo: function(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/openid/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getUserInfo();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    getUserUnitInfo: function(openId) {
      return this.$http.get('https://api.renxingzuche.com/bigger/openid/bind', {
        params: {
          open_id: openId
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    bindPrivilege: function(openId, privilegeId) {
      var params = new URLSearchParams();
      params.append('open_id', openId);
      params.append('privilege_unid', privilegeId);

      return this.$http.put('https://api.renxingzuche.com/bigger/security/openid_privilege_map/bind', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    unbindPrivilege: function(openId, privilegeId) {
      var params = new URLSearchParams();
      params.append('open_id', openId);
      params.append('privilege_unid', privilegeId);

      return this.$http.put('https://api.renxingzuche.com/bigger/security/openid_privilege_map/unbind', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    bindUnit: function(openId, unitIds) {
      var params = new URLSearchParams();
      params.append('open_id', openId);
      params.append('units', unitIds);

      return this.$http.post('https://api.renxingzuche.com/bigger/openid/bind', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    unbindUnit: function(openId, unitIds) {
      var params = new URLSearchParams();
      params.append('open_id', openId);
      params.append('units', unitIds);

      return this.$http.post('https://api.renxingzuche.com/bigger/openid/unbind', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    },
    build: function(menuList) {
      let temp = {};
      let ans = [];
      this.domainData = {};
      for (let i in menuList) {
        this.domainData[menuList[i].unid] = menuList[i];
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
    this.getPrivilegeInfo();
    this.getUnitInfo();
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
