<template>
    <div id="content">
        <!-- <div class="content-block" v-for="(content, index) in contents" :key="index" :id="'section-' + index">
            {{ content }}
        </div> -->
        <div class="content-block" :id="'section-' + 0">
            <BreedMapPage />
        </div>
        <div class="content-block" :id="'section-'">
            <WildMapPage />
        </div>
        <div class="content-block" :id="'section-' + 1">
            <DomesticPage />
        </div>
        <div class="content-block" :id="'section-'">
            <ForeThemePage />
        </div>
        <div class="content-block" :id="'section-' + 2">
            <ForePeriodPage />
        </div>
        <div class="content-block" :id="'section-'">
            <DiplomacyPage />
        </div>

        <!-- <div class="content-block" :id="'section-'">

        </div> -->
        <!-- 要保留id实现侧边栏导航功能 -->

        <!-- <TableStyle v-for="(component, index) in components" :key="index" :index="1">
            <component :is="component"></component>
        </TableStyle> -->

        <!-- <TableStyle :index="1">
            <BambooBar />
        </TableStyle>
        <TableStyle :index="2">
            <Reference />
        </TableStyle> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useNavStore } from '@/stores/nav'
import DomesticPage from '@/pages/DomesticPage.vue'
import ForePeriodPage from '@/pages/ForePeriodPage.vue'
import BreedMapPage from '@/pages/BreedMapPage.vue'
import WildMapPage from '@/pages/WildMapPage.vue'
import ForeThemePage from '@/pages/ForeThemePage.vue'
// import CompariPage from '@/components/CompariPage.vue'
import DiplomacyPage from '@/pages/DiplomacyPage.vue'
// 啊,不能加括弧？我大为震惊
// 可能.js可省略, .vue不行
const nav = useNavStore()

const contents = ref('内容 1', '内容 2', '内容 3', '内容 4');
// 页面长度获取方式，以后需替换

// const components = { BambooBar }



// 都是先声明了函数才能监听
const scrollToAnchor = () => {

    //打印调试
    console.log(nav.activeIndex)

    // 获取当前导航索引
    const index = nav.activeIndex;
    // 检查索引是否在合法范围内
    if (index >= 0 && index < contents.value.length) {
        // 获取对应内容区域元素并滚动到可视区域
        const element = document.getElementById('section-' + index);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
// const highlightNav = () => {
//     //打印调试
//     console.log(nav.activeNav)

//     const contentSections = document.querySelectorAll('.content-block');
//     // let currentIndex = 0;
//     for (let i = contentSections.length - 1; i >= 0; i--) {
//         const rect = contentSections[i].getBoundingClientRect();
//         if (rect.top <= window.innerHeight * 0.5) {
//             nav.setActiveNav(i)

//             //打印调试
//             console.log(nav.activeNav)

//             break;
//         }
//     }
//     // activeIndex.value = currentIndex;
// };
const contentLength = 3;

const highlightNav = () => {
    //打印调试
    // console.log(nav.activeNav)

    // const contentSections = document.querySelectorAll('.content-block');
    // let currentIndex = 0;
    // for (let i = contentSections.length - 1; i >= 0; i--) {
    // const rect = contentSections[i].getBoundingClientRect();
    for (let i = contentLength - 1; i >= 0; i--) {
        const contentSection = document.getElementById('section-' + i);
        const rect = contentSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
            nav.setActiveNav(i)

            //打印调试
            // console.log(nav.activeNav)

            break;
        }
    }
    // activeIndex.value = currentIndex;
};

// 好像没有看到多个watch写在一起的情况
// 双向的交互都在这个组件中监听
// 1.监听导航组件中的索引变化 
watch(
    () => nav.activeIndex, scrollToAnchor);

// 确保页面加载时也能正确跳转到指定锚点
onMounted(scrollToAnchor);

// 2.监听该组件中的滚动情况
//'scroll' 是指在浏览器中的滚动事件，不需要显式定义
watchEffect(() => {
    window.addEventListener('scroll', highlightNav);
});
</script>

<style scope>
#content {
    position: relative;
    width: 85vw;
    background-color: rgb(250, 250, 250, 0);
}

#domestic {
    height: 100%;
    background-color: aliceblue;
}

.content-block {
    /* padding: 2vh; */
    border-radius: 10px;
    /* 设置所有角的圆角半径为 10px */
    height: 100vh;
    margin: 15px;
    background-color: rgb(255, 255, 255, 0.5);
}

.content-block:first-child {
    /* margin-top: 0; */
}
</style>