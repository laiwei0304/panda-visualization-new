<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AsideNav from "@/layout/AsideNav.vue"
import Content from "@/layout/Content.vue"

const emit = defineEmits(['scrollToHome']);
const handleScrollToHome = () => {
  // 处理事件逻辑，或者再次发射事件给祖父组件
  emit('scrollToHome');
};

// 还真是, 监视内容才是合理的解决方案
const handleScroll = () => {
  if (!sideBarRef.value || !contentRef.value) return; // 确保组件已经挂载

  const sidebar = sideBarRef.value.$el; // 获取侧边栏元素
  const content = contentRef.value.$el; // 获取内容元素

  const contentRect = content.getBoundingClientRect();

  // 检查内容顶部是否在视窗内
  if (contentRect.top <= 0) {
    sidebar.style.position = 'fixed'; // 固定侧边栏位置
    sidebar.style.top = '0'; // 设置侧边栏距离页面顶部的距离
    content.style.marginLeft = '220px'; // 调整内容区域的边距，使其不受侧边栏固定的影响
  } else {
    sidebar.style.position = 'relative'; // 恢复侧边栏默认位置
    sidebar.style.top = 'auto'; // 取消设置的距离
    sidebar.style.width = '220px';
    content.style.marginLeft = '0'; // 恢复内容区域的默认边距
  }
};

const sideBarRef = ref(null);
const contentRef = ref(null);

onMounted(() => {
  // 笑死,不叫if反而可以,一种不严谨的判断

  // 获取导航栏元素
  const navbar = sideBarRef.value.$el;
  // 初始状态隐藏导航栏
  // navbar.style.opacity = 0;
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<!-- 太好笑了，组合式API支持简写.vue，但选项式API不行 -->

<!-- 设置一个透明度线性函数实现渐变 -->
<!-- <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const handleScroll = () => {
  if (!navbarRef.value || !contentRef.value) return; // 确保组件已经挂载
  const navbar = navbarRef.value;
  const content = contentRef.value;

  const contentRect = content.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 计算导航栏的透明度
  let opacity = 1 - Math.max(0, contentRect.top) / 400;
  opacity = Math.min(1, opacity);

  // 设置导航栏的透明度
  navbar.style.opacity = opacity.toString();
};

const navbarRef = ref(null);
const contentRef = ref(null);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script> -->

<style scoped>
.navbar {
  transition: opacity 0.5s ease;
  /* 定义透明度过渡效果 */
  opacity: 1;
  /* 初始透明度 */
  /* 其他样式 */
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
<template>
  <div class="container">
    <AsideNav ref="sideBarRef" @scrollToHome="handleScrollToHome" />
    <Content ref="contentRef" />
  </div>
</template>
<!-- 在组件上设置id会改变内层最外层容器id -->

<!-- template里居然不能注释吗 -->
