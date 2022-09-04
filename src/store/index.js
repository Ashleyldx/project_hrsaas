import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistentState from 'vuex-persistedstate'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,
  plugins: [createPersistentState({ // 理解一下层级匹配
    reducer(state) { // state vuex state
      return { // state
        user: {
          hrsaasTime: state.user.hrsaasTime
        }
      }
    }
  })]
  // plugins: [createPersistentState({
  //   reducer(state) { // 可以指定缓存，具体到某一个字段
  //     return { // 只储存state中的token
  //       user: { // 对照后台打印可以看出是层级匹配
  //         // 放在user对象里面的原因：存值的时候存return的对象，
  //         // 取值的时候直接会把这个对象给根节点的state，state在模块化开发中是分成不同模块，
  //         // 如果不按结构去存，取得时候user模块就拿不到token了，平常我们用getters建立快捷访问通道，
  //         // 也是利用它可以拿到根节点的state数据，所以可以访问到其他模块的state数据
  //         hrsaasTime: state.user.hrsaasTime
  //       }
  //     }
  //   }
  // })]

})

export default store
