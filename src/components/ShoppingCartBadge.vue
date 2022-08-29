<template>
  <router-link to="/my-cart">
    <el-badge style="width: 101px" :value="cartCount">
      <el-button size="medium" type="danger">
        <i class="fa fa-shopping-cart"></i> S Cart
      </el-button>
    </el-badge>
  </router-link>
</template>

<script>
import { getCartCount } from "@/api/shoppingCart";
export default {
  methods: {},
  data(){
    return{
        cartCount:0
    }
  },
  watch:{

  },
  created() {
    getCartCount(localStorage.getItem("userId")).then((res) => {
        if(res.code==0){
            console.log(res)
            this.cartCount=res.data
        }
    }).catch(error=>{
      console.log(error)
    });
  },
};
</script>

<style scoped>
</style>