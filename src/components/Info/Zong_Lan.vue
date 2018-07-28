<template>
<el-row class="container" :gutter="10">
  <el-col :span="4" class="left">
    <el-row class="search_wrapper">
      <el-col>
        <el-input placeholder="请输入内容" class="search transparent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table class="table no_header_table" :data="tableDataLeft" ref="table" highlight-current-row @row-click="handleTableLeft">
        <el-table-column prop="data.name" label="">
        </el-table-column>
      </el-table>
    </el-row>
  </el-col>
  <el-col :span="4" class="middle">
    <el-table class="table no_header_table" :data="tableDataMiddle" ref="table" highlight-current-row>
      <el-table-column prop="data.name" label="">
      </el-table-column>
    </el-table>
  </el-col>
  <el-col :span="16" class="right">
    <div></div>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      tableDataLeft: [],
      tableDataMiddle: [],
      buildData: [],
      buildData2: {}
    }
  },
  methods: {
    handleTableLeft(row, event, column) {
      this.tableDataMiddle = this.buildData2[row.unid];
    },
    getBuildStruct() {
      this.tableDataLeft = [];

      this.$http.get('https://api.renxingzuche.com/bigger/build_struct', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          this.buildData = this.build(response.data.collection);

          for (var build of this.buildData) {
            this.buildData2[build.unid] = [];
            this.tableDataLeft.push(build);
            if (build.children) {
              for (var build2 of build.children) {
                this.buildData2[build.unid].push(build2);
                if (build2.children) {
                  for (var build3 of build2.children) {
                    this.buildData2[build.unid].push(build3);
                  }
                }
              }
            }
          }

          console.log(this.tableDataLeft);
        } else {
          this.$message('获取建筑信息错误');
        }

      }).catch((error) => {
        this.$message('获取建筑信息错误');
      });
    },
    build: function(menuList) {
      // console.time('build')
      let temp = {};
      let ans = [];
      for (let i in menuList) {
        temp[menuList[i].unid] = {
          data: menuList[i],
          unid: menuList[i].unid,
          superUnid: menuList[i].super_unid
        };
      }
      for (let i in temp) {
        if (temp[i].superUnid) {
          if (!temp[temp[i].superUnid].children) {
            temp[temp[i].superUnid].children = new Array();
          }
          temp[temp[i].superUnid].children.push(temp[i]);
        } else {
          ans.push(temp[i]);
        }
      }
      return ans;
    }
  },
  mounted() {
    this.getBuildStruct();
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

.middle .table {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
}

.right div {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  background-color: #fff;
  height: 200px;
}

/* .el-table {
  font-size: 15px;
} */
</style>
