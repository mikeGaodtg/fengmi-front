<template>
  <div>
    <common-header>
      <template v-slot:title> Welcome </template>
    </common-header>
    <el-divider></el-divider>
    <el-row style="margin-bottom: 15px">
      <el-col :span="24" style="background-color: #d11f20; position: relative">
        <div class="login-banner"></div>
        <el-card class="login-panel">
          <div slot="header" class="clearfix">
            <span style="font-weight: 600; font-size: 20px">login</span>
          
          </div>
          <el-form :model="loginForm" ref="loginForm" class="demo-ruleForm">
            <el-form-item>
              <el-input placeholder="username" v-model="loginForm.username">
                <template slot="prepend">
                  <i class="fa fa-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="password" v-model="loginForm.password">
                <template slot="prepend">
                  <i class="fa fa-lock"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" style="width: 100%" @click="login"
                >login now!</el-button
              >
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item style="margin-bottom: 0">
              <div style="margin-right: auto">
                <i
                  class="fa fa-weixin other-login"
                  style="color: greenyellow"
                ></i>
                <el-divider direction="vertical"></el-divider>
                <i class="fa fa-github other-login" style="color: black"></i>
                <el-divider direction="vertical"></el-divider>
                <i class="fa fa-weibo other-login" style="color: #f56c6c"></i>
              </div>
              <router-link to="/reg">
                <el-button type="text">register</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Index/Footer";
import CommonHeader from "@/components/CommonHeader";
import { loginRequest } from "@/api/user";
export default {
  components: {
    Footer,
    CommonHeader,
  },
  data: () => ({
    loginForm: {
      username: "",
      password: "",
    },
  }),
  methods: {
    login() {

      loginRequest(this.loginForm)
        .then((res) => {
            console.log(res)
          if (res.code == 0) {
                    this.$message.success(res.msg);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId",res.data.userId)
            console.log(localStorage.getItem("userId"))
            console.log(res.user)
            let gotoPage = sessionStorage.getItem("toPage");
            if (gotoPage) {
              sessionStorage.removeItem("toPage")
              this.$router.push(gotoPage);
            } else {
              this.$router.push('/');
            }
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
      loginNotice(){
      if(!this.$store.state.isLogin){
        this.$message.warning("you have't login, need to login first")
        this.$store.commit("toggleLogin")
      }
    }
  },
  created() {
    this.loginNotice()
  },
};
</script>

<style scoped>
.logo {
  font-size: 34px;
  color: #f56c6c;
}

.login-banner {
  background: url("../assets/d9b4ae0f191315cd.jpg") no-repeat;
  height: 475px;
  width: 990px;
  margin: 0 auto;
}
.login-panel {
  position: absolute;
  right: 200px;
  width: 340px;
  top: 50px;
}
.el-form-item__content {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 0;
  align-items: center;
}
.other-login {
  font-size: 24px;
  margin: 0 7px;
}
</style>