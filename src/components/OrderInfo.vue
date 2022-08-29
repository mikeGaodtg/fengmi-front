<template>
  <!-- 每笔订单的信息 -->
  <el-card style="margin-bottom: 10px">
    <div slot="header" class="clearfix">
      <span>
        {{ time }}
        <span style="padding-left: 30px">
          order No.:
          <span style="font-weight: 600; padding-left: 5px">{{
            od.orderId
          }}</span>
        </span>
      </span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="deleteOrder"
        >delete order</el-button
      >
    </div>

    <el-table :show-header="false" :data="[od]" border style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
          <div class="item">
            <el-image class="item-pic" :src="'http://localhost:8081/img/blog03.jpg'"></el-image>
            <p class="item-title">
              {{ scope.row.untitled }} x{{ scope.row.totalAmount }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          {{ scope.row.receiverName }}
          <br />
          <i class="fa fa-user" style="color: #e3e3e3; font-size: 22px"></i>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          ￥11
          <div v-if="scope.row.status != '6'">
            <el-divider style="margin: 12px 0"></el-divider>
            {{ scope.row.payType }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status"> </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-link v-if="!scope.row.isComment">comment</el-link> <br />
          <el-button
            type="danger"
            size="mini"
            @click="toPaya(scope.row.orderId)"
            >Buy Now!</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
let moment = require("moment") // 引入
import { deleteOrderReq } from "@/api/order";
export default {
  props: ["od"],
  created() {
    console.log(this.od)
    
  },
  computed:{
    time(){
      return moment(this.od.createTime).format('YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    toPaya() {
      this.$router.push("/orderPay?orderId=" + this.od.orderId);
    },
    deleteOrder() {
      deleteOrderReq(this.od.orderId).then(res=>{
        if(res.code==0){
          this.$message.success(res.msg)
          location.reload()
        }
      })
    },
  },
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
.item .item-num {
  text-align: right;
  flex: 1;
  padding-right: 20px;
  color: #e3e3e3;
}
.el-divider--horizontal {
  margin: 12px 0;
}
</style>