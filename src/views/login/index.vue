<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <h3 class="title">OAWeb</h3>
      <el-form-item prop="UserName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="UserName" type="text" v-model="loginForm.UserName" autoComplete="on" placeholder="UserName"/>
      </el-form-item>
      <el-form-item prop="Password">
        <span class="svg-container">
          <svg-icon icon-class="Password"></svg-icon>
        </span>
        <el-input name="Password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.Password"
                  autoComplete="on"
                  placeholder="Password"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <!--<div class="tips">-->
      <!--<span style="margin-right:20px;">UserName: admin</span>-->
      <!--<span> Password: admin</span>-->
      <!--</div>-->
    </el-form>
  </div>
</template>

<script>
  // import { isvalidUsername } from '@/utils/validate'
  import { getToken } from '@/utils/auth'
  import { get } from '@/utils/requestOfSystemManager'
  import store from '@/store'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        //   // callback(new Error('请输入正确的用户名'))
        //   callback()
        // }
        if (!value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        // if (value.length < 5) {
        //   callback(new Error('密码不能小于5位'))
        //   // callback()
        // }
        if (!value) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          UserName: 'admin',
          Password: 'admin',
          AppID: 'Inner.Client.Test',
          AppSec: 'secret',
          Scopes: 'netfx.api  netcore.api  openid  profile'
        },
        loginRules: {
          UserName: [{ required: true, trigger: 'blur', validator: validateUsername }],
          Password: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      getConfig(deptId) {
        get('/InterfaceConfig/GetInterfaceConfig', {
          DeptId: deptId
        }).then(response => {
          console.log(response)
          if (response.data.data.pageSize) {
            localStorage.setItem('pageSize', response.data.data.pageSize)
          } else {
            localStorage.setItem('pageSize', 10)
          }
        }).catch(err => {
          console.log(err)
          localStorage.setItem('pageSize', 10)
        })
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
              this.$store.dispatch('GetUserInfo').then((response) => {
                const deptId = response.data.data.deptId
                this.getConfig(deptId)
              }).catch((err) => {
                console.log(err)
              })
              // new Promise((resolve, reject) => {
              //   this.$post('/OAuthPwd/userinfo', {
              //     token: getToken()
              //   }).then(response => {
              //     console.log(response)
              //     localStorage.setItem('deptId', response.data.data.deptId)
              //     localStorage.setItem('userId', response.data.data.userId)
              //     localStorage.setItem('personDeparts', response.data.data.personDeparts)
              //     resolve(response)
              //   }).catch(res => {
              //     console.log(res)
              //   })
              // }).then((response) => {
              //   const deptId = response.data.data.deptId
              //   this.getConfig(deptId)
              // })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
