<template>
<el-row class="container" :gutter="20">
<iframe  id="show-iframe"  style="width:100%;height:500px;" frameborder=0 name="showHere" scrolling=auto src="http://localhost:5555/cn/demo.html"></iframe>
</el-row>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  methods: {

  },
 mounted() {


  },
 created() {

  }
}
</script>

<style scoped>
.left .search_wrapper {
  padding-bottom: 10px;
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

.plugin {
  width: 500px;
  height: 300px;
}
</style>
