<template>
  <div class="login">
    <!-- <NavBar /> -->
    <div class="login_body">
      <main class="login_mian">
        <el-form ref="form" :model="form" label-width="30px" class="login" :rules="rules">
          <div class="logo_box">
            <!-- <div class="logo_img">
              <img src="../../public/icon.jpg" alt srcset />
            </div>-->
            <span>Create your account</span>
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
          <el-form-item label prop="password2" class="form-input">
            <el-input
              :size="this.size"
              placeholder="再次输入密码"
              type="password"
              v-model.trim="form.password2"
              prefix-icon="el-icon-question"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="butForm" :size="this.size">注册</el-button>
            <el-button type="danger" @click="resetForm" :size="this.size">登录</el-button>
          </el-form-item>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
import fun from "@/fun/fun";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      let _reg = /[1-9a-zA-z]{4,20}/;
      let a = _reg.test(value);
      console.log(a);
      switch (true) {
        case value === "":
          callback(new Error("请输入密码"));
          break;
        case !_reg.test(value):
          callback(new Error("密码格式不正确"));
          break;
        default:
          callback();
          break;
      }
    };
    let validatePass2 = (rule, value, callback) => {
      switch (true) {
        case value === "":
          callback(new Error("请输入密码"));
          break;
        case value !== this.form.password:
          callback(new Error("两次输入密码不一致!"));
        default:
          callback();
          break;
      }
    };

    return {
      size: "medium",
      screenWidth: document.body.clientWidth,
      form: {
        username: "",
        password: "",
        password2: ""
      },
      rules: {
        //验证
        username: [
          //默认为true,先去焦点触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        password2: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: validatePass2,
            trigger: "blur"
          }
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
      let obj = {
        username:this.form.username,
        password:this.form.password
      }
      this.$refs.form.validate(v => {
        if (!v) return; //判断验证数据
        this.$req.login.register({
          method: "post",
          data: obj,
          success: res => {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.resetForm()
          }
        });
      });
    },
    resetForm() {
      this.$router.push("/login");
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
    background: url("../assets/img/timg.jpg") no-repeat center center;
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
          font-size: @Font;
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