<template>
<!--为echarts准备一个具备大小的容器dom-->
<div id="main" v-bind:style="{width: widths+'px',height: '400px'}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'vue-charts',
  data() {
    return {
      widths: $("#main").parent().width(),
      data: [[0.0]]
    }
  },
  props: [
    'dataParent'
  ],
  watch: {
    dataParent: { //监控父页面数据变化
      handler: function(val, oldValue) {

        var that = this;
        that.data = val;
        //  console.log("............................");
        //  console.log(val);
        that.setData();
      },
      deep: true //监控对象需要设置的属性
    }
  },

  methods: {
    drawPie(id) {
      var that = this;
      this.charts = echarts.init(document.getElementById(id))

      that.setData();
    },
    setData() {
      var that = this;

      this.charts.setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: that.data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '2014-06-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 1,
            color: '#096'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: '',
          type: 'line',
          data: that.data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [{
              yAxis: 0.1
            }, {
              yAxis: 0.2
            }, {
              yAxis: 0.3
            }]
          }
        }
      })
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie('main')
    })
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
