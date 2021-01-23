<template>
  <div class="login">
    <NavBar />
    <div class="login_body">
      <main class="login_mian">
        <el-form ref="from" :model="form" label-width="30px" class="login" :rules="rules">
          <div class="logo_box">
            <div class="logo_img">
              <img src="../../public/icon.jpg" alt srcset />
            </div>
            <span>sign in</span>
          </div>
          <el-form-item label prop="username" class="form-input">
            <el-input
              :size="this.size"
              placeholder="请输入账号"
              v-model.trim="form.username"
              prefix-icon="el-icon-user-solid"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="password" class="form-input">
            <el-input
              :size="this.size"
              placeholder="请输入密码"
              type="password"
              v-model.trim="form.password"
              prefix-icon="el-icon-question"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="butForm" :size="this.size">登录</el-button>
            <el-button type="danger" @click="resetForm" :size="this.size">重置</el-button>
          </el-form-item>

          <!-- <el-form-item> -->
          <router-link to="/register" class="register_text">没有账号?前往注册</router-link>
          <!-- </el-form-item> -->
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
import fun from "@/fun/fun";
export default {
  data() {
    return {
      size: "medium",
      screenWidth: document.body.clientWidth,
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        //验证
        username: [
          //默认为true,先去焦点触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    window.addEventListener("resize", fun.debounce(this.watchResize, 1000));
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler(newVal, old) {
        if (newVal < 500) {
          this.size = "mini";
        } else {
          this.size = "medium";
        }
      }
    }
  },
  methods: {
    watchResize() {
      this.screenWidth = document.body.clientWidth;
    },
    butForm() {
      if (localStorage.getItem("userToken")) {
        this.$message({
           showClose: true,
          message: "你已经登录，无需再次登录！",
          type: "warning"
        });
        return 
      }
      let params = this.form;
      //  let c =fun.setformData(this.form)
      //  console.log(c.get('password'))
      this.$req.login.loginIn({
        method: "post",
        data: params,
        success: res => {
          console.log(666, res.data);
          let logindata = res.data;
          if (res.code == 200) {
            localStorage.setItem("userToken", logindata.token);
            localStorage.setItem("user", JSON.stringify(logindata));
            this.$router.push("/admin/index.vue");
          }
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields(); //执行element里的重置函数
      this.form.username = "";
      this.form.password = "";
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/color/color.less");
@import url("../assets/color/style.less");
.login {
  box-sizing: border-box;
  padding-top: 46px;
  .login_body {
    min-height: @minHieght;
    background: url("../assets/img/bgtimg.jpg") no-repeat center center;
    background-size: cover;
    z-index: 9;
    // filter: blur(6px);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(15px);
      z-index: 3;
    }
    .login_mian {
      width: 20%;
      font-family: @fontType;
      background: @whiteFontColor;
      padding: 25px;
      position: absolute;
      z-index: 12;
      border-radius: 3px;
      .logo_box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        .logo_img {
          width: 45px;
          height: 45px;
          margin-right: 6px;
          img {
            width: 100%;
          }
        }
        span {
          display: inline-block;
          background-image: -webkit-linear-gradient(left, #f67000, #c56cf0);
          font-weight: bold;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          // text-fill-color: transparent;
          font-size: @bigFont;
          font-family: "华文琥珀";
        }
      }
      .register_text {
        text-decoration: none;
        font-size: @smallFont;
        color: rgb(54, 15, 230);
      }
    }
  }
}

@media screen and (max-width: 1480px) {
  .login {
    padding-top: 40px;
    .login_body {
      .login_mian {
        width: 30%;
      }
    }
  }
}

@media screen and (max-width: 780px) {
  .login {
    padding-top: 40px;
    .login_body {
      .login_mian {
        width: 40%;
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .login {
    padding-top: 40px;
    .login_body {
      .login_mian {
        width: 70%;
        .logo_box {
          .logo_img {
            width: 32px;
            height: 32px;
            img {
              width: 100%;
            }
          }
          span {
            font-size: @Font;
          }
        }
        .register_text {
          font-size: @miniFont;
        }
      }
    }
  }
}
</style>