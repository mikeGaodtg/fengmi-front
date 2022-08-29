<template>
  <div>
    <Header></Header>
    <common-header>
      <template v-slot:title> Checkout Page </template>
    </common-header>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-size: 17px; font-weight: 700">address</span>
            <el-button
              style="float: right; padding: 3px 0"
              @click="toggoleDialogue(true,'add')"
              type="text"
              >add new address</el-button
            >
          </div>
          <div style="font-size: 14px" v-if="ifAddressListEmpty">
            <div class="address-info">
              <span class="mr10">{{ this.defaultAddress.receiverName}}</span>
              <span class="mr10">{{ this.defaultAddress.addr}}</span>
              <span>{{ this.defaultAddress.receiverMobile}}</span>
              <el-button
                type="text"
                class="edit-btn"
                @click="toggoleDialogue(true, 'change')"
                >edit</el-button
              >
              <span type="info" class="default-address mr10">default</span>
            </div>

            <el-button
              type="text"
              @click="toggleShow(true)"
              v-show="!Adressflag"
              >show more</el-button
            >
            <div v-show="Adressflag">
              <div
                class="address-info"
                v-for="(item, index) in nonDefaultAddress"
                :key="index"
              >
                <span class="mr10">{{ item.receiverName }}</span>
                <span class="mr10">{{ item.addr }}</span>
                <span>{{ item.receiverMobile }}</span>
                <el-button
                  type="text"
                  class="edit-btn"
                  @click="changeAdrress(index)"
                  >changeAdrress</el-button
                >
              </div>
            </div>
            <el-button
              @click="toggleShow(false)"
              v-show="Adressflag"
              type="text"
            >
              close up
              <i class="fa fa-angle-double-up"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-col :span="16" :offset="4">
      <el-table :data="shoppingCartArr" style="width: 100%">
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
            <span style="font-weight: 600">
              {{ scope.row.productPrice }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="num">
          <template slot-scope="scope">
            <span style="font-weight: 600">
              {{ scope.row.cartNum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="subtotal">
          <template slot-scope="scope">
            <span style="font-weight: 600">
              ￥{{ (scope.row.productPrice * scope.row.cartNum).toFixed(2) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-card class="settle-info">
        <div>
          <p class="tr">
            <span class="info">{{ totalItem }}</span>
            item, total is:
            <span class="info">￥{{ totalPrice.toFixed(2) }}</span>
          </p>
          <br />
          <p class="tr" v-if="ifAddressListEmpty">
            send to : {{ this.defaultAddress.addr }} receiver：
            {{ this.defaultAddress.receiverName }}
            tel : {{ this.defaultAddress.receiverMobile }}
          </p>
        </div>
      </el-card>
      <el-button type="danger" class="submitBtd fr" @click="addOrders"
        >Submit</el-button
      >
    </el-col>
    <EditAddress
    @refreshAddre="getAllAdress"
      :visible="dialogueVis"
      :address="defaultAddress"
      :status="dialogueStatus"
      @offDialogue="toggoleDialogue"
    ></EditAddress>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import Header from "@/components/Index/Header";
import EditAddress from "@/components/Settle/EditAddress";
import Footer from "@/components/Index/Footer";
import { getAddress, changeAddressReq,  } from "@/api/userAddress.js";
import { addOrder } from "@/api/order";

export default {
  components: {
    CommonHeader,
    Header,
    EditAddress,
    Footer,
  },
  data: () => ({
    newAddress:{},
    defaultAddress: {},
    nonDefaultAddress: [],
    shoppingCartArr: [],
    userId: 0,
    Adressflag: false,
    orders: {},
    dialogueVis: false,
    dialogueStatus:''
  }),
  methods: {
    addOrders() {
      const { receiverName, receiverMobile, addr } = this.defaultAddress;
      this.orders.userId = this.userId;
      this.orders.receiverName = receiverName;
      this.orders.receiverMobile = receiverMobile;
      this.orders.receiverAddress = addr;
      this.orders.totalAmount = this.totalPrice;
      this.orders.status = 1;
      this.orders.shoppingIds = [];
      this.orders.untitled = "";
      for (let item of this.shoppingCartArr) {
        let {untitled,shoppingIds}= this.orders
        untitled += item.product.productName + "-";
        untitled.substring(0, untitled.length - 1)
        shoppingIds.push(item.cartId);
      }
      if(!this.orders.receiverMobile){
        this.$message.warning("you need to add receiver address first")
        return
      }
      // console.log(12323,this.orders)
      // if(!this.orders){
      //   this.$router.push('/')
      //   return
      // }
      addOrder(this.orders).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.toOrderPage();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(error=>{
        this.$message.warning("you have added this item before")
        setTimeout(()=>{
          this.$router.push("/")
        },2000)
      });
    },
    toOrderPage() {
      this.$router.push("/my-order");
    },
    getAllAdress(userId) {
      getAddress(userId).then((res) => {
        let addressList = res.data;
 
        if (addressList) {
          console.log(addressList)
          this.defaultAddress = addressList.filter((item) => {
            return item.status == 1; // status =1 means default address
    
          })[0];
          this.nonDefaultAddress = addressList.filter((item) => {
            return item.status == 0;        //status =0 means non default
          });
        }
      });
    },
    toggleShow(flag) {
      this.Adressflag = flag;
    },
    changeAdrress(index) {
      changeAddressReq(
        this.nonDefaultAddress[index].addrId,
        this.defaultAddress.addrId
      ).then((res) => {
        this.$message.success(res.msg);
        location.reload();
      });
    },
    toggoleDialogue(flag, status) {
      if (status == "change") {
        if (Object.keys(this.defaultAddress).length === 0) {
          this.$message.warning("you need to add an address");
          return;
        }
        this.dialogueStatus="change"

      }else{
          this.dialogueStatus="add"  
      }
      this.dialogueVis = flag;

    },
   
  },
  computed: {
    totalItem() {
      let total = 0;
      for (let item of this.shoppingCartArr) {
        total += item.cartNum;
      }
      return total;
    },
    totalPrice() {
      let total = 0;
      for (let item of this.shoppingCartArr)
        total += item.productPrice * item.cartNum;
      return total;
    },
    ifAddressListEmpty(){
      return this.defaultAddress.userId?true:false
    }
  },
  created() {
    this.shoppingCartArr = JSON.parse(sessionStorage.getItem("selectCarts"));
    this.userId = this.$route.query.userId;
    this.getAllAdress(this.userId);
  },
  watch:{
  }
};
</script>

<style scoped>
.default-address {
  background-color: #e3e3e3;
  padding: 3px 5px;
  float: right;
  position: relative;
  top: -2px;
}
.mr10 {
  margin-right: 10px;
}
.address-info {
  margin-bottom: 10px;
}
.edit-btn {
  float: right !important;
  padding: 0;
}
.item {
  display: flex;
}
.item .item-pic {
  width: 60px;
  height: 60px;
}
.tr {
  text-align: right;
}
.item .item-title {
  padding-left: 8px;
  width: 180px;
}
.settle-info {
  margin: 10px 0;
  font-size: 14px;
}
.settle-info .info {
  color: #f56c6c;
  font-weight: 700;
  font-size: 15px;
}
</style>