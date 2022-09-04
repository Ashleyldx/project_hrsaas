import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { resetRouter } from '@/router'

export default ({
  namespaced: true,
  state: {
    token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
    userInfo: {}, // 这里定义一个空对象
    hrsaasTime: '' 
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
    setUserInfo(state, userInfo) {
      // 更新一个对象
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
      // state.userInfo = { ...result } // 响应式--属于浅拷贝（写法2）
    },
    removeUserInfo(state) {
      state.userInfo = {} // 退出之后移除用户信息
    },
    setHrsaasTime(state, time) {
      state.HrsaasTime = time
    }
  },
  actions: {
    // 发送登录请求，获取token 在后续中还会用到的，所以直接抽取出来
    // commit setToken
    async login({ commit }, data) {
      // 调用api接口
      const res = await login(data) // 拿到token
      console.log(res) // token // 记录
      commit('setToken', res) // 设置token 拿到token说明登录成功
      setTimeStamp() // 设置当前时间戳
      // commit('sethrsaasTime', Date.now()) // 设置当前时间戳
    },
    // 调用getUserInfo接口，封装一个action // 写到这里需要在首页验证一下接口是否成功调用
    async getUserInfo(context) {
      const res = await getUserInfo() // 获取返回值
      context.commit('setUserInfo', res)
      console.log(res)
      // 调用接口获取用户详情,baseInfo用户详情数据
      const baseInfo = await getUserDetailById(res.userId)
      //  视频day04 6.2 10分10秒 // 拿到staffPhoto的数据
      // const baseResult={...res,...baseInfo}
      context.commit('setUserInfo', { ...res, ...baseInfo })
      // commit 调用mutation的名称,提交到mutation */
      return res // 这里return的原因，这里是给我们后期做权限的时候留下的伏笔,要意识到数据传递过程带来的问题
    },
    // 实现登出的效果
    logout({ commit }) { // 删除token,不仅删除了vue中的，也删除了缓存的，commit是解构之后
      commit('removeToken')
      // 删除用户资料
      commit('removeUserInfo')
      resetRouter()
      // 在模块内部 
      commit('permission/setRoutes', [],{root: true})
    }
  }
})
