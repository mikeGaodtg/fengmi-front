<template>
  <div>
    <Header></Header>
    <common-header>
      <template v-slot:title> My Cart </template>
    </common-header>
    <el-divider></el-divider>
    <div>
      <el-row>
        <el-col :span="18" :offset="3">
          <span class="all-goods">all products: {{carts.length!=null?carts.length:0}}</span>
        </el-col>
        <el-col :span="18" :offset="3">
          <el-table
            :data="carts"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              width="80"
              type="selection"
              @selection-change="handleSelectionChange"
              label="select all"
            >
            </el-table-column>
            <el-table-column label="product">
              <template slot-scope="scope">
                <div class="item">
                  <el-image
                    class="item-pic"
                    :src="'http://localhost:8081/img/5.jpg'"
                  ></el-image>
                  <p class="item-title">
                    {{ scope.row.product.productName }}
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="unit price" width="120">
              <template slot-scope="scope">
                {{ scope.row.productSku.sellPrice }}
              </template>
            </el-table-column>
            <el-table-column label="num">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.cartNum"
                  :min="0"
                  :max="999"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="subtotal">
              <template slot-scope="scope">
                <span style="font-weight: 600">
                  ￥{{ (scope.row.productPrice * scope.row.cartNum).toFixed(2) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="edit">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="deleteOneShoppingCart(scope.row.cartId)"
                  >delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-card style="margin-top: 10px">
            <div>
              <el-button
                type="text"
                style="margin-left: 10px"
                @click="deleteShoppingCart"
                >delete selected product</el-button
              >
                <el-button type="danger" style="float: right" @click="checkout"
                  >checkout</el-button>
              <p style="float: right; margin-right: 10px">
                select
                <span style="color: #e2231a; font-weight: 600">{{
                  this.selectShopping.length?this.selectShopping.length:0
                }}</span>
                product total:
                <span style="color: #e2231a; font-weight: 600"
                  >￥{{ TotalPrice }}</span
                >
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import Header from "@/components/Index/Header";
import {
  shoppingCartaddReq,
  getshoppingCartadd,
  deleteShoppingCart,
  deleteShoppingCartInMany,
} from "@/api/shoppingCart.js";
export default {
  components: {
    CommonHeader,
    Header,
  },
  data: () => ({
    checkAll: false,
    carts: [],
    shoppingCart: {},
    userId: 0,
    selectShopping: [],
  }),
  methods: {

    checkout() {
      if(!this.selectShopping.length){
        this.$message.warning("your cart is empty")
        return
      }
      if (this.selectShopping.length>0) {
        sessionStorage.setItem("selectCarts",JSON.stringify(this.selectShopping));
        this.$router.push({
          path: "/settle",
          query: {
            userId: this.userId,
          },
        })
      }else{
        this.$message.warning("select at least one item")
      }
    },
    changeCheckAll(val) {
      // this.handleTotalPrice();
    },
    // 勾选某件商品val
    handleSelectionChange(val) {
      this.selectShopping = val;
      // this.handleTotalPrice();
    },
    
    deleteOneShoppingCart(cartId) {
      deleteShoppingCart(cartId).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg);
       
          this.getCart();
        }
      }).catch(error=>{
        console.log(error)
              this.getCart();
      });
    },
    deleteShoppingCart() {
      deleteShoppingCartInMany(this.selectShopping).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.getCart();
        }
      }).catch(error=>{
        console.log(error)
              this.getCart();
      });
    },

    addShoppingCart() {
      //send params from last page to db
      shoppingCartaddReq(this.shoppingCart).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          localStorage.removeItem("shoppingCart");
          this.getCart();
        }
      });
    },
    getCart() {
      //select shopping cart info from db (post http://localhost:8081/shoppingCart )
      getshoppingCartadd(this.userId).then((res) => {
        if(res.code==0){
               console.log(res)
          if(res.msg=="success"){
           this.carts = res.data;
          }else{
            this.$message.warning(res.msg)
            this.carts =[]
          }

        }
 
      });
    },
  },
  created() {
    this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    this.userId = localStorage.getItem("userId");

    // this.addShoppingCart();
    if (this.shoppingCart) {
      this.addShoppingCart();
    } else {
      this.getCart();
    }
  },
  computed:{
    TotalPrice() {
      let total = 0;
    
      if(!this.selectShopping.length){
        return 0
      }
      for (let i = 0; i < this.selectShopping.length; i++) {
        total += this.selectShopping[i].productPrice*this.selectShopping[i].cartNum;
      }
      return total.toFixed(2);
    },
  }
};
</script>

<style scoped>
.item {
  display: flex;
}
.item .item-pic {
  width: 60px;
  height: 60px;
}

.item .item-title {
  padding-left: 8px;
  width: 180px;
}
.settle-panel {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 1000;
}
.settle-panel .checkall-btn {
  position: absolute;
  top: 8px;
}
.settle-panel .del-all {
  position: absolute;
  left: 70px;
  top: 10px;
}
.settle-panel .settle-btn {
  position: absolute;
  top: -5px;
  right: 100px;
}
.all-goods {
  color: #f56c6c;
  font-weight: 600;
  font-size: 18px;
}
</style>