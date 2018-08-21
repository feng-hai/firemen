<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <!-- <el-row class="search_wrapper">
      <el-col :span="20">
        <el-input placeholder="请输入内容" class="search transparent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row> -->
    <el-row>
      <el-table class="table no_header_table" :data="tableDataLeft" ref="table" highlight-current-row @row-click="handleBuildSelect">
        <el-table-column prop="data.name" label="">
        </el-table-column>
      </el-table>
    </el-row>
  </el-col>
  <el-col :span="19" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">{{currentBuild.data.name}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchText" placeholder="请输入内容" :style="{width: '180px'}" clearable @keydown.enter.native="handleSearchEnter" @clear="handleSearchClear">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="handleFacilityGroupAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-table class="table" :data="tableDataRight" border>
        <el-table-column prop="name" label="名称" min-width="180">
        </el-table-column>
        <el-table-column prop="bs_name" label="所属区域" min-width="180">
        </el-table-column>
        <el-table-column prop="count" label="包含设备" width="100">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
            type="text"
            icon="icon-edit"
            @click="handleFacilityGroupEdit(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-son"
            @click="handleFacilityGroupSub(scope.$index, scope.row)">
            </el-button>
            <el-button
            type="text"
            icon="icon-delete"
            @click="handleFacilityGroupDelete(scope.$index, scope.row)">
            </el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total" @size-change="handleSizeChange" @current-change="handlePageChange" @prev-click="handlePageChange"
          @next-click="handlePageChange">
        </el-pagination>
      </div>

      <!-- 新增/编辑 消防设施组界面 -->
      <el-dialog title="区域信息" :visible.sync="groupDialogFormVisible" width="40%">
        <el-form :model="groupForm" ref="groupForm">
          <el-form-item prop="unid" hidden>
          </el-form-item>
          <el-form-item label="名称" prop="name" :label-width="80">
            <el-input v-model="groupForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="groupDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="groupSubmit" :loading="groupDialogLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 二级界面 -->
      <el-dialog title="消防设施" :visible.sync="subDialogFormVisible" @close="handleSubDialogClose" width="70%">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-table :data="tableDataSub" border ref="subTable" highlight-current-row @current-change="handleSubTable">
              <el-table-column prop="name" label="名称">
              </el-table-column>
              <el-table-column prop="type_name" label="设备类型">
              </el-table-column>
              <el-table-column prop="model" label="设备型号">
              </el-table-column>
              <el-table-column prop="bs_name" label="所属区域">
              </el-table-column>
            </el-table>
            <el-button type="primary" size="normal" @click="handleSubAdd" style="margin-top: 10px;">新增</el-button>
          </el-col>
          <el-col :span="12">
            <el-form :model="subForm" ref="subForm">
              <el-form-item label="消防设施" prop="assetUnid" :label-width="formLabelWidth">
                <el-select v-model="subForm.assetUnid" placeholder="请选择消防设施" filterable @change="handleAssetChange">
                  <el-option v-for="item in assetData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="assetName" :label-width="formLabelWidth" hidden>
                <el-input v-model="subForm.assetName" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="设备类别" prop="assetType" :label-width="formLabelWidth">
                <el-input v-model="subForm.assetType" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="设备型号" prop="assetModel" :label-width="formLabelWidth">
                <el-input v-model="subForm.assetModel" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="所属区域" prop="build" :label-width="formLabelWidth">
                <el-select v-model="subForm.build" placeholder="请选择建筑" filterable>
                  <el-option v-for="item in areaData[currentBuild.unid]" :key="item.unid" :label="item.data.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联设备" prop="facility" :label-width="formLabelWidth">
                <el-select v-model="subForm.facility" multiple collapse-tags placeholder="请选择关联设备">
                  <el-option v-for="item in unionFacility" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联视频" prop="camera" :label-width="formLabelWidth">
                <el-select v-model="subForm.camera" multiple collapse-tags placeholder="请选择关联视频">
                  <el-option v-for="item in cameraData" :key="item.unid" :label="item.name" :value="item.unid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机号" prop="host" :label-width="formLabelWidth">
                <el-input v-model="subForm.host" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="分机号" prop="channel" :label-width="formLabelWidth">
                <el-input v-model="subForm.channel" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="区号" prop="zone" :label-width="formLabelWidth">
                <el-input v-model="subForm.zone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="位号" prop="slot" :label-width="formLabelWidth">
                <el-input v-model="subForm.slot" auto-complete="off"></el-input>
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
      cameraData: {},
      assetData: {},
      areaData: {},
      tableDataLeft: [],
      buildData: [],
      currentBuild: {},
      tableDataRight: [],
      currentGroup: {},
      tableDataSub: [],
      unionFacility: [],
      groupDialogFormVisible: false,
      groupForm: {
        unid: '',
        name: ''
      },
      groupDialogLoading: false,
      subDialogFormVisible: false,
      subForm: {
        type: 'add',
        assetUnid: '',
        assetName: '',
        assetType: '',
        assetTypeUnid: '',
        assetModel: '',
        assetModelUnid: '',
        build: '',
        facility: [],
        camera: [],
        host: '',
        channel: '',
        zone: '',
        slot: ''
      },
      formLabelWidth: '120px',
      page: {
        total: 0,
        current: 0,
        size: 5
      },
      searchText: ''
    }
  },
  methods: {
    handleSearchEnter(event) {
      event.preventDefault();
      this.getFacilityGroup();
    },
    handleSearchClear() {
      this.getFacilityGroup();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getFacilityGroup();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getFacilityGroup();
    },
    handleBuildSelect(row, event, column) {
      this.currentBuild = row;
      this.searchText = '';
      this.getFacilityGroup();
    },
    handleFacilityGroupAdd() {
      this.groupForm.unid = '';
      this.groupForm.name = '';
      this.searchText = '';
      this.groupDialogFormVisible = true;
    },
    handleFacilityGroupEdit(index, row) {
      this.groupForm.unid = row.unid;
      this.groupForm.name = row.name;
      this.groupDialogFormVisible = true;
    },
    handleFacilityGroupDelete(index, row) {
      if (row.count != 0) {
        this.$message('存在子设备，不可删除');
      } else {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.deleteFacilityGroup(row.unid);
        }).catch(() => {

        });
      }
    },
    handleFacilityGroupSub(index, row) {
      this.currentGroup = row;
      this.unionFacility = [];
      this.getFacility();
      this.getAsset();
      this.subForm = {
        type: 'add',
        assetUnid: '',
        assetName: '',
        assetType: '',
        assetTypeUnid: '',
        assetModel: '',
        assetModelUnid: '',
        build: '',
        facility: [],
        camera: [],
        host: '',
        channel: '',
        zone: '',
        slot: ''
      };
      this.subDialogFormVisible = true;
    },
    groupSubmit() {
      this.groupDialogLoading = true;

      if (this.groupForm.unid == '') {
        this.addFacilityGroup(this.groupForm.name, this.currentBuild.data.unit_unid, this.currentBuild.unid).then((response) => {
          if (response.status == 201) {
            this.groupDialogLoading = false;
            this.groupDialogFormVisible = false;
            this.$message('新增成功');
            this.getFacilityGroup();
          } else {
            this.groupDialogLoading = false;
            this.groupDialogFormVisible = false;
            this.$message('新增失败');
          }
        }).catch((error) => {
          this.groupDialogLoading = false;
          this.groupDialogFormVisible = false;
          this.$message('新增失败');
        });
      } else {
        this.editFacilityGroup(this.groupForm.unid, this.groupForm.name, this.currentBuild.data.unit_unid, this.currentBuild.unid).then((response) => {
          if (response.status == 200) {
            this.groupDialogLoading = false;
            this.groupDialogFormVisible = false;
            this.$message('修改成功');
            this.getFacilityGroup();
          } else {
            this.groupDialogLoading = false;
            this.groupDialogFormVisible = false;
            this.$message('修改失败');
          }
        }).catch((error) => {
          this.groupDialogLoading = false;
          this.groupDialogFormVisible = false;
          this.$message('修改失败');
        });
      }
    },
    submitSub() {
      if (this.subForm.type == "add") {
        this.addFacility(this.subForm.assetUnid, this.subForm.assetName, this.subForm.assetTypeUnid, this.subForm.assetModelUnid, this.subForm.build, this.currentGroup.unid, this.subForm.host, this.subForm.channel,
          this.subForm.zone, this.subForm
          .slot,
          this.subForm.facility ? this.subForm.facility.join(",") : '', this.subForm.camera ? this.subForm.camera.join(",") : '').then((response) => {
          if (response.status == 201) {
            this.$message('新增成功');
            this.getFacilityGroup();
          } else {
            this.$message('新增失败');
          }
          this.subDialogFormVisible = false;
        }).catch((error) => {
          this.$message('新增失败');
          this.subDialogFormVisible = false;
        });
      } else {
        this.editFacility(this.subForm.assetUnid, this.subForm.assetName, this.subForm.assetTypeUnid, this.subForm.assetModelUnid, this.subForm.build, this.currentGroup.unid, this.subForm.host, this.subForm.channel,
          this.subForm.zone, this.subForm
          .slot,
          this.subForm.facility.join(","), this.subForm.camera.join(",")).then((response) => {
          if (response.status == 200) {
            this.$message('修改成功');
            this.getFacilityGroup();
          } else {
            this.$message('修改失败');
          }
          this.subDialogFormVisible = false;
        }).catch((error) => {
          this.$message('修改失败');
          this.subDialogFormVisible = false;
        });
      }
    },
    handleSubDelete() {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteFacility(this.subForm.unid);
        this.subDialogFormVisible = false;
      }).catch(() => {

      });
    },
    getAsset() {
      this.$http.get('https://api.renxingzuche.com/bigger/asset', {
        params: {
          flag_ava: '0',
          unit_unid: this.currentBuild.data.unit_unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.assetData = {};
          for (var asset of response.data.collection) {
            this.assetData[asset.unid] = asset;
          }
        } else {}

      }).catch((error) => {});
    },
    getAsset2(unid) {
      return this.$http.get('https://api.renxingzuche.com/bigger/asset/' + unid, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    getBuildStruct() {

      this.$http.get('/build_struct', {
        baseURL: 'https://api.renxingzuche.com/bigger',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.buildData = this.build(response.data.collection);
          for (var build of this.buildData) {
            this.tableDataLeft.push(build);
            this.areaData[build.unid] = [];
            if (build.children) {
              for (var build2 of build.children) {
                this.areaData[build.unid].push(build2);
                if (build2.children) {
                  for (var build3 of build2.children) {
                    this.areaData[build.unid].push(build3);
                  }
                }
              }
            }
          }
          this.currentBuild = this.tableDataLeft[0];
          setTimeout(() => {
            this.$refs['table'].setCurrentRow(this.tableDataLeft[0]);
          }, 10);
          this.getFacilityGroup();
        } else {}

      }).catch((error) => {});
    },
    getFacilityGroup() {
      this.tableDataRight = [];
      this.$http.get('https://api.renxingzuche.com/bigger/facility_group', {
        params: {
          page_id: this.page.current,
          page_size: this.page.size,
          bs_unid: this.currentBuild.unid,
          q: this.searchText
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.tableDataRight = response.data.collection;
          this.page.total = response.data.count;
        } else {
          this.page.total = 0;
        }
      }).catch((error) => {
        this.page.total = 0;
      });
    },
    addFacilityGroup(name, unitUnid, bsUnid) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('unit_unid', unitUnid);
      params.append('bs_unid', bsUnid);

      return this.$http.post('https://api.renxingzuche.com/bigger/facility_group', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    editFacilityGroup(unid, name, unitUnid, bsUnid) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('unit_unid', unitUnid);
      params.append('bs_unid', bsUnid);

      return this.$http.put('https://api.renxingzuche.com/bigger/facility_group/' + unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    deleteFacilityGroup(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/facility_group/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getFacilityGroup();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    getFacility() {
      this.tableDataSub = [];
      this.$http.get('https://api.renxingzuche.com/bigger/facility', {
        params: {
          unit_unid: this.currentGroup.unit_unid,
          group_unid: this.currentGroup.unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.tableDataSub = response.data.collection;
          this.unionFacility = this.tableDataSub;
        } else {}

      }).catch((error) => {});
    },
    addFacility(unid, name, typeUnid, modelUnid, bsUnid, groupUnid, hostId, channelId, zoneId, slotId, facilityUnids, cameraUnids) {
      var params = new URLSearchParams();
      params.append("unid", unid);
      params.append('name', name);
      params.append('bs_unid', bsUnid);
      params.append('group_unid', groupUnid);
      params.append('host_id', hostId);
      params.append('channel_id', channelId);
      params.append('zone_id', zoneId);
      params.append('slot_id', slotId);
      params.append('type_unid', typeUnid);
      params.append('model_unid', modelUnid);
      params.append('facility_unids', facilityUnids);
      params.append('camera_unids', cameraUnids);

      return this.$http.post('https://api.renxingzuche.com/bigger/facility', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    editFacility(unid, name, typeUnid, modelUnid, bsUnid, groupUnid, hostId, channelId, zoneId, slotId, facilityUnids, cameraUnids) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('bs_unid', bsUnid);
      params.append('group_unid', groupUnid);
      params.append('host_id', hostId);
      params.append('channel_id', channelId);
      params.append('zone_id', zoneId);
      params.append('slot_id', slotId);
      params.append('type_unid', typeUnid);
      params.append('model_unid', modelUnid);
      params.append('facility_unids', facilityUnids);
      params.append('camera_unids', cameraUnids);

      return this.$http.put('https://api.renxingzuche.com/bigger/facility/' + unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    deleteFacility(unid) {

      this.$http.delete('https://api.renxingzuche.com/bigger/facility/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getFacilityGroup();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    getCamera() {
      this.$http.get('https://api.renxingzuche.com/bigger/camera', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var camera of response.data.collection) {
            this.cameraData[camera.unid] = camera;
          }
        } else {}

      }).catch((error) => {});
    },
    handleAssetChange(val) {
      this.subForm.assetName = this.assetData[val].name;
      this.subForm.assetType = this.assetData[val].facility_type_name;
      this.subForm.assetTypeUnid = this.assetData[val].facility_type_unid;
      this.subForm.assetModel = this.assetData[val].model_name;
      this.subForm.assetModelUnid = this.assetData[val].model_unid;
    },
    handleSubDialogClose() {
      this.subForm = {
        type: 'add',
        assetUnid: '',
        assetName: '',
        assetType: '',
        assetTypeUnid: '',
        assetModel: '',
        assetModelUnid: '',
        build: '',
        facility: [],
        camera: [],
        host: '',
        channel: '',
        zone: '',
        slot: ''
      };
    },
    handleSubAdd() {
      this.getAsset();
      this.unionFacility = this.tableDataSub;
      this.subForm = {
        type: 'add',
        assetUnid: '',
        assetName: '',
        assetType: '',
        assetTypeUnid: '',
        assetModel: '',
        assetModelUnid: '',
        build: '',
        facility: [],
        camera: [],
        host: '',
        channel: '',
        zone: '',
        slot: ''
      };
    },
    handleSubTable(val) {
      this.unionFacility = [];
      for (var facility of this.tableDataSub) {
        if (facility.unid != val.unid) {
          this.unionFacility.push(facility);
        }
      }
      this.getAsset2(val.unid).then((response) => {
        if (response.status == 200) {
          this.assetData = {};
          this.assetData[response.data.unid] = response.data;
          this.subForm.unid = val.unid;
          this.subForm.type = "edit";
          this.subForm.assetUnid = val.unid;
          this.subForm.assetName = this.assetData[val.unid].name;
          this.subForm.assetType = this.assetData[val.unid].facility_type_name;
          this.subForm.assetTypeUnid = this.assetData[val.unid].facility_type_unid;
          this.subForm.assetModel = this.assetData[val.unid].model_name;
          this.subForm.assetModelUnid = this.assetData[val.unid].model_unid;
          this.subForm.build = val.bs_unid;
          this.subForm.facility = val.facility_unids ? val.facility_unids.split(",") : [];
          this.subForm.camera = val.camera_unids ? val.camera_unids.split(",") : [];
          this.subForm.host = val.host_id;
          this.subForm.channel = val.channel_id;
          this.subForm.zone = val.zone_id;
          this.subForm.slot = val.slot_id;
        } else {}

      }).catch((error) => {});
    },
    build: function(menuList) {
      // console.time('build')
      let test = null;
      let temp = {};
      let ans = [];
      for (let i in menuList) {
        temp[menuList[i].unid] = {
          data: menuList[i],
          unid: menuList[i].unid,
          superUnid: menuList[i].super_unid
        };
      }
      for (let i in temp) {
        test = temp[i];
        if (test.superUnid || test.data.inx > 1) {
          if (!temp[test.superUnid]) {
            continue;
          }
          if (!temp[test.superUnid].children) {
            temp[test.superUnid].children = new Array();
          }
          temp[test.superUnid].children.push(temp[i]);
        } else {
          ans.push(temp[i]);
        }
      }
      return ans;
    }
  },
  mounted() {
    this.getCamera();
    // this.getAsset();
    this.getBuildStruct();
  }
}
</script>

<style scoped>
.left .search_wrapper {
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
