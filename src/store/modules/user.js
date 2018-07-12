import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { post } from '@/utils/request'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    deptId: localStorage.getItem('deptId'),
    userId: localStorage.getItem('userId'),
    personDeparts: localStorage.getItem('personDeparts')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_DEPT_ID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_PERSON_DEPARTS: (state, personDeparts) => {
      state.personDeparts = personDeparts
    }
  },

  actions: {
    // 获取用户部门信息等
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        post('/OAuthPwd/userinfo', {
          token: getToken()
        }).then(response => {
          console.log(response)
          commit('SET_DEPT_ID', response.data.data.deptId)
          commit('SET_USER_ID', response.data.data.userId)
          commit('SET_PERSON_DEPARTS', response.data.data.personDeparts)
          localStorage.setItem('deptId', response.data.data.deptId)
          localStorage.setItem('userId', response.data.data.userId)
          localStorage.setItem('personDeparts', response.data.data.personDeparts)
          resolve(response)
        }).catch(res => {
          console.log(res)
          reject(res)
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data.data
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          console.log('登录失败')
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      removeToken()
      // this.$router.push({ path: '/login' })
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     // commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
