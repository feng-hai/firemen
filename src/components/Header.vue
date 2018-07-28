<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" @change="collapseMenu">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      collapseMenu: function() {
        this.$emit('collapseMenu', this.isCollapse);
      }
    }
  }
</script>
