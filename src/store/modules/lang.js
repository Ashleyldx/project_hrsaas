import Cookie from 'js-cookie'
export default {
  namespaced: true,
  state: {
    language:Cookie.get('language')||'zh'// 项目初始化默认为浏览器语言
  },
  mutations: {
    setLanguage: (state, language) => {
      state.language = language
      Cookie.set('language',language)
    }
  }
}