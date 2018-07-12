import request from '@/utils/request'

export function login(userInfo) {
  return request({
    url: '/OAuthPwd/GetPwdToken',
    method: 'post',
    data: {
      UserName: userInfo.UserName,
      Password: userInfo.Password,
      AppID: userInfo.AppID,
      AppSec: userInfo.AppSec,
      Scopes: userInfo.Scopes
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/OAuthPwd/userinfo',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
