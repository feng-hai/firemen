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
        <el-table-column prop="name" label="名称" min-width="180">
        </el-table-column>
        <el-table-column prop="facility_type_name" label="设备类型" min-width="180">
        </el-table-column>
        <el-table-column prop="system_name" label="系统类型" min-width="180">
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

      <!-- 新增/编辑 消防设施组界面 -->
      <el-dialog title="资产信息" :visible.sync="assetDialogFormVisible" width="50%">
        <el-form :model="assetForm" ref="assetForm">
          <el-form-item prop="unid" hidden>
          </el-form-item>
          <el-form-item label="资产名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model="assetForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="厂家" prop="vendor" :label-width="formLabelWidth">
            <el-select v-model="assetForm.vendor" placeholder="请选择厂家" @change="handleVendorSelect">
              <el-option v-for="item in verderData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统类型" prop="system" :label-width="formLabelWidth">
            <el-select v-model="assetForm.system" placeholder="请选择系统类型">
              <el-option v-for="item in systemData" :key="item.unid" :label="item.system_name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类别" prop="type" :label-width="formLabelWidth">
            <el-select v-model="assetForm.type" placeholder="请选择设备类别" @change="handleTypeSelect">
              <el-option v-for="item in typeData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备型号" prop="model" :label-width="formLabelWidth">
            <el-select v-model="assetForm.model" placeholder="请选择设备型号">
              <el-option v-for="item in modelData" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="curator" :label-width="formLabelWidth">
            <el-input v-model="assetForm.curator" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="保修时间" :label-width="formLabelWidth">
            <el-date-picker v-model="datePicker" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="datepickerChange">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="assetDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAsset" :loading="assetDialogLoading">确 定</el-button>
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
      filters: {
        name: ''
      },
      verderData: {},
      systemData: {},
      modelData: {},
      typeData: {},
      rightTitle: '',
      selectedRow: {},
      tableDataLeft: [],
      tableDataRight: [],
      tableLoading: false,
      assetDialogFormVisible: false,
      assetDialogLoading: false,
      assetForm: {
        unid: '',
        name: '',
        vendor: '',
        system: '',
        type: '',
        model: '',
        curator: '',
        startDatetime: '',
        endDatetime: ''
      },
      formLabelWidth: '120px',
      datePicker: [],
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
      this.getAsset();
    },
    handleSearchClear() {
      this.getAsset();
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getAsset();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.getAsset();
    },
    handleUnitSelect(row) {
      this.selectedRow = row;
      this.rightTitle = row.name;
      this.searchText = '';
      this.getAsset();
    },
    handleAdd() {
      this.assetForm.unid = '';
      this.assetForm.name = '';
      this.assetForm.vendor = '';
      this.assetForm.system = '';
      this.assetForm.type = '';
      this.assetForm.model = '';
      this.assetForm.curator = '';
      this.assetForm.startDatetime = '';
      this.assetForm.endDatetime = '';
      this.datePicker = [];
      this.assetDialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.assetForm.unid = row.unid;
      this.assetForm.name = row.name;
      this.assetForm.vendor = row.vendor_unid;
      this.assetForm.system = row.system_unid;
      this.assetForm.type = row.facility_type_unid;
      this.assetForm.model = row.model_unid;
      this.assetForm.curator = row.curator_name;
      this.assetForm.startDatetime = row.warranty_startime;
      this.assetForm.endDatetime = row.warranty_endtime;
      this.datePicker = [this.$moment(row.warranty_startime, "YYYY-MM-DD HH:MM:SS"), this.$moment(row.warranty_endtime, "YYYY-MM-DD HH:MM:SS")];
      this.assetDialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteAsset(row.unid);
      }).catch(() => {});
    },
    datepickerChange(date) {
      this.assetForm.startDatetime = this.$moment(date[0]).format('YYYY-MM-DD HH:MM:SS');
      this.assetForm.endDatetime = this.$moment(date[1]).format('YYYY-MM-DD HH:MM:SS');
    },
    handleVendorSelect(val) {
      this.assetForm.vendor = val;
      this.getModel(this.assetForm.vendor, this.assetForm.type);
    },
    handleTypeSelect(val) {
      this.assetForm.type = val;
      this.getModel(this.assetForm.vendor, this.assetForm.type);
    },
    submitAsset() {
      this.assetDialogLoading = true;
      if (this.assetForm.unid != "") {
        this.editAsset(this.assetForm.unid, this.assetForm.name, this.assetForm.vendor, this.assetForm.system, this.assetForm.type, this.assetForm.model, this.assetForm.curator, this.assetForm.startDatetime, this.assetForm.endDatetime).then((
          response) => {
          if (response.status == 200) {
            this.assetDialogLoading = false;
            this.assetDialogFormVisible = false;
            this.$message('编辑成功');
            this.getAsset();
          } else {
            this.assetDialogLoading = false;
            this.assetDialogFormVisible = false;
            this.$message('编辑失败');
          }
        }).catch((error) => {
          this.assetDialogLoading = false;
          this.assetDialogFormVisible = false;
          this.$message('编辑失败');
        });
      } else {
        this.addAsset(this.assetForm.name, this.assetForm.vendor, this.assetForm.system, this.assetForm.type, this.assetForm.model, this.assetForm.curator, this.assetForm.startDatetime, this.assetForm.endDatetime).then((response) => {
          if (response.status == 201) {
            this.assetDialogLoading = false;
            this.assetDialogFormVisible = false;
            this.$message('新增成功');
            this.searchText = '';
            this.getAsset();
          } else {
            this.assetDialogLoading = false;
            this.assetDialogFormVisible = false;
            this.$message('新增失败');
          }
        }).catch((error) => {
          this.assetDialogLoading = false;
          this.assetDialogFormVisible = false;
          this.$message('新增失败');
        });
      }
    },
    getUnitInfo() {
      this.tableDataLeft = [];
      this.$http.get('https://api.renxingzuche.com/bigger/unit_info', {
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

          this.getAsset();
        } else {}

      }).catch((error) => {});
    },
    getAsset() {
      this.tableDataRight = [];
      this.tableLoading = true;
      this.$http.get('https://api.renxingzuche.com/bigger/asset', {
        params: {
          unit_unid: this.selectedRow.unid,
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
          this.tableDataRight = response.data.collection;
          this.page.total = response.data.count;
          // for (var asset of response.data.assets) {
          //   if (asset.unit_unid == this.selectedRow.unid) {
          //     this.tableDataRight.push(asset);
          //   }
          // }
        } else {
          this.page.total = 0;
        }
        this.tableLoading = false;

      }).catch((error) => {
        this.tableLoading = false;
        this.page.total = 0;
      });
    },
    addAsset(name, vendorUnid, systemUnid, facilityTypeUnid, modelUnid, curator, startDatetime, endDatetime) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('vendor_unid', vendorUnid);
      params.append('system_unid', systemUnid);
      params.append('facility_type_unid', facilityTypeUnid);
      params.append('model_unid', modelUnid);
      params.append('curator_name', curator);
      params.append('warranty_startime', startDatetime);
      params.append('warranty_endtime', endDatetime);
      params.append('unit_unid', '9CC3D7C835F44405BCE82907D7758675');

      return this.$http.post('https://api.renxingzuche.com/bigger/asset', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    editAsset(unid, name, vendorUnid, systemUnid, facilityTypeUnid, modelUnid, curator, startDatetime, endDatetime) {
      var params = new URLSearchParams();
      params.append('name', name);
      params.append('vendor_unid', vendorUnid);
      params.append('system_unid', systemUnid);
      params.append('facility_type_unid', facilityTypeUnid);
      params.append('model_unid', modelUnid);
      params.append('curator_name', curator);
      params.append('warranty_startime', startDatetime);
      params.append('warranty_endtime', endDatetime);

      return this.$http.put('https://api.renxingzuche.com/bigger/asset/' + unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    deleteAsset(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/asset/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getAsset();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    getVendorInfo() {
      this.$http.get('https://api.renxingzuche.com/bigger/vendor', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var vendor of response.data.collection) {
            this.verderData[vendor.unid] = vendor;
          }
        } else {}

      }).catch((error) => {});
    },
    getSystemType() {
      this.$http.get('https://api.renxingzuche.com/bigger/system_type', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var system of response.data.collection) {
            this.systemData[system.unid] = system;
          }
        } else {}
      }).catch((error) => {});
    },
    getModel(vendorUnid, facilityTypeUnid) {
      this.$http.get('https://api.renxingzuche.com/bigger/model', {
        params: {
          vendor_unid: vendorUnid,
          facility_type_unid: facilityTypeUnid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.modelData = {};
        if (response.status == 200) {
          for (var model of response.data.collection) {
            this.modelData[model.unid] = model;
          }
        }
      }).catch((error) => {
        this.modelData = {};
      });
    },
    getFacilityType() {
      this.$http.get('https://api.renxingzuche.com/bigger/facility_type', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var type of response.data.collection) {
            this.typeData[type.unid] = type;
          }
        } else {}

      }).catch((error) => {});
    }
  },
  mounted() {
    this.getVendorInfo();
    this.getSystemType();
    // this.getModel();
    this.getFacilityType();
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
