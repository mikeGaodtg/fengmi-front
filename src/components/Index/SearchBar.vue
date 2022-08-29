<template>
    <el-row type="flex" align="middle" style="margin-top: 10px;">
        <el-col :span="13" :offset="4">
            <el-input>
                <i class="fa fa-search" slot="append"></i>
            </el-input>
        </el-col>
        <el-col :span="5" style="padding-left: 20px;">
            <shopping-cart-badge></shopping-cart-badge>
        </el-col>
    </el-row>
</template>

<script>
import ShoppingCartBadge from '@/components/ShoppingCartBadge'
export default {
    components: {
        ShoppingCartBadge
    }
}
</script>

<style>

</style>