<template>
   <div>
       <el-row>
          <el-col :offset="4" :span="12" style="padding-top: 20px;">
                <router-link to="/">
                    <i class="fa fa-fort-awesome logo"></i>&nbsp;&nbsp; 
                   
                </router-link>
                <span class="login-text">
                    <slot name="title"></slot>
                </span>
          </el-col>
          <el-col :span="6" class="extra-info">
                <slot name="extra"></slot>
          </el-col>
      </el-row>
   </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .logo {
        font-size: 34px;
        color: #F56C6C;
    }
    .login-text {
        font-size: 23px;;
    }
    .extra-info {
        float: right;
        display: flex;
        height: 54px;
        align-items: flex-end;
    }
</style>