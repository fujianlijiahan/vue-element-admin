import request from '@/utils/requestOfSystemManager'

export function getArticleClassManager(data) {
  return request({
    url: '/FileGroup/GetFileGroup',
    method: 'get',
    data: data
  })
}

