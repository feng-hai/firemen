<template>
<div id="layering">
  <tips :tips-options="tipsOptions" ref="dialog" @yes="yes" v-cloak>
    <slot name="header">
      <a href="javascript:;" @click="yes">{{tipTitle}}</a>
    </slot>
    <div slot="body">
      <p>{{tipContent}}</p>
    </div>
  </tips>
</div>
</template>
<script>
import * as d3 from 'd3';
import vueTips from '@/components/tip'
//var drag = {};
export default {
  name: 'vue-layer',
  components: {
    tips: vueTips
  },
  data() {
    return {
      srcM: require('../assets/img/svg.svg'),
      tipTitle: '',
      tipContent: '',
      tipsOptions: {
        title: 'tip',
        top: '10px',
        left: '10px'
      },
      dataContent: {},
      addDialogFormVisible: false,
      line: '',
      margin: {
        top: -5,
        right: -5,
        bottom: -5,
        left: -5
      },
      translate: [0, 0],
      scale: 1.0,
      dataContent: this.dataParent.dataContent || [], //點數據
      pointImage: this.dataParent.pointImage,
      backgroudImage: this.dataParent.backgroudImage,
      //  width: 500, //画布的宽度,
      height: this.dataParent.height || 0, //画布的高度,
      containerHight: this.dataParent.containerHight || 0, //底图高度
      containerWidth: this.dataParent.containerWidth || 0, //底图宽度
      scrollTop: this.dataParent.scrollTop || 0,
      type: this.dataParent.type,
      pointValue: [],
      slider: this.dataParent.slider,
    };
  },
  mounted() {
    var that = this;
    this.initPage();
  },
  props: [
    'dataParent'
  ],
  handleScroll: function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    console.log(scrollTop)
  },
  watch: {
    dataParent: { //监控父页面数据变化
      handler: function(val, oldValue) {
        //console.log("b变化" + val.scrollTop);
        var that = this;
        this.width = val.width || 400; //画布宽度
        this.height = val.height || 100; //画布高度
        this.pageTop = val.pageTop || 0; //画布到页面顶部距离
        this.pageLeft = val.pageLeft || 0; //画布到左边距离
        this.slider = val.slider || 1; //图标大小倍数
        this.scrollTop = val.scrollTop || 0; //滚动条滚动高度
        this.type = val.scrollTop || 0;
        this.dataContent = val.dataContent || []; //點數據
        this.pointImage = val.pointImage || ""; //点图标背景
        this.backgroudImage = val.backgroudImage || ""; //画布背景
        this.containerWidth = val.containerWidth || 100;
        this.containerHight = val.containerHight || 100;
        that.createBg();
        that.initPoint(); //重新初始化化
      },
      deep: true //监控对象需要设置的属性
    },
    pointValue(val) { //子页面变化，提交到父页面
      this.$emit('layerPoint', val) //提交数据到父页面
    }
  },
  methods: {
    // 监听从组件内传递出来的事件
    yes(args) {
      this.$emit("openModel", this.dataContent);
    },

    // 显示tips
    showtips() {
      // console.log( this.$refs );
      this.$refs.dialog.showTips();
    },
    closetips() {
      this.$refs.dialog.closeTips();
    },
    initPage: function() {
      var that = this;

      var divId = that.dataParent.divId || "layering";
      //console.log(that.width);
      //that.width=500;
      //  console.log("jquery "+$("#"+divId).parent().outerWidth(true));
      //console.log(that.width);
      //  console.log(that.containerWidth);
      //that.width = 540;
      //初始化比例尺
      var width = $("#" + divId).parent().width();
      //if (that.width) {
      //  width = that.width;
      //}
      var scale = width / that.containerWidth;
      //console.log("比例尺：" + that.scale);
      //初始化画布
      that.svg = d3.select("#" + divId).append("svg")
        .attr("width", width)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")");
      //.call(zoom);
      that.container = that.svg.append("g");
      that.zoom = d3.behavior.zoom()
        .scaleExtent([0, 10])
        .on("zoom", that.zoomed);
      that.svg.call(that.zoom);
      //添加背景图
      that.createBg();
      that.drag = d3.behavior.drag()
        .origin(function(d) {
          return d;
        })
        .on("dragstart", that.dragstarted)
        .on("drag", that.dragged)
        .on("dragend", that.dragended);

      if (that.type == 4 || that.type == 5) { //等于4的时候是新增

        that.container.append("g")
          .attr("class", "x axis")
          .selectAll("line")
          .data(d3.range(0, that.containerWidth, 10))
          .enter().append("line")
          .attr("x1", function(d) {
            return d;
          })
          .attr("y1", 0)
          .attr("x2", function(d) {
            return d;
          })
          .attr("y2", that.containerHight);
        that.container.append("g")
          .attr("class", "y axis")
          .selectAll("line")
          .data(d3.range(0, that.containerHight, 10))
          .enter().append("line")
          .attr("x1", 0)
          .attr("y1", function(d) {
            return d;
          })
          .attr("x2", that.containerWidth)
          .attr("y2", function(d) {
            return d;
          });

        var circles = "undefined";
        var circles1 = "undefined";
        var isClicking = false;
        that.svg.on("click", function() {

          //console.log("测试");
          var matrix = this.getScreenCTM()
            .translate(+this.getAttribute("cx"), +this.getAttribute("cy"));

          if (circles != "undefined") {
            circles.remove();
          }
          if (circles1 != "undefined") {
            circles1.remove();
          }
          //  console.log("top" + that.scrollTop);
          var RECT_W = 20 * that.slider,
            RECT_H = (42 * that.slider);
          var offset_x = 0,
            offset_y = 0;
          var xV = (d3.event.x - that.translate[0] - matrix.e) / that.scale;
          var yV = (d3.event.y - that.translate[1] - matrix.f + that.scrollTop) / that.scale;
          that.pointValue = [xV, yV];
          circles = that.container
            .attr("class", "all,point")
            .append("image")
            .attr("xlink:href", that.pointImage)
            .attr("x", xV - RECT_W / 2 + offset_x)
            .attr("y", yV - RECT_H)
            .attr("width", RECT_W)
            .attr("height", RECT_H)
            .call(that.drag);
          if (that.type == 5) {
            circles1 = that.container.append("g")
              .append("circle")
              .attr("cx", xV)
              .attr("cy", yV) //将圆心放到svg高度中间
              .attr("r", function(d) {
                return 40;
              })
              .attr("fill", "yellow") //给各圆填充黄色
              .attr("stroke", "orange") //给各圆边涂成橘黄
              .style("opacity", 0.2)
              .call(that.drag);
          }
        });
      }
      var rect = that.svg.append("rect")
        .attr("width", that.width)
        .attr("height", that.height)
        .style("fill", "none")
        .style("pointer-events", "all");
      that.initPoint();
      that.zoom.scale(scale);
      that.zoom.event(that.svg.transition().duration(200));
    },
    createBg: function() {
      var that = this;
      var divId = that.dataParent.divId || "layering";

      var width = $("#" + divId).parent().width();
      if (that.width) {
        width = that.width;
      }
      var scale = width / that.containerWidth;
      console.log(width + "-" + scale + "-" + that.containerWidth);
      if (scale && scale >= 0) {
        if (that.bgObject) {
          that.bgObject.remove();
        }
        that.bgObject = that.container
          .attr("class", "dot12")
          .append("image")
          .attr("xlink:href", that.backgroudImage)
          .attr("x", "0")
          .attr("y", "0")
          .attr("width", that.containerWidth)
          .attr("height", that.containerHight);
        //console.log("比例尺：" + scale);
        that.zoom.translate([0, 0]).scale(scale);
        that.zoom.event(that.svg.transition().duration(200));
      }
    },

    initPoint: function() {
      var that = this;
      var temp = that.container.selectAll(".dot1");
      temp.remove();
      var that = this;
      var RECT_W = 20 * that.slider,
        RECT_H = 42 * that.slider;
      var offset_x = 0,
        offset_y = 0;
      var dot = that.container.append("g")
        .attr("class", "dot1")
        .selectAll("div")
        .data(that.dataContent)
        .enter()
        .append("image")
        .attr("xlink:href", function(d) {
          return d.pointImage;
        })
        .attr("x", function(d) {
          return d.x - RECT_W / 2 + offset_x;
        })
        .attr("y", function(d) {
          return d.y - RECT_H + 2 + offset_y;
        })
        .attr("width", RECT_W)
        .attr("height", RECT_H)
        .on("click", function(d) {
          that.openModel(d);
        });


      /*.on("mouseover", function(e) {
          TweenMax.to($(this).prev(), .1, {
              y: "-=8",
              repeat: 5,
              yoyo: true
          });
      })
      .on("mouseout", function(e) {
          TweenMax.to($(this).prev(), .1, {y: "0"});
      }) ;*/

    },

    openModel: function(d) {
      var that = this;

      that.dataContent = d;

      var RECT_W = 20 * that.slider,
        RECT_H = 42 * that.slider;
      var offset_x = 0,
        offset_y = 0;
      console.log(d);
      //console.log(that.translate);
      that.tipsOptions.top = (d.y * that.scale + that.translate[1] - 130) + "px";
      that.tipsOptions.left = (d.x * that.scale + that.translate[0] - 100 - 10) + "px";
      that.tipsOptions.title = d.name;
      that.tipContent = d.content;
      that.showtips();
      //that.addDialogFormVisible = true;
    },
    getScrollTop: function() {
      var scrollPos;
      if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
      } else if (document.compatMode & document.compatMode != "BackCompat") {
        scrollPos = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollPos = document.body.scrollTop;
      }

      return scrollPos;
    },

    zoomed: function() {
      var that = this;
      that.translate = d3.event.translate;
      that.scale = d3.event.scale;
      this.$refs.dialog.closeTips();
      //  console.log("比例尺："+that.scale+"-"+d3.event.scale);

      that.container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    },

    dragstarted: function(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);

    },
    dragged: function(d) {
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    },
    dragended: function(d) {
      d3.select(this).classed("dragging", false);
    },


  },
};
</script>
<style>
.dot circle {
  fill: lightsteelblue;
  stroke: steelblue;
  stroke-width: 1.5px;

}

.dot circle.dragging {
  fill: red;
  stroke: brown;
}

.axis line {
  fill: none;
  stroke: #ddd;
  shape-rendering: crispEdges;
  vector-effect: non-scaling-stroke;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}

/* Creates a small triangle extender for the tooltip */

.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  color: rgba(0, 0, 0, 0.8);
  content: "\25BC";
  position: absolute;
  text-align: center;
}

/* Style northward tooltips differently */

.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}
</style>
