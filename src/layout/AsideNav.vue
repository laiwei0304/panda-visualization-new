<script setup>
import { useNavStore } from '@/stores/nav'
import { ref } from 'vue'
import { defineEmits } from 'vue';
import line1 from '@/assets/images/line1.png'
import line2 from '@/assets/images/line2.png'
import line3 from '@/assets/images/line2.png'

const emit = defineEmits(['scrollToHome']);
const scrollToParentHome = () => {
    console.log('子组件准备就绪');
    emit('scrollToHome');
};
// 可能.js可省略, .vue不行
const nav = useNavStore()
// 重命名一下

// 1是内容1的导航，最下一截竹子
const sidebarItems = ref([
    // 熊猫在国际国内的文化影响
    { image: '../assets/images/line1.png', text: '熊猫简介' },
    { image: '../assets/images/line2.png', text: '熊猫文化' },
    { image: '../assets/images/line3.png', text: '熊猫外交' },
]);
//有一个偶尔点击没反应的bug

// 大概也可以直接调用吧
const handleNavClick = (index) => {

    // //打印调试
    // console.log(nav.activeIndex)

    nav.setActiveIndex(index)

    // //打印调试
    // console.log(nav.activeIndex)
}

// 手动设置每个 nav-item 的透明度
const itemOpacity = [
    1.0, 1.0, 1.0, 1.0, 1.0,  // 根据需要调整每个项的透明度
];
</script>

<template>
    <div id="nav">
        <img src="../assets/images/leftPanda.png" ref="leftRef" id="return" @click="scrollToParentHome">

        <P>返回首页</P>
        <div class="nav-item" :class="{ 'active': 0 === nav.activeNav, 'through': 0 <= nav.activeNav }"
            @click="handleNavClick(0)">
            <div class="nav-content">
                <img src="../assets/images/line1.png" alt="Navigation icon" class="nav-icon">
                <span class="nav-text">熊猫简介</span>
            </div>
        </div>
        <div class="nav-item" :class="{ 'active': 1 === nav.activeNav, 'through': 1 <= nav.activeNav }"
            @click="handleNavClick(1)">
            <div class="nav-content">
                <img src="../assets/images/line2.png" alt="Navigation icon" class="nav-icon">
                <span class="nav-text">熊猫文化</span>
            </div>
        </div>
        <div class="nav-item" :class="{ 'active': 2 === nav.activeNav, 'through': 2 <= nav.activeNav }"
            @click="handleNavClick(2)">
            <div class="nav-content">
                <img src="../assets/images/line3.png" alt="Navigation icon" class="nav-icon">
                <span class="nav-text">熊猫外交</span>
            </div>
        </div>



    </div>
</template>

<style scoped>
/* 侧边栏样式 */


.nav-content {
    display: flex;
    /* 使用 Flexbox 布局 */
    align-items: center;
    /* 垂直居中 */
}

.nav-icon {
    flex: 1;
}

.nav-text {
    flex: 1;
    font-size: 1rem;
    /* 文字占据剩余空间 */
    text-align: right;
    /* 文字与图片之间的间距 */
    /* 可能还有其他样式 */
}

.btn {
    text-decoration: none;
    display: inline-block;
    padding: 8px 30px;
    border-radius: 40px;
    background: #fff;
    color: #2b1055;
    font-size: 1.5em;
    z-index: 9;
    transform: translateY(100px);
}

/* .title {
    font-size: 1.2rem;
} */

#nav {
    /* position: relative; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 220px;
    top: 0;
    height: 60vh;
}

#nav .nav-item {
    opacity: 0.3;
    cursor: pointer;
    flex: 1;
    /* background-color: rgba(255, 255, 255, 0.8); */
    opacity: 0.3;
    /* 内容半透明的背景色 */
}

/* .nav-item {
    display: flex;
    使用 Flexbox 布局
    align-items: center;
    垂直居中
    width: 100%;
    宽度占满父容器
    添加其他样式
    flex: 4;
} */

.nav-item img {
    width: 220px;
    /* height: 100%; */
    height: auto;
    /* 笑死，直接除以5也行 */
}


/* #nav .nav-item.active {
    font-weight: bold !;
    background-color: rgb(194, 244, 171);
} */

#nav .nav-item.active {
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.3);
}

#nav .nav-item.through {
    opacity: 1.0;
}

.word {
    /* text-align: center; */
    /* 水平居中 */
    line-height: 50vh;
    /* 40px 是你希望的垂直高度，你可以根据实际情况调整 */
}

#return {
    width: 60%;
    flex: 1;
}

p {
    font-weight: bold;
}
</style>