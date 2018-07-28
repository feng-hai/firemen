<template>
<el-row class="container" :gutter="20">
  <el-col :span="24" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" ref="searchForm" :model="searchForm">
          <el-row :gutter="10" style="margin-bottom: 10px;">
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.description" placeholder="隐患描述" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="searchForm.level" placeholder="隐患等级" clearable>
                  <el-option v-for="item in threatLevel" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="searchForm.type" placeholder="隐患类别" clearable>
                  <el-option v-for="item in threatType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="searchForm.unit" placeholder="联网单位" clearable>
                  <el-option v-for="item in unitData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-bottom: 10px;">
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="searchForm.reject" placeholder="有无驳回" clearable>
                  <el-option v-for="item in threatReject" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="searchForm.build" placeholder="楼层" clearable>
                  <el-option v-for="item in buildData" :key="item.unid" :label="item.data.name" :value="item.unid">
                    <span v-if="item.data.inx == 1">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 2" style="margin-left: 16px;">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 3" style="margin-left: 32px;">3:{{ item.data.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="searchForm.status" placeholder="状态" clearable>
                  <el-option v-for="item in threatStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="searchForm.human" placeholder="创建人" clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item>
                <el-date-picker v-model="searchForm.datetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button :style="{borderRadius: '4px'}" @click="handleSearch">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button :style="{borderRadius: '4px'}" @click="addDialogVisible = true">新增</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" border ref="table" v-loading="tableLoading">
        <el-table-column label="隐患照片" width="80" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              trigger="hover">
                <img :src="scope.row.url" style="max-width: 400px; min-width: 150px;" />
                <img :src="scope.row.url" slot="reference" style="max-width: 100%;" />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="隐患描述" min-width="120">
        </el-table-column>
        <el-table-column prop="level" label="隐患等级" width="70">
          <template slot-scope="scope">
            <template v-for="item in threatLevel">
              <template v-if="item.value == scope.row.level">{{item.label}}</template>
          </template>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="隐患类别" width="70">
          <template slot-scope="scope">
            <template v-for="item in threatType">
              <template v-if="item.value == scope.row.type">{{item.label}}</template>
          </template>
          </template>
        </el-table-column>
        <el-table-column prop="open_id" label="创建人" min-width="80">
        </el-table-column>
        <el-table-column prop="bs_name" label="楼层" min-width="70">
        </el-table-column>
        <el-table-column prop="location" label="具体位置" min-width="100">
        </el-table-column>
        <el-table-column prop="reject" label="有无驳回" width="70">
          <template slot-scope="scope">
            <template v-for="item in threatReject">
              <template v-if="item.value == scope.row.reject">{{item.label}}</template>
          </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="70">
          <template slot-scope="scope">
            <template v-for="item in threatStatus">
              <template v-if="item.value == scope.row.status">{{item.label}}</template>
          </template>
          </template>
        </el-table-column>
        <el-table-column prop="datime_sys" label="创建时间" width="140">
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-edit"
            :style="{padding: '0px'}"
            @click="handleDetail(scope.$index, scope.row)">
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
      <el-dialog title="新增计划" :visible.sync="addDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form label-position="top" :rules="addFormRule" :model="addForm" ref="addForm" label-width="120px">
              <el-form-item label="隐患类型" prop="type">
                <el-select v-model="addForm.type" placeholder="请选择">
                  <el-option v-for="item in threatType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="隐患等级" prop="level">
                <el-select v-model="addForm.level" placeholder="请选择">
                  <el-option v-for="item in threatLevel" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消防建筑物" prop="build">
                <el-select v-model="addForm.build" placeholder="请选择">
                  <el-option v-for="item in buildData" :key="item.unid" :label="item.data.name" :value="item.unid">
                    <span v-if="item.data.inx == 1">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 2" style="margin-left: 16px;">{{ item.data.name }}</span>
                    <span v-if="item.data.inx == 3" style="margin-left: 32px;">3:{{ item.data.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="具体位置" prop="location">
                <el-input v-model="addForm.location" type="textarea" resize="none" :rows="2" placeholder="请输入内容">
                </el-input>
              </el-form-item>
              <el-form-item label="隐患描述" prop="description">
                <el-input v-model="addForm.description" type="textarea" resize="none" :rows="2" placeholder="请输入内容">
                </el-input>
              </el-form-item>
              <el-form-item label="图片" prop="imgUrl">
                <el-upload action="Urlmaps.img_upload" :show-file-list="false" :http-request="handleAddUpload">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <img :src="addForm.imgUrl" style="margin-top: 10px; width: 50%;" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑界面 -->
      <el-dialog title="详情与处理" :visible.sync="detailDialogVisible">
        <el-row>
          <el-col :span="24">
            <el-form label-width="120px">
              <el-form-item label="隐患类型">
                <template v-for="item in threatType">
                  <template v-if="item.value == detailData.type">{{item.label}}</template>
                </template>
              </el-form-item>
              <el-form-item label="隐患等级">
                <template v-for="item in threatLevel">
                  <template v-if="item.value == detailData.level">{{item.label}}</template>
                </template>
              </el-form-item>
              <el-form-item label="图片">
                <img :src="detailData.url" style="max-width: 100%;" />
              </el-form-item>
              <el-form-item label="隐患描述">
                {{detailData.description}}
              </el-form-item>
              <el-form-item label="楼层">
                {{detailData.bs_name}}
              </el-form-item>
              <el-form-item label="具体位置">

              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row v-for="rectify in detailData.rectifys" :key="rectify.unid" style="border-top: 1px #c7c7c7 solid;">
          <el-col>
            <el-form label-width="120px">
              <el-form-item label="整改时间">
                {{rectify.datime_sys}}
              </el-form-item>
              <el-form-item label="图片">

              </el-form-item>
              <el-form-item label="隐患描述">
                {{rectify.description}}
              </el-form-item>
              <el-form-item label="经办人">
                {{rectify.open_id}}
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="border-top: 1px #c7c7c7 solid; padding-top: 10px;">
          <el-col>
            <el-form :rules="detailFormRule" :model="detailForm" ref="detailForm" label-width="120px">
              <el-form-item porp="description" label="整改描述">
                <el-input v-model="detailForm.description" type="textarea" resize="none" :rows="2" placeholder="请输入内容">
                </el-input>
              </el-form-item>
              <el-form-item label="图片">
                <el-upload action="Urlmaps.img_upload" :file-list="detailForm.url" list-type="picture-card" :http-request="handleDetailUpload">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitDetail(1)">整改完毕</el-button>
          <el-button type="primary" @click="submitDetail(0)">确认添加</el-button>
          <el-button @click="detailDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
import {
  Icons,
  Urlmaps,
  IconsAlarm
} from '@/config/config.js'

export default {
  data() {
    return {
      threatLevel: [{
        value: 1,
        label: '一般隐患'
      }, {
        value: 2,
        label: '较大隐患'
      }, {
        value: 3,
        label: '重大隐患'
      }, {
        value: 4,
        label: '特别重大隐患'
      }],
      threatType: [{
        value: 1,
        label: '消费管理'
      }, {
        value: 2,
        label: '消费组织'
      }, {
        value: 3,
        label: '人员素质'
      }, {
        value: 4,
        label: '生产设备'
      }],
      threatReject: [{
        value: 0,
        label: '有'
      }, {
        value: 1,
        label: '无'
      }],
      threatStatus: [{
        value: 0,
        label: '整改中'
      }, {
        value: 1,
        label: '已完成'
      }],
      unitData: {},
      buildData: [],
      buildData2: {},
      tableData: [],
      tableLoading: false,
      addDialogVisible: false,
      detailDialogVisible: false,
      detailData: {},
      searchForm: {
        description: '',
        level: '',
        type: '',
        unit: '',
        reject: '',
        build: '',
        status: '',
        human: '',
        datetime: ''
      },
      searchFormForHttp: {
        description: '',
        level: '',
        type: '',
        unit: '',
        reject: '',
        build: '',
        status: '',
        human: '',
        datetime: ''
      },
      addForm: {
        type: '',
        level: '',
        build: '',
        location: '',
        description: '',
        imgUrl: ''
      },
      addFormRule: {
        type: [{
          required: true,
          message: '请选择隐患类型',
          trigger: 'change'
        }],
        level: [{
          required: true,
          message: '请选择隐患等级',
          trigger: 'change'
        }],
        build: [{
          required: true,
          message: '请选择消防建筑物',
          trigger: 'change'
        }],
        imgUrl: [{
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        }]
      },
      detailFormRule: {
        description: [{
          required: true,
          message: '请输入描述',
          trigger: 'change'
        }]
      },
      detailForm: {
        description: '',
        url: [],
        unid: ''
      },
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      }
    }
  },
  methods: {
    clearAddForm() {
      this.addForm = {
        type: '',
        level: '',
        build: '',
        location: '',
        description: '',
        imgUrl: ''
      }
    },
    clearDetailForm() {
      this.detailForm = {
        description: '',
        url: [],
        unid: ''
      };
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getThreat();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getThreat();
    },
    handleSearch() {
      this.page.current = 0;
      this.searchFormForHttp = this.searchForm;
      this.getThreat();
    },
    handleAddUpload(param) {

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
          this.addForm.imgUrl = response.headers.location;
        } else {
          this.$message("上传失败");
        }

      }).catch((error) => {
        this.$message("上传失败");
      })
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
          this.detailForm.url.push(response.headers.location);
        } else {
          this.$message("上传失败");
        }

      }).catch((error) => {
        this.$message("上传失败");
      })
    },
    handleDetail(index, row) {
      this.detailDialogVisible = true;
      this.detailForm.unid = row.unid;
      this.getThreatDetail();
    },
    getThreat() {
      this.tableData = [];
      this.tableLoading = true;
      this.$http.get(Urlmaps.threat, {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          description: this.searchFormForHttp.description,
          level: this.searchFormForHttp.level,
          type: this.searchFormForHttp.type,
          unit_unid: this.searchFormForHttp.unit,
          reject: this.searchFormForHttp.reject,
          bs_unid: this.searchFormForHttp.build,
          status: this.searchFormForHttp.status,
          open_id: this.searchFormForHttp.human,
          datime_begin: this.searchFormForHttp.datetime == null ? '' : this.searchFormForHttp.datetime[0],
          datime_end: this.searchFormForHttp.datetime == null ? '' : this.searchFormForHttp.datetime[1]
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
    getThreatDetail() {
      this.$http.get(Urlmaps.threat + "/" + this.detailForm.unid, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.detailData = response.data;
        } else {}

      }).catch((error) => {});
    },
    addThreat(type, level, bsUnid, unitUnid, location, description, url, openId) {
      var params = new URLSearchParams();
      params.append('type', type);
      params.append('level', level);
      params.append('bs_unid', bsUnid);
      params.append('unit_unid', unitUnid);
      params.append('location', location);
      params.append('description', description);
      params.append('url', url);
      params.append('openId', openId);

      return this.$http.post(Urlmaps.threat, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    updateRecify(unid, description, url, status, openId) {
      var params = new URLSearchParams();
      params.append('unid', unid);
      params.append('description', description);
      params.append('url', url);
      params.append('status', status);
      params.append('open_id', openId);

      return this.$http.put(Urlmaps.threat_recify, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
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
    submitAdd() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addThreat(this.addForm.type, this.addForm.level, this.addForm.build, this.buildData2[this.addForm.build].data.unit_unid, this.addForm.location, this.addForm.description, this.addForm.imgUrl, JSON.parse(sessionStorage.getItem(
            'user')).unid).then((
            response) => {
            this.clearAddForm();
            if (response.status == 201) {
              this.addDialogVisible = false;
              this.$message('新增成功');
              this.getThreat();
            } else {
              this.addDialogVisible = false;
              this.$message('新增失败');
            }
          }).catch((error) => {
            this.clearAddForm();
            this.addDialogVisible = false;
            this.$message('新增失败');
          });
        } else {
          return false;
        }
      });
    },
    submitDetail(status) {
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          this.updateRecify(this.detailForm.unid, this.detailForm.description, this.detailForm.url, status, JSON.parse(sessionStorage.getItem(
            'user')).unid).then((
            response) => {
            this.clearDetailForm();
            if (status == 1) {
              if (response.status == 200) {
                this.detailDialogVisible = false;
                this.$message('整改完毕');
                this.getThreat();
              } else {
                this.detailDialogVisible = false;
                this.$message('整改失败');
              }
            } else if (status == 0) {
              if (response.status == 200) {
                this.detailDialogVisible = false;
                this.$message('添加成功');
                this.getThreat();
              } else {
                this.detailDialogVisible = false;
                this.$message('添加失败');
              }
            } else {
              this.$message('异常错误');
            }

          }).catch((error) => {
            this.clearDetailForm();
            this.detailDialogVisible = false;
            this.$message('异常错误');
          });
        } else {
          return false;
        }
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
    this.getBuildStruct();
    this.getUnitInfo();
    this.getThreat();
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
