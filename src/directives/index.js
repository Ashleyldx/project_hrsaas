// 负责管理所有的自定义指令
export const imageError = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // console.log(dom) // 指令用在哪个标签上 dom就是哪个标签
    // console.log(options) // 对当前指令的描述，表达式及其对应的值
    // dom 表示当前指令作用的dom对象
    // dom 认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件=>onerror
    dom.onerror = function() { // onerror重点听一下
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom 可以注册error事件
      dom.src = options.value // 这里不能写死-- 为什么？？？
    } // 图片加载失败需要记住！！！
  }
}
// v-importError 自定义指令  //

export const color = {
  inserted(dom, options) {
    dom.style.color = options.value
  }
}
// Vue.directive('color')
// 注册在main.js里面
