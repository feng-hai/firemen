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
        <el-button size="mini" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table class="table no_header_table" :data="tableData" ref="table" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column prop="name" label="">
        </el-table-column>
        <el-table-column label="" width="90">
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
    </el-row>
    <!-- <el-row class="new_wrapper">
      <el-button type="text" icon="el-icon-plus" @click="addDialogFormVisible = true">新增站点</el-button>
    </el-row> -->
  </el-col>
  <el-col :span="19" class="right">
    <h3>联网单位信息</h3>
    <p class="title">单位全称</p>
    <p class="content">{{selectedRow.name}}</p>
    <p class="title">单位简称</p>
    <p class="content">{{selectedRow.short_name}}</p>
    <p class="title">所属组织</p>
    <p class="content">{{domainData[selectedRow.domain_unid].name}}</p>
    <p class="title">联系电话</p>
    <p class="content">{{selectedRow.tel}}</p>
    <p class="title">所属消防队</p>
    <p class="content">{{selectedRow.bri_name}}</p>
    <p class="title">单位地址</p>
    <p class="content">{{selectedRow.address}}</p>
    <div style="height: 300px; background: #dbdbdb;" id="map">地图</div>
    <p class="title">安全责任人</p>
    <p class="content">姓名:&nbsp;{{selectedRow.contacts_name}}&nbsp;电话:&nbsp;{{selectedRow.phone}}&nbsp;邮箱:&nbsp;{{selectedRow.mail}}</p>
  </el-col>

  <!-- 新增界面 -->
  <el-dialog title="单位信息" :visible.sync="addDialogFormVisible">
    <el-form :model="addForm" ref="addForm">
      <el-form-item label="单位全称" prop="fullName" :label-width="formLabelWidth">
        <el-input v-model="addForm.fullName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="单位简称" prop="shortName" :label-width="formLabelWidth">
        <el-input v-model="addForm.shortName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属组织" prop="domain" :label-width="formLabelWidth">
        <el-select v-model="addForm.domain" placeholder="请选择所属组织">
          <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel" :label-width="formLabelWidth">
        <el-input v-model="addForm.tel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属消防队" prop="fire" :label-width="formLabelWidth">
        <el-select v-model="addForm.fire" placeholder="请选择联消防队">
          <el-option v-for="item in fireData" :key="item.unid" :label="item.name" :value="item.unid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位地址" prop="address" :label-width="formLabelWidth">
        <el-input v-model="addForm.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="安全责任人" prop="cname" :label-width="formLabelWidth">
        <el-input v-model="addForm.cname" auto-complete="off" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="ctel" :label-width="formLabelWidth">
        <el-input v-model="addForm.ctel" auto-complete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="cmail" :label-width="formLabelWidth">
        <el-input v-model="addForm.cmail" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑界面 -->
  <el-dialog title="单位信息" :visible.sync="editDialogFormVisible">
    <el-form :model="editForm" ref="editForm">
      <el-form-item label="单位全称" prop="fullName" :label-width="formLabelWidth">
        <el-input v-model="editForm.fullName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="单位简称" prop="shortName" :label-width="formLabelWidth">
        <el-input v-model="editForm.shortName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属组织" prop="domain" :label-width="formLabelWidth">
        <el-select v-model="editForm.domain" placeholder="请选择所属组织">
          <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel" :label-width="formLabelWidth">
        <el-input v-model="editForm.tel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属消防队" prop="fire" :label-width="formLabelWidth">
        <el-select v-model="editForm.fire" placeholder="请选择联消防队">
          <el-option v-for="item in fireData" :key="item.unid" :label="item.name" :value="item.unid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位地址" prop="address" :label-width="formLabelWidth">
        <el-input v-model="editForm.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="安全责任人" prop="cname" :label-width="formLabelWidth">
        <el-input v-model="editForm.cname" auto-complete="off" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="ctel" :label-width="formLabelWidth">
        <el-input v-model="editForm.ctel" auto-complete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="cmail" :label-width="formLabelWidth">
        <el-input v-model="editForm.cmail" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSubmit" :loading="editLoading">确 定</el-button>
    </div>
  </el-dialog>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        name: ''
      },
      formLabelWidth: '120px',
      tableData: [],
      fireData: {},
      domainData: {},
      selectedRow: {},
      addDialogFormVisible: false,
      addForm: {
        fullName: '',
        shortName: '',
        domain: '',
        tel: '',
        fire: '',
        address: '',
        cname: '',
        ctel: '',
        cmail: ''
      },
      editDialogFormVisible: false,
      editForm: {
        unid: '',
        fullName: '',
        shortName: '',
        domain: '',
        tel: '',
        fire: '',
        address: '',
        cname: '',
        ctel: '',
        cmail: ''
      },
      addLoading: false,
      editLoading: false
    }
  },
  methods: {
    getUnitInfo: function() {
      this.tableData = [];
      this.$http.get('https://api.renxingzuche.com/bigger/unit_info', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var unitInfo of response.data.collection) {
            this.tableData.push(unitInfo);
          }
          this.selectedRow = this.tableData[0];
        } else {}

      }).catch((error) => {});
    },
    handleCurrentChange(val) {
      this.selectedRow = val;
    },
    handleAdd() {
      for (var value in this.addForm) {
        value = '';
      }
      this.addDialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.editForm.unid = row.unid;
      this.editForm.fullName = row.name;
      this.editForm.shortName = row.short_name;
      this.editForm.tel = row.tel;
      this.editForm.fire = row.bri_id;
      this.editForm.address = row.address;
      this.editForm.cname = row.contacts_name;
      this.editForm.ctel = row.phone;
      this.editForm.cmail = row.email;
      this.editForm.domain = row.domain_unid;
      this.editDialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteUnitInfo(row.unid);
      }).catch(() => {

      });
    },
    addSubmit() {
      this.addLoading = true;
      this.addUnitInfo(this.addForm.fullName, this.addForm.shortName, this.addForm.domain, this.addForm.tel, this.addForm.fire, this.addForm.address, this.addForm.cname, this.addForm.ctel, this.addForm.cmail).then((response) => {
        if (response.status == 201) {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$message('新增成功');
          this.getUnitInfo();
        } else {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$message('新增失败');
        }
      }).catch((error) => {
        this.addLoading = false;
        this.addDialogFormVisible = false;
        this.$message('新增失败');
      });
    },
    editSubmit() {
      this.editLoading = true;
      this.editUnitInfo(this.editForm.unid, this.editForm.fullName, this.editForm.shortName, this.editForm.domain, this.editForm.tel, this.editForm.fire, this.editForm.address, this.editForm.cname, this.editForm.ctel, this.editForm.cmail).then((
        response) => {
        if (response.status == 200) {
          this.editLoading = false;
          this.editDialogFormVisible = false;
          this.$message('修改成功');
          this.getUnitInfo();
        } else {
          this.editLoading = false;
          this.editDialogFormVisible = false;
          this.$message('修改失败');
        }
      }).catch((error) => {
        this.editLoading = false;
        this.editDialogFormVisible = false;
        this.$message('修改失败');
      });
    },
    addUnitInfo(fname, sname, domain, tel, fire, address, cname, ctel, cmail) {
      var params = new URLSearchParams();
      params.append('name', fname);
      params.append('short_name', sname);
      params.append('domain_unid', domain);
      params.append('tel', tel);
      params.append('bri_id', fire);
      params.append('address', address);
      params.append('contacts_name', cname);
      params.append('phone', ctel);
      params.append('email', cmail);

      return this.$http.post('https://api.renxingzuche.com/bigger/unit_info', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    editUnitInfo(unid, fname, sname, domain, tel, fire, address, cname, ctel, cmail) {
      var params = new URLSearchParams();
      params.append('name', fname);
      params.append('short_name', sname);
      params.append('domain_unid', domain);
      params.append('tel', tel);
      params.append('bri_id', fire);
      params.append('address', address);
      params.append('contacts_name', cname);
      params.append('phone', ctel);
      params.append('email', cmail);

      return this.$http.put('https://api.renxingzuche.com/bigger/unit_info/' + unid, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    deleteUnitInfo(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/unit_info/' + unid).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          this.getUnitInfo();
        } else {
          this.$message('删除失败');
        }

      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    getFireInfo() {
      this.$http.get('https://api.renxingzuche.com/bigger/fire_brigade', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var fireBrigade of response.data.collection) {
            this.fireData[fireBrigade.unid] = fireBrigade;
          }
        } else {}

      }).catch((error) => {});
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

      }).catch((error) => {});
    },
  },
  mounted() {
    this.getDomainInfo();
    this.getFireInfo();
    this.getUnitInfo();

    var mp = new BMap.Map("map");
    mp.centerAndZoom(new BMap.Point(118.790636, 32.047392), 12);
    mp.enableScrollWheelZoom();
  }
}
</script>

<style scoped>
.left .search_wrapper {
  padding-bottom: 10px;
  /* padding: 7px 12px 7px 10px;
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

.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.right h3 {
  margin-top: 0px;
  font-weight: normal;
  color: #737373;
  margin-left: 4px;
}

.right .title {
  background-color: #ffefdf;
  padding: 8px;
  color: #ff4745;
  font-size: 14px;
}

.right .content {
  margin-left: 4px;
  color: #737373;
}
</style>
