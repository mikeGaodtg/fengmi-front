<template>
  <el-dialog
    title="收货地址"
    :visible.sync="visible"
    center
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="form" ref="ruleForm">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.receiverName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="mobile" :label-width="formLabelWidth">
        <el-input v-model="form.receiverMobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="address" :label-width="formLabelWidth">
        <el-input v-model="form.addr" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialougue">取 消</el-button>
      <el-button type="primary" @click="updateAddr">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateAddrReq, addAddrReq } from "@/api/userAddress";
export default {
  data() {
    return {
      form: {
        receiverName: "",
        addr: "",
        receiverMobile: "",
        userId: 0,
        addrId: 0,
        status: 0,
      },
      formLabelWidth: "120px",
    };
  },
  props: ["visible", "address", "status"],
  created() {
    // setTimeout(() => {
    //   console.log(this.address)
    // }, 1000);
  },
  watch: {
    visible() {
      if (this.status == "change") {
        this.fillUpForm();
      }
    },
  },
  methods: {
    closeDialougue() {
      this.form = {
        receiverName: "",
        addr: "",
        receiverMobile: "",
        userId: 0,
        addrId: 0,
        status: 0,
      };
      this.$emit("offDialogue", false);
    },
    fillUpForm() {
      const { receiverName, addr, receiverMobile, addrId } = this.address;
      this.form = { receiverName, addr, receiverMobile };
      this.form.userId = localStorage.getItem("userId");
      this.form.addrId = addrId;
    },
    updateAddr() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.status == "change") {
            updateAddrReq(this.form).then((res) => {
              if (res.code == 0) {
                this.$message.success(res.msg);
                this.$emit("offDialogue", false);
                this.$emit("refreshAddre", this.form.userId);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.form.userId = localStorage.getItem("userId");
            this.form.addrId = this.address.addrId;
            addAddrReq(this.form).then((res) => {
              if (res.code == 0) {
                this.$message.success(res.msg);
                this.$emit("offDialogue", false);
                this.$emit("refreshAddre", this.form.userId);
                this.form = {
                  receiverName: "",
                  addr: "",
                  receiverMobile: "",
                  userId: 0,
                  addrId: 0,
                  status: 0,
                };
              } else {
                this.$message.error(res.msg);
              }
            });
          }
          // location.reload()
        }
      });
    },
  },
};
</script>

<style>
</style>