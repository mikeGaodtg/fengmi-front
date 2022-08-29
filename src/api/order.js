import request from '@/utils/request'

export function addOrder(data){
   return request({
        url:"/order",
        method:'post',
        data
    })
}
export function getOrder(id){
    return request({
         url:"/order/"+id,
         method:'get',
     })
 }
export function payOrder(id){
    return request({
         url:"/order/pay/"+id,
         method:'post',
     })
 }

 export function deleteOrderReq(id){
    return request({
         url:"/order/delete/"+id,
         method:'delete',
     })
 }