<template>
  <div>
    <Header></Header>
    <common-header>
      <template v-slot:title> 我的购物车 </template>
    </common-header>
    <el-divider></el-divider>
    <div class="pay">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>请扫码支付</h3>
        </div>
        <div>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <span style="margin-bottom: 30px; font-size: 18px"
              >订单将在<b style="color: red; font-size: 20px">30分钟</b
              >后关闭</span
            >
            <div width="300px" height="300px" ref="qrCodeUrl"></div>
            <el-button
              type="danger"
              round
              style="width: 160px; margin-top: 30px"
              >取消支付</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import QRcode from "qrcodejs2";
import { payOrder } from "@/api/order";
import CommonHeader from "../components/CommonHeader.vue";
import Header from "@/components/Index/Header";
export default {
  components: {
    CommonHeader,
    Header,
  },
  methods: {
    payOrderAipReq() {
      payOrder(this.$route.query.orderId).then((res) => {
        if (res.code == 0) {
          this.creatQrCode(res.data.code_url);
          console.log(res);
        }
      });
    },
    creatQrCode(text) {
      new QRcode(this.$refs.qrCodeUrl, {
        text,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRcode.CorrectLevel.H,
      });
    },
    userWebSocket() {
      let webSocket = new WebSocket(
        "ws://localhost:8081/websokect/" + this.$route.query.orderId
      );
      webSocket.onmessage = (e) => {
        console.log(e);
        if (e.data == "payment is done") {
          this.$message.success("pay is finished");
          webSocket.close
          setTimeout(() => {
            this.$router.push("/my-order");
          }, 3000);
        }
      };
    },
  },
  created() {
    this.payOrderAipReq();
    this.userWebSocket();
  },
};
</script>

<style scoped>
.pay {
  width: 60%;
  margin: auto;
}
</style>