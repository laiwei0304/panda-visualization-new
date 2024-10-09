<template>
    <div id="tpc-container">
        <div id="tpc-title1" class="tpc-title">大众对大熊猫所属类型的理解</div>
        <div id="pie1-container">
            <div id="pie1" ref="pieRef1"></div>
        </div>
        <div id="tpc-title2" class="tpc-title">大熊猫与中华文化精神关联</div>
        <div id="pie2-container">
            <div id="pie2" ref="pieRef2"></div>
        </div>
        <div id="tpc-title3" class="tpc-title">借助大熊猫传播中华文化方式</div>
        <div id="pie3-container">
            <div id="pie3" ref="pieRef3"></div>
        </div>
        <img id="tpc-image" src="@/assets/images/middle.png">
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import Pie from 'piechart-3d';

const pieRef1 = ref(null);
let pie1 = null;
const name1 = ['中国文化', '动物文化', '生态文化', '世界文化', '休闲文化'];

const pieRef2 = ref(null);
let pie2 = null;
const name2 = ['道法自然', '自强不息', '无为不争', '和实生物', '贵和尚武'];

const pieRef3 = ref(null);
let pie3 = null;
const name3 = ['短视频', '视频直播', '戏剧影视', '文创作品'];

// 饼图配置
const pieOpt1 = {
    debug: false,
    // 大众对大熊猫所属类型的理解
    // 中国文化：75.88%
    // 动物文化：58.33%
    // 生态文化：55.7%
    // 世界文化：46.49%
    // 休闲文化：39.47%
    data: [75.88, 58.33, 55.7, 46.49, 39.47],
    innerRadius: 0,
    outerRadius: 100,
    cornerRadius: 0,
    padAngle: 0,
    height: 5,
    // colors:[
    //     '#f17666',
    //     '#ccccd6',
    //     '#baccd9',
    //     '#c4d7d6',
    //     '#f8e8c1'
    // ],
    colors: ["#009abd", "#88be6e", "#ffd867", "#f0c9cf", "#f17666"],
    viewport: [0, 2, 2.5],
    activeAnimation: {
        duration: 0.25,
        heightScale: 3,
    },
    label: {
        show: true,
        position: 0.7,
        render({ index, value, percent, color }) {
            const div = document.createElement('div');
            // div.innerText = Number((percent * 100).toFixed(2)) + '%';
            div.innerText = name1[index] + '\n' + value + '%';
            div.style.color = '#000';
            div.style.fontSize = '12px';
            div.style.whiteSpace = 'pre-line';
            div.style.textAlign = 'center';
            return div;
        },
    },
    lights: [
        {
            type: 'AmbientLight',
            color: '#fff',
            intensity: 0.45,
        },
        {
            type: 'SpotLight',
            color: '#fff',
            intensity: 1,
            position: [5, 5, 5],
        },
    ],
    autoplay: false,
    on: {
        mouseenter(e) {
            // console.log('mouseenter', e);
        },
        mouseleave(e) {
            // console.log('mouseleave', e);
        },
        active(e) {
            // console.log('active', e);
        },
    },
};

const pieOpt2 = {
    debug: false,
    // 大熊猫发展史与中华文化精神关联调研
    // “道法自然”：67.54%
    // “自强不息”：57.02%
    // “无为不争”：44.30%
    // “和实生物”：40.35%
    // “贵和尚武”：35.96%
    data: [67.54, 57.02, 44.30, 40.35, 35.96],
    innerRadius: 0,
    outerRadius: 100,
    cornerRadius: 0,
    padAngle: 0,
    height: 5,
    colors: ["#009abd", "#88be6e", "#ffd867", "#f0c9cf", "#f17666"],
    viewport: [0, 2, 2.5],
    activeAnimation: {
        duration: 0.25,
        heightScale: 3,
    },
    label: {
        show: true,
        position: 0.7,
        render({ index, value, percent, color }) {
            const div = document.createElement('div');
            // div.innerText = Number((percent * 100).toFixed(2)) + '%';
            div.innerText = name2[index] + '\n' + value + '%';
            div.style.color = '#000';
            div.style.fontSize = '12px';
            div.style.whiteSpace = 'pre-line';
            div.style.textAlign = 'center';
            return div;
        },
    },
    lights: [
        {
            type: 'AmbientLight',
            color: '#fff',
            intensity: 0.45,
        },
        {
            type: 'SpotLight',
            color: '#fff',
            intensity: 1,
            position: [5, 5, 5],
        },
    ],
    autoplay: false,
    on: {
        mouseenter(e) {
            // console.log('mouseenter', e);
        },
        mouseleave(e) {
            // console.log('mouseleave', e);
        },
        active(e) {
            // console.log('active', e);
        },
    },
};

const pieOpt3 = {
    debug: false,
    // 借助大熊猫文化传播中华文化方式选择
    // 短视频剪辑：30.7%
    // 视频直播：19.3%
    // 戏剧影视：17.98%
    // 文创作品：12.28%
    data: [30.7, 19.3, 17.98, 12.28],
    innerRadius: 0,
    outerRadius: 100,
    cornerRadius: 0,
    padAngle: 0,
    height: 5,
    colors: ["#009abd", "#88be6e", "#ffd867", "#f0c9cf", "#f17666"],
    viewport: [0, 2, 2.5],
    activeAnimation: {
        duration: 0.25,
        heightScale: 3,
    },
    label: {
        show: true,
        position: 0.7,
        render({ index, value, percent, color }) {
            const div = document.createElement('div');
            // div.innerText = Number((percent * 100).toFixed(2)) + '%';
            div.innerText = name3[index] + '\n' + value + '%';
            div.style.color = '#000';
            div.style.fontSize = '12px';
            div.style.whiteSpace = 'pre-line';
            div.style.textAlign = 'center';
            return div;
        },
    },
    lights: [
        {
            type: 'AmbientLight',
            color: '#fff',
            intensity: 0.45,
        },
        {
            type: 'SpotLight',
            color: '#fff',
            intensity: 1,
            position: [5, 5, 5],
        },
    ],
    autoplay: false,
    on: {
        mouseenter(e) {
            // console.log('mouseenter', e);
        },
        mouseleave(e) {
            // console.log('mouseleave', e);
        },
        active(e) {
            // console.log('active', e);
        },
    },
};


onMounted(() => {
    pie1 = new Pie('#pie1', pieOpt1);
    pie2 = new Pie('#pie2', pieOpt2);
    pie3 = new Pie('#pie3', pieOpt3);
});
onUnmounted(() => {
    pie1.dispose();
}); 
</script>

<style scoped>
#tpc-container {
    height: 90%;
    width: 100%;
    /* background-color: antiquewhite; */
    /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; */
    position: relative;
    /* 设置为相对定位，作为绝对定位子元素的参考 */
}

.tpc-title {
    font-size: 15px;
    font-weight: bold;
}

#tpc-title1 {
    position: absolute;
    /* 设置为绝对定位 */
    top: 20px;
    /* 距离父元素顶部的距离 */
    left: 170px;
    /* 距离父元素左侧的距离 */
    height: fit-content;
    width: fit-content;
}

#tpc-title2 {
    position: absolute;
    /* 设置为绝对定位 */
    top: 320px;
    /* 距离父元素顶部的距离 */
    left: 30px;
    /* 距离父元素左侧的距离 */
    height: fit-content;
    width: fit-content;
}

#tpc-title3 {
    position: absolute;
    /* 设置为绝对定位 */
    top: 90%;
    /* 距离父元素顶部的距离 */
    left: 55%;
    /* 距离父元素左侧的距离 */
    height: fit-content;
    width: fit-content;
}

#pie1-container {
    position: absolute;
    /* 设置为绝对定位 */
    top: -50px;
    /* 距离父元素顶部的距离 */
    left: 100px;
    /* 距离父元素左侧的距离 */
    height: 350px;
    width: 350px;
    /* border: 1px solid black; */
}

#pie2-container {
    position: absolute;
    /* 设置为绝对定位 */
    top: 160px;
    /* 距离父元素顶部的距离 */
    left: 20px;
    /* 距离父元素左侧的距离 */
    height: 200px;
    width: 200px;
    /* border: 1px solid black; */
}

#pie3-container {
    position: absolute;
    /* 设置为绝对定位 */
    top: 35%;
    /* 距离父元素顶部的距离 */
    left: 50%;
    /* 距离父元素左侧的距离 */
    height: 270px;
    width: 270px;
    /* border: 1px solid black; */
}

#pie1 {
    height: 100%;
    width: 100%;
}

#pie2 {
    height: 100%;
    width: 100%;
}

#pie3 {
    height: 100%;
    width: 100%;
}

#tpc-image {
    position: absolute;
    /* 设置为绝对定位 */
    top: 50%;
    /* 距离父元素顶部的距离 */
    left: 30%;
    /* 距离父元素左侧的距离 */
    height: 30%;
    width: 30%;
    /* border: 1px solid black; */
}

/* .deco-container {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px;
} */
</style>