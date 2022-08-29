import request from '@/utils/request'

export const shoppingCartaddReq =(shoppingCart)=>{
    return request({
        url:'/shoppingCart',
        method:'post',
        data:shoppingCart
    })
}

export const getshoppingCartadd =(userId)=>{
    return request({
        url:'/shoppingCart/'+userId,
        method:'get',
    })
}

export const deleteShoppingCart =(cartId)=>{
    return request({
        url:'/shoppingCart/'+cartId,
        method:'delete',
    })
}

export const deleteShoppingCartInMany =(carts)=>{
    return request({
        url:'/shoppingCart/deleteBatch',
        method:'delete',
        data:carts
    })
}

export const getCartCount =(userId)=>{
    return request({
        url:'/shoppingCart/count/'+userId,
        method:'get',
    })
}