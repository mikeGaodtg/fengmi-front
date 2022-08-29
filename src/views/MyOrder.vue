<template>
  <div>
    <Header></Header>
    <common-header>
      <template v-slot:title> My Order </template>
      <template v-slot:extra>
        <shopping-cart-badge></shopping-cart-badge>
      </template>
    </common-header>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="all orders" name="all">
            <all-order :list="orderList" ></all-order>
          </el-tab-pane>
          <el-tab-pane label="haven't pay" name="noPay" :disabled="true">
            <no-pay></no-pay>
          </el-tab-pane>
          <el-tab-pane label="haven't comment" name="noComment" :disabled="true">
            <no-comment></no-comment>
          </el-tab-pane>
          <el-tab-pane label="paied" name="completed" :disabled="true">
            <completed></completed>
          </el-tab-pane>
          <el-tab-pane label="canceled" name="cancled" :disabled="true">
            <cancled></cancled>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import ShoppingCartBadge from "@/components/ShoppingCartBadge";
import AllOrder from "@/components/MyOrder/AllOrder";
import NoPay from "@/components/MyOrder/NoPay";
import NoComment from "@/components/MyOrder/NoComment";
import Completed from "@/components/MyOrder/Completed";
import Cancled from "@/components/MyOrder/Cancled";
import Header from "@/components/Index/Header";
import { getOrder } from "@/api/order";
export default {
  components: {
    CommonHeader,
    ShoppingCartBadge,
    AllOrder,
    NoPay,
    NoComment,
    Completed,
    Cancled,
    Header,
  },
  data: () => ({
    activeName: "all",
    shoppingCartArr: [],
    orderList:[]
  }),
  methods: {
    handleClick(tab) {
      window.console.log(tab.name);
    },
    getOrderApiReq() {
      getOrder(localStorage.getItem("userId")).then((res) => {
        if(res.code==0){
          this.orderList =res.data
        }
      });
    },
  },
  created() {
    this.getOrderApiReq();
  },
};
</script>

<style>
</style>