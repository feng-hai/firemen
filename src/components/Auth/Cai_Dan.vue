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
      <el-table class="table" :data="tableData" border ref="table">
        <!-- <el-table-column type="selection" width="35">
        </el-table-column> -->
        <el-table-column prop="name" label="名称" min-width="100">
        </el-table-column>
        <el-table-column label="父菜单唯一编号" min-width="120">
          <template slot-scope="scope">
            {{ menuData[scope.row.super_unid] ? menuData[scope.row.super_unid].name : '-' }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="sort_index" label="排序字段" min-width="70">
        </el-table-column> -->
        <el-table-column label="分组唯一编号" min-width="100">
          <template slot-scope="scope">
            {{ domainData[scope.row.domain_unid].name }}
          </template>
        </el-table-column>
        <el-table-column prop="redirect_uri" label="跳转地址" min-width="250">
        </el-table-column>
        <el-table-column prop="icon_uri" label="图标地址" min-width="220">
        </el-table-column>
        <el-table-column prop="menu_type" label="类型" min-width="100">
        </el-table-column>
        <el-table-column label="操作" width="90">
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
      <el-dialog title="菜单信息" :visible.sync="addDialogFormVisible" width="40%">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form :model="addForm" ref="addForm">
              <el-form-item label="菜单名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜单顺序" prop="sort" :label-width="formLabelWidth">
                <el-input v-model="addForm.sort" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
                <el-select v-model="addForm.domain" placeholder="请选择所属分组">
                  <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单图标" prop="icon" :label-width="formLabelWidth">
                <el-input v-model="addForm.icon" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜单路径" prop="redirect" :label-width="formLabelWidth">
                <el-input v-model="addForm.redirect" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜单类型" prop="type" :label-width="formLabelWidth">
                <el-select v-model="addForm.type" placeholder="">
                  <el-option label="单车" value="0"></el-option>
                  <el-option label="多车" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="父菜单" prop="superUnid" :label-width="formLabelWidth" hidden>
                <el-input v-model="addForm.superUnid" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-tree :data="data" default-expand-all highlight-current @node-click="handleNodeClick" :style="{height: '250px', overflow: 'auto'}"></el-tree>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addClose">取 消</el-button>
          <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑界面 -->
      <el-dialog title="菜单信息" :visible.sync="editDialogFormVisible" width="40%">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form :model="editForm" ref="editForm">
              <el-form-item label="菜单名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜单顺序" prop="sort" :label-width="formLabelWidth">
                <el-input v-model="editForm.sort" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分组" prop="domain" :label-width="formLabelWidth">
                <el-select v-model="editForm.domain" placeholder="请选择所属分组">
                  <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单图标" prop="icon" :label-width="formLabelWidth">
                <el-input v-model="editForm.icon" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜单路径" prop="redirect" :label-width="formLabelWidth">
                <el-input v-model="editForm.redirect" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜单类型" prop="type" :label-width="formLabelWidth">
                <el-select v-model="editForm.type" placeholder="">
                  <el-option label="单车" value="0"></el-option>
                  <el-option label="多车" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="父菜单" prop="superUnid" :label-width="formLabelWidth" hidden>
                <el-input v-model="editForm.superUnid" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-tree :data="data" default-expand-all @node-click="handleNodeClick" highlight-current :style="{height: '250px', overflow: 'auto'}"></el-tree>
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
      domainData: {},
      menuData: {},
      tableData: [],
      tableLoading: false,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        name: '',
        sort: '',
        domain: '',
        icon: '',
        redirect: '',
        type: '',
        superUnid: ''
      },
      editForm: {
        unid: '',
        name: '',
        sort: '',
        domain: '',
        icon: '',
        redirect: '',
        type: '',
        superUnid: ''
      },
      formLabelWidth: '80px',
      addLoading: false,
      editLoading: false,
      data: [],
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
      this.getMenuInfo();
    },
    handleSearchClear() {
      this.getMenuInfo();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getMenuInfo();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getMenuInfo();
    },
    addSubmit: function() {
      this.addLoading = true;

      var params = new URLSearchParams();
      params.append('name', this.addForm.name);
      params.append('inx', this.addForm.sort);
      params.append('domain_unid', this.addForm.domain);
      params.append('super_unid', this.addForm.superUnid);
      params.append('icon_uri', this.addForm.icon);
      params.append('menu_type', this.addForm.type);
      params.append('redirect_uri', this.addForm.redirect);

      this.$http.post('https://api.renxingzuche.com/bigger/security/menu', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$refs.addForm.resetFields();
          this.$message('新增成功');
          this.getMenuInfo();
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
      params.append('super_unid', this.editForm.superUnid);
      params.append('icon_uri', this.editForm.icon);
      params.append('menu_type', this.editForm.type);
      params.append('redirect_uri', this.editForm.redirect);

      this.$http.put('https://api.renxingzuche.com/bigger/security/menu/' + this.editForm.unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {

        if (response.status == 200) {
          this.editLoading = false;
          this.editDialogFormVisible = false;
          this.$refs.editForm.resetFields();
          this.$message('编辑成功');
          this.getMenuInfo();
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
      this.editForm.redirect = row.redirect_uri;
      this.editForm.type = row.menu_type;
      this.editForm.superUnid = row.super_unid;
    },
    handleDelete: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteMenuInfo(row.unid);
      }).catch(() => {

      });
    },
    handleNodeClick(data) {
      if (this.addDialogFormVisible) {
        this.addForm.superUnid = data.unid;
      } else if (this.editDialogFormVisible) {
        this.editForm.superUnid = data.unid;
      }
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
        } else {}
        this.getMenuInfo();

      }).catch((error) => {});
    },
    getMenuInfo() {

      this.tableData = [];
      this.data = {};
      this.menuData = {};
      this.tableLoading = true;

      this.$http.get('https://api.renxingzuche.com/bigger/security/menu', {
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
          this.tableData = response.data.collection;
          this.page.total = response.data.count;
          // debugger;

          for (let menu of response.data.collection) {
            this.$set(this.menuData, menu.unid, menu);
            // this.menuData[menu.unid] = menu;
          }
          this.data = this.build(response.data.collection);
        } else {
          this.page.total = 0;
        }
      }).catch((error) => {
        this.tableLoading = false;
        this.page.total = 0;
      });

      // this.$http.all(actions).then(this.$http.spread((res1, res2) => {
      //   this.tableLoading = false;
      //   if (res1.status == 200) {
      //     this.tableData = res1.data.menus
      //     this.page.total = res1.data.count;
      //   } else {
      //     this.page.total = 0;
      //   }
      //
      //   if (res2.status == 200) {
      //     for (var menu of res2.data.menus) {
      //       this.menuData[menu.unid] = menu;
      //     }
      //     this.data = this.build(res2.data.menus);
      //   } else {
      //
      //   }
      // })).catch((error) => {
      //   this.tableLoading = false;
      //   this.page.total = 0;
      // });

      // this.$http.get('https://api.renxingzuche.com/bigger/security/menu', {
      //   // params: {
      //   //   page_id: this.page.current,
      //   //   page_size: this.page.size
      //   // },
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then((response) => {
      //   if (response.status == 200) {
      //     this.data = this.build(response.data.menus);
      //     for (var menu of response.data.menus) {
      //       this.tableData.push(menu);
      //       this.menuData[menu.unid] = menu;
      //     }
      //     // this.page.total = response.data.menus.count;
      //   } else {
      //     this.page.total = 0;
      //   }
      //   this.tableLoading = false;
      // }).catch((error) => {
      //   this.tableLoading = false;
      //   this.page.total = 0;
      // });
    },
    deleteMenuInfo: function(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/security/menu/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getMenuInfo();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
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
          if (!temp[temp[i].superUnid]) {
            continue;
          }
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
