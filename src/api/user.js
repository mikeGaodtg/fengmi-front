import request from '@/utils/request'

export function loginRequest (user){
    return request({
        url:'/users/login',
        method:'post',
        data:user
    })
}
export function addUser (user){
    return request({
        url:'/users/add',
        method:'put',
        data:user
    })
}
