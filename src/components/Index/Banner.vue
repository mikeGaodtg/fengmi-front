<template>
  <el-row :gutter="20" style="box-sizing: border-box; margin-right: 0px">
    <el-col :span="4" :offset="3">
      <ul class="menus is-always-shadow" @mouseleave="hideDetail">
        <li
          @mouseenter="showDetail(index)"
          v-for="(item, index) in categories1"
          :key="index"
        >
          {{ item.categoryName }}
        </li>
      </ul>
    </el-col>
    <el-col :span="13" style="position: relative">
      <el-carousel height="430px" :interval="5000" arrow="always">
        <el-carousel-item v-for="item,index in imgList" :key="index">
          <el-image
            :src="'http://localhost:8081/img/'+ item.imgUrl"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
      <div
        class="detail"
        @mouseenter="isShowDetail = true"
        @mouseleave="hideDetail"
        v-show="isShowDetail"
      >
        <div
          class="detail-item"
          v-for="(item, index) in categories2"
          :key="index"
        >
          <h3 class="title">{{ item.categoryName }}</h3>
          <div>
            <el-link
              :underline="false"
              :class="[category3.categoryId==49 ? style1:style2]"
              v-for="(category3, ind) in item.categoryList"
              :key="ind"
              @click="toSearch(category3.categoryId)"
              :disabled="category3.categoryId==49?false:true"
              >{{ category3.categoryName }}</el-link
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getList } from "@/api/category";
import { getImg } from "@/api/indexImg";
export default {
  data: () => ({
    isShowDetail: false,
    categories1: [],
    categories2: [],
    imgList:[],
    style1:'item1',
    style2:'item2'
  }),
  components: {},
  methods: {
    showDetail(index) {
      this.isShowDetail = true;
      this.categories2 = this.categories1[index].categoryList;
    },
    hideDetail() {
      this.isShowDetail = false;
    },
    getCategories() {
      let _this = this;
      getList().then((res) => {
        _this.categories1 = res.data;
      });
    },
    getImgList(){
      getImg().then(res=>{
        this.imgList =res.data
      })
    },
    toSearch(categoryId){
      console.log(categoryId)
      this.$router.push({
        path:'/search',
        query:{
          categoryId
        }
      })
      
    }

  },
  mounted() {
    this.getCategories();
    this.getImgList();
  },
};
</script>

<style scoped>
ul.menus.is-always-shadow,
.menus.is-hover-shadow:focus,
.menus.is-hover-shadow:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
ul.menus {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  padding: 20px;
}
ul.menus > li {
  padding: 7px 0;
  cursor: pointer;
}
.detail {
  height: 430px;
  background-color: #f6f6f6;
  position: absolute;
  z-index: 9999;
  top: 0;
  width: 100%;
  left: -10px;
  padding: 20px;
  box-sizing: border-box;
}
.detail .detail-item {
  margin-bottom: 10px;
}
.detail > .detail-item > .title {
  font-weight: 800;
  margin-bottom: 8px;
}
.item1 {
  margin-right: 8px;
  color: #3f58ff;
}
.item2 {
  margin-right: 8px;
  color: #434449;
}
.item1:hover {
  color: #f56c6c;
}
</style>