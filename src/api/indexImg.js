import request from '@/utils/request'

export function getImg (){
   return request({
        url:'/indexImg',
        method:'get'
    })
}

