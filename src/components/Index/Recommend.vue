<template>
    <el-row type="flex" style="margin-top: 15px;">
       <el-col class="goods-show" :offset="3" :span="18">
            <el-card :body-style="style" v-for="item,index in picList" :key="index">
                <img :src="`http://localhost:8081/img/${item.categoryPic}`" class="pic">
                <div style="padding: 8px 14px;">
                    <span>{{item.categoryName}}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="ml" size="small" @click="gotoDetail">buy</el-button>
                    </div>
                </div>
            </el-card>
           
       </el-col>
    </el-row>
</template>

<script>
import {getPic} from '@/api/category'
export default {
    data: () => ({
        currentDate: '2012-12-12',
        style: { padding: '0px', width: '213px' },
        picList:[]
    }),

    methods:{
        getPicList(){
            getPic().then(res=>{
                this.picList =res.data
            })
        },
        gotoDetail(){
            this.$router.push('/search?categoryId=49')
        }
    },
    created(){
        this.getPicList()
    }
}
</script>

<style scoped>
.el-card {
        height: 296px;
    }
    .goods-show {
        display: flex;
        gap: 10px;
        flex-flow: row wrap;
    }
    .pic{
        width: 213px;
    }
</style>