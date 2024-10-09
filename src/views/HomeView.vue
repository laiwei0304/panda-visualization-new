<template>
    <!-- 视差效果的关键容器 -->
    <div id="body">
        <!-- 用来设置渐变背景 -->
        <div id="background"></div>

        <header ref="headerRef" id="header">
            <!-- 一个定位元素罢了 -->
            <div style="position: relative; width: 30%; height: 20%;">
                <img src="../assets/images/title.png"
                    style="position: absolute; width: 250%; height: auto; top: 50%; left: 0%; transform: translate(17%, 120%);"
                    ref="titleRef" id="title">
                <img src="../assets/images/iland.png"
                    style="position: absolute;width: 30%; height: auto; top: 1000%; left: 200%; transform: translate(17%, 450%);"
                    ref="ilandRef" id="iland">
            </div>
            <ul>
                <li><a href="#" :class="{ 'active': activeLink === 'Work' }" @click="setActiveLink('Work')">团队信息</a></li>
                <li><a href="#" :class="{ 'active': activeLink === 'Contact' }" @click="setActiveLink('Contact')">相关链接</a>
                </li>
            </ul>
        </header>
        <section ref="sectionRef">
            <!-- 没对样式进行设置 -->
            <img src="../assets/images/water.png" ref="waterRef" id="water">

            <!-- 通过id对样式进行了设置 -->
            <img src="../assets/images/wave.png" ref="waveRef" id="wave">
            <img src="../assets/images/cloud1.svg" ref="cloud1Ref" id="cloud1">
            <img src="../assets/images/cloud2.svg" ref="cloud2Ref" id="cloud2">
            <img src="../assets/images/cloud3.svg" ref="cloud3Ref" id="cloud3">
            <img src="../assets/images/rightPanda.svg" ref="rightpandaRef" id="panda">
            <!-- <img src="../assets/images/mountains_behind.png" ref="rightpandaRef" id="mountains_behind"> -->
            <h2 id="text" ref="textRef">熊猫</h2>
            <div ref="btnRefSet">
                <div class="btn" @click="scrollToMain">开始旅行!</div>
            </div>
            <!-- <img src="../assets/images/bamboo.svg" ref="bambooRef" id="bamboo"> -->

        </section>
        <div class="sec" ref="secRef">
            <!-- <img src="../assets/images/bushes.png" id="bushes"> -->
            <Main ref="mainRef" @scrollToHome="handleScrollToHome" />
        </div>
    </div>
</template>

<script setup>
import Main from "@/views/Main.vue"
import { ref, onMounted, onUnmounted } from 'vue';

// 获取DOM元素的引用
const headerRef = ref(null);
const sectionRef = ref(null);
const waterRef = ref(null);
const waveRef = ref(null);
const rightpandaRef = ref(null);
const cloud1Ref = ref(null);
const cloud2Ref = ref(null);
const cloud3Ref = ref(null);
const textRef = ref(null);
const btnRefSet = ref(null);
const bambooRef = ref(null);
const secRef = ref(null);

const mainRef = ref(null);

// 滚动监听
const scrollToMain = () => {
    const element = mainRef.value.$el
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
const handleScrollToHome = () => {
    console.log('父组件准备就绪');
    const element = document.getElementById('body');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
// const scrollToHome = () => {
//     const element = document.getElementById('body');
//     if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//     }
// }

// 创建响应式变量，用于存储滚动位置
const scrollY = ref(0);

// 在组件挂载时，监听滚动事件
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 在组件卸载时，移除滚动事件监听器
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// 滚动事件处理函数
const handleScroll = () => {
    scrollY.value = window.scrollY;
    updateElementsPosition();
};

// 更新各元素的位置
const updateElementsPosition = () => {

    waterRef.value.style.top = `${scrollY.value * 0.25}px`;

    waveRef.value.style.top = `-${scrollY.value * 0.25}px`;
    waveRef.value.style.left = `-${scrollY.value * 0.2}px`;

    rightpandaRef.value.style.top = `${scrollY.value * 1}px`;
    rightpandaRef.value.style.left = `${scrollY.value * 1.3}px`;

    cloud1Ref.value.style.top = `${scrollY.value * 0.2}px`;
    cloud1Ref.value.style.left = `${scrollY.value * 0.3}px`;

    cloud2Ref.value.style.top = `${scrollY.value * 0.1}px`;
    cloud2Ref.value.style.left = `${scrollY.value * 0.15}px`;

    cloud3Ref.value.style.top = `${scrollY.value * 0.5}px`;
    cloud3Ref.value.style.left = `-${scrollY.value * 0.2}px`;
    // bambooRef.value.style.top = `${scrollY.value * 0}px`;
    // textRef.value.style.marginRight = `${scrollY.value * 2}px`;
    // textRef.value.style.marginTop = `${scrollY.value * 1.5}px`;
    // btnRefSet.value.style.marginTop = `${scrollY.value * 1.5}px`;
    // headerRef.value.style.top = `${scrollY.value * 0.5}px`;
};
</script>

<style scoped>
/* 这是引入了一些字体 */
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    /* 当用户手动导航或者 CSSOM scrolling API 触发滚动操作时 */
    scroll-behavior: smooth;
    /* background-image: url('../assets/images/water.png'); */

}

#body {
    min-height: 100vh;
    overflow-x: hidden;
}

#background {
    height: 100vh;
    width: 100%;
    /* background: linear-gradient(#d8e2ed, #1e95f0); */
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    /* 置于其它元素下方 */
}

header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10000;
}

header .logo {
    color: #3f3838;
    font-weight: 700;
    text-decoration: none;
    font-size: 3em;
    text-transform: uppercase;
    /* 大写 */
    letter-spacing: 2px;
    /* 字符间距 */
}

header ul {
    display: flex;
    justify-content: center;
    align-items: center;
}

header ul li {
    list-style: none;
    margin-left: 20px;
}

header ul li a {
    text-decoration: none;
    padding: 6px 15px;
    color: #ffffff;
    border-radius: 20px;
    background: #5b6259;
}

header ul li a:hover,
header ul li a.active {
    background: #4a4242;
    color: #ffffff;
}

section {
    z-index: 10;
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

section::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    /* background: linear-gradient(to top, #00709d, transparent); */
    z-index: 1000;
}

section img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* object-fit CSS 属性指定可替换元素（例如：<img> 或 <video>）的内容应该如何适应到其使用高度和宽度确定的框。 */
    object-fit: cover;
    pointer-events: none;
}

#bushes {
    /* position: absolute; */
    top: 0;
    width: 100%;
}

section img#moon {
    /* mix-blend-mode CSS 属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。 */
    mix-blend-mode: screen;
}

section img#bamboo {
    z-index: 10;
}

#iland {
    z-index: 1;
}

#text {
    position: absolute;
    right: -350px;
    color: #fff;
    white-space: nowrap;
    font-size: 7.5vw;
    z-index: 9;
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

.return {
    position: fixed;
}

.sec {
    /* z-index: 10; */
    position: relative;
    padding: 0px;
    background-color: #0089b3;
    /* background-image: url('../assets/images/water.png'); */
}

.sec h2 {
    font-size: 3.5em;
    margin-bottom: 10px;
    color: #322c2c;
}

.sec p {
    font-size: 1em;
    color: #fff;
}

#foreign {
    /* height: 100vh; */
}

#domestic {
    /* height: 100vh; */
}

.bottom {
    z-index: 1;
}


.btn {
    border: 2px solid #006a9e;
    /* padding: 5px; */
}
</style>