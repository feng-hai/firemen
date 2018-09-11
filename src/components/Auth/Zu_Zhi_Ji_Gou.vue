<template>
<el-row class="container" :gutter="20">
  <el-col :span="5" class="left">
    <el-row class="search_wrapper">
      <!-- <el-col :span="20">
        <el-input placeholder="请输入内容" class="search transparent">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col> -->
      <el-col :span="4">
        <el-button size="mini" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="tree_wrapper">
        <el-tree :data="data" highlight-current default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="19" class="right">
    <h3>机构信息</h3>
    <el-form label-position="top" :rules="rules" label-width="80px" :model="form" ref="form">
      <el-form-item prop="type" hidden>
      </el-form-item>
      <el-form-item prop="name">
        <p class="title">机构名称</p>
        <el-input class="content" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="domain">
        <p class="title">所属分组</p>
        <el-select class="content" v-model="form.domain" placeholder="请选择所属分组">
          <el-option v-for="item in domainData" :key="item.unid" :label="item.name" :value="item.unid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <p class="title">LOGO图片</p>
        <el-row class="content">
          <el-col :span="12">
            <el-upload class="upload-demo" drag action="https://api.renxingzuche.com/bigger/image" :show-file-list="false" :http-request="handleImgUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="12"><img :src="form.url" style="width: 100%;" /></el-col>
        </el-row>
      </el-form-item>
      <div>
        <el-button :style="{backgroundColor: '#ffe9d2'}" @click="submitDomain">保存配置信息</el-button>
        <el-button :style="{backgroundColor: '#ffe9d2'}" @click="handleDelete" v-show="form.type == 'add' ? false : true">删除配置信息</el-button>
      </div>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      domainData: {},
      form: {
        type: 'add',
        unid: '',
        name: '',
        domain: '',
        url: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入机构名称',
          trigger: 'blur'
        }, ],
        domain: [{
          required: true,
          message: '请选择所属分组',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitDomain: function() {

      this.$refs.form.validate((valid) => {
        if (valid) {
          var params = new URLSearchParams();
          params.append('name', this.form.name);
          params.append('super_unid', this.form.domain);
          params.append('url', this.form.url);

          if (this.form.type == "add") {
            this.$http.post('https://api.renxingzuche.com/bigger/domain', params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 201) {
                this.$refs.form.resetFields();
                this.$message('新增成功');
                this.getDomainInfo();
              } else {
                this.$refs.form.resetFields();
                this.$message('新增失败');
              }
            }).catch((error) => {
              this.$refs.form.resetFields();
              this.$message('新增失败');
            });
          } else {
            this.$http.put('https://api.renxingzuche.com/bigger/domain/' + this.form.unid, params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              if (response.status == 200) {
                this.$refs.form.resetFields();
                this.$message('修改成功');
                this.getDomainInfo();
              } else {
                this.$refs.form.resetFields();
                this.$message('修改失败');
              }
            }).catch((error) => {
              this.$refs.form.resetFields();
              this.$message('修改失败');
            });
          }
        } else {
          return false;
        }
      });
    },
    handleDelete: function() {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteDomain(this.form.unid);
      }).catch(() => {

      });
    },
    deleteDomain: function(unid) {
      this.$http.delete('https://api.renxingzuche.com/bigger/domain/' + unid).then((response) => {
        if (response.status == 200) {
          this.$refs.form.resetFields();
          this.$message('删除成功');
          this.getDomainInfo();
          this.handleAdd();
        } else {
          this.$refs.form.resetFields();
          this.$message('删除失败');
        }
      }).catch((error) => {
        this.$refs.form.resetFields();
        this.$message('删除失败');
      });
    },
    handleAdd: function() {
      this.form = {
        type: 'add',
        unid: '',
        name: '',
        domain: '',
        url: ''
      };
      this.$refs.form.resetFields();
    },
    handleNodeClick: function(data) {
      this.form.type = "edit";
      this.form.unid = data.unid;
      this.form.name = data.label;
      this.form.domain = data.superUnid;
      this.form.url = data.data.url;
    },
    getDomainInfo: function() {
      this.$http.get('https://api.renxingzuche.com/bigger/domain', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          for (var domain of response.data.collection) {
            this.domainData[domain.unid] = domain;
          }
          this.data = this.build(response.data.collection);
        } else {}

      }).catch((error) => {});
    },
    build: function(menuList) {
      // console.time('build')
      let temp = {};
      let ans = [];
      for (let i in menuList) {
        temp[menuList[i].unid] = {
          label: menuList[i].name,
          unid: menuList[i].unid,
          superUnid: menuList[i].super_unid,
          data: menuList[i]
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
      // console.timeEnd('build');
      return ans;
    },
    handleImgUpload(param) {

      var fd = new FormData();
      fd.append('file', param.file);

      this.$http.post('https://api.renxingzuche.com/bigger/image', fd, {
        headers: {
          'Content-Type': 'application/form-data',
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (response.status == 201) {
          this.$message("上传成功");
          this.form.url = response.headers.location;
        } else {
          this.$message("上传失败");
        }

      }).catch((error) => {
        this.$message("上传失败");
      })
    }
  },
  mounted() {
    this.getDomainInfo();
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

.left .tree_wrapper {
  padding: 6px;
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
}

.right {
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.right h3 {
  /* margin-top: 0px; */
  font-weight: normal;
  color: #737373;
  margin-left: 4px;
  margin: 8px;
  font-size: 16px;
}

.right .title {
  background-color: #ffefdf;
  padding-left: 8px;
  color: #ff4745;
  font-size: 14px;
}

.right .content {
  /* margin-left: 4px; */
  color: #737373;
  margin: 18px 0px;
  font-size: 14px;
}
</style>
