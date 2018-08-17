<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="巡检点位" :style="{width: '160px'}" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="打印状态" :style="{width: '130px'}" clearable>
              <el-option v-for="item in patrolStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.unit" placeholder="联网单位" :style="{width: '130px'}" clearable>
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
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}">打印二维码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :style="{borderRadius: '4px'}">导出二维码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table" v-loading="tableLoading">
        <el-table-column prop="name" label="巡检点位" min-width="100">
        </el-table-column>
        <el-table-column prop="area_name" label="所属区域" min-width="120">
        </el-table-column>
        <el-table-column prop="open_id" label="责任人" min-width="100">
        </el-table-column>
        <el-table-column prop="qr_status" label="二维码及打印状态" min-width="150">
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

      <!-- 新增/编辑界面 -->
      <el-dialog :title="(submitForm.type == 'add' ? '新增' : '编辑') + '巡检点位'" :visible.sync="submitDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form :rules="submitFormRule" :inline-message="true" :model="submitForm" ref="submitForm" label-position="top" label-width="120px">
              <el-form-item prop="name" label="点位名称">
                <el-input v-model="submitForm.name" :style="{width: '300px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="addr" label="点位地址">
                <el-input v-model="submitForm.addr" :style="{width: '300px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="qrcode" label="二维码编码">
                <el-input v-model="submitForm.qrcode" :style="{width: '300px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="human" label="责任人">
                <el-input v-model="submitForm.human" :style="{width: '300px'}">
                </el-input>
              </el-form-item>
              <el-form-item prop="area" label="所属分区">
                <el-select v-model="submitForm.area" clearable :style="{width: '300px'}">
                  <el-option v-for="item in patrolArea" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="build" label="消防建筑物">
                <el-select v-model="submitForm.build" clearable :style="{width: '300px'}">
                  <el-option v-for="item in buildData" :key="item.unid" :label="item.data.name" :value="item.unid">
                    <span v-if="item.data.inx == 1">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 2" style="margin-left: 16px;">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 3" style="margin-left: 32px;">3:{{ item.data.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload action="Urlmaps.img_upload" :show-file-list="false" :http-request="handleDetailUpload">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div style="display: flex; flex-wrap:wrap; margin-top: 20px;">
                  <div v-for="(item, index) in submitForm.url" :key="item" class="image_preview_container">
                    <div class="image_preview_content">
                      <el-popover placement="right" trigger="hover">
                        <div slot="reference" class="image_preview" :style="{backgroundImage: 'url(' + item + ')'}">
                          <el-button size="medium" style="float: right;" type="danger" circle icon="el-icon-delete" @click="deleteImage(index)"></el-button>
                        </div>
                        <img :src="item" style="max-width: 400px; min-width: 150px;" />
                      </el-popover>
                    </div>
                  </div>
                </div>
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
      unitData: {},
      tableLoading: false,
      tableData: [],
      patrolArea: {},
      buildData: [],
      buildData2: {},
      searchForm: {
        name: '',
        status: '',
        unit: ''
      },
      searchFormForHttp: {
        name: '',
        status: '',
        unit: ''
      },
      submitDialogVisible: false,
      submitForm: {
        type: '',
        unid: '',
        name: '',
        addr: '',
        qrcode: '',
        human: '',
        area: '',
        build: '',
        url: []
      },
      patrolStatus: [{
        value: 1,
        label: '已打印'
      }, {
        value: 2,
        label: '未打印'
      }],
      submitFormRule: {
        name: [{
          required: true,
          message: '请输入点位名称',
          trigger: 'change'
        }],
        addr: [{
          required: true,
          message: '请输入点位地址',
          trigger: 'change'
        }],
        qrcode: [{
          required: true,
          message: '请输入二维码编码',
          trigger: 'change'
        }],
        human: [{
          required: true,
          message: '请输入责任人',
          trigger: 'change'
        }],
        area: [{
          required: true,
          message: '请选择所属分区',
          trigger: 'change'
        }],
        build: [{
          required: true,
          message: '请选择消防建筑物',
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
      this.getPatrolPoint();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getPatrolPoint();
    },
    handleDetailUpload(param) {

      var fd = new FormData();
      fd.append('file', param.file);
      // fd.append('unit_unid', this.currentUnitUnid);

      this.$http.post(Urlmaps.img_upload, fd, {
        headers: {
          'Content-Type': 'application/form-data',
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.$message("上传成功");
          this.submitForm.url.push(response.headers.location);
        } else {
          this.$message("上传失败");
        }

      }).catch((error) => {
        this.$message("上传失败");
      })
    },
    deleteImage(index) {
      this.submitForm.url.splice(index, 1);
    },
    handleSearch() {
      this.page.current = 0;
      this.searchFormForHttp = this.searchForm;
      this.getPatrolPoint();
    },
    handleAdd() {
      this.submitForm = {
        type: 'add',
        unid: '',
        name: '',
        addr: '',
        qrcode: '',
        human: '',
        area: '',
        build: '',
        url: []
      };
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
        addr: row.addr,
        qrcode: row.qr_status,
        human: row.open_id,
        area: row.area_unid,
        build: row.bs_unid,
        url: row.url ? row.url.split(",") : []
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
        this.deletePatrolPoint(row.unid);
      }).catch(() => {
        this.getPatrolPoint();
      });
    },
    handleSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          if (this.submitForm.type == "add") {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('addr', this.submitForm.addr);
            params.append('qr_status', this.submitForm.qrcode);
            params.append('open_id', this.submitForm.human);
            params.append('area_unid', this.submitForm.area);
            params.append('bs_unid', this.submitForm.build);
            params.append('unit_unid', this.buildData2[this.submitForm.build].data.unit_unid);
            params.append('url', this.submitForm.url);

            this.$http.post(Urlmaps.patrol_point, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 201) {
                this.submitDialogVisible = false;
                this.$message('新增成功');
                this.getPatrolPoint();
              } else {
                this.submitDialogVisible = false;
                this.$message('新增失败');
                this.getPatrolPoint();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('新增失败');
              this.getPatrolPoint();
            });
          } else {
            var params = new URLSearchParams();
            params.append('name', this.submitForm.name);
            params.append('addr', this.submitForm.addr);
            params.append('qr_status', this.submitForm.qrcode);
            params.append('open_id', this.submitForm.human);
            params.append('area_unid', this.submitForm.area);
            params.append('bs_unid', this.submitForm.build);
            params.append('unit_unid', this.buildData2[this.submitForm.build].data.unit_unid);
            params.append('url', this.submitForm.url.join(','));

            this.$http.put(Urlmaps.patrol_point + '/' + this.submitForm.unid, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 200) {
                this.submitDialogVisible = false;
                this.$message('修改成功');
                this.getPatrolPoint();
              } else {
                this.submitDialogVisible = false;
                this.$message('修改失败');
                this.getPatrolPoint();
              }

            }).catch((error) => {
              this.submitDialogVisible = false;
              this.$message('修改失败');
              this.getPatrolPoint();
            });
          }
        } else {
          return false;
        }
      });
    },
    getPatrolPoint() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.patrol_point, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          name: this.searchFormForHttp.name,
          status: this.searchForm.status,
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
    deletePatrolPoint(unid) {
      this.$http.delete(Urlmaps.patrol_point + '/' + unid, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getPatrolPoint();
        } else {
          this.$message('删除失败');
          this.getPatrolPoint();
        }

      }).catch((error) => {
        this.$message('删除失败');
        this.getPatrolPoint();
      });
    },
    getPatrolArea() {
      this.$http.get(Urlmaps.patrol_area, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var area of response.data.collection) {
            this.patrolArea[area.unid] = area;
          }
        } else {}

      }).catch((error) => {});
    },
    getBuildStruct() {
      this.$http.get(Urlmaps.build, {
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
        } else {
          this.$message('获取建筑信息错误');
        }

      }).catch((error) => {
        this.$message('获取建筑信息错误');
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
  mounted() {
    this.getUnitInfo();
    this.getBuildStruct();
    this.getPatrolArea();
    this.getPatrolPoint();
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

.image_preview {
  width: 100%;
  height: 100%;
  display: block;
  background-position: center center;
  background-repeat: no-repeat;
}

.image_preview_container {
  position: relative;
  width: 33.33%;
  box-sizing: border-box;
  /* background: #ff0; */
}

.image_preview_container:before {
  content: " ";
  display: block;
  padding-top: 100%;
}

.image_preview_content {
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: 10px;
  left: 10px;
  /* background: #fff; */
}
</style>
