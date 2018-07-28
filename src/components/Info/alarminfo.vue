<template>
<el-row :gutter="10">
  <el-col :span="16" class="left">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">

          <el-form-item>


            <el-select v-model="company" clearable placeholder="关联单位">
              <el-option v-for="item in companys" :key="item.unid" :label="item.name" :value="item.unid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="status" :style="{width: '100px'}">
              <el-option label="报警" value="1"></el-option>
              <el-option label="非报警" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="alarmDate" value-format="yyyy-MM-dd hh:mm:ss" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width: '300px'}">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="initAlarm">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}">
      <el-table class="table" :data="tableData" @row-click="selectRow" border ref="table" v-loading="tableLoading">
        <el-table-column prop="name" label="报警设施" width="100">
        </el-table-column>
        <el-table-column prop="alarmInfo" label="报警信息" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="unit_name" label="联网单位" min-width="150">
        </el-table-column>
        <el-table-column prop="bs_name" label="所在区域" min-width="150">
        </el-table-column>
        <el-table-column prop="start" label="开始时间" min-width="150">
        </el-table-column>
        <el-table-column prop="end" label="结束时间" min-width="150">
        </el-table-column>
      </el-table>
      <div class="block" :style="{marginTop: '10px'}">
        <el-pagination :current-page="1" :page-sizes="GLOBAL.pageSize" :page-size="GLOBAL.pageSize[0]" layout="total, sizes, prev, pager, next" :total="page.total" @size-change="handleSizeChange" @current-change="handlePageChange" @prev-click="handlePageChange"
          @next-click="handlePageChange">
        </el-pagination>
      </div>
    </el-row>
  </el-col>
  <el-col :span="8" class="right">
    <vue-layer :data-parent="dataLayer" ref="mainLayer"></vue-layer>
    <el-col :span="24">
      <el-col :span="10" style="">周边设备(米):</el-col>
      <el-col :span="6">
        <el-input v-model="distance"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-form style="margin-top:10px;margin-left:10px;">
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
import {
  Icons,
  Urlmaps,
  IconsAlarm
} from '@/config/config.js'

export default {

  components: {
    vueLayer: layering,
  },
  data() {
    return {
      page: {
        total: 0,
        current: 0,
        size: this.GLOBAL.pageSize[0]
      },
      tableLoading: true,
      distance: 5,
      alarmDate: [],
      company: '',
      companys: [],
      status: '',
      deviceInfo: {
        company: "",
        deviceType: "",
        systemType: ""
      },
      currentRow: {},
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
      tableData: [

      ]
    }
  },
  mounted() {
    this.initAlarm();
    this.getUnitInfo();
  },
  methods: {
    handleSizeChange(size) {
      this.page.size = size;
      this.initAlarm();
    },
    handlePageChange(page) {
      this.page.current = page - 1;
      this.initAlarm();
    },
    getUnitInfo() {
      var that = this;
      this.companys = [];
      this.$http.get('https://api.renxingzuche.com/bigger/unit_info', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var unitInfo of response.data.collection) {
            //  console.log(unitInfo);
            that.companys.push(unitInfo);
          }

        } else {}

      }).catch((error) => {});
    },
    selectRow: function(row) {

      var that = this;
      that.currentRow = row;
      console.log(row);
      //获取当前报警对应的层 和点信息
      this.$http.get(Urlmaps.alarmDetail + "/" + row.unid, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          var alarm = response.data.collection;
          var row = {
            name: alarm.name,
            alarmInfo: alarm.facility_type_name,
            status: "报警",
            id: alarm.unid,
            x: alarm.x_axis,
            y: alarm.y_axis,
            type: alarm.type,
            company: alarm.vendor_name,
            containerHight: 400, //底图高度
            containerWidth: 300, //底图宽度
            backgroudImage: alarm.graph_url,
            pointImage: IconsAlarm[alarm.type - 1].url
          }
          that.dataLayer.dataContent = [];
          that.dataLayer.dataContent.push(row);
          that.dataLayer.pointImage = row.pointImage;
          that.dataLayer.backgroudImage = row.backgroudImage;
          that.dataLayer.containerHight = row.containerHight;
          that.dataLayer.containerWidth = row.containerWidth;
          that.deviceInfo.company = row.company;
          that.deviceInfo.deviceType = row.deviceType;
          that.deviceInfo.systemType = row.systemType;
        } else {
          console.log("状态：" + response.status)
        }
      }).catch((error) => {
        console.log("错误：" + error);
      });
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
    },
    getCompanys: function() {

    },
    initAlarm: function() {
      var that = this;
      that.tableData = [];
      that.tableLoading = true;
      this.$http.get(Urlmaps.alarm, {
        params: {
          datime_sys: that.alarmDate[0],
          datime_end: that.alarmDate[1],
          page_id: this.page.current,
          page_size: this.page.size,
          unit_unid: this.company
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {

          //  console.log(response.data.facility);
          this.page.total = response.data.count;
          var temp = [];
          var i = 0;
          for (var alarm of response.data.collection) {
            i++;
            var row = {

              alarmInfo: alarm.summary,
              status: "报警",
              unid: alarm.unid,
              x: 100.43064676077677,
              y: 113.53808006966511,
              type: 2,
              name: alarm.name,
              unit_name: alarm.unit_name,
              bs_name: alarm.bs_name,
              containerHight: 400, //底图高度
              containerWidth: i % 2 == 0 ? 600 : 300, //底图宽度
              content: "test Content2",
              backgroudImage: i % 2 == 0 ? require('../../assets/img/bg.png') : require("../../assets/img/svg.svg"),
              pointImage: require('../../assets/img/m-3.png'),
              company: "生产厂家",
              deviceType: "设备类型01",
              systemType: "消防设施类型01",
              start: alarm.datime_sys,
              end: alarm.datime_end
            };
            if (i == 1) {
              that.selectRow(row);
            }
            temp.push(row);
          }
          that.tableData = temp;
          that.tableLoading = false;
        } else {
          this.page.total = 0;
          that.tableLoading = false;
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        this.page.total = 0;
        console.log("错误：" + error);
        that.tableLoading = false;
      });

    },
    search: function() {
      var that = this;
      //console.log(that.currentRow);
      //获取当前报警对应的层 和点信息
      this.$http.get(Urlmaps.searchNearP, {
        params: {
          rectangle: that.currentRow.x + "," + that.currentRow.y + "," + that.distance,
          bs_unid: that.currentRow.unid,
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          //console.log(response.data);
          //that.dataLayer.dataContent = [];
          for (var alarm of response.data.collection) {
            var row = {
              name: alarm.name,
              alarmInfo: alarm.facility_type_name,
              status: "报警",
              id: alarm.unid,
              x: alarm.x_axis,
              y: alarm.y_axis,
              type: alarm.type,
              company: alarm.vendor_name,
              containerHight: 400, //底图高度
              containerWidth: 300, //底图宽度
              backgroudImage: alarm.graph_url,
              pointImage: alarm.icon_uri
            }
            that.dataLayer.dataContent.push(row);
          }
        } else {
          console.log("状态：" + response.status)
        }
      }).catch((error) => {
        console.log("错误：" + error);
      });
      var temp = [{
        name: "alarm",
        alarmInfo: "alarm",
        status: "报警",
        id: '1',
        x: 106.43064676077677,
        y: 143.53808006966511,
        type: 2,
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        name: '烟感04',
        content: "test Content",
        backgroudImage: require("../../assets/img/svg.svg"),
        pointImage: require('../../assets/img/m-1.png')
      }, {
        name: "alarm",
        alarmInfo: "alarm",
        status: "报警",
        id: '1',
        x: 130.43064676077677,
        y: 123.53808006966511,
        type: 2,
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        name: '烟感04',
        content: "test Content",
        backgroudImage: require("../../assets/img/svg.svg"),
        pointImage: require('../../assets/img/m-1.png')
      }, {
        name: "alarm",
        alarmInfo: "alarm",
        status: "报警",
        id: '1',
        x: 110.43064676077677,
        y: 114.53808006966511,
        type: 2,
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        name: '烟感04',
        content: "test Content",
        backgroudImage: require("../../assets/img/svg.svg"),
        pointImage: require('../../assets/img/m-1.png')
      }];
      this.dataLayer.dataContent = this.dataLayer.dataContent.concat(temp);
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
