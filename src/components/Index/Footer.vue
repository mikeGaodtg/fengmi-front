<template>
   <el-row>
       <el-col :span="18" :offset="3" class="footer">
           <el-link class="info">About Us</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">Contact</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">Recruitment</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">Open Shop</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">AD</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">Phone App</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">Association</el-link>
           <el-divider direction="vertical"></el-divider>
           <el-link class="info">English Site</el-link>
       </el-col>
   </el-row>
</template>

<script>
export default {

}
</script>
   
<style scoped>
    .footer {
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
    }
    .footer .info {
        margin: 0 5px;
    }
</style>