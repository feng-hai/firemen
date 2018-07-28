<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">

    <el-row>
      <el-col class="tree_wrapper">
        <el-input v-model="filterText" placeholder="输入关键词进行过滤">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :filter-node-method="filterNode" ref="tree2"></el-tree>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="19" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">{{title}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="searchText" :style="{width: '180px'}">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>

        </el-form>
        <!-- 新增界面 -->
        <el-dialog title="历史数据" :visible.sync="addDialogFormVisible" width="80%" ref="dialogobject">
          <el-row :gutter="12">
            <el-col :span="12" :offset="6">
              <el-form :inline="true">

                <el-form-item>
                  <el-date-picker v-model="value7" value-format="yyyy-MM-dd hh:mm:ss" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button :style="{backgroundColor: '#f6f6f8'}" @click="searchData">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <vue-charts :data-parent="dataLine"></vue-charts>
          </el-row>

          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit" :loading="addLoading">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row :style="{marginTop: '10px'}" :gutter="10">
      <el-col :span="16" ref="layerTop" id="layerTop">
        <vue-layer :data-parent="dataLayer" @layerPoint="layerPoint" @openModel="showModel" ref="mainLayer"></vue-layer>
        <div class="block">
          <el-slider v-model="dataLayer.slider" :max="2" :step="0.1"></el-slider>
        </div>
      </el-col>
      <el-col :span="8">
        <el-table class="table" :data="deviceTypes" @row-click="selectRow" height="450" border ref="table">
          <el-table-column prop="name" sytle="display:none;" label="设备类型">
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </el-col>
</el-row>
</template>
<script>
import layering from '@/components/layering'
import vueTips from '@/components/tip'
import formatTreeData from '@/utils/formatData.js'
import vueCharts from '@/components/echarts/vueLine'
import {
  Icons,
  Urlmaps,
  IconsAll
} from '@/config/config.js'

export default {
  components: {
    vueLayer: layering,
    tips: vueTips,
    vueCharts: vueCharts
  },
  data() {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      searchText: '',
      filterText: '',
      value7: '',
      title: '楼层/区域',
      filters: {},
      defaultProps: [],
      input: '',
      tabIndex: -1,
      icons: Icons,
      addLoading: false,
      formLabelWidth: 20,
      tipsOptions: {
        title: 'tip',
        top: '10px',
        left: '10px'
      },
      dataLine: [],
      deviceTypes: IconsAll,
      dataContents: [],
      dataLayer: {
        slider: 1,
        //  width: $("#layerTop").width(), //画布宽度
        height: 500, //画布高度
        containerHight: 400, //底图高度
        containerWidth: 600, //底图宽度
        pointImage: require('../../assets/img/t3.png'), //点的背景图
        backgroudImage: require("../../assets/img/bg.png"), //画布的备件图
        scrollTop: 0,
        type: 0,
        buildID: '',
        dataContent: [],
      },
      dataLayerAdd: {
        slider: 1,
        //  width: $("#layerTopAdd").width(), //画布宽度
        height: 500, //画布高度
        containerHight: 400, //底图高度
        containerWidth: 600, //底图宽度
        pointImage: require('../../assets/img/t3.png'), //点的背景图
        backgroudImage: require("../../assets/img/bg.png"), //画布的备件图
        scrollTop: 0,
        type: 4,
        dataContent: [{
            id: 1,
            x: 200,
            y: 340,
            type: 1,
            name: 'test01',
            content: "test Content",
            pointImage: require('../../assets/img/t3.png')
          }, {
            id: 2,
            x: 330,
            y: 350,
            type: 2,
            name: 'test02',
            content: "test Content1",
            pointImage: require('../../assets/img/t3.png')
          }, //100.43064676077677,113.53808006966511
          { //
            id: 3,
            x: 100.43064676077677,
            y: 113.53808006966511,
            type: 2,
            name: 'test03',
            content: "test Content2",
            pointImage: require('../../assets/img/t3.png')
          },
          { //99.5,111.703125
            id: 3,
            x: 99.5,
            y: 111.703125,
            type: 2,
            name: 'test03',
            content: "test Content2",
            pointImage: require('../../assets/img/t3.png')
          }
          //107.5,152.703125
          ,
          {
            id: 3,
            x: 107.5,
            y: 152.703125,
            type: 2,
            name: 'test03',
            content: "test Content2",

            pointImage: require('../../assets/img/t3.png')
          },
          {
            id: 3,
            x: 107.5,
            y: 152.703125,
            type: 2,
            name: 'test03',
            content: "test Content2",

            pointImage: require('../../assets/img/t3.png')
          }
          //334.41306885929197,258.042096966623
          ,
          {
            id: 3,
            x: 334.41306885929197,
            y: 258.042096966623,
            type: 2,
            name: 'test03',
            content: "test Content2",
            pointImage: require('../../assets/img/user.png')
          }
        ],


      },
      options: [{
        value: '南京站',
        label: '南京站'
      }, {
        value: '南京南站',
        label: '南京南站'
      }, {
        value: '江宁站',
        label: '江宁站'
      }],
      value: '',
      tableData: [],
      data: [{
        label: '南京站北站',
        children: [{
          unid: '22798FC66F074C92AEB491C931AD1727',
          label: '东一层',
          backgroudImage: require('../../assets/img/svg.svg'),
          containerHight: 400, //底图高度
          containerWidth: 300, //底图宽度
        }, {
          unid: '22798FC66F074C92AEB491C931AD1727',
          label: '东二层',
          backgroudImage: require('../../assets/img/bg.png'),
          containerHight: 400, //底图高度
          containerWidth: 600, //底图宽度
        }, {
          unid: '22798FC66F074C92AEB491C931AD1727',
          label: '东三层',
          backgroudImage: require('../../assets/img/logo.png'),
          containerHight: 400, //底图高度
          containerWidth: 600, //底图宽度
        }]
      }, {
        unid: 'd05b93f541c6443eba359a821a8a75c5',
        label: '南京南站',
        children: [{
          unid: '22798FC66F074C92AEB491C931AD1727',
          label: '东一层'
        }, {
          label: '东一层'
        }]
      }, {
        label: '江宁站'
      }],
      addDialogFormVisible: false,
      devices: [{
        value: '1212',
        label: '黄金糕'
      }, {
        value: '1213',
        label: '双皮奶'
      }, {
        value: '1214',
        label: '蚵仔煎'
      }, {
        value: '1215',
        label: '龙须面'
      }, {
        value: '1216',
        label: '北京烤鸭'
      }],
      cameras: [{
        value: '1217',
        label: '黄金糕'
      }, {
        value: '1218',
        label: '双皮奶'
      }, {
        value: '1219',
        label: '蚵仔煎'
      }, {
        value: '1210',
        label: '龙须面'
      }, {
        value: '1211',
        label: '北京烤鸭'
      }],
      addForm: {
        id: '',
        name: '',
        x: 0,
        y: 0,
        icon: '',
        facility_name: '',
        facility_unids: '',
        camera_name: '',
        camera_unids: '',
        bs_unid: '',
        unit_unid: '',
        type: 0
      }
    }


  },
  mounted() {
    var that = this;

    that.getFacility();
    that.getcamera();
    that.getBuild();
    that.getDevice();
    //that.dataLayer.width = this.$refs.layerTop.offsetWidth;
    if (that.addForm.icon) {
      that.dataLayerAdd.pointImage = that.addForm.icon;
    }
    this.box = document.querySelectorAll(".el-main")[0];
    this.box.addEventListener('scroll', () => {
      //  console.log(" scroll ");
      //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
      //that.dataLayerAdd.scrollTop = that.box.scrollTop;
      //  console.log(that.box.scrollTop);
    }, false);

  },
  methods: {
    getcamera: function() {
      var that = this;
      this.$http.get(Urlmaps.camera, {
        params: {
          unit_unid: that.addForm.unit_unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {

          //  console.log(response.data.facility);
          var temp = [];
          for (var camera of response.data.collection) {

            temp.push({
              value: camera.unid,
              label: camera.name
            })
          }
          that.cameras = temp;



        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        console.log("错误：" + error);
      });

    },
    getFacility: function() {
      var that = this;
      this.$http.get(Urlmaps.Facility, {
        params: {
          unit_unid: that.addForm.unit_unid
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {

          //console.log(response.data.facility);
          var temp = [];
          for (var facility of response.data.collection) {

            temp.push({
              value: facility.unid,
              label: facility.name
            })
          }
          that.devices = temp;



        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        console.log("错误：" + error);
      });

    },
    getBuild: function() {

      //获取建筑集合
      this.$http.get(Urlmaps.build, {
        // params: {
        //   bs_unid: that.addForm.bs_unid
        // },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {

          this.data = formatTreeData(response.data.collection);

          if (this.data.length > 0) {
            this.handleNodeClick(this.data[0]);
          }

        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        console.log("错误：" + error);
      });
    },

    addSubmit: function() {
      this.addLoading = true;
      console.log(this.addForm);
      var params = new URLSearchParams();
      params.append('name', this.addForm.name);
      params.append('icon_uri', this.addForm.icon);
      params.append('x_axis', this.addForm.x);
      params.append('y_axis', this.addForm.y);
      params.append('facility_name', this.addForm.facility_name);
      params.append('facility_unids', this.addForm.facility_unids.join(','));
      params.append('camera_name', this.addForm.camera_name);
      params.append('camera_unids', this.addForm.camera_unids.join(','));
      params.append('bs_unid', this.addForm.bs_unid);
      params.append('type', this.addForm.type);
      alert(this.addForm.id);
      if (this.addForm.id) {
        this.$http.put(Urlmaps.layered + "/" + this.addForm.id, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          this.addLoading = false;
          if (response.status == 200) {

            this.$message('修改成功');
            this.addDialogFormVisible = false;
            this.$refs.addForm.resetFields();

          }
        }).catch((error) => {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$message('修改错误');
          this.$refs.addForm.resetFields();
        });
      } else {
        this.$http.post(Urlmaps.layered, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$refs.addForm.resetFields();
          if (response.status == 201) {
            this.$message('新增成功');
            //  console.log(response.data);
            //  this.getUserInfo();
          } else {
            this.$message('新增错误');
          }

        }).catch((error) => {
          this.addLoading = false;
          this.addDialogFormVisible = false;
          this.$message('新增错误');
          this.$refs.addForm.resetFields();
        });
      }
    },

    getDevice: function() {

      //console.log("开始查询");
      var that = this;
      var params = new URLSearchParams();
      params.append('bs_unid', this.addForm.bs_unid);
      this.$http.get('https://api.renxingzuche.com/bigger/layered_graph', {
        params: {
          bs_unid: that.addForm.bs_unid
        },

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {

        if (response.status == 200) {
          var temp = [];
          for (var layer of response.data.collection) {

            temp.push({
              id: layer.unid,
              x: layer.x_axis,
              y: layer.y_axis,
              type: layer.type,
              name: layer.name,
              content: layer.facility_name,
              pointImage: layer.icon_uri,
              facility_unids: layer.facility_unids,
              camera_unids: layer.camera_unids

            })
          }
          that.tableData = temp;
          that.dataLayer.dataContent = temp;
          //  that.dataContents = temp;
          that.searchFormatData(that.searchText);

        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        console.log("错误：" + error);
      });
    },
    iconClick: function(item, index) {
      this.tabIndex = index;
      this.dataLayerAdd.pointImage = item.url;
      this.addForm.icon = item.url;
      this.addForm.type = item.type;
      this.dataLayerAdd.width = $("#layerTopAdd").width();
      //this.$refs.layerAdd.
    },
    selectRow: function(row) {
      //  console.log("jquery 数据：" + $(".container").width());
      var that = this;
      that.searchFormatData(that.searchText);
      that.dataContents = that.dataLayer.dataContent;
      var temp = [];
      var type = row.type;
      if (type == 0) {
        that.dataContents.push({
          name: "alarm",
          alarmInfo: "alarm",
          status: "报警",
          id: 3,
          x: 100.43064676077677,
          y: 113.53808006966511,
          type: 10,
          name: 'test03',
          containerHight: 400, //底图高度
          containerWidth: 600, //底图宽度
          content: "test Content2",
          backgroudImage: require('../../assets/img/bg.png'),
          pointImage: require('../../assets/img/m-3.png'),
          company: "生产厂家",
          deviceType: "设备类型01",
          systemType: "消防设施类型01"
        });
        that.dataLayer.dataContent = that.dataContents;
      } else if (type == -1) {
        that.dataLayer.dataContent = [


          {
            name: "alarm",
            alarmInfo: "alarm",
            status: "报警",
            id: 3,
            x: 100.43064676077677,
            y: 113.53808006966511,
            type: 2,
            name: 'test03',
            containerHight: 400, //底图高度
            containerWidth: 600, //底图宽度
            content: "test Content2",
            backgroudImage: require('../../assets/img/bg.png'),
            pointImage: require('../../assets/img/m-3.png'),
            company: "生产厂家",
            deviceType: "设备类型01",
            systemType: "消防设施类型01"
          }
        ];

      } else {
        that.dataContents.forEach(function(value, index, array) {　
          if (type == value.type) {
            temp.push(value);
          }　
        });
        that.dataLayer.dataContent = temp;
      }






    },
    layerPoint: function(val) {
      //  console.log("父页面打印数据" + val);
      this.addForm.x = val[0];
      this.addForm.y = val[1];
      //  this.
      //  console.log(this.dataLayer.slider);
    },
    // 监听从组件内传递出来的事件

    showModel(row) {
      var that = this;
      that.getFacility();
      that.addForm = {
        id: '',
        name: '',
        x: 0,
        y: 0,
        icon: '',
        facility_name: '',
        facility_unids: [],
        camera_name: '',
        camera_unids: [],
        bs_unid: '',
        unit_unid: '',
        type: 0
      };




      //  this.dataLayerAdd.pointImage = item.url;
      this.addDialogFormVisible = true;
      that.dataLayerAdd.type = 4;
      that.tabIndex = that.addForm.type - 1;
      that.dataLayerAdd.width = $("#layerTopAdd").width();
      if (row) {


        that.addForm.id = row.id;
        that.addForm.name = row.name;
        that.addForm.x = row.x;
        that.addForm.y = row.y;
        that.addForm.icon = row.pointImage;
        that.addForm.facility_name = "";
        //  console.log(row.facility_unids);
        that.addForm.facility_unids = row.facility_unids.split(',');
        that.addForm.camera_name = row.pointImage;
        that.addForm.camera_unids = row.camera_unids.split(',');
        that.addForm.type = row.type;
      }
      //this.$refs.layerAdd.initPage();
    },
    change: function() {},
    // 显示tips
    showtips() {
      // console.log( this.$refs );
      this.$refs.dialog.showTips();
    },
    handleNodeClick: function(node) { //左侧列表点击事件
      var that = this;
      that.addForm.bs_unid = node.unid;
      that.addForm.unit_unid = node.unit_unid;
      that.dataLayer.containerHight = node.containerHight;
      that.dataLayer.containerWidth = node.containerWidth;
      that.dataLayer.backgroudImage = node.backgroudImage;
      that.dataLayer.width = $("#layerTop").width();
      that.dataLayer.dataContent = [];
      that.title = node.label;
      that.dataLayerAdd.containerHight = node.containerHight;
      that.dataLayerAdd.containerWidth = node.containerWidth;
      that.dataLayerAdd.backgroudImage = node.backgroudImage;
      that.dataLayerAdd.width = $("#layerTop").width();
      that.dataLayerAdd.dataContent = [];
      that.getDevice();




    },
    searchData() {
      var that = this;
      console.log(that.value7);

      this.$http.get(Urlmaps.history + "/865CB884DDBD494E82CAA03EDF33D295 ", {
        params: {
          datime_sys: that.value7[0],
          datime_end: that.value7[1]
        },

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {

          //console.log(response.data.rows);
          var temp = [];
          response.data.collection.forEach(function(value, index, array) {

            var tempData = [];
            tempData.push(value.datime_sys);
            tempData.push(value.value);
            temp.push(tempData);　　
          });
          that.dataLine = temp.reverse();;
        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        that.dataLine = [
          [0, 0],
          [0, 0]
        ];
        console.log("错误：" + error);
      });



    },
    filterDevice(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    searchFormatData(val) {
      var that = this;
      if (val) {

        that.dataLayer.dataContent = [];
        that.tableData.forEach(function(value, index, array) {
          if (that.filterDevice(val, value)) {

            that.dataLayer.dataContent.push(value);
          }
        });
      } else {
        that.dataLayer.dataContent = that.tableData;
      }
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {　　　　　　
        console.log(newValue)　　　　
      },
      deep: true
    },
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    searchText(val) {
      var that = this;
      that.searchFormatData(val);

    }

  }


}
</script>

<style scoped>
.left .filter_wrapper {
  padding: 6px;
  background-color: #d83232;
  border-radius: 4px;
}

.left .tree_wrapper {
  padding: 6px;
  background-color: white;
  border: 1px solid #dfdfdf;
  margin-top: 6px;
  border-radius: 4px;
}

.left .tree_wrapper .el-tree {
  margin-top: 10px;
}

.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

#tubiao ul {
  padding: 0px;
  margin: 0;
}

.cg {
  padding: 0;
  margin: 0;
  background: no-repeat;
  background-size: 25px 52.25px;
  width: 25px;
  height: 25px;
  margin: 5px;
  list-style-type: none;
  float: left;
  border-style: solid;
  border-width: 2px;
  border-color: #ddd;
}

.selected {
  border-style: solid;
  border-width: 2px;
  border-color: #409EFF;
}
</style>
