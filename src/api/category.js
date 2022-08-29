import request from '@/utils/request'

export function getList() {
  return request({
    url: `/category`,
    method: 'get'
  })
}

export function getPic (){
  return request({
    url:'/category/pic',
    method: 'get'
  })

}