<template>
<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
  <h3 class="title">系统登录</h3>
  <el-form-item prop="account">
    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
  </el-form-item>
  <el-form-item prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
  </el-form-item>
  <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
  <el-form-item style="width:100%;">
    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
  </el-form-item>
</el-form>
</template>

<script>
import {
  Urlmaps
} from '../config/config.js';
import MenuUtils from '@/utils/MenuUtils'
//import NProgress from 'nprogress

var querystring = require("querystring");

var routers = []
export default {
  data() {
    return {
      logining: false,
      menus: [{
          path: '/firemen/',
          name: '基础信息',
          component: "Home",
          iconCls: 'menu-icon icon-jichuxinxi', //图标样式class
          children: [{
              path: '/Jian-Zhu-Guan-Li',
              component: "Master/Jian_Zhu_Guan_Li",
              name: '建筑管理',
              leaf: true
            },
            {
              path: '/Xiao-Fang-She-Shi',
              component: "Master/Xiao_Fang_She_Shi",
              name: '消防设施',
              leaf: true
            },
            {
              path: '/Pian-Mian-Tu-Biao-Zhu',
              component: "Master/Icons_Annotation",
              name: '平面图标注',
              leaf: true
            },
            {
              path: '/Zi-Chan-Guan-Li',
              component: "Master/Zi_Chan_Guan_Li",
              name: '资产管理',
              leaf: true
            },
            {
              path: '/shipin',
              component: "Master/Shi_Pin",
              name: '视频管理',
              leaf: true
            }
          ]
        },
        {
          path: '/',
          name: '权限管理',
          component: "Home",
          iconCls: 'menu-icon icon-quanxian', //图标样式class
          children: [{
              path: '/Zu-Zhi-Ji-Gou',
              component: 'Auth/Zu_Zhi_Ji_Gou',
              name: '组织机构',
              leaf: true
            },
            {
              path: '/Lian-Wang-Dan-Wei',
              component: "Auth/Lian_Wang_Dan_Wei",
              name: '联网单位',
              leaf: true
            },
            {
              path: '/Yong-Hu-Guan-Li',
              component: "Auth/Yong_Hu_Guan_Li",
              name: '用户管理',
              leaf: true
            },
            {
              path: '/Quan-Xian-Guan-Li',
              component: "Auth/Quan_Xian_Guan_Li",
              name: '权限管理',
              leaf: true
            },
            {
              path: '/Cai-Dan',
              component: "Auth/Cai_Dan",
              name: '菜单',
              leaf: true
            }
          ]
        },
        {
          path: '/',
          name: '信息展示',
          component: "Home",
          iconCls: 'menu-icon icon-xinxizhanshi', //图标样式class
          children: [{
              path: '/Zong-Lan',
              component: "Info/pandect",
              name: '总览',
              leaf: true
            },
            {
              path: '/Bao-Jing-Jian-Kong',
              component: "Info/alarminfo",
              name: '报警监控',
              leaf: true
            }
          ]
        },
        {
          path: '/',
          name: '隐患管理',
          component: "Home",
          iconCls: 'menu-icon icon-yinhuanguanli',
          children: [{
            path: '/Yin-Huan-Zheng-Gai',
            component: "Hazard/Yin_Huan_Zheng_Gai",
            name: '隐患整改',
            leaf: true
          }]
        },
        {
          path: '/',
          name: '应急处理',
          component: "Home",
          iconCls: 'menu-icon icon-yingjichuli',
          children: [{
              path: '/Yu-An-Xin-Xi-Wei-Hu',
              name: '预案信息维护',
              component: "Emergency/Yu_An_Xin_Xi_Wei_Hu"
              ,
              leaf: true
            },
            {
              path: '/Ying_Ji_Xiao_Zu_Ren_Yuan',
              name: '应急小组人员',
              component: "Emergency/Ying_Ji_Xiao_Zu_Ren_Yuan"
              ,
              leaf: true
            }
          ]
        },
        {
          path: '/',
          name: '巡检管理',
          component: "Home",
          iconCls: 'menu-icon icon-xunjianguanli', //图标样式class
          children: [{
              path: '/Xuan-Jian-Guan-Li',
              component: "Inspection/Xun_Jian_Guan_Li",
              name: '巡检管理',
              leaf: true
            },
            {
              path: '/Xuan-Jian-Ji-Hua',
              component: "Inspection/Xun_Jian_Ji_Hua",
              name: '巡检计划'
              ,
              leaf: true
            },
            {
              path: '/Xuan-Jian-Dian-Wei',
              component: "Inspection/Xun_Jian_Dian_Wei",
              name: '巡检点位',
              leaf: true
            },
            {
              path: '/Xuan-Jian-Qu-Yu',
              component: "Inspection/Xun_Jian_Qu_Yu",
              name: '巡检区域',
              leaf: true
            }
          ]
        },
        {
          path: '/',
          name: '保养',
          component: "Home",
          iconCls: 'menu-icon icon-baoyang', //图标样式class
          children: [{
              path: '/Ri-Chang-Bao-Yang',
              component: "Maintenance/Ri_Chang_Bao_Yang",
              name: '日常保养',
              leaf: true
            },
            {
              path: '/Zhuan-Xiang-Bao-Yang',
              component: "Maintenance/Zhuan_Xiang_Bao_Yang",
              name: '专项保养',
              leaf: true
            }
          ]
        },
      ],
      ruleForm2: {
        account: 'liurongyan',
        checkPass: '112233'
      },
      rules2: {
        account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          //{ validator: validaePass }
        ],
        checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    login(data) {
      window.sessionStorage.setItem('menu', JSON.stringify(data));
      MenuUtils(routers, data);
    },
    handleSubmit2(ev) {

      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();

          var params = new URLSearchParams();
          params.append('client_id', '597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.cube.com');
          params.append('grant_type', 'password');
          params.append('client_secret', 'daf2333dd314xfd');
          params.append('username', this.ruleForm2.account);
          params.append('password', this.ruleForm2.checkPass);

          this.$http.post(Urlmaps.login, params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            if (response.status == 200) {
              if (response.data == "q2-user-pwd-faile") {
                this.$message('账号密码错误');
                return;
              }
              var querys = querystring.parse(response.data);
              var userInfo = {
                name: this.ruleForm2.account,
                token: querys.access_token,
                unid: querys.unid
              };
              // console.log(userInfo);

              sessionStorage.setItem('user', JSON.stringify(userInfo));

              this.login(this.menus);

              this.$router.addRoutes(routers);

              this.$router.push({
                path: '/Jian-Zhu-Guan-Li'
              });

            } else {
              this.$message('账号密码错误');
            }
            // console.log(response);
            this.logining = false;
            this.myData = response.data;

          }).catch((error) => {
            console.log(error);
            this.logining = false;
            this.$message('登录错误');
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0 auto 40px;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0 0 35px;
    }
}
</style>
