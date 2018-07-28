<template>
<el-row :gutter="10">
  <el-col :span="16" class="left">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">江宁站</el-button>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="关联单位" :style="{width: '120px'}">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" :style="{width: '100px'}">
              <el-option label="状态一" value="状态一"></el-option>
              <el-option label="状态二" value="状态二"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width: '300px'}">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" @row-click="selectRow" border ref="table">
        <el-table-column prop="name" label="报警设施" width="100">
        </el-table-column>
        <el-table-column prop="alarmInfo" label="报警信息" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="code" label="联网单位" min-width="150">
        </el-table-column>
        <el-table-column prop="code" label="所在区域" min-width="150">
        </el-table-column>
        <el-table-column prop="code" label="开始时间" min-width="150">
        </el-table-column>
        <el-table-column prop="code" label="结束时间" min-width="150">
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="[50, 100]" :page-size="100" layout="total, sizes, prev, pager, next" :total="tableData.length">
        </el-pagination>
      </div>
    </el-row>
  </el-col>
  <el-col :span="8" class="right">
    <vue-layer :data-parent="dataLayer" ref="mainLayer"></vue-layer>
    <el-col :span="24">
      <el-col :span="10" :model="distance" style="">周边设备(米):</el-col>
      <el-col :span="6">
        <el-input></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-form  style="margin-top:10px;margin-left:10px;">
        <el-form-item label="系统类型：">
          {{deviceInfo.systemType}}
        </el-form-item>
        <el-form-item label="消防设施类别：">
          {{deviceInfo.deviceType}}
        </el-form-item>
        <el-form-item label="厂家：">
          {{deviceInfo.company}}
        </el-form-item>
      </el-form>
    </el-col>
  </el-col>
</el-row>
</template>

<script>
import layering from '@/components/layering'
export default {

  components: {
    vueLayer: layering,
  },
  data() {
    return {
      deviceInfo: {
        company: "",
        deviceType: "",
        systemType: ""
      },
      dataLayer: {
        slider: 1,
      //  width: '100%', //画布宽度
        height: 340, //画布高度
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        pointImage: require('../../assets/img/t3.png'), //点的背景图
        backgroudImage: require("../../assets/img/svg.svg"), //画布的备件图
        scrollTop: 0,
        type: 0,
        dataContent: [],

      },
      tableData: [{
          name: "alarm",
          alarmInfo: "alarm",
          status: "报警",
          id: '1',
          x: 200,
          y: 340,
          containerHight: 400, //底图高度
          containerWidth: 300, //底图宽度
          type: 1,
          name: 'test01',
          content: "test Content",
          backgroudImage: require("../../assets/img/svg.svg"),
          pointImage:  require('../../assets/img/m-3.png')
        },
        {
          name: "alarm",
          alarmInfo: "alarm",
          status: "报警",
          id: 3,
          x: 334.413,
          y: 258.042,
          type: 2,
          name: 'test03',
          containerHight:400, //底图高度
          containerWidth:600, //底图宽度
          content: "test Content2",
          backgroudImage: require('../../assets/img/bg.png'),
          pointImage:  require('../../assets/img/m-3.png'),
          company: "生产厂家",
          deviceType: "设备类型01",
          systemType: "消防设施类型01"

        }

      ]
    }
  },
  methods: {
    selectRow: function(row) {
      var that = this;
      this.dataLayer.dataContent.pop();
      this.dataLayer.dataContent.push(row);

      that.dataLayer.pointImage = row.pointImage;
      that.dataLayer.backgroudImage = row.backgroudImage;
      that.dataLayer.containerHight = row.containerHight;
      that.dataLayer.containerWidth = row.containerWidth;
      this.deviceInfo.company=row.company;
      this.deviceInfo.deviceType=row.deviceType;
      this.deviceInfo.systemType=row.systemType;

    },
    addSubmit: function() {
      this.addLoading = true;
      this.addForm.id = Math.random();
      this.tableData.push(this.addForm);
      this.addLoading = false;
      this.addDialogFormVisible = false;
      // this.$refs['addForm'].resetFields();
    },
    editSubmit: function() {
      this.editLoading = true;
      this.editLoading = false;
      this.editDialogFormVisible = false;
    },
    handleEdit: function(index, row) {
      this.editDialogFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    handleDelete: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1);
      }).catch(() => {

      });
    }
  }
}
</script>

<style scoped>
.left {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
  height: 530px;
}
</style>
