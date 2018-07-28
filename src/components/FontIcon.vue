<template lang="html">
  <i v-if="id" class="iconfont" :class="id" :style="{color: color}"></i>
</template>

<script>
export default {
    name: 'font-icon',
    props: {
        id: {
            type: String,
            default: ''
        },
        color: {
          type: String,
          default: '#000'
        }
    }
};
</script>

<style>
@import "//at.alicdn.com/t/font_648628_3ygogy6b3z69a4i.css";
</style>
