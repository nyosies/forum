<template>
  <div class="box">
    <el-container>
      <el-header>
        <div class="logo-box">
          <img src="../../assets/logo.png" alt srcset />
          <span>NG2020博客后台管理信息系统</span>
        </div>
        <div class="business-box">
          <ul v-if="userToken">
            <li><i class="el-icon-time"></i>历史记录</li>
            <li>
              <i class="el-icon-user"></i>
              用户名:{{account?account:'XX用户'}}
            </li>
            <li @click="logout">注销</li>
          </ul>
          <ul v-else>
            <li>登录</li>
            <li>注册</li>
          </ul>
        </div>
      </el-header>
      <el-container style="border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu default-active="/admin/user" router>
            <el-menu-item :index="item.index" v-for="item in asideData" :key="item.id">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>文章管理
              </template>
              <el-menu-item index="/admin/article"><i class="el-icon-s-management"></i>全部文章</el-menu-item>
              <el-menu-item index="/admin/addArticle"><i class="el-icon-edit"></i>发布文章</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <el-card>
              <router-view></router-view>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userToken: null,
      account: null,
      asideData: [
        {
          id: 1,
          index: "/admin/user",
          title: "用户管理",
          icon: "el-icon-user"
        },
        // {
        //   id: 2,
        //   index: "/admin/article",
        //   title: "文章管理",
        //   icon: "el-icon-notebook-2"
        // },
        {
          id: 3,
          index: "/admin/role",
          title: "角色分配",
          icon: "el-icon-s-check"
        },
        {
          id: 4,
          index: "/admin/user",
          title: "网站预览",
          icon: "el-icon-s-data"
        }
      ]
    };
  },
  created() {
    let user = localStorage.getItem("user");
    //判断是否存在token
    if (localStorage.getItem("userToken")) {
      user = JSON.parse(user);
      this.userToken = user.token;
      this.account = user.account;
    }
  },
  methods: {
    //退出登录
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/color/color.less");
.box {
  min-width: 880px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: cornflowerblue;
  color: @whiteFontColor;
  .logo-box {
    display: flex;
    align-items: center;
    font-size: @smallFont;
    img {
      width: 50px;
    }
  }
  .business-box {
    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin-right: 10px;
        cursor: pointer;
        font-size: @miniFont;
      }
      li:hover {
        color: crimson;
      }
    }
  }
}
</style>