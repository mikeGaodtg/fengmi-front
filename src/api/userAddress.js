import request from '@/utils/request'

export function getAddress (userId){
    return request({
        url:'/address/all/'+userId,
        method:'get',
       
    })
}

export function changeAddressReq (oldId,newId){
    return request({
        url:'/address/change/'+oldId+'/'+newId,
        method:'put',
    })
}

export function updateAddrReq (data){
    return request({
        url:'/address/update',
        method:'put',
        data
    })
}

export function addAddrReq (data){
    return request({
        url:'/address/add',
        method:'put',
        data
    })
}