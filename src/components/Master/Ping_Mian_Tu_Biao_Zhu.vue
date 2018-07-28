<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <el-row>
      <el-col class="filter_wrapper">
        <el-select v-model="value" placeholder="联网单位" class="red">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="tree_wrapper">
        <el-input v-model="input" placeholder="输入关键词进行过滤"></el-input>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="19" class="right">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button :style="{backgroundColor: '#ffe9d2'}">东一层</el-button>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入内容" :style="{width: '180px'}">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :style="{backgroundColor: '#f6f6f8'}" @click="addDialogFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
        <!-- 新增界面 -->
        <el-dialog title="感应器" :visible.sync="addDialogFormVisible" width="80%">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form :model="addForm" ref="addForm">
                <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                  <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联消防设备" prop="order" :label-width="formLabelWidth">
                  <el-input v-model="addForm.order" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联消防资产" prop="order" :label-width="formLabelWidth">
                  <el-input v-model="addForm.order" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon" :label-width="formLabelWidth">
                  <el-input v-model="addForm.icon" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="16">
              <div :style="{height: '400px', backgroundColor: '#efefef'}"></div>
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
      <el-col :span="16">
        <div :style="{height: '500px', backgroundColor: '#dbdbdb'}"></div>
      </el-col>
      <el-col :span="8">
        <el-table class="table" :data="tableDataRight" border ref="table">
          <el-table-column prop="id" label="设备名称">
          </el-table-column>
          <el-table-column prop="name" label="关联设施">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
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
          label: '东一层'
        }, {
          label: '东一层'
        }, {
          label: '东一层'
        }]
      }, {
        label: '南京南站',
        children: [{
          label: '东一层'
        }, {
          label: '东一层'
        }]
      }, {
        label: '江宁站'
      }],
      addDialogFormVisible: false,
      addForm: {
        id: '',
        name: '',
        order: '',
        group: '',
        icon: '',
        code: ''
      }
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
</style>
