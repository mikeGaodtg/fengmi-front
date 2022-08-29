import request from '@/utils/request'

export function searchProductByCatId(id){
   return request({
        url:"/product/withpic/"+id,
        method:'get'
    })
}

export const ProductDetails =(productId)=>{
    return request({
        url:'/product/details/'+productId,
        method:'get'
    })
}