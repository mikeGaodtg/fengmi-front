<template>
  <div>
    <Header></Header>
    <search-bar></search-bar>
    <el-divider></el-divider>
    <el-row type="flex" class="row-bg" justify="center" style="font-size: 14px">
      <el-col :span="6">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item
            v-for="(item, index) in productDetial.productImgList"
            :key="index"
          >
            <el-image
              :src="
                'http://localhost:8081/img/' + (item.url
                  ? item.url
                  : this.$store.state.defaultPic)
              "
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8">
        <div style="width: 600px">
          <br />
          <div style="margin-bottom: 30px"></div>
          <div
            style="
              background-color: #e8e8e8;
              margin: 10px 0px;
              padding: 20px 0px;
            "
          >
            <span
              >&nbsp;&nbsp;&nbsp;sellPrice:<span
                style="font-size: 18px; color: red; margin-left: 10px"
                >
                {{sellprice}}
                </span
              >
              </span
            ><br /><br />
            <span
              >&nbsp;&nbsp;&nbsp;original&nbsp;&nbsp;&nbsp;Price:<span
                style="
                  font-size: 18px;
                  text-decoration: line-through;
                  margin-left: 10px;
                "
                >
                {{origiprice}}
                </span
              ></span
            >
          </div>
          <div class="mt">
              <label>&nbsp;&nbsp;&nbsp;spec:&nbsp;&nbsp;&nbsp;</label>
              <!-- <el-button
                type="primary"
                @click="changeSpec(index)"
                v-for="(item, index) in productDetial.skuList"
                :key="index"
                >{{ item.skuName }}</el-button
              > -->
              <!-- v-model="selectSkuObj" @change="changeSpec" -->
         <!-- <el-radio-group v-model="sku" @change="changeGuige"> -->
              <!-- <el-radio-button  :label="item.skuName" 
              v-for="(item,index) in productDetial.skuList" :key="index" class="ml "></el-radio-button>
            </el-radio-group> -->
             <el-radio-group v-model="selectSkuObj" @change="changeSpec">
              <el-radio-button  :label="selectSkuObj" v-for="(selectSkuObj,index) in productDetial.skuList" :key="index">{{selectSkuObj.skuName}}</el-radio-button>
            </el-radio-group>
          </div>
          <br />
          <div v-if="tasteList.length > 0" class="mt">
            <label>&nbsp;&nbsp;&nbsp;taste:&nbsp;&nbsp;&nbsp;</label>
            <el-radio-group v-model="taste">
              <el-radio-button
                class="ml"
                :label="item"
                v-for="(item, index) in tasteList"
                :key="index"
              ></el-radio-button>
            </el-radio-group>
          </div>
          <div v-if="packList.length > 0" class="mt">
            <label>&nbsp;&nbsp;&nbsp;package:&nbsp;&nbsp;&nbsp;</label>
            <el-radio-group v-model="package1">
              <el-radio-button
                class="ml"
                :label="item"
                v-for="(item, index) in packList"
                :key="index"
              ></el-radio-button>
            </el-radio-group>
          </div>
          <br />
          <div>
            <label>&nbsp;&nbsp;&nbsp;num:&nbsp;&nbsp;&nbsp;</label>
            <el-button
              @click="minus"
              type="success"
              icon="el-icon-remove-outline"
              circle
              v-model="num"
            ></el-button>
            &nbsp;&nbsp;&nbsp;
            <el-input
              v-model="num"
              type="text"
              placeholder=""
              style="width: 150px; text-algin: center"
              @blur="inputChange(num)"
            >
            </el-input
            >&nbsp;&nbsp;&nbsp;
            <el-button
              @click="add"
              type="info"
              icon="el-icon-circle-plus-outline"
              circle
              v-model="num"
            ></el-button>
          </div>
          <br />

          <div style="margin-left: 300px; margin-top: 20px">
            <el-button type="success" @click="join()" style="margin-left: 10px"
              >put in shopping cart</el-button
            >
          </div>
          <br />
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="14">
        <div style="width: 800px">
          <el-row>
            <el-col :span="12">
              <span>from :&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">wuhan</el-tag>
            </el-col>
            <el-col :span="12">
              <span>Expiry Date:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">36mouth</el-tag>
            </el-col> </el-row
          ><br />
          <el-row>
            <el-col :span="12">
              <span>branch:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">wangwang</el-tag>
            </el-col>
            <el-col :span="12">
              <span>company:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">wangwang</el-tag>
            </el-col> </el-row
          ><br />
          <el-row>
            <el-col :span="12">
              <span>address:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">xxxxxxxxx</el-tag>
            </el-col>
            <el-col :span="12">
              <span>spec:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">xxxxxxxxx</el-tag>
            </el-col> </el-row
          ><br />
          <el-row>
            <el-col :span="12">
              <span>weight:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">100g</el-tag>
            </el-col>
            <el-col :span="12">
              <span>package:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">plastic</el-tag>
            </el-col> </el-row
          ><br />
          <el-row>
            <el-col :span="12">
              <span>cookFree:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-tag type="success">yes</el-tag>
            </el-col>
            <el-col :span="12"> </el-col>
          </el-row>
        </div>
        <br /><br />
        <el-tabs type="border-card">
           <el-tab-pane label="buys comment">
            <div style="width: 800px">
              <div class="block">
                <el-timeline>
                  <el-timeline-item placement="top">
                    <el-card v-for="item,index in productDetial.commentList" :key="index" class="mb">
                      <p>usrID{{item.userId}} comments: </p>
                      <br />
                      <h1>&nbsp;&nbsp;&nbsp;&nbsp;{{item.commContent}}</h1>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="product intro">
            <div style="background: #993; width: 800px">
              <img src="" width="800px" />
            </div>
          </el-tab-pane>
         
          <el-tab-pane label="after sales">
            <div style="background: #182; width: 800px; height: 1000px">
              <h2>这里是商品售后</h2>
            </div>
          </el-tab-pane>
          <el-tab-pane label="special sales"> 随机活动 </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Index/Header";
import SearchBar from "@/components/Index/SearchBar";
import Footer from "@/components/Index/Footer";
import { ProductDetails } from "@/api/product.js";
export default {
  components: {
    Header,
    SearchBar,
    Footer,
  },
  data() {
    return {
 
      taste: "",
      package1: "",
      tasteList: [],
      packList: [],
      num: 1,
      productId: 0,
      productDetial: {},
      selectSkuObj: {},
      shoppingCart: {
        productId: 1,
        skuId: 1,
        userId: 1,
        cartNum: 1,
        productPrice: 0,
        skuProps: [],
      },
      sellprice:0,
      origiprice:0
    };
  },
  methods: {
    changeSpec() {
let untitled = JSON.parse(this.selectSkuObj.untitled);
      console.log(this.selectSkuObj)
      // this.selectSkuObj = this.productDetial.skuList[index];
      // let untitled = JSON.parse(this.selectSkuObj.untitled);
      this.tasteList = untitled.口味 != null ? untitled.口味 : [];
      this.packList = untitled.包装 != null ? untitled.包装 : [];
    },
    
    add: function () {
      if (this.num > this.selectSkuObj.stock) {
        console.log("not enough");
        return;
      }
      this.num++;
    },
    minus: function () {
      if (this.num <= 0) {
        console.log("can reduce any more");
        return;
      }
      this.num--;
    },
    inputChange(num) {
      console.log(this.selectSkuObj);
      if (num < 0 || num > this.selectSkuObj.stock) {
        console.log("wrong number to write");
        this.num = 1;
      }
    },
    join: function () {
      if (this.packList.length > 0 && !this.package1) {
        this.$message.warning("have to choose a package size");
        return;
      }
      if (this.tasteList.length > 0 && !this.taste) {
        this.$message.warning("have to choose a taste");
        return;
      }
        this.shoppingCart.productId=this.productId;
        this.shoppingCart.skuId=this.selectSkuObj.skuId;
        this.shoppingCart.userId=localStorage.getItem("userId")
        this.shoppingCart.cartNum=this.num
        this.shoppingCart.productPrice=(this.selectSkuObj.sellPrice*this.selectSkuObj.discounts)*this.num
        
          if(this.taste){
              this.shoppingCart.skuProps += "口味:"+ this.taste;
          }
          if(this.package1){
              this.shoppingCart.skuProps += " 包装:"+this.package1;
          }

      sessionStorage.setItem("toPage","/my-cart")
      localStorage.setItem("shoppingCart",JSON.stringify(this.shoppingCart));

        this.$router.push({
        path: "/my-cart",
      });
    },
    getProductDetails(productId) {
      ProductDetails(productId).then((res) => {
        console.log(res)
        this.productDetial = res.data;

        this.sellprice=this.productDetial.skuList[0].sellPrice
        this.origiprice=this.productDetial.skuList[0].originalPrice
        this.spec = res.data.skuList[0].skuName;
        this.selectSkuObj=this.productDetial.skuList[0]
        let untitled = JSON.parse(res.data.skuList[0].untitled);
        this.tasteList = untitled.口味 != null ? untitled.口味 : [];
        this.packList = untitled.包装 != null ? untitled.包装 : [];
        this.changeSpec() 
      }).catch(errors=>{console.log(errors)});

      
    },
  },
  computed: {},
  created() {
    this.productId = this.$route.query.productId;
    this.getProductDetails(this.productId);
  
  },
};
</script>

<style>
</style>


