<template>
    <div>
        <Header></Header>
        <search-bar></search-bar>
        <el-divider></el-divider>
        <div>
                 <!-- :body-style="style"  -->
            <el-row type="flex" style="margin-top: 15px;">
                <el-col class="goods-show" :offset="3" :span="18">
                    <el-card 
                    v-for="(product,index) in productList" :key="index">
                        <img :src="`http://localhost:8081/img/${product.productImg?product.productImg.url:defaultPic}`"
                            class="image">
                        <div style="padding: 8px 14px;">
                            <span>{{product.productName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>item sold ：{{product.soldNum}}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ product.createTime }}</time>
                                <el-button class="ml" type="text" size="small" @click="toDetail(product.productId)">Buy</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
         <el-divider></el-divider>
          <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Index/Header'
    import SearchBar from '@/components/Index/SearchBar'
    import Footer from '@/components/Index/Footer'
    import {searchProductByCatId} from '@/api/product.js'
    export default {
       components: {
        Header,
        SearchBar,
        Footer
      },
      data(){
        return{
      productList:[],
            categoryId:0,
            defaultPic:'scoll1.png'
        }
      },
      methods:{
        toDetail:function(productId){
            this.$router.push('/detail?productId='+productId)
        },
        selectProductById(){
            this.categoryId=this.$route.query.categoryId
            searchProductByCatId(this.categoryId).then(res=>{
                this.productList=res.data 
            })
        }
      },
      mounted(){
        this.selectProductById()
      },
      
    }

    // this.searchProductByCatId(id).then(res=>{
    //       console.log(res)
    //     })
</script>

<style scoped>
    .el-card {
        height: 320px;
    }
    .goods-show {
        display: flex;
        gap: 10px;
        flex-flow: row wrap;
    }
    .image{
        height: 250px;
        width: 300px;
    }
</style>