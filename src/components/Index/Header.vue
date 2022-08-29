<template>
  <el-row
    align="middle"
    type="flex"
    justify="space-between"
    style="background-color: #409eff; height: 44px"
  >
    <el-col :span="6" :offset="1">
      <router-link to="/">
        <h3 style="color: #fff; font-weight: 600; font-size: 18px">
          <i class="fa fa-fort-awesome" style="font-size: 24px"></i>&nbsp;&nbsp;
          HomePage
        </h3>
      </router-link>
    </el-col>
    <el-col :span="12">
      <el-link class="header-bar" @click="logOut" v-show="isLogin">Logout</el-link>
      <router-link to="/my-order">
        <el-link class="header-bar">My Order</el-link>
      </router-link>
      <router-link to="/login">
        <el-link class="header-bar" v-show="!isLogin">Login</el-link>
      </router-link>
      <router-link to="/reg">
        <el-link class="header-bar" v-show="!isLogin">Register</el-link>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      this.$router.push("/");
      location.reload();
    },
  },

  computed:{
  isLogin(){
    if(localStorage.getItem("token")){
      return true
    }
    return false
  }
}
};
</script>

<style scoped>
.header-bar {
  color: #fff;
  margin-right: 20px;
  float: right;
}
.header-bar:hover {
  color: #fff;
}
</style>