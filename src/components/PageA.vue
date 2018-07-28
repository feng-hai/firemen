<template>
<div>
    <el-table :data="tableData" border style="width: 100%" @expand-change="expandChange" ref="table" v-loading="loading"
    element-loading-text=""
    element-loading-background="rgba(255, 255, 255, 0.8)">
      <el-table-column type="expand">
        <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
               <el-form-item label="日期">
                 <span>{{ props.row.date }}</span>
               </el-form-item>
               <el-form-item label="姓名">
                 <span>{{ props.row.name }}</span>
               </el-form-item>
               <el-form-item label="地址">
                 <span>{{ props.row.address }}</span>
               </el-form-item>
             </el-form>
           </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
              <el-button
                size="medium"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">
                <font-icon id="icon-edit" color="#111111"></font-icon>
              </el-button>
              <el-button
                size="medium"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">
                <font-icon id="icon-clone" color="#111111"></font-icon>
              </el-button>
              <el-button
                size="medium"
                @click="dialogFormVisible = true">
                编辑
                <!-- <font-awesome-icon :icon="['fas','times']" color="#111111" /> -->
                <!-- <font-icon id="icon-cross" color="#111111"></font-icon> -->
              </el-button>
            </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: (function() {
        var array = new Array(1);
        array.fill({
          id: Math.random(),
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        });
        array.push({
          id: Math.random(),
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        });
        return array;
      })(),
      loading: false,
      dialogFormVisible: false,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },
  methods: {
    expandChange: function(row, expandedRows) {
      console.log(row);
      console.log(expandedRows);
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
