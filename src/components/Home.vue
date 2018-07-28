<template>
<el-container class="container">
  <el-header height="70" class="header" :class="collapsed?'header-collapse-width':'header-width'" :style="{backgroundImage: 'url(' + require('../assets/img/home_header.jpg') + ')'}">
    <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
    </el-col>
    <el-col :span="10">
      <div class="tools" @click.prevent="collapse">
        <el-button type="text" icon="icon-menu">
        </el-button>
      </div>
    </el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-header>
  <el-container class="wrapper">
    <el-aside class="aside" :style="{width: collapsed ? '65px' : '218px'}">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router :style="{height: '100%'}" text-color="#fff" active-text-color="#ff8486" :collapse="collapsed" background-color="#2e2e2e">
        <template v-for="(item,index) in nodes" v-if="!item.hidden">
      			<el-submenu :index="index+''" v-if="!item.leaf">
      				<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-main v-bind:style="{overflowY: 'scroll'}">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24" class="content-wrapper">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sysName: '',
      collapsed: false,
      sysUserName: '管理员',
      sysUserAvatar: require('../assets/img/user.png'),
      nodes: this.$router.options.routes
    };
  },
  created() {
    //这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
    //有兴趣的可以看一下源码，是为什么获取不到，但是却又有规则了
    //另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
    let isLoadNodes = sessionStorage.getItem('isLoadNodes')
    if (!isLoadNodes) {
      let data = JSON.parse(window.sessionStorage.getItem('menu'))
      this.nodes.push(...data)
      sessionStorage.setItem('isLoadNodes', 'true')
    }
  },
  methods: {

    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    collapse() {
      this.collapsed = !this.collapsed;
    },
    logout: function() {


      var params = new URLSearchParams();
      this.$http.post('https://api.renxingzuche.com/bigger/openid/out', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.status == 200) {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        } else {
          this.$message('退出错误');
        }

      }).catch((error) => {
        this.$message('退出错误');
      });
    }
  }
}
</script>

<style scoped lang="scss">
.container {
    .header {
        background-repeat: no-repeat;
        background-color: #2e2e2e;
        height: 70px;
        line-height: 70px;
        padding: 0;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0 10px 10px;
                    float: right;
                }
            }
        }
        .logo {
            height: 70px;
        }
        .logo-width {
            width: 218px;
            background-image: url("../assets/img/logo.png");
        }
        .logo-collapse-width {
            width: 65px;
            background-image: url("../assets/img/logo_s.png");
        }
        .tools {
            margin-left: 10px;
        }
    }
    .header-width {
        background-position: 218px 0;
    }
    .header-collapse-width {
        background-position: 65px 0;
    }
    .aside {
        background-image: url("../assets/img/home_aside.jpg");
        overflow: hidden;
    }
}
.wrapper {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #f4f4f4;
}
.breadcrumb-container {
    .title {
        width: 200px;
        float: left;
        color: #475669;
    }
    .breadcrumb-inner {
        float: left;
    }
}
.content-wrapper {
    box-sizing: border-box;
    margin-top: 10px;
}
</style>
