<template>
<div id="">
  <div class="main_content">
    <div class="index_left">
      <div class="header">
        <div class="title"> <img v-bind:src="logo">

          <div class="title_center">
            <p class="title_name"> <span>R.I.F.</span> <span>智慧安全运维</span> <span class="edition">1.0</span> </p>
            <p class="english_name">Railway intelligent fire safety system</p>
          </div>
        </div>
        <div class="date">

          <p class="time">2018.05.21 13:48:32</p>
          <p class="name_info">南京南站</p>
        </div>
      </div>
      <div class="safety_factor">
        <p class="safety_title">安全指数 Safety Factor</p>
        <div class="safety_content">
          <ul class="leftFristPart">
            <li>93.14%</li>
            <li class="brand">安全指数</li>
          </ul>
          <div class="battery">
            <ul>
              <li class="color1"></li>
              <li class="color2"></li>
              <li class="color3"></li>
              <li class="color4"></li>
              <li class="color5"></li>
              <li class="color6"></li>
              <li class="color7"></li>
              <li class="color8"></li>
              <li class="color9"></li>
              <li class="color10"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="video">
        <p class="video_title">视频 Video</p>
        <div class="video_center">
          <div class="video_left"> </div>
          <div class="video_right"> </div>
          <p>1,778</p>
        </div>
        <div class="video_bottom">
          <p class="infoC">在线：1603</p>
          <p class="infoD">离线：63</p>
          <a class="popup"></a> </div>
      </div>
      <div class="sensor">
        <p class="sensor_title clickThis" id="window2">传感器 Sensor</p>
        <div class="sensor_top">
          <p class="sensor_number">54,918</p>
          <ul>
            <li>
              <p class="red">237</p>
              <p class="type">报警</p>
            </li>
            <li>
              <p class="yellow">64</p>
              <p class="type">故障</p>
            </li>
            <li>
              <p class="grey">17</p>
              <p class="type">屏蔽</p>
            </li>
          </ul>
        </div>
        <div class="sensor_center" id="main4"> </div>
      </div>
    </div>
    <div class="list"> <img v-bind:src="list">
      <ul>
        <li> <a href="#" v-on:click="selectRow({type:0})">全部设备</a> </li>
        <li> <a href="#">重点监控</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:-1})">报警设备</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:12})">视频监控</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:1})">自动报警</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:2})">电气监控</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:3})">自动喷淋</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:4})">防排烟</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:5})">消火栓</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:6})">消防水炮</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:7})">疏散指示</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:8})">应急照明</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:9})">气体灭火</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:10})">灭火器</a> </li>
        <li> <a href="#" v-on:click="selectRow({type:11})">防火卷帘</a> </li>
      </ul>
    </div>
    <div class="index_center">
      <div class="map">
        <ul class="dropdown">
          <li> <a class="meau" href="#">1F</a>
            <ul>
              <li><a href="#">1F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau2" href="#">2F</a>
            <ul>
              <li><a href="#">2F 东北</a></li>
              <li><a href="#">2F 东北</a></li>
              <li><a href="#">2F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau3" href="#">3F</a>
            <ul>
              <li><a href="#">3F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau4" href="#">4F</a>
            <ul>
              <li><a href="#">4F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau5" href="#">5F</a>
            <ul>
              <li><a href="#">5F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau6" href="#">6F</a>
            <ul>
              <li><a href="#">6F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau7" href="#">7F</a>
            <ul>
              <li><a href="#">7F 东北</a></li>
            </ul>
          </li>
          <li> <a class="meau8" href="#">8F</a>
            <ul>
              <li><a href="#">8F 东北</a></li>
            </ul>
          </li>
        </ul>
        <div class="svg" style="width:800px; height:800px; margin-top:0px; padding-left: 5px; padding-right: 5px; margin-left:0px;" ref="layerTop">
          <div id="layerTop">
            <vue-layer :data-parent="dataLayer" @openModel="openModel" ref="layer01" @layerPoint="layerPoint"></vue-layer>
          </div>
          <div class="block" style="margin-left:30px;">
            <el-slider v-model="dataLayer.slider" :max="4" :step="0.1"></el-slider>
          </div>
        </div>
      </div>
      <div class="floor">
        <p class="floor_title">实时警情 Real Time Alarm</p>
        <div class="floor_content">
          <table border="0" style="width:100%;">
            <tr class="red" v-for="alarm in tableData">
              <td width="18"><a href="#"></a></td>
              <td width="170" v-text="alarm.name">感应器54H88UL</td>
              <td width="150" v-text="alarm.unit_name">南京南站</td>
              <td width="240" v-text="alarm.bs_name">3F东北3号洗手间</td>
              <td width="180" v-text="alarm.alarmInfo">烟雾感应报警</td>
              <td width="180" v-text="alarm.start">2018.0403</td>

              <td>未处理</td>
            </tr>

          </table>
        </div>
      </div>
    </div>
    <div class="index_right">
      <div class="routing_inspection">
        <p class="routing_inspection_title clickThis" id="clickScend">巡检 Routing Inspection</p>
        <div class="chart_content">
          <div class="chart_line"></div>
          <div class="chart">
            <div id="main2" style="width: 100%;height:100%;"></div>

          </div>
          <div class="chart_info">
            <ul>
              <li>
                <div class="part">
                  <p class="info_left">完成</p>
                  <p class="info_right">63<span>%</span></p>
                </div>
                <p class="chart_time">2018.04.31 12:34:44</p>
              </li>
              <li>
                <div class="part">
                  <p class="info_left">待巡检</p>
                  <p class="info_right">63<span>%</span></p>
                </div>
                <p class="chart_time">2018.04.31 12:34:44</p>
              </li>
              <li>
                <div class="part">
                  <p class="info_left">逾期</p>
                  <p class="info_right">63<span>%</span></p>
                </div>
                <p class="chart_time">2018.04.31 12:34:44</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="routing_inspection">
        <p class="routing_inspection_title clickThis" id="clickP">隐患 Hidden Danger</p>
        <div class="chart_content">
          <div class="chart_line"></div>
          <div class="chart">
            <div id="main1" style="width: 100%;height:100%;"></div>

          </div>
          <div class="chart_info">
            <ul>
              <li>
                <div class="part">
                  <p class="info_left">完成</p>
                  <p class="info_right">63<span>%</span></p>
                </div>
                <p class="chart_time">2018.04.31 12:34:44</p>
              </li>
              <li>
                <div class="part">
                  <p class="info_left">待巡检</p>
                  <p class="info_right">63<span>%</span></p>
                </div>
                <p class="chart_time">2018.04.31 12:34:44</p>
              </li>
              <li>
                <div class="part">
                  <p class="info_left">逾期</p>
                  <p class="info_right">63<span>%</span></p>
                </div>
                <p class="chart_time">2018.04.31 12:34:44</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="maintain">
        <p class="maintain_title clickThis">保养 Maintain</p>
        <div class="chart_content">
          <div class="chart" style="width:390px; height:320px">
            <div id="main3" style="width: 100%;height:100%;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="window">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>

    <div class="window_right" >
      <iframe  id="show-iframe"  style="width:1430px;height:730px;" frameborder=0 name="showHere" scrolling=auto src="https://renxingzuche.com/firemen/b93e09/static/demo/cn/demo.html"></iframe>

    </div>
  </div>
  <!--------------------------------------------------windowSensor-------------------------------------------------->
  <div class="windowSensor" v-show="windowSensors">
    <div class="close" href="#"> <img class="close" v-bind:src="close" @click="windowSensorClose"> </div>
    <div class="windowSensorLeft">
      <div class="leftTop_mapEquipment">
        <h4>设备名称：<span v-html="currentPoint.name"></span></h4>
        <div class="equipment_picture"></div>
        <div class="equipment_data">
          <ul>
            <li>设备地址：<span>物理地址</span></li>
            <li>生产厂家：<span>江苏（南京）科大立安有限公司</span></li>
            <li>安全运行时间：<span>127天23时四五分</span></li>
            <li>上次报警时间：<span>2017.11.34 12:32:22</span></li>
            <li>报警时长：<span>4小时34分12秒</span></li>
          </ul>
        </div>
      </div>
      <div class="leftCenter_mapEquipment">
        <h5>七天状态化统计</h5>
        <ul>
          <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
          <li class="equipment_state">正常</li>
          <li>03/30</li>
        </ul>
        <ul>
          <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
          <li class="equipment_state">正常</li>
          <li>03/30</li>
        </ul>
        <ul>
          <li class="equipment_logo"><img v-bind:src="red" width="36" height="36"></li>
          <li class="equipment_state  red">报警</li>
          <li>03/30</li>
        </ul>
        <ul>
          <li class="equipment_logo"><img v-bind:src="yellow" width="36" height="36"></li>
          <li class="equipment_state yellow">故障</li>
          <li>03/30</li>
        </ul>
        <ul>
          <li class="equipment_logo"><img v-bind:src="gray" width="36" height="36"></li>
          <li class="equipment_state gray">屏蔽</li>
          <li>03/30</li>
        </ul>
        <ul>
          <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
          <li class="equipment_state">正常</li>
          <li>03/30</li>
        </ul>
        <ul>
          <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
          <li class="equipment_state">正常</li>
          <li>03/30</li>
        </ul>
      </div>
      <div class="leftDown_mapEquipment">
        <h5>探测器检测量</h5>
      </div>
    </div>
    <div class="windowSensorRight">
      <div class="windowSensorRightTop" style="width:825px; height:370px;">
        <h5>地图所在位置</h5>
        <div class="equipment_map" id="dataLayerA">
          <vue-layer :data-parent="dataLayerAdd" @layerPoint="layerPoint" ref="layerAdd"></vue-layer>
        </div>
      </div>
      <div class="windowSensorRightDown">
        <h5>视频监控</h5>
        <div class="equipment_video" style="width:825px; height:370px;">
          <video id="myPlayer01" style="width:825px; height:320px;" poster="" controls playsInline webkit-playsinline autoplay>
          <source src="rtmp://rtmp.open.ys7.com/openlive/3b795fffdd014c109ead03c9f0ee855a" type="" />
          <source src="http://hls.open.ys7.com/openlive/3b795fffdd014c109ead03c9f0ee855a.m3u8" type="application/x-mpegURL" />
          </video>
        </div>
      </div>
    </div>
  </div>
  <!--------------------------------------------------windowYinHuan-------------------------------------------------->
  <div class="windowYinHuan">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>
    <div class="windowYinHuanLeft">
      <h5>未完成的隐患</h5>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
      <!------------yinHuanPart------------>
      <div class="yinHuanPart">
        <div class="yinHuanPicture"></div>
        <div class="yinHuanRight">
          <ul>
            <li>隐患等级：<span>一般隐患</span></li>
            <li>隐患类型：<span>消防管理</span></li>
          </ul>
          <p>描述：<span class="describe">建筑装修材料不符合消防规范规定要求</span></p>
        </div>
      </div>
    </div>
    <div class="windowYinHuanRight">
      <div class="yinHuanChartTop">
        <h5>隐患类型分布</h5>
        <div id="main6" style="width:350px; height:328px;"></div>
      </div>
      <div class="yinHuanChartDown">
        <h5>隐患等级分布</h5>
        <div id="main7" style="width:350px; height:328px;"></div>
      </div>
    </div>
  </div>
  <!--------------------------------------------------windowShebei-------------------------------------------------->
  <div class="windowShebei" style="display:none;">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>
    <div class="sheBeiChart">
      <h5>安全运维联动分析</h5>
      <ul>
        <li class="this">7天</li>
        <li>30天</li>
        <li>100天</li>
        <li>自定义</li>
      </ul>
      <div class="graphBar"></div>
    </div>
  </div>
  <!--------------------------------------------------windowXunjian-------------------------------------------------->
  <div class="windowXunjian">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>
    <div class="xunJianLeft">
      <h5>巡检清单</h5>
      <table width="100%" border="0">
        <tr>
          <th>序号</th>
          <th>点位名称</th>
          <th>目前状态</th>
          <th>点位二维码</th>
          <th>所属区域</th>
          <th>所属楼层</th>
          <th>点位位置</th>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="yellow">待领取</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="green">待巡检</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td class="red">已过期</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
        <tr>
          <td>1</td>
          <td>名称一</td>
          <td>已完成</td>
          <td></td>
          <td>A</td>
          <td>2F</td>
          <td>2F-15A进站口旁边</td>
        </tr>
      </table>
    </div>
    <div class="xunJianRight">
      <h5>巡检完成情况</h5>
      <div class="xunJianRightChart" id="main5"></div>
      <div class="xunJianRightPart">已完成：<span>241</span></div>
      <div class="xunJianRightPart1">待巡检：<span>241</span></div>
      <div class="xunJianRightPart2">待领取：<span>241</span></div>
      <div class="xunJianRightPart3">已过期：<span>241</span></div>
    </div>
  </div>
  <!--------------------------------------------------windowBaoyang-------------------------------------------------->
  <div class="windowBaoyang" style="display:none;">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>
    <div class="windowBaoyangLeft">
      <h5>保养指标</h5>
      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>
      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>

      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>

      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>

      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>

      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>

      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>

      <!------------baoYangPart------------>
      <div class="baoYangPart">
        <div class="baoYangPicture"></div>
        <div class="baoYangRight">
          <ul>
            <li>设备名称：<span>控制模块_1107</span></li>
            <li>所属系统：<span>水系统</span></li>
            <li>设备地址：<span>A-504</span></li>
            <li>具体地址：<span>东-3楼-A区-504</span></li>
            <li>保养人员：<span>张全发</span></li>
            <li>完成时间：<span>2018.06.18 11:32</span></li>
            <li>保养描述：<span>按要求完成保养工作</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="windowBaoyangRight">
      <div class="baoYangChartTop">
        <h5>每天保养完成数</h5>
        <div class="dayData">
          <ul id="dayData1">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData2">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData3">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData4">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData5">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData6">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData7">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData8">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
        <div class="dayData">
          <ul id="dayData9">
            <li class="dayNumber">2018.05.17</li>
            <li class="dataNumber">18,091</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!--------------------------------------------------windowYuan-------------------------------------------------->
  <div class="windowYuan" style="display:none;">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>
    <div class="windowYuanMain">
      <h5 class="button">选择预案</h5>
      <ul>
        <li>信息传递组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>灭火战斗组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>引导疏散组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>安全警戒组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>后勤救护组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
      </ul>
      <a href="#" class="button" @click="openwindowYuan2">确 定</a> </div>
  </div>
  <!--------------------------------------------------windowYuan2-------------------------------------------------->
  <div class="windowYuan2" v-show="windowYuan2">
    <div class="close" href="#"> <img class="close" v-bind:src="close" @click="closewindowYuan2"> </div>
    <div class="windowYuan2Left">
      <h5>预案流程</h5>
      <p>1、南京南行车室接到接入起火动车组、进站救援准备的调度命令后，立即将事故警情向客运值班领导、南京南派出所、消防站报告；迅速拨打119、120等救援电话；按照信息报送规定及时向直属站安全生产指挥中心报告。并根据集团公司调度所命令和车站实际组织行车安排。
        <br>2、客运值班的领导接报后，立即赶赴客运综控室把关。同时，宣布启动火灾事故应急处置预案，成立现场指挥领导小组，下设通讯联络、安全警戒、引导疏散、后勤救护、灭火战斗五个应急处置小组，并通知应急处置小组做好准备。
        <br>3、通讯联络组由南站客运车间值班领导带队，做好信息、指令的上传下达工作。值班员与起火列车司机、车长联系，确定起火车厢、人员疏散、接触网断电等情况；申请停电调度命令并采取接地措施、申请线路封闭允许跨线等命令；组长及时传达现场指挥领导小组的灭火指令；协调各小组开展工作。
        <br>4、安全警戒组由公安派出所驻站警长带队，携带警戒绳等工具，到达指定站台、通道等部位待命；起火列车接入后，组织维护现场秩序、隔离闲杂人员、畅通救援通道；指派1名民警引导119、120等救援力量达到现场。
        <br>5、引导疏散组由客运大班站台值班员（1）带队，到达指定站台待命；起火列车接入后，配合列车乘务组组织旅客有序疏散到安全地带。
        <br>6、后勤救护组由值班站长张发林带队，协调120等救护力量到达指定位置；起火列车接入后，协调救护力量携带必要救护器材对危重伤员进行现场救护处置。如没有危重伤员，协助引导疏散组的工作。
        <br>7、灭火战斗组由客运大班站台值班员（2）带队，携带防护、灭火等必要工具到达指定站台、做好事先准备待命；待起火列车接入、获得“接触网已停电、接地，准许灭火作业”命令后，与消防站战斗人员立即使用消防设施器材开展灭火救援。
        <br>8、 消防站接报后，由消防站值班站长带队，带领组员携带防护、灭火等必要工具到达接入起火动车组列车的站台，等待灭火指令。地方消防救援力量到达后，协助做好灭火救援工作。
        <br>9、其余岗位作业人员按照现场指挥人要求，配合应急处置、维持好车站秩序、确保平稳有序。
        <br>10、各应急处置小组处置工作完成后，应及时报告现场指挥领导小组；现场指挥领导小组统一组织做好后期处置及配合开展火灾事故调查等工作。
      </p>
    </div>
    <div class="windowYuan2Main">
      <h5>地图展示区</h5>
      <div class="windowYuan2Map">
        <div id="layerTop2">
          <vue-layer :data-parent="dataLayer2" @openModel="openModel" ref="layer01" @layerPoint="layerPoint"></vue-layer>
        </div>
      </div>
    </div>
    <div class="windowYuan2Right">
      <h5>小组分配</h5>
      <ul>
        <li>信息传递组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>灭火战斗组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>引导疏散组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>安全警戒组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
        <li>后勤救护组:<span>
      <select>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
        <option>组长 13952066754</option>
      </select>
      </span></li>
      </ul>
      <h5 style="margin-top:20px; margin-bottom:5px;">应急处置分工及岗位职责</h5>
      <p>（一）现场指挥领导小组。由南京南客运车间值班领导任组长、其他五个应急处置小组组长为组员，全权负责火灾事故处置组织指挥。上级领导到场后，由车站最高领导担任现场指挥领导小组组长。
        <br>（二）通讯联络组。由由南京南客运车间值班领导兼任组长，行车室安全员、值班站长以及1名行车室值班员、综控室2名客运员为组员，负责各类信息、指令的上传下达。
        <br>（三）安全警戒组。由公安派出所驻站警组长任组长，2名民警和2名安检员为组员；负责维护现场秩序，引导救援车辆、力量进入现场，控制闲杂人员。
        <br>（四）引导疏散组。由客运大班站台值班员（1）任组长，4名客运员为组员，负责组织旅客安全疏散。
        <br>（五）后勤救护组。由值班站长任组长，1名“158”客运员、1名客服人员和2名候车室医疗服务站人员为组员，做好后勤救护工作。
        <br>（六）灭火战斗组。由客运大班站台值班员（2）任组长，4名申铁杰能人员、4名客运员为组员，负责初期灭火救援，及协助消防站战斗人员开展救援。</p>
    </div>
  </div>
  <a href="#" class="yuAn"></a>
  <!--------------------------------------------------windowDeviceDetails-------------------------------------------------->
  <div class="windowDeviceDetails" style="display:none;">
    <div class="close" href="#"> <img class="close" v-bind:src="close"> </div>
    <div class="windowDeviceDetailsLeft">
      <ul class="tab">
        <li><a href="#" class="this">楼层</a></li>
        <li><a href="#">系统</a></li>
        <li>
          <input type="text" />
        </li>
      </ul>
      <div class="windowDeviceDetailsTree">
        <div class="tree">
          <ul class="treeDropdown">
            <li> <a class="treeMeau" href="#">1F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau2" href="#">2F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
                <li><a href="#">防火分区一区</a></li>
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau3" href="#">3F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau4" href="#">4F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau5" href="#">5F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau6" href="#">6F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau7" href="#">7F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
            <li> <a class="treeMeau8" href="#">8F</a>
              <ul class="secend">
                <li><a href="#">防火分区一区</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="treeData">
          <ul>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span class="red">报警</span></li>
            <li>设备名称<span class="yellow">故障</span></li>
            <li>设备名称<span class="gray">屏蔽</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
            <li>设备名称<span>正常</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="windowDeviceDetailsRight">
      <div class="windowSensorLeft">
        <div class="leftTop_mapEquipment">
          <h4>设备名称：<span>主机-回路—点位-烟感0981</span></h4>
          <div class="equipment_picture"></div>
          <div class="equipment_data">
            <ul>
              <li>设备地址：<span>物理地址</span></li>
              <li>生产厂家：<span>江苏（南京）科大立安有限公司</span></li>
              <li>安全运行时间：<span>127天23时四五分</span></li>
              <li>上次报警时间：<span>2017.11.34 12:32:22</span></li>
              <li>报警时长：<span>4小时34分12秒</span></li>
            </ul>
          </div>
        </div>
        <div class="leftCenter_mapEquipment">
          <h5>七天状态化统计</h5>
          <ul>
            <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
            <li class="equipment_state">正常</li>
            <li>03/30</li>
          </ul>
          <ul>
            <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
            <li class="equipment_state">正常</li>
            <li>03/30</li>
          </ul>
          <ul>
            <li class="equipment_logo"><img v-bind:src="red" width="36" height="36"></li>
            <li class="equipment_state  red">报警</li>
            <li>03/30</li>
          </ul>
          <ul>
            <li class="equipment_logo"><img v-bind:src="yellow" width="36" height="36"></li>
            <li class="equipment_state yellow">故障</li>
            <li>03/30</li>
          </ul>
          <ul>
            <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
            <li class="equipment_state gray">屏蔽</li>
            <li>03/30</li>
          </ul>
          <ul>
            <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
            <li class="equipment_state">正常</li>
            <li>03/30</li>
          </ul>
          <ul>
            <li class="equipment_logo"><img v-bind:src="blue" width="36" height="36"></li>
            <li class="equipment_state">正常</li>
            <li>03/30</li>
          </ul>
        </div>
        <div class="leftDown_mapEquipment">
          <h5>探测器检测量</h5>
        </div>
      </div>
      <div class="windowSensorRight">
        <div class="windowSensorRightTop">
          <h5>地图所在位置</h5>
          <div class="equipment_map">
          </div>
        </div>
        <div class="windowSensorRightDown">
          <h5>视频监控</h5>
          <div class="equipment_video"> </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import layering from '@/components/layering'
import vueTips from '@/components/tip'
import echarts from 'echarts'
import {
  Icons,
  Urlmaps,
  IconsAlarm
} from '@/config/config.js'
//require('@/assets/css/index.css')
require('@/assets/css/reset.css')
require('@/assets/css/windows.css')
require('@/assets/script/tendina.js')


export default {
  components: {
    vueLayer: layering,
    tips: vueTips
  },
  name: 'font-icon',
  data() {
    return {
      tableData: [],
      windowSensors: false,
      windowYuan2: false,
      dataContents: [],
      tipsOptions: {
        title: 'tip',
        top: '10px',
        left: '10px'
      },
      currentPoint: {


      },
      dataLayer: {
        slider: 1,
        width: 900, //画布宽度
        height: 760, //画布高度
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        pointImage: require('../../assets/img/t3.png'), //点的背景图
        backgroudImage: require("../../assets/img/svg.svg"), //画布的备件图
        scrollTop: 0,
        type: 0,
        buildID: '',
        dataContent: [],
        divId: "layerTop"
      },
      dataLayer2: {
        slider: 1,
        width: 900, //画布宽度
        height: 760, //画布高度
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        pointImage: require('../../assets/img/t3.png'), //点的背景图
        backgroudImage: require("../../assets/img/svg.svg"), //画布的备件图
        scrollTop: 0,
        type: 0,
        buildID: '',
        dataContent: [],
        divId: "layerTop2"
      },
      dataLayerAdd: {
        slider: 1,
        width: 800, //画布宽度
        height: 500, //画布高度
        containerHight: 400, //底图高度
        containerWidth: 300, //底图宽度
        pointImage: require('../../assets/img/t3.png'), //点的背景图
        backgroudImage: require("../../assets/img/svg.svg"), //画布的备件图
        scrollTop: 0,
        type: 0,
        dataContent: [],
        divId: "dataLayerA"
      },
      blue: require('@/assets/images/blue.png'),
      yellow: require('@/assets/images/yellow.png'),
      red: require('@/assets/images/red.png'),
      gray: require('@/assets/images/gray.png'),
      close: require('@/assets/images/close.png'),
      logo: require('@/assets/logo.png'),
      list: require("@/assets/images/list.png"),
      option7: {
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [{
          name: '隐患等级分类',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: [{
              value: 320,
              name: '一般隐患'
            },
            {
              value: 310,
              name: '较大隐患'
            },
            {
              value: 274,
              name: '重大隐患'
            },
            {
              value: 265,
              name: '特大隐患'
            }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            normal: {
              position: 'inner'
            }
          },

          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#22bcd8',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }]
      },
      option6: {
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [{
          name: '隐患类型分类',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: [{
              value: 320,
              name: '消防管理'
            },
            {
              value: 310,
              name: '消防组织'
            },
            {
              value: 274,
              name: '人员素质'
            },
            {
              value: 265,
              name: '生产设备'
            }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            normal: {
              position: 'inner'
            }
          },

          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#22bcd8',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }]
      },
      option5: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['已完成', '带巡检', '待领取', '已过期']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
              itemStyle: {
                color: '#eee',
              },
              value: 335,
              name: '已完成'
            },
            {
              itemStyle: {
                color: '#00c6f7',
              },
              value: 310,
              name: '带巡检'

            },
            {
              itemStyle: {
                color: '#fcca00',
              },
              value: 234,
              name: '待领取'
            },
            {
              itemStyle: {
                color: '#fc6500',
              },
              value: 135,
              name: '已过期'
            }
          ]
        }]
      },
      option1: {
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: [{
              value: 335,
              name: '完成'
            },
            {
              value: 310,
              name: '待巡检'
            },
            {
              value: 400,
              name: '逾期'
            }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            normal: {
              position: 'inner'
            }
          },

          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#22bcd8',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }]
      },
      option2: {
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: [{
              value: 335,
              name: '完成'
            },
            {
              value: 310,
              name: '待巡检'
            },
            {
              value: 400,
              name: '逾期'
            }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            normal: {
              position: 'inner'
            }
          },

          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#22bcd8',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }]
      },
      option3: {
        title: {
          text: '',
          subtext: '一周保养完成度'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          type: 'category',
          data: ['5.22', '5.23', '5.24', '5.25', '5.26', '5.27', '5.28'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          type: 'value'
        }],
        series: [{
          itemStyle: {
            color: '#01f6e2'
          },
          name: '保养度',
          type: 'bar',
          barWidth: '40%',
          data: [7, 6.7, 7.4, 7.5, 8.6, 8, 7.8]
        }]
      },
      option4: {
        title: {
          text: '',
          subtext: '一周报警数'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          type: 'category',
          data: ['5.22', '5.23', '5.24', '5.25', '5.26', '5.27', '5.28'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          type: 'value'
        }],
        series: [{
          itemStyle: {
            color: '#de4040'
          },
          name: '报警数',
          type: 'bar',
          barWidth: '30%',
          data: [0, 1, 0, 5, 3, 1, 2]
        }]
      }
    }
  },
  methods: {
    getDevice: function() {

      //console.log("开始查询");
      var that = this;
      //  var params = new URLSearchParams();
      //  params.append('bs_unid', this.addForm.bs_unid);
      this.$http.get('https://api.renxingzuche.com/bigger/layered_graph', {
        params: {
          bs_unid: "43CC4ADA0DE146B799A9EA1005516E31"
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
              type: layer.type_id,
              name: layer.name,
              content: layer.facility_name,
              pointImage: layer.icon_uri,
              facility_unids: layer.facility_unids,
              camera_unids: layer.camera_unids
            })
          }
          that.dataContents = temp;
          that.dataLayer.dataContent = temp;
          that.dataLayer2.dataContent = temp;
          //  that.dataContents = temp;
          //  that.searchFormatData(that.searchText);

        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        console.log("错误：" + error);
      });
    },
    drawPie(id, option) {
      var that = this;
      this.charts = echarts.init(document.getElementById(id))
      that.setData(option);
    },
    setData(option) {
      var that = this;

      this.charts.setOption(option)
    },
    selectRow: function(row) {
      console.log(row);
      //  console.log("jquery 数据：" + $(".container").width());
      var that = this;
      //  that.searchFormatData(that.searchText);
      //  that.dataContents=that.dataLayer.dataContent;
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
        that.dataLayer.dataContent = [{
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
        }];

      } else {
        that.dataContents.forEach(function(value, index, array) {　
          if (type == value.type) {
            temp.push(value);
          }　
        });
        that.dataLayer.dataContent = temp;
      }
    },

    initPage() {
      //window
      $("div.window").hide();
      $("div.video_right").width($("div.video_center").width() - $("div.video_left").width() - 2);
      $('div.video_bottom a.popup').click(function() {
        $("div.window").show();
        $('div.window').fadeIn;
      });
      //windowSensor
      //    $("div.windowSensor").hide();
      //  $('div.sensor p.sensor_title').click(function() {
      //    $("div.windowSensor").show();
      //    $('div.windowSensor').fadeIn;
      //  });
      //  $('img.close').click(function() {
      //  $("div.windowSensor").hide();
      //  $('div.windowSensor').fadeOut;
      //  });
      //windowYinHuan
      $("div.windowYinHuan").hide();
      $('#clickP').click(function() {
        $("div.windowYinHuan").show();
        $('div.windowYinHuan').fadeIn;
      });
      $('img.close').click(function() {
        $("div.windowYinHuan").hide();
        $('div.windowYinHuan').fadeOut;
      });
      //windowXunjian
      $("div.windowXunjian").hide();
      $('#clickScend').click(function() {
        $("div.windowXunjian").show();
        $('div.windowXunjian').fadeIn;
      });
      $('img.close').click(function() {
        $("div.windowXunjian").hide();
        $('div.windowXunjian').fadeOut;
      });
      //windowBaoyang
      $("div.windowBaoyang").hide();
      $('div.maintain p.maintain_title').click(function() {
        $("div.windowBaoyang").show();
        $('div.windowBaoyang').fadeIn;
      });
      $('img.close').click(function() {
        $("div.windowBaoyang").hide();
        $('div.windowBaoyang').fadeOut;
      });
      //windowYuan
      $("div.windowYuan").hide();
      $('a.yuAn').click(function() {
        $("div.windowYuan").show();
        $('div.windowYuan').fadeIn;
      });
      $('img.close').click(function() {
        $("div.windowYuan").hide();
        $('div.windowYuan').fadeOut;
      });
      //window2
      $(' .dropdown li a.meau').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau3,.dropdown li a.meau4,.dropdown li a.meau5,.dropdown li a.meau6,.dropdown li a.meau7,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau2').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau,.dropdown li a.meau3,.dropdown li a.meau4,.dropdown li a.meau5,.dropdown li a.meau6,.dropdown li a.meau7,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau3').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau,.dropdown li a.meau4,.dropdown li a.meau5,.dropdown li a.meau6,.dropdown li a.meau7,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau4').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau3,.dropdown li a.meau,.dropdown li a.meau5,.dropdown li a.meau6,.dropdown li a.meau7,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau5').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau3,.dropdown li a.meau4,.dropdown li a.meau,.dropdown li a.meau6,.dropdown li a.meau7,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau6').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau3,.dropdown li a.meau4,.dropdown li a.meau5,.dropdown li a.meau,.dropdown li a.meau7,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau7').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau3,.dropdown li a.meau4,.dropdown li a.meau5,.dropdown li a.meau6,.dropdown li a.meau,.dropdown li a.meau8').removeClass("select");
      });

      $(' .dropdown li a.meau8').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.dropdown li a.meau2,.dropdown li a.meau3,.dropdown li a.meau4,.dropdown li a.meau5,.dropdown li a.meau6,.dropdown li a.meau7,.dropdown li a.meau').removeClass("select");
      });

      $('img.close').click(function() {
        $("div.window").hide();
        $('div.window').fadeOut;
      });
      //windowDeviceDetailsTree
      $(' .treeDropdown li a.treeMeau').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau2').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau3').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau4').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau5').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau6').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau7').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });

      $(' .treeDropdown li a.treeMeau8').click(function() {
        var Index = $(this).index();
        $(this).toggleClass("select");
        $('.treeDropdown li a.treeMeau2,.treeDropdown li a.treeMeau3,.treeDropdown li a.treeMeau4,.treeDropdown li a.treeMeau5,.treeDropdown li a.treeMeau6,.treeDropdown li a.treeMeau7,.treeDropdown li a.treeMeau8').removeClass("select");
      });
    },
    layerPoint: function(val) {
      console.log("父页面打印数据" + val);
      console.log(this.data.slider);
    },

    openwindowYuan2: function() {

      this.windowYuan2 = true;

    },
    closewindowYuan2: function() {
      this.windowYuan2 = false;
    },
    openModel: function(content) //设备id
    {
      console.log(content);
      this.currentPoint = content;
      this.dataLayerAdd.dataContent = [];
      this.dataLayerAdd.dataContent.push(content);
      this.windowSensors = true;
      var player = new EZUIPlayer('myPlayer01');
      player.on('error', function() {
        console.log('error');
      });
      player.on('play', function() {
        console.log('play');
      });
      player.on('pause', function() {
        console.log('pause');
      });

      //this.$refs.layer01.initPage();
    },
    windowSensorClose: function() {
      this.windowSensors = false;

    },
    // 监听从组件内传递出来的事件
    yes(args) {
      // console.log( args );
      alert(JSON.stringify(args));
    },
    // 显示tips
    showtips() {
      // console.log( this.$refs );
      alert(0);
      this.$refs.dialog.showTips();
    },
    initVedio() {
    /*  var player = new EZUIPlayer('myPlayer');
      player.on('error', function() {
        console.log('error');
      });
      player.on('play', function() {
        console.log('play');
      });
      player.on('pause', function() {
        console.log('pause');
      });*/
    },
    initAlarm: function() {
      var that = this;
      that.tableData = [];
      this.$http.get(Urlmaps.alarm, {
        params: {
          //    datime_sys: that.alarmDate[0],
          //  datime_end: that.alarmDate[1],
          page_id: 1,
          page_size: 3,
          //  unit_unid:""
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {


          var temp = [];

          for (var alarm of response.data.collection) {

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
            temp.push(row);
          }
          that.tableData = temp;

        } else {
          console.log("状态：" + response.status)
        }

      }).catch((error) => {
        this.page.total = 0;
        console.log("错误：" + error);
        that.tableLoading = false;
      });

    },
  },
  //调用
  mounted() {
    var that = this;
    that.initPage();
    that.getDevice();
    that.initVedio();
    that.initAlarm();
    this.$nextTick(function() {
      this.drawPie('main7', that.option7);
      this.drawPie('main6', that.option6);
      this.drawPie('main5', that.option5);
      this.drawPie('main4', that.option4);
      this.drawPie('main3', that.option3);
      this.drawPie('main2', that.option2);
      this.drawPie('main1', that.option1);
      $('.dropdown').tendina({
        animate: true,
        speed: 500,
        openCallback: function($clickedEl) {
          console.log($clickedEl);
        },
        closeCallback: function($clickedEl) {
          console.log($clickedEl);
        }

      })
    })
  },
  watch: {
    dataLayer: {
      handler(newValue, oldValue) {　　　　　　
        console.log(newValue)　　　　
      },
      deep: true
    }

  }
};
</script>
<style type="text/css">
g.hover rect {
  cursor: pointer;
}

g.hover rect:hover {
  fill: #5df2e2 !important;
}

g.hover polygon {
  cursor: pointer;
}

g.hover polygon:hover {
  fill: #5df2e2 !important;
}

g.hover path {
  cursor: pointer;
}

g.hover path:hover {
  fill: #5df2e2 !important;
}

g.hover polyline {
  cursor: pointer;
}

g.hover polyline:hover {
  fill: #5df2e2 !important;
}

polygon.hover {
  cursor: pointer;
}

polygon.hover:hover {
  fill: #5df2e2 !important;
  opacity: 0.5;
}

path.hover {
  cursor: pointer;
}

path.hover:hover {
  fill: #5df2e2 !important;
  opacity: 0.5;
}

body {
  background: url("../../assets/images/index_bg.png") no-repeat;
  background-size: 1920px 1080px;
  width: 1920px;
  height: 1080px;
  font-family: "微软雅黑";
  overflow: hidden;
}

div.clear {
  clear: both;
}

/*----------------------------------main_content-------------------------------------------------*/

div.main_content {
  display: flex;
  flex-direction: row;
}

/*----------------------------------index_left-------------------------------------------------*/

div.index_left {
  display: flex;
  flex-direction: column;
  width: 410px;
  height: 1080px;
}

/*----------------------------------title-------------------------------------------------*/

div.title {
  display: flex;
  width: 388px;
  height: 74px;
  background: url("../../assets/images/title_bg.png") no-repeat;
  background-size: 388px 74px;
  margin-top: 39px;
  margin-left: 20px;
}

div.title img {
  width: 48px;
  height: 43px;
  margin-top: 15px;
  margin-left: 17px;
}

div.title_center {
  display: flex;
  flex-flow: column;
}

div.title p.title_name {
  font-size: 24px;
  color: #ffffff;
  margin-top: 12px;
  margin-left: 20px;
}

div.title p.title_name span {
  padding-bottom: 6px;
  border-bottom: 1px solid #81858c;
}

div.title p.title_name span.edition {
  font-size: 18px;
  margin-left: 30px;
  border-bottom: none;
}

div.title p.english_name {
  font-size: 14px;
  color: #00ccff;
  margin-top: 15px;
  margin-left: 22px;
}

/*----------------------------------title end-------------------------------------------------*/

/*----------------------------------date-------------------------------------------------*/

div.date {
  display: flex;
  justify-content: space-between;
  width: 386px;
  height: 55px;
  background: url("../../assets/images/date_bg.png") no-repeat;
  background-size: 386px 55px;
  margin-top: 4px;
  margin-left: 20px;
}

div.date p.time {
  font-size: 18px;
  color: #ffffff;
  line-height: 43px;
  margin-left: 40px;
}

div.date p.name_info {
  font-size: 28px;
  color: #00ccff;
  line-height: 55px;
  margin-right: 17px;
}

/*----------------------------------date end-------------------------------------------------*/

/*----------------------------------safety_factor-------------------------------------------------*/

div.safety_factor {
  display: flex;
  flex-wrap: wrap;
  width: 386px;
  height: 260px;
  margin-left: 20px;
  margin-top: 26px;
}

div.safety_factor p.safety_title {
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: #ffffff;
  padding-bottom: 4px;
  border-bottom: 3px solid #ff9000;
}

div.sensor p.clickThis {
  cursor: pointer;
}

div.sensor p.clickThis:hover {
  color: #00c6f7;
}

div.routing_inspection p.clickThis {
  cursor: pointer;
}

div.routing_inspection p.clickThis:hover {
  color: #00c6f7;
}

div.maintain p.clickThis {
  cursor: pointer;
}

div.maintain p.clickThis:hover {
  color: #00c6f7;
}

div.safety_content {
  display: flex;
  flex-direction: row;
  position: relative;
}

div.safety_content p.infoA {
  width: 51px;
  height: 113px;
  line-height: 51px;
  border: 1px solid #0197bf;
  border-radius: 3px;
  color: #ffffff;
  font-size: 18px;
  writing-mode: tb-rl;
  text-align: center;
  position: absolute;
  left: 16px;
  top: 33px;
}

div.lineA {
  width: 1px;
  height: 24px;
  background-color: #0197bf;
  position: absolute;
  top: 147px;
  left: 43px;
}

div.lineB {
  width: 46px;
  height: 1px;
  background-color: #0197bf;
  position: absolute;
  top: 171px;
  left: 43px;
}

ul.leftFristPart {
  width: 220px;
}

ul.leftFristPart li {
  font-size: 55px;
  color: #96eaff;
  font-weight: bold;
}

ul.leftFristPart li.brand {
  width: 180px;
  height: 64px;
  background: #000;
  line-height: 64px;
  border-radius: 6px;
  border: 1px solid #00c6f7;
  text-align: center;
  font-size: 28px;
  color: #fff;
  font-weight: normal;
  margin-top: 20px;
  margin-left: 10px;
}

div.battery {
  width: 160px;
  height: 150px
}

div.battery ul li.color10 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #01556a;
  margin-top: 5px;
}

div.battery ul li.color9 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #01637c;
  margin-top: 5px;
}

div.battery ul li.color8 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #027491;
  margin-top: 5px;
}

div.battery ul li.color7 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #0384a5;
  margin-top: 5px;
}

div.battery ul li.color6 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #0294b9;
  margin-top: 5px;
}

div.battery ul li.color5 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #02a4cd;
  margin-top: 5px;
}

div.battery ul li.color4 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #01b3e0;
  margin-top: 5px;
}

div.battery ul li.color3 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #00ccff;
  margin-top: 5px;
}

div.battery ul li.color2 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #3ad8ff;
  margin-top: 5px;
}

div.battery ul li.color1 {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #96eaff;
}

div.battery ul li.color {
  width: 160px;
  height: 10px;
  border-radius: 5px;
  background-color: #b8b8b8;
  margin-top: 5px;
}

div.safety_content p.infoB {
  color: #96eaff;
  font-size: 36px;
  position: absolute;
  top: 155px;
  left: 94px;
}

/*----------------------------------safety_factor end-------------------------------------------------*/

/*----------------------------------video-------------------------------------------------*/

div.video {
  display: flex;
  flex-wrap: wrap;
  width: 386px;
  margin-left: 20px;
  margin-top: 26px;
}

div.video p.video_title {
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: #ffffff;
  padding-bottom: 4px;
  border-bottom: 3px solid #ff9000;
}

div.video_center {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 94px;
  margin-top: 25px;
  position: relative;
}

div.video_center p {
  width: 100%;
  font-size: 60px;
  color: #ffffff;
  text-align: center;
  line-height: 94px;
  position: absolute;
  top: 0;
  left: 0;
}

div.video_left {
  width: 73%;
  height: 94px;
  background: url("../../assets/images/vedio_left_bg.jpg") no-repeat;
}

div.video_right {
  height: 94px;
  background: url("../../assets/images/vedio_right_bg.jpg") no-repeat;
  margin-left: 2px;
}

div.video_bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 384px;
  height: 59px;
  background: url("../../assets/images/vedio_bottom_bg.png") no-repeat;
  margin-top: 2px;
  position: relative;
}

div.video_bottom p.infoC {
  font-size: 22px;
  color: #01b3e0;
  line-height: 42px;
  margin-left: 10px;
}

div.video_bottom p.infoD {
  font-size: 22px;
  line-height: 42px;
  color: #b8b8b8;
  margin-right: 15px;
}

div.video_bottom a.popup {
  display: block;
  width: 113px;
  height: 19px;
  cursor: pointer;
  position: absolute;
  top: 40px;
  left: 133px;
}

/*----------------------------------video end-------------------------------------------------*/

/*----------------------------------sensor-------------------------------------------------*/

div.sensor {
  width: 391px;
  height: 320px;
  margin-left: 20px;
  margin-top: 26px;
}

div.sensor p.sensor_title {
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: #ffffff;
  padding-bottom: 4px;
  border-bottom: 3px solid #ff9000;
}

div.sensor_top {
  display: flex;
  justify-content: space-between;
  width: 391px;
  height: 84px;
  background: url("../../assets/images/sensor_top.png") no-repeat;
  margin-top: 10px;
}

div.sensor_top p.sensor_number {
  font-size: 48px;
  color: #ffffff;
  margin-left: 29px;
  margin-top: 10px;
}

div.sensor_top ul {
  display: flex;
  flex-flow: row;
  margin-top: 18px;
  margin-right: 24px;
}

div.sensor_top ul li {
  margin-left: 21px;
}

div.sensor_top ul li p.red {
  font-size: 26px;
  color: #de4040;
}

div.sensor_top ul li p.yellow {
  font-size: 26px;
  color: #ffdc18;
}

div.sensor_top ul li p.grey {
  font-size: 26px;
  color: #bababa;
}

div.sensor_top ul li p.type {
  font-size: 16px;
  color: #ffffff;
  margin-top: 13px;
  text-align: center;
}

div.sensor_center {
  width: 387px;
  height: 197px;
  background: url("../../assets/images/sensor_center.png") no-repeat;
}

div.sensor_center ul {
  display: flex;
  flex-flow: row;
  margin-left: 11px;
  margin-top: 5px;
}

div.sensor_center ul li {
  width: 7px;
  height: 7px;
  background-color: #0191b6;
  margin-right: 5px;
}

div.sensor_center ul li.red {
  background-color: #de4040;
}

div.sensor_center ul li.yellow {
  background-color: #ffdc18;
}

div.sensor_center ul li.grey {
  background-color: #bababa;
}

div.sensor_center ul.first li {
  margin-top: 10px;
}

/*----------------------------------sensor end-------------------------------------------------*/

/*----------------------------------list -------------------------------------------------*/

div.list img {
  position: absolute;
  left: 432px;
  top: 216px;
}

div.list ul {
  position: absolute;
  top: 260px;
  left: 440px;
  z-index: 2;
}

div.list ul li {
  width: 66px;
  height: 34px;
  background: url("../../assets/images/list_bg.png") no-repeat;
  margin-top: 5px;
  font-size: 14px
}

div.list ul li a {
  display: block;
  width: 66px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  line-height: 34px;
  text-decoration: none;
}

div.list ul li:hover {
  background: url("../../assets/images/map_bg_hover.png") no-repeat;
}

/*----------------------------------list end-------------------------------------------------*/

/*----------------------------------index_left end-------------------------------------------------*/

/*----------------------------------index_center-------------------------------------------------*/

div.index_center {
  display: flex;
  flex-flow: column;
  width: 1090px;
}

/*----------------------------------map-------------------------------------------------*/

div.map {
  width: 1004px;
  height: 826px;
  background: url("../../assets/images/map_bg.png") no-repeat;
  margin-top: 42px;
  margin-left: 84px;
  position: relative;
}

.dropdown {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  font-family: "Montserrat", sans-serif;
  padding-top: 20px;
  font-size: 12px;
}

.dropdown li {
  padding: 0 10px;
  margin-top: 5px;
  text-align: center;
  line-height: 24px;
}

.dropdown li a {
  display: block;
  width: 136px;
  height: 24px;
  text-decoration: none;
  text-transform: uppercase;
  color: #ffffff;
  font-size: 17px;
  background: url("../../assets/images/map_list_open.png") no-repeat;
  background-size: 136px 24px;
}

.dropdown li a.select {
  display: block;
  width: 136px;
  height: 24px;
  text-decoration: none;
  text-transform: uppercase;
  color: #ffffff;
  font-size: 17px;
  background: url("../../assets/images/map_list_close.png") no-repeat;
  background-size: 136px 24px;
}

.dropdown li>ul li {
  padding: 0 20px;
  text-align: center;
}

.dropdown li>ul li a {
  color: #ffffff;
  font-size: 14px;
  background: url("../../assets/images/map_list_bg2.png") no-repeat;
  width: 105px;
  height: 25px;
  text-align: center;
}

.dropdown li>ul li>ul li {
  padding: 10px 30px;
  color: #ffffff;
}

/*----------------------------------map end-------------------------------------------------*/

/*----------------------------------floor-------------------------------------------------*/

div.floor {
  width: 1070px;
  height: 180px;
  margin-left: 20px;
  margin-top: 12px;
}

div.floor p.floor_title {
  width: 386px;
  font-size: 20px;
  color: #ffffff;
  padding-bottom: 4px;
  border-bottom: 3px solid #ff9000;
}

div.floor_content {
  width: 1070px;
  height: 141px;
  background: url("../../assets/images/floor_content_bg.png") no-repeat;
  margin-top: 9px;
  padding-top: 10px;
}

div.floor_content table {
  margin-left: 20px;
}

div.floor_content table tr td {
  font-size: 14px;
  color: #ffffff;
  line-height: 30px;
}

div.floor_content table tr td a {
  display: block;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
}

div.floor_content table tr.red td a {
  display: block;
  width: 8px;
  height: 8px;
  background-color: #d43d3e;
}

div.floor_content table tr.yellow td a {
  display: block;
  width: 8px;
  height: 8px;
  background-color: #ccb116;
}

div.floor_content table tr.blue td a {
  display: block;
  width: 8px;
  height: 8px;
  background-color: #0291b7;
}

div.floor_content table tr.red td {
  color: #d43d3e;
}

div.floor_content table tr.yellow td {
  color: #ccb116;
}

div.floor_content table tr.blue td {
  color: #0291b7;
}

/*----------------------------------floor end-------------------------------------------------*/

/*----------------------------------index_center end-------------------------------------------------*/

/*----------------------------------index_right-------------------------------------------------*/

div.index_right {
  display: flex;
  flex-flow: column;
  width: 420px;
}

/*----------------------------------routing_inspection-------------------------------------------------*/

div.routing_inspection {
  display: flex;
  flex-flow: column;
  width: 396px;
  height: 300px;
  margin-top: 42px;
  margin-left: 5px;
}

div.routing_inspection p.routing_inspection_title {
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: #ffffff;
  padding-bottom: 4px;
  border-bottom: 3px solid #ff9000;
}

div.chart_content {
  display: flex;
  justify-content: space-between;
  position: relative;
}

div.chart_line {
  position: absolute;
  width: 82px;
  height: 217px;
  background: url("../../assets/images/chart_line.png") no-repeat;
  background-size: 82px 217px;
  top: 42px;
  left: 170px;
}

div.chart {
  width: 200px;
  height: 240px;
  margin-top: 28px;
}

div.chart_info {
  margin-top: 17px;
}

div.chart_info ul li {
  margin-top: 10px;
}

div.part {
  display: flex;
  justify-content: space-between;
  width: 140px;
  height: 60px;
  background: url("../../assets/images/chart_info_bg.png") no-repeat;
  background-size: 140px 60px;
}

div.part p.info_left {
  font-size: 20px;
  color: #ffffff;
  line-height: 67px;
  margin-left: 17px;
}

div.part p.info_right {
  font-size: 30px;
  color: #ffffff;
  line-height: 67px;
}

div.part p.info_right span {
  font-size: 14px;
  margin-right: 5px;
}

div.chart_info ul li p.chart_time {
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  margin-top: 3px;
}

div.routing_inspection_table {
  width: 387px;
  height: 189px;
  background: url("../../assets/images/table_bg.png") no-repeat;
  background-size: 387px 189px;
  margin-left: 15px;
}

div.routing_inspection_table p.table_title {
  font-size: 14px;
  color: #22bcd8;
  margin-top: 9px;
  margin-left: 45px;
}

div.routing_inspection_table table {
  margin-left: 20px;
  margin-top: 10px;
  background: none;
}

div.routing_inspection_table table tr td {
  font-size: 14px;
  color: #ffffff;
  line-height: 30px;
}

div.routing_inspection_table table tr td a {
  display: block;
  width: 10px;
  height: 10px;
  background-color: #22bcd8;
}

/*----------------------------------routing_inspection end-------------------------------------------------*/

/*----------------------------------maintain-------------------------------------------------*/

div.maintain {
  display: flex;
  flex-flow: column;
  width: 396px;
  height: 527px;
  margin-left: 5px;
}

div.maintain p.maintain_title {
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: #ffffff;
  padding-bottom: 4px;
  border-bottom: 3px solid #ff9000;
}

div.maintain_table {
  width: 387px;
  height: 189px;
  background: url("../../assets/images/table_bg.png") no-repeat;
  background-size: 387px 189px;
  margin-left: 15px;
}

div.maintain_table p.table_title {
  font-size: 14px;
  color: #22bcd8;
  margin-top: 9px;
  margin-left: 45px;
}

div.maintain_table table {
  margin-left: 20px;
  margin-top: 10px;
  background: none;
}

div.maintain_table table tr td {
  font-size: 14px;
  color: #ffffff;
  line-height: 30px;
}

div.maintain_table table tr td a {
  display: block;
  width: 10px;
  height: 10px;
  background-color: #22bcd8;
}

/*----------------------------------routing_inspection end-------------------------------------------------*/

/*----------------------------------index_right end-------------------------------------------------*/

/*----------------------------------window-------------------------------------------------*/

div.window {
  display: flex;
  flex-flow: row;
  width: 1533px;
  height: 874px;
  background: url("../../assets/images/window_bg.png") no-repeat;
  background-size: 1533px 874px;
  position: absolute;
  top: 120px;
  left: 230px;
  z-index: 99;
}

div.window div.close img {
  position: absolute;
  width: 48px;
  height: 48px;
  right: 15px;
  top: 10px;
  cursor: pointer;
}

div.window_left {
  display: flex;
  flex-flow: column;
  margin-top: 60px;
}

div.video_content {
  margin-top: 25px;
  margin-left: 60px;
}

div.video_content video {
  width: 360px;
  height: 195px;
  background: url(../../assets/images/vedio.jpg);
  opacity: 0.9;
  cursor: pointer;
}

div.video_content p {
  font-size: 18px;
  color: #01b3e0;
}

div.window_right {
  display: flex;
  flex-flow: column;
  margin-top: 85px;
  margin-left: 50px;
}

div.window_right video {
  width: 1023px;
  height: 672px;
  background: url(../../assets/images/vedio2.jpg);
  opacity: 0.9;
  cursor: pointer;
}

div.window_date {
  display: flex;
  flex-flow: row;
  margin: 50px auto 0 auto;
}

div.window_date p.select_time {
  font-size: 14px;
  color: #ffffff;
  line-height: 45px;
  margin-left: 205px;
  margin-right: 17px;
}

.demo-input {
  padding-left: 10px;
  height: 38px;
  width: 346px;
  line-height: 38px;
  border: 1px solid #01b3e0;
  background-color: transparent;
  border-radius: 5px;
  color: #ffffff;
}

div.window a.sure_btn {
  width: 83px;
  height: 33px;
  line-height: 33px;
  border-radius: 5px;
  color: #ffffff;
  background-color: #0190b4;
  text-align: center;
  margin-left: 7px;
  margin-top: 5px;
  cursor: pointer;
}

div.window a.play_btn {
  width: 129px;
  height: 33px;
  line-height: 33px;
  border-radius: 5px;
  color: #ffffff;
  background-color: #0190b4;
  text-align: center;
  margin-left: 46px;
  margin-top: 5px;
  cursor: pointer;
}





/*----------------------------------window end-------------------------------------------------*/

/*----------------------------------main_content end-------------------------------------------------*/
</style>
