<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <el-row class="search_wrapper">
      <!-- <el-col :span="20">
        <el-input placeholder="请输入内容" class="search transparent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col> -->
      <el-col :span="4">
        <el-button size="mini" @click="buildDialogFormVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table class="table no_header_table" :data="tableDataLeft" ref="table" highlight-current-row @row-click="handleBuildSelect" v-loading="buildTableLoading">
        <el-table-column prop="name" label="">
        </el-table-column>
        <el-table-column label="" width="100">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-edit"
            :style="{padding: '0px'}"
            @click="handleBuildEdit(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-delete"
            :style="{padding: '0px'}"
            @click="handleBuildDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- <el-row class="new_wrapper">
      <el-button type="text" icon="el-icon-plus">新增站点</el-button>
    </el-row> -->
  </el-col>
  <el-col :span="19" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">{{currentBuild.name}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchText" placeholder="请输入内容" :style="{width: '180px'}" clearable @keydown.enter.native="handleSearchEnter" @clear="handleSearchClear">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="handleLevelAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-table class="table" :data="tableDataRight" border v-loading="levelTableLoading">
        <el-table-column prop="sort" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="count" label="子区域" min-width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-edit"
            @click="handleLevelEdit(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-son"
            @click="handleLevelSub(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-delete"
            @click="handleLevelDelete(scope.$index, scope.row)">
            </el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total" @size-change="handleSizeChange" @current-change="handlePageChange" @prev-click="handlePageChange"
          @next-click="handlePageChange">
        </el-pagination>
      </div>

      <!-- 新增/编辑 建筑界面 -->
      <el-dialog title="建筑信息" :visible.sync="buildDialogFormVisible" @close="handleBuildDialogClose">
        <el-form :model="buildForm" ref="buildForm">
          <el-form-item prop="unid" hidden>
          </el-form-item>
          <el-form-item label="名称" prop="name" :label-width="120">
            <el-input v-model="buildForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="序号" prop="sort" :label-width="120">
            <el-input v-model="buildForm.sort" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属联网单位" prop="unit" :label-width="120">
            <el-select v-model="buildForm.unit" placeholder="请选择所属分组">
              <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="buildDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="buildSubmit" :loading="buildDialogLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新增/编辑 楼层界面 -->
      <el-dialog title="建筑信息" :visible.sync="levelDialogFormVisible" @close="handleLevelDialogClose">
        <el-form :inline="true" :model="levelForm" ref="levelForm">
          <el-col :span="12">
            <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
              <el-input v-model="levelForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="序号" prop="sort" :label-width="formLabelWidth">
              <el-input v-model="levelForm.sort" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="地图" prop="imgUrl" :label-width="formLabelWidth">
              <el-upload action="https://api.renxingzuche.com/bigger/image" :show-file-list="false" :http-request="handleLevelUpload">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <img :src="levelForm.imgUrl" style="margin-top: 10px; width: 50%;" />
            </el-form-item>
            <el-form-item prop="unid" hidden>
            </el-form-item>
          </el-col>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="levelDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="levelSubmit" :loading="levelDialogLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 二级界面 -->
      <el-dialog title="编辑子区域" :visible.sync="subDialogFormVisible" @close="handleSubDialogClose">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-table :data="tableDataSub" border ref="subTable" highlight-current-row @current-change="handleSubTable">
              <el-table-column prop="sort" label="序号">
              </el-table-column>
              <el-table-column prop="name" label="名称">
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="handleSubAdd" size="normal" style="margin-top: 10px;">新增</el-button>
          </el-col>
          <el-col :span="12">
            <el-form :model="subForm" :rules="rules" ref="subForm">
              <el-form-item prop="type" :label-width="formLabelWidth" hidden>
              </el-form-item>
              <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="subForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="序号" prop="sort" :label-width="formLabelWidth">
                <el-input v-model="subForm.sort" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="imgUrl" label="地图" :label-width="formLabelWidth">
                <el-upload action="https://api.renxingzuche.com/bigger/image" :show-file-list="false" :http-request="handleSubUpload">
                  <el-button size="small" type="primary">上传</el-button>
                </el-upload>
                <img :src="subForm.imgUrl" style="width: 200px; background-color: #efefef; margin-top: 10px;"></div>
              </el-form-item>
              <el-form-item label="地图尺寸" :label-width="formLabelWidth">
                <el-input auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth">
                <el-button :style="{backgroundColor: '#ffe9d2'}" @click="submitSub">保存配置信息</el-button>
                <el-button :style="{backgroundColor: '#ffe9d2'}" @click="handleSubDelete" v-show="subForm.type == 'add' ? false : true">删除配置信息</el-button>
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
export default {
  data() {
    return {
      searchText: '',
      buildDialogFormVisible: false,
      levelDialogFormVisible: false,
      buildTableLoading: false,
      levelTableLoading: false,
      tableDataLeft: [],
      currentBuild: {},
      tableDataRight: [],
      currentLevel: {},
      tableDataSub: [],
      buildData: [],
      unitData: {},
      // currentUnitUnid: '',
      // currentBuildUnid: '',
      // currentLevelUnid: '',
      subForm: {
        type: 'add',
        unid: '',
        name: '',
        sort: ''
      },
      addBuildDialogFormVisible: false,
      addLevelDialogFormVisible: false,
      editBuildDialogFormVisible: false,
      editLevelDialogFormVisible: false,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      subDialogFormVisible: false,
      buildForm: {
        unid: '',
        name: '',
        unit: '',
        sort: ''
      },
      levelForm: {
        unid: '',
        name: '',
        sort: '',
        imgUrl: ''
      },
      subForm: {
        type: 'add',
        unid: '',
        name: '',
        sort: '',
        imgUrl: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }, ],
        sort: [{
          required: true,
          message: '请输入序号',
          trigger: 'blur'
        }, ]
      },
      formLabelWidth: '80px',
      buildDialogLoading: false,
      levelDialogLoading: false,
      page: {
        total: 0,
        current: 0,
        size: 5
      }
    }
  },
  methods: {
    handleSearchEnter(event) {
      event.preventDefault();
      this.getLevel();
    },
    handleSearchClear() {
      this.getLevel();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getAsset();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getAsset();
    },
    handleLevelUpload(param) {

      var fd = new FormData();
      fd.append('file', param.file);
      fd.append('unit_unid', this.currentUnitUnid);

      this.$http.post('https://api.renxingzuche.com/bigger/image', fd, {
        headers: {
          'Content-Type': 'application/form-data',
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.$message("上传成功");
          this.levelForm.imgUrl = response.headers.location;
        } else {
          this.$message("上传失败");
        }

      }).catch((error) => {
        this.$message("上传失败");
      })
    },
    handleSubUpload(param) {
      var fd = new FormData();
      fd.append('file', param.file);
      fd.append('unit_unid', this.currentUnitUnid);

      this.$http.post('https://api.renxingzuche.com/bigger/image', fd, {
        headers: {
          'Content-Type': 'application/form-data',
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.$message("上传成功");
          this.subForm.imgUrl = response.headers.location;
        } else {
          this.$message("上传失败");
        }

      }).catch((error) => {
        this.$message("上传失败");
      })
    },
    buildSubmit() {
      this.buildDialogLoading = true;

      if (this.buildForm.unid == '') {
        this.addBuildStruct(this.buildForm.name, this.buildForm.sort, "1", "", this.buildForm.unit).then((response) => {
          if (response.status == 201) {
            this.buildDialogLoading = false;
            this.buildDialogFormVisible = false;
            this.searchText = '';
            this.$message('新增成功');
            this.getBuild();
          } else {
            this.buildDialogLoading = false;
            this.buildDialogFormVisible = false;
            this.$message('新增失败');
          }
        }).catch((error) => {
          this.buildDialogLoading = false;
          this.buildDialogFormVisible = false;
          this.$message('新增失败');
        });
      } else {
        this.editBuildStruct(this.buildForm.unid, this.buildForm.name, this.buildForm.sort, this.buildForm.unit).then((response) => {
          if (response.status == 200) {
            this.buildDialogLoading = false;
            this.buildDialogFormVisible = false;
            this.$message('修改成功');
            this.getBuild();
          } else {
            this.buildDialogLoading = false;
            this.buildDialogFormVisible = false;
            this.$message('修改失败');
          }
        }).catch((error) => {
          this.buildDialogLoading = false;
          this.buildDialogFormVisible = false;
          this.$message('修改失败');
        });
      }
    },
    handleBuildDialogClose() {
      this.$refs.buildForm.resetFields();
    },
    handleBuildEdit(index, row) {
      this.buildForm.unid = row.unid;
      this.buildForm.name = row.name;
      this.buildForm.sort = row.sort;
      this.buildForm.unit = row.unit_unid;
      this.buildDialogFormVisible = true;
    },
    handleBuildDelete: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteBuildStruct(row.unid);
      }).catch(() => {

      });
    },
    handleBuildSelect(row, event, column) {
      // this.tableDataRight = [];
      // this.rightTitle = row.data.name;
      // this.currentBuildUnid = row.unid;
      // this.currentUnitUnid = row.data.unit_unid;
      // this.tableDataRight = row.children;
      this.searchText = '';
      this.currentBuild = row;
      this.getLevel();
    },
    levelSubmit() {
      this.levelDialogLoading = true;

      if (this.levelForm.unid == '') {
        this.addBuildStruct(this.levelForm.name, this.levelForm.sort, "2", this.currentBuild.unid, this.currentBuild.unit_unid, this.levelForm.imgUrl).then((response) => {
          if (response.status == 201) {
            this.levelDialogLoading = false;
            this.levelDialogFormVisible = false;
            this.searchText = '';
            this.$message('新增成功');
            this.getBuild();
          } else {
            this.levelDialogLoading = false;
            this.levelDialogFormVisible = false;
            this.$message('新增失败');
          }
        }).catch((error) => {
          this.levelDialogLoading = false;
          this.levelDialogFormVisible = false;
          this.$message('新增失败');
        });
      } else {
        this.editBuildStruct(this.levelForm.unid, this.levelForm.name, this.levelForm.sort, this.currentBuild.unit_unid, this.levelForm.imgUrl).then((response) => {
          if (response.status == 200) {
            this.levelDialogLoading = false;
            this.levelDialogFormVisible = false;
            this.$message('修改成功');
            this.getBuild();
          } else {
            this.levelDialogLoading = false;
            this.levelDialogFormVisible = false;
            this.$message('修改失败');
          }
        }).catch((error) => {
          this.levelDialogLoading = false;
          this.levelDialogFormVisible = false;
          this.$message('修改失败');
        });
      }
    },
    handleLevelAdd() {
      this.levelDialogFormVisible = true;
      this.levelForm.unid = '';
      this.levelForm.name = '';
      this.levelForm.sort = '';
      this.levelForm.unit = '';
      this.levelForm.imgUrl = '';
      // this.imageFileUrl = '';
    },
    handleLevelDialogClose() {
      // this.$refs.levelForm.resetFields();
    },
    handleLevelEdit(index, row) {
      this.levelForm.unid = row.unid;
      this.levelForm.name = row.name;
      this.levelForm.sort = row.sort;
      this.levelForm.unit = row.unit_unid;
      this.levelForm.imgUrl = row.graph_url;
      this.levelDialogFormVisible = true;
    },
    handleLevelDelete(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteBuildStruct(row.unid);
      }).catch(() => {

      });
    },
    handleLevelSub(index, row) {
      // 打开子界面
      this.subDialogFormVisible = true;
      this.currentLevel = row;
      this.getSub();
    },
    handleSubTable(val) {
      this.subForm.type = "edit";
      this.subForm.unid = val.unid;
      this.subForm.name = val.name;
      this.subForm.sort = val.sort;
      this.subForm.imgUrl = val.graph_url;
    },
    handleSubDialogClose() {
      this.$refs.subForm.resetFields();
    },
    handleSubAdd() {
      this.$refs.subForm.resetFields();
      this.subImageFileUrl = '';
    },
    submitSub: function() {
      this.$refs.subForm.validate((valid) => {
        if (valid) {
          if (this.subForm.type == "add") {
            this.addBuildStruct(this.subForm.name, this.subForm.sort, "3", this.currentLevel.unid, this.currentLevel.unit_unid, this.subForm.imgUrl).then((response) => {
              if (response.status == 201) {
                this.$message('新增成功');
                this.getBuild();
              } else {
                this.$message('新增失败');
              }
              this.subDialogFormVisible = false;
            }).catch((error) => {
              this.$message('新增失败');
              this.subDialogFormVisible = false;
            });
          } else {
            this.editBuildStruct(this.subForm.unid, this.subForm.name, this.subForm.sort, this.currentLevel.unit_unid, this.subForm.imgUrl).then((response) => {
              if (response.status == 200) {
                this.$message('修改成功');
                this.getBuild();
              } else {
                this.$message('修改失败');
              }
              this.subDialogFormVisible = false;
            }).catch((error) => {
              this.$message('修改失败');
              this.subDialogFormVisible = false;
            });
          }
        } else {
          return false;
        }
      });
    },
    getBuild() {
      this.buildTableLoading = true;
      this.tableDataLeft = [];

      this.$http.get('https://api.renxingzuche.com/bigger/build_struct', {
        params: {
          inx: 1
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.buildTableLoading = false;
        if (response.status == 200) {
          this.tableDataLeft = response.data.collection.sort(function() {
            return function(obj1, obj2) {
              var value1 = obj1['sort'];
              var value2 = obj2['sort'];
              return value1 - value2;
            }
          });
          this.currentBuild = this.tableDataLeft[0];
          setTimeout(() => {
            this.$refs['table'].setCurrentRow(this.tableDataLeft[0]);
          }, 10);

          this.getLevel();
        } else {
          this.$message('获取建筑失败!');
        }

      }).catch((error) => {
        this.buildTableLoading = false;
        this.$message('获取建筑失败!');
      });
    },
    getLevel() {
      this.tableDataRight = [];
      this.levelTableLoading = true;

      this.$http.get('https://api.renxingzuche.com/bigger/build_struct', {
        params: {
          inx: 2,
          super_unid: this.currentBuild.unid,
          q: this.searchText,
          page_id: this.page.current,
          page_size: this.page.size
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.levelTableLoading = false;
        if (response.status == 200) {
          this.tableDataRight = response.data.collection;
          this.page.total = response.data.count;
        } else {
          this.page.total = 0;
        }

      }).catch((error) => {
        this.levelTableLoading = false;
      });
    },
    getSub() {
      this.tableDataSub = [];

      this.$http.get('https://api.renxingzuche.com/bigger/build_struct', {
        params: {
          inx: 3,
          super_unid: this.currentLevel.unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.tableDataSub = response.data.collection;
        } else {}

      }).catch((error) => {});
    },
    deleteBuildStruct: function(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/build_struct/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getBuild();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    addBuildStruct(name, sort, inx, superUnid, unitUnid, graphUrl) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('sort', sort);
      params.append('inx', inx);
      if (superUnid != "") {
        params.append('super_unid', superUnid);
      }
      params.append('unit_unid', unitUnid);
      params.append('graph_url', "");
      params.append('vr_url', "");

      return this.$http.post('https://api.renxingzuche.com/bigger/build_struct', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    editBuildStruct(unid, name, sort, unitUnid, graphUrl) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('sort', sort);
      params.append('graph_url', graphUrl);
      params.append('unit_unid', unitUnid);

      return this.$http.put('https://api.renxingzuche.com/bigger/build_struct/' + unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
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
            this.$set(this.unitData, unitInfo.unid, unitInfo);
          }
        } else {}

      }).catch((error) => {});
    },
    handleSubDelete() {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteBuildStruct(this.subForm.unid);
        this.subDialogFormVisible = false;
      }).catch(() => {

      });
    }
  },
  mounted() {
    // this.getBuildStruct();
    this.getBuild();
    this.getUnitInfo();
  }
}
</script>

<style scoped>
.left .search_wrapper {
  padding-bottom: 10px;
  /* padding: 7px 12px 7px 2px;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  border-radius: 4px 4px 0 0; */
}

.left .table {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
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

/* .el-table {
  font-size: 15px;
} */
</style>
