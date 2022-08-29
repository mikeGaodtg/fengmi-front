<template>
  <div>
    <common-header>
      <template v-slot:title> Register </template>
      <template v-slot:extra>
        <router-link to="/login">
          <el-link>Got Account? Go to login</el-link>
        </router-link>
      </template>
    </common-header>
    <el-divider></el-divider>
    <el-row style="margin-top: 20px; min-height: 600px">
      <el-col :span="8" :offset="8" class="register-panel">
        <el-steps
          :space="280"
          style="width: 100%; margin-bottom: 28px"
          align-center
          :active="step"
          finish-status="success"
        >
      
          <el-step title="fill in Account info"></el-step>
          <el-step title="Registration is done!"></el-step>
        </el-steps>
    
        <el-card style="width: 100%" v-show="step == 1">
          <el-form
            :model="registerForm"
            ref="registerForm"
            class="demo-ruleForm"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input placeholder="username" v-model="registerForm.username" prefix-icon="el-icon-user-solid" >
            
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="password"
                v-model="registerForm.password"
                prefix-icon="el-icon-question"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                type="password"
                placeholder="repassword"
                v-model="registerForm.repassword"    prefix-icon="el-icon-question"
              >
              </el-input>
            </el-form-item>
            <el-form-item  >
              <el-select prefix-icon="el-icon-question" class="w100"
                v-model="registerForm.userSex"
                placeholder="choose gender"
              >
                <el-option label="Male" value="M"></el-option>
                <el-option label="Female" value="F"></el-option>
         
              </el-select>
            
            </el-form-item>
     
            <el-form-item prop="email">
              <el-input placeholder="email"  prefix-icon="el-icon-chat-dot-square"
               v-model="registerForm.email">
                
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="handleRegister"
                style="width: 100%"
                >Next</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <el-result v-show="step == 3" icon="success" title="successfully register">
          <template v-slot:subTitle>
            Page in
            <span style="color: #f56c6c">{{ timer }}s</span> Jump to Homepage
          </template>
        </el-result>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <Footer></Footer>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import Footer from "@/components/Index/Footer";
import { addUser } from "@/api/user";
export default {
  components: {
    CommonHeader,
    Footer,
  },
  data: function () {
    const _this = this;
    let validatePass2 = function (rule, value, callback) {
      if (value === "") {
        callback(new Error("need to write password again"));
      } else if (value !== _this.registerForm.password) {
        callback(new Error("two passwords are different!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, cb) => {
      const regEmail =
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("please put in legitimate email"));
    };
    return {
      step: 1,
      timer: 5,
      registerForm: {
        phone: "",
        validateCode: "",
        username: "",
        password: "",
        repassword: "",
        userEmail: "",
        userSex: "",
        userBirth: "",
      },
      rules: {
        username: [
          { required: true, message: "required", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "3 to 6 digit character",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "required", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "3 to 6 digit character",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "required", trigger: "change" },
          { validator: validatePass2, trigger: "blur" },
        ],
        email: [
          { required: true, message: "email required", trigger: "change" },
          { validator: checkEmail, trigger: "blur" },
        ],
        userBirth: [
          { required: true, message: "date required", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    gotoIndex() {
      this.step = 3;
      setInterval(() => {
        if (this.timer == 0) {
          this.$router.push("/");
        }
        this.timer--;
      }, 1000);
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          addUser(this.registerForm).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.step += 2;
              this.registerForm = {
                phone: "",
                validateCode: "",
                username: "",
                password: "",
                repassword: "",
                userEmail: "",
                userSex: "",
                userBirth: "",
              };
              this.gotoIndex()
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      });
    },
  
  },
};
</script>

<style scoped>
.register-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-steps {
  justify-content: center;
}
</style>