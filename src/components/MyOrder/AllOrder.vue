<template>
  <div>

    <order-info v-for="od,index in list" :key="index" :od="od" ></order-info>
    <el-pagination
      style="float: right"
      background
      layout="prev, pager, next"
      :total="20"
    >
    </el-pagination>
  </div>
</template>

<script>
import OrderInfo from "@/components/OrderInfo";

export default {
  components: { OrderInfo },
  props: ["list"],
  data: () => ({
    orders: [],
  }),
  methods:{

  },
  mounted(){

  }
};
</script>

<style>
</style>