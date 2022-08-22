const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 映射关系，建立token的快捷访问
  name: state => state.user.userInfo.username, // 建立对于用户名的快捷方式
  userId: state => state.user.userInfo.userId, // 建立对用户名的快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立对头像的快捷访问
  hrsaasTime: state => state.user.hrsaasTime,
  companyId: state => state.user.userInfo.companyId // 建立对于公司id的快捷方式
}
export default getters

// 很多组件会用到username这个字段，用getters形式抛出
