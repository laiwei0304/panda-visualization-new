import { ref } from 'vue'
import { defineStore } from 'pinia'

// export const useNavStore = defineStore('nav', () => {
// const activeIndex = ref(0)
// function setActiveIndex(index) {
//   activeIndex.value = index
// }
// return { activeIndex, setActiveIndex }

// 应该差不多
// })

//都改变同一个变量应该可以吧 不可以
export const useNavStore = defineStore('nav', {
  state: () => {
    return { activeIndex: -1, activeNav: -1 }
    // 在页面刚加载时不跳转
    // 对，很多东西都要设置默认初始状态
  },
  // 也可以这样定义
  // state: () => ({ activeIndex: 0 })
  actions: {
    setActiveIndex(index) {
      this.activeIndex = index
    },
    setActiveNav(index) {
      this.activeNav = index
    },
  },
})

// 存储库名、变量、动作
