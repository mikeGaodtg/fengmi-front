<template>
    <div>
      <Header></Header>
      <search-bar></search-bar>
      <el-divider></el-divider>
      <Banner></Banner>
      <Recommend></Recommend>
      <el-divider></el-divider>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Index/Header'
import SearchBar from '@/components/Index/SearchBar'
import Banner from '@/components/Index/Banner'
import Recommend from '@/components/Index/Recommend'
import Footer from '@/components/Index/Footer'
export default {

  components: {
    Header,
    SearchBar,
    Banner,
    Recommend,
    Footer
  },

  data: () => ({
    //
  }),
  created(){

  },
  methods:{
  
  }
};
</script>
