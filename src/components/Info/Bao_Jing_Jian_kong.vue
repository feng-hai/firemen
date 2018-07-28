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
      <el-table class="table" :data="tableData" border ref="table">
        <el-table-column prop="name" label="报警设施" width="100">
        </el-table-column>
        <el-table-column prop="order" label="报警信息" width="100">
        </el-table-column>
        <el-table-column prop="group" label="状态" width="50">
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
    <div style="width: 100%; height: 340px; background-color: #f6f7fb;"></div>
    <el-col style="margin: 10px 0;">周边设备</el-col>
    <el-form :inline="true">
      <el-form-item>
        <el-select placeholder="范围" :style="{width: '100px'}">
          <el-option label="选项一" value="选项一"></el-option>
          <el-option label="选项二" value="选项二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="设备类型" :style="{width: '100px'}">
          <el-option label="选项一" value="选项一"></el-option>
          <el-option label="选项二" value="选项二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="厂家" :style="{width: '100px'}">
          <el-option label="选项一" value="选项一"></el-option>
          <el-option label="选项二" value="选项二"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
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
  height: 450px;
}
</style>
