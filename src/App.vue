<template>
  <div id="app">
    <transition name="fade"
		            mode="out-in">
			<router-view />
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.el-menu {
  background-color: transparent;
  border: none;
}
.el-menu-item {
  // background-color: rgba(0, 0, 0, 0.4);
  padding-left: 70px !important;
}
.el-menu-item:hover {
  // background-color: #434248;
}

.toolbar {
	//border:1px solid #dfe6ec;
	.el-form-item {
		margin-bottom: 0px;
    margin-right: 4px;
	}
}

.transparent .el-input__inner {
  border: 0px;
  background-color: transparent;
}

.red .el-input__inner {
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  color: rgba(255, 255, 255, 0.7);
}
.red .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.no_header_table .el-table__header-wrapper {
  display: none;
}
</style>
