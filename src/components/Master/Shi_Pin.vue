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
      <el-table class="table" :data="tableDataRight" border v-loading="tableLoading">
        <el-table-column prop="name" label="视频名称" min-width="180">
        </el-table-column>
        <el-table-column label="所属区域" min-width="180">
          <template slot-scope="scope">
            {{buildData2[scope.row.bs_unid] ? buildData2[scope.row.bs_unid].name : ''}}
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

      <!-- 新增/编辑界面 -->
      <el-dialog :title="(submitForm.type == 'add' ? '新增' : '编辑') + '视频'" :visible.sync="submitDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form :model="submitForm" ref="submitForm" label-position="top" :label-width="formLabelWidth">
              <el-form-item prop="name" label="视频名称">
                <el-input v-model="submitForm.name" :style="{width: '200px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="build" label="所属区域">
                <el-select v-model="submitForm.build" clearable :style="{width: '200px'}">
                  <el-option v-for="item in buildData" :key="item.unid" :label="item.data.name" :value="item.unid">
                    <span v-if="item.data.inx == 1">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 2" style="margin-left: 16px;">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 3" style="margin-left: 32px;">3:{{ item.data.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="cameraType" label="设备类型">
                <el-select v-model="submitForm.cameraType" clearable :style="{width: '200px'}">
                  <el-option v-for="item in cameraTypeData" :key="item.aiid" :label="item.name" :value="item.aiid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="protocol" label="协议">
                <el-input v-model="submitForm.protocol" :style="{width: '200px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="ipv4" label="IPv4">
                <el-input v-model="submitForm.ipv4" :style="{width: '200px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="port" label="端口">
                <el-input v-model="submitForm.port" :style="{width: '200px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="username" label="用户名">
                <el-input v-model="submitForm.username" :style="{width: '200px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="submitForm.password" :style="{width: '200px'}">
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
      searchText: '',
      filters: {
        name: ''
      },
      typeData: {},
      rightTitle: '',
      buildData: [],
      buildData2: {},
      selectedRow: {},
      tableDataLeft: [],
      tableDataRight: [],
      tableLoading: false,
      formLabelWidth: '120px',
      submitDialogVisible: false,
      submitForm: {
        type: '',
        unid: '',
        name: '',
        cameraType: '',
        build: '',
        protocol: '',
        ipv4: '',
        port: '',
        username: '',
        password: ''
      },
      cameraTypeData: {},
      page: {
        total: 0,
        current: 0,
        size: 5
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      this.page.size = size;
      this.getCamera();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getCamera();
    },
    handleSearchClear() {
      this.getCamera();
    },
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
          setTimeout(() => {
            this.$refs['table'].setCurrentRow(this.tableDataLeft[0]);
          }, 10);

          this.getBuildStruct();
          this.getCamera();

        } else {}

      }).catch((error) => {});
    },
    getType() {
      this.tableDataLeft = [];
      this.$http.get(Urlmaps.type, {
        params: {
          tag: 'camera'
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var camera of response.data.collection) {
            this.cameraTypeData[camera.unid] = camera;
          }
        } else {}

      }).catch((error) => {});
    },
    getCamera() {
      this.tableDataRight = [];
      this.$http.get(Urlmaps.camera, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
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
      this.buildData = [];
      this.buildData2 = {};
      this.$http.get(Urlmaps.build, {
        params: {
          unit_unid: this.selectedRow.unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var build of this.build(response.data.collection)) {
            if (build.data.inx != 0) {
              this.buildData.push(build);
            }

            if (build.children) {
              for (var build2 of build.children) {
                this.buildData.push(build2);
                if (build2.children) {
                  for (var build3 of build2.children) {
                    this.buildData.push(build3);
                  }
                }
              }
            }
          }
        } else {}

      }).catch((error) => {});
    },
    handleUnitSelect(row) {
      this.selectedRow = row;
      this.rightTitle = row.name;
      this.searchText = '';
      this.getBuildStruct();
      this.getCamera();
    },
    handleAdd() {
      this.submitForm = {
        type: 'add',
        unid: '',
        name: '',
        cameraType: '',
        build: '',
        protocol: '',
        ipv4: '',
        port: '',
        username: '',
        password: ''
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
        cameraType: row.fm_type.aiid,
        build: row.bs_unid,
        protocol: row.protocol,
        ipv4: row.IP4,
        port: row.port,
        username: row.username,
        password: row.password
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
        this.deleteCamera(row.unid);
      });
    },
    handleSubmit() {
      if (this.submitForm.type == "add") {
        var params = new URLSearchParams();
        params.append('name', this.submitForm.name);
        params.append('bs_unid', this.submitForm.build);
        params.append('unit_unid', this.selectedRow.unid);
        params.append('type_id', this.submitForm.cameraType);
        params.append('protocol', this.submitForm.protocol);
        params.append('IP4', this.submitForm.ipv4);
        params.append('port', this.submitForm.port);
        params.append('username', this.submitForm.username);
        params.append('password', this.submitForm.password);

        this.$http.post(Urlmaps.camera, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          if (response.status == 201) {
            this.submitDialogVisible = false;
            this.$message('新增成功');
            this.getCamera();
          } else {
            this.submitDialogVisible = false;
            this.$message('新增失败');
            this.getCamera();
          }

        }).catch((error) => {
          this.submitDialogVisible = false;
          this.$message('新增失败');
          this.getCamera();
        });
      } else {
        var params = new URLSearchParams();
        params.append('name', this.submitForm.name);
        params.append('bs_unid', this.submitForm.build);
        params.append('unit_unid', this.selectedRow.unid);
        params.append('type_id', this.submitForm.cameraType);
        params.append('protocol', this.submitForm.protocol);
        params.append('IP4', this.submitForm.ipv4);
        params.append('port', this.submitForm.port);
        params.append('username', this.submitForm.username);
        params.append('password', this.submitForm.password);

        this.$http.put(Urlmaps.camera + '/' + this.submitForm.unid, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          if (response.status == 200) {
            this.submitDialogVisible = false;
            this.$message('修改成功');
            this.getCamera();
          } else {
            this.submitDialogVisible = false;
            this.$message('修改失败');
            this.getCamera();
          }

        }).catch((error) => {
          this.submitDialogVisible = false;
          this.$message('修改失败');
          this.getCamera();
        });
      }
    },
    deleteCamera(unid) {
      this.$http.delete(Urlmaps.camera + '/' + unid, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getCamera();
        } else {
          this.$message('删除失败');
          this.getCamera();
        }

      }).catch((error) => {
        this.$message('删除失败');
        this.getCamera();
      });
    },
    build: function(menuList) {
      // console.time('build')
      let temp = {};
      let ans = [];
      for (let i in menuList) {
        temp[menuList[i].unid] = {
          data: menuList[i],
          unid: menuList[i].unid,
          superUnid: menuList[i].super_unid
        };
      }
      this.buildData2 = temp;
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
  created() {
    this.getType();
    this.getUnitInfo();
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
