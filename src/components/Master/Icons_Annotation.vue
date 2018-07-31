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
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="showModel">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="deleteDevice">删除</el-button>
          </el-form-item>
        </el-form>
        <!-- 新增界面 -->
        <el-dialog title="感应器" :visible.sync="addDialogFormVisible" width="80%" ref="dialogobject">
          <el-row :gutter="12">
            <el-col :span="16" id="layerTopAdd">
              <vue-layer :data-parent="dataLayerAdd" @layerPoint="layerPoint" ref="layerAdd"></vue-layer>
            </el-col>
            <el-col :span="8">
              <el-form label-position="top" label-width="80px" :model="addForm" ref="addForm">
                <el-form-item label="名称">
                  <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联设备">
                  <el-select multiple filterable allow-create default-first-option v-model="addForm.facility_unids" placeholder="请选择管理设备">
                    <el-option v-for="item in devices" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="关联视频">
                  <el-select multiple filterable allow-create default-first-option v-model="addForm.camera_unids" placeholder="请选择管理设备">
                    <el-option v-for="item in cameras" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="图标大小">
                  <el-slider v-model="dataLayerAdd.slider" :max="2" :step="0.1"></el-slider>
                </el-form-item>
                <el-form-item label="图标">
                  <ul id="tubiao" v-for="(item,index) in icons" style="margin:0px">
                    <el-tooltip :content=item.name placement="top" effect="light">
                      <li v-bind:class="{selected:index==tabIndex }" class="cg " @click="iconClick(item,index)" v-bind:style="{ 'background-image': 'url(' + item.url + ')','background-repeat':'no-repeat' }"></li>
                    </el-tooltip>
                  </ul>
                </el-form-item>
              </el-form>
            </el-col>

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
        <el-table class="table" :data="dataLayer.dataContent" @row-click="selectRow" height="450" highlight-current-row border ref="table">
          <el-table-column prop="name" label="设备名称">
          </el-table-column>
          <el-table-column prop="content" label="关联设施">
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
        dataContent: [],
      },
      options: [],
      value: '',
      tableData: [],
      data: [],
      addDialogFormVisible: false,
      devices: [],
      cameras: [],
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

          //  console.log(response.data.collection);
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

          //  console.log(response.data.facility);
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
    deleteDevice: function() {
      var that = this;
      this.$http.delete(Urlmaps.layered + "/" + this.addForm.id).then((response) => {
        if (response.status == 200) {
          this.$message('删除成功');
          that.getDevice();
        } else {
          this.$message('删除失败');
        }
      }).catch((error) => {
        this.$message('删除失败');
      });
    },
    addSubmit: function() {
      var that = this;
      this.addLoading = true;
      //  console.log(this.addForm);
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
      params.append('type_id', this.addForm.type);
      //alert(this.addForm.id);
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
            that.getDevice();

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
            that.getDevice();
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

      var that = this;
      var params = new URLSearchParams();
      params.append('bs_unid', this.addForm.bs_unid);
      this.$http.get(Urlmaps.layered, {
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
          console.log(response.data.collection);
          for (var layer of response.data.collection) {
            temp.push({
              id: layer.unid,
              x: layer.x_axis,
              y: layer.y_axis,
              type: layer.type_id,
              name: layer.name,
              content: layer.facility_name,
              pointImage: layer.icon_uri,
              facility_unids: layer.facility_unids,
              camera_unids: layer.camera_unids
            })
          }
          temp.sort(function(obj1, obj2) {
            var val1 = obj1.name;
            var val2 = obj2.name;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }

          });
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
      var that = this;
      //console.log(row);
      this.addForm.id = row.id;
      this.$refs.mainLayer.openModel(row);
    },
    layerPoint: function(val) {
      //  console.log("父页面打印数据" + val);
      this.addForm.x = val[0];
      this.addForm.y = val[1];
    },
    // 监听从组件内传递出来的事件
    showModel(row) {

      var that = this;
      that.getFacility();
      //  this.dataLayerAdd.pointImage = item.url;
      this.addDialogFormVisible = true;
      that.dataLayerAdd.type = 4;
      that.tabIndex = that.addForm.type - 1;
      that.dataLayerAdd.width = $("#layerTopAdd").width();
      that.dataLayerAdd.dataContent = [];
      that.addForm.facility_unids = [];
      that.addForm.camera_unids = [];
      that.tabIndex = -1;
      if (row) {
        that.addForm.id = row.id;
        that.addForm.name = row.name;
        that.addForm.x = row.x;
        that.addForm.y = row.y;
        that.addForm.icon = row.pointImage;
        that.addForm.facility_name = "";
        //  console.log(row.facility_unids);
        if (row.facility_unids) {
          that.addForm.facility_unids = row.facility_unids.split(',');
        }
        that.addForm.camera_name = row.pointImage;
        if (row.camera_unids) {
          that.addForm.camera_unids = row.camera_unids.split(',');
        }
        that.addForm.type = row.type;
        //更新图标
        that.tabIndex = row.type - 1;
        that.dataLayerAdd.pointImage = row.pointImage;
        that.dataLayerAdd.dataContent = [];
        that.dataLayerAdd.dataContent.push(row);
      }
      if( typeof(this.$refs.layerAdd.clearCircle)=="function")
      {
        this.$refs.layerAdd.clearCircle();
      }

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
