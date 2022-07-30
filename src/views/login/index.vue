<template>
  <div class="login">
    <div class="login-card">
      <div class="login-form">
        <img src="@/assets/beelogo.png" alt="" class="login-img" />
        <el-form class="login-form-item" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <i class="el-icon-mobile-phone input-icon2"></i>
            <el-input
              class="login-item"
              placeholder="请输入内容"
              v-model="loginForm.mobile"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="el-icon-lock input-icon"></i>
            <el-input
              class="login-item"
              show-password
              placeholder="请输入密码"
              v-model="loginForm.password"
            >
            </el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="login-chked"
            >记住密码</el-checkbox
          >
          <el-button class="login-btn" @click="onLogin">立即登录</el-button>
        </el-form>
      </div>
      <div class="login-pic"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        mobile: 'admin',
        password: '111111'
      },
      checked: false,
      loginRules: {
        mobile: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            pattern: /^admin$/,
            message: '账户格式错误',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码格式错误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin() {
      this.$router.push('navbar/navigation')
    }
  }
}
</script>

<style scoped lang="less">
.login {
  width: 958px;
  height: 516px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgb(93 93 93 / 33%);
  background-color: #fff;
  border-radius: 40px;
  .login-card {
    .login-pic {
      float: right;
      background-image: url(http://www-wms-java.itheima.net/img/contentBg.1321d126.png);
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 560px;
      height: 516px;
    }
    .login-form {
      position: relative;
      float: left;
      width: 398px;
      height: 516px;
      background: #fff;
      border-radius: 34px 0 0 34px;
      margin: 0 auto;
      //   overflow: hidden;
      .login-img {
        position: absolute;
        top: 70px;
        left: 120px;
        width: 150px;
        height: 64px;
      }
      .login-form-item {
        position: fixed;
        top: 200px;
        .login-item {
          width: 250px;
          margin-left: 100px;
          /deep/.el-input__inner {
            height: 50px;
            background-color: #f8f5f5;
            border: 0px solid #dcdfe6;
          }
        }
        .input-icon {
          position: fixed;
          top: 273px;
          left: 50px;
          width: 50px;
          height: 50px;
          background-color: #eae7e7;
          border-radius: 8px 0 0 8px;
        }
        .input-icon2 {
          position: fixed;
          top: 200px;
          left: 50px;
          width: 50px;
          height: 50px;
          background-color: #eae7e7;
          border-radius: 8px 0 0 8px;
        }
        /deep/.el-icon-mobile-phone {
          font-size: 25px;
          color: #b6acac;
          text-align: center;
          line-height: 50px;
        }
        /deep/.el-icon-lock {
          font-size: 25px;
          color: #b6acac;
          text-align: center;
          line-height: 50px;
        }
        /deep/.el-form-item__error {
          margin-left: 50px;
        }
      }
    }
    .login-btn {
      margin-top: 20px;
      margin-left: 50px;
      width: 300px;
      height: 50px;
      background-color: #ffb200;
      border-radius: 10px;
      font-size: 15px;
      color: #000;
      font-weight: 700;
    }
    .login-chked {
      margin-left: 50px;
      margin-top: 30px;
      display: block;
    }
  }
}
</style>
