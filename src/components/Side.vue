<template>
  <!--导航菜单-->
	<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
		 unique-opened router>
		<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
			<el-submenu :index="index+''" v-if="!item.leaf">
				<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
				<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
			</el-submenu>
			<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
		</template>
	</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    props: ['status'],
    watch: {
      status: function(val, oldVal) {
        this.isCollapse = val;
      }
    },
    methods: {
      handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			}
    }
  }
</script>
