import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'

export default ({ // ????
  namespaced: true,
  state: {
    token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
    userInfo: {} // 这里定义一个空对象
  },
  mutations: {
    setToken(state, token) {
      state.token = token // 将数据设置给vuex
      setToken(token) // 同步给缓存
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, result) {
      // 更新一个对象
      state.userInfo = result // 这样是响应式（写法1）
      // state.userInfo = { ...result } // 响应式--属于浅拷贝（写法2）
    }
  },
  actions: {
    // 发送登录请求，获取token 在后续中还会用到的，所以很直接抽取出来
    // commit setToken
    async login({ commit }, data) {
      // 调用api接口
      const res = await login(data) // 拿到token
      console.log(res) // token
      commit('setToken', res) // 设置token 拿到token说明登录成功
      setTimeStamp() // 设置当前时间戳
    },
    // 封装一个action
    async getUserInfo(context) {
      const result = await getUserInfo(result) // 获取返回值
      // 调用接口获取用户详情,baseInfo用户详情数据
      const baseInfo = await getUserDetailById(result.userId)
      //  视频day04 6.2 10分10秒 // 拿到staffPhoto的数据
      context.commit('setUserInfo', { ...result, ...baseInfo }) // commit 调用mutation的名称,提交到mutation
      return result // 这里return的原因，这里是给我们后期做权限的时候留下的伏笔
    },
    // 实现登出的效果
    logout(context) { // 删除token,不仅删除了vue中的，也删除了缓存的
      context.commit('removeToken')
      // 删除用户资料
      context.commit('removeUserInfo')
    }
  }
})
