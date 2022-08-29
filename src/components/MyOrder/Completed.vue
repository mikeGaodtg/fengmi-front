<template>
    <div>
        <order-info v-for="od in orders" :key="od.no" :od="od"></order-info>
    </div>
</template>

<script>
import OrderInfo from '@/components/OrderInfo'

export default {
  components: { OrderInfo },
    data: () => ({
        orders: [
            {
                time: '2018-12-12 13:12:45',
                no: '217727683200',
                items: [
                    {
                        pic: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        title: '罗莱家纺 冰丝席凉席夏凉软席子空调席双人',
                        num: 2,
                        name: '张三',
                        price: 99.0,
                        payType: '微信支付',
                        status: '已取消',
                        isComment: true
                    }
                ]
            },
            {
                time: '2018-12-12 13:12:45',
                no: '217727683201',
                items: [
                    {
                        pic: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        title: '罗莱家纺 冰丝席凉席夏凉软席子空调席双人',
                        num: 5,
                        name: '李四',
                        price: 10,
                        payType: '支付宝支付',
                        status: '已取消',
                        isComment: false
                    },
                    {
                        pic: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        title: '电脑',
                        num: 1,
                        name: '李四',
                        price: 4999,
                        payType: '支付宝支付',
                        status: '已取消',
                        isComment: false
                    }
                ]
            }
        ]
    })
}
</script>

<style>

</style>