<template>
    <div class="sun" ref="sunRef">
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

let myChart = null;
const sunRef = ref(null);
// const color2 = ["#88abda", "#009abd", "#88be6e", "#ffd867", "#f0c9cf", "#f17666"];
// const color1 = ["#2e59a7", "#4994c4", "#6f94cd", "#88abda"];


const data = [
    {
        name: '亚洲',
        itemStyle: { color: '#e2e7bf' },
        children: [
            {
                name: '韩国',
                value: 5,
                children: [
                    {
                        name: '三星爱宝',
                        value: 5
                    },

                ]
            },
            {
                name: '日本',
                value: 4,
                children: [
                    {
                        name: '上野',
                        value: 2
                    },
                    {
                        name: '冒险世界',
                        value: 2
                    },
                ]
            },
            {
                name: '卡塔尔',
                value: 2,
                children: [
                    {
                        name: '豪尔',
                        value: 2
                    },
                ]
            },
            {
                name: '马来西亚',
                value: 2,
                children: [
                    {
                        name: '马来西亚国家',
                        value: 2
                    },
                ]
            },
            {
                name: '印度尼西亚',
                value: 2,
                children: [
                    {
                        name: '印尼野生',
                        value: 2
                    },
                ]
            },
            {
                name: '新加坡',
                value: 2,
                children: [
                    {
                        name: '河川生态园',
                        value: 2
                    },
                ]
            }
        ]
    },
    {
        name: '欧洲',
        children: [
            {
                name: '西班牙',
                value: 5,
                children: [
                    {
                        name: '马德里',
                        value: 5
                    },
                ]
            },
            {
                name: '法国',
                value: 4,
                children: [
                    {
                        name: '博瓦勒',
                        value: 4
                    },
                ]
            },
            {
                name: '比利时',
                value: 5,
                children: [
                    {
                        name: '天堂',
                        value: 5
                    },
                ]
            },
            {
                name: '荷兰',
                value: 2,
                children: [
                    {
                        name: '欧维汉',
                        value: 2
                    },
                ]
            },
            {
                name: '德国',
                value: 4,
                children: [
                    {
                        name: '柏林',
                        value: 4
                    },
                ]
            },
            {
                name: '丹麦',
                value: 2,
                children: [
                    {
                        name: '哥本哈根',
                        value: 2
                    },
                ]
            },
            {
                name: '俄罗斯',
                value: 2,
                children: [
                    {
                        name: '莫斯科',
                        value: 2
                    },
                ]
            },
            {
                name: '芬兰',
                value: 2,
                children: [
                    {
                        name: '艾赫泰里',
                        value: 2
                    },
                ]
            },
        ]
    },
    {
        name: '北美洲',
        children: [
            {
                name: '美国',
                value: 4,
                children: [
                    {
                        name: '亚特兰',
                        value: 4
                    },]
            },
        ]
    },
    {
        name: '大洋洲',
        children: [
            {
                name: '澳大利亚',
                value: 2,
                value: 2,
                children: [
                    {
                        name: '阿德莱德',
                        value: 2
                    },
                ]
            }
        ]
    },
];
const option = {
    title: {
        text: '熊猫地理分布',
    },
    series: {
        type: 'sunburst',
        data: data,
        radius: [60, '90%'],
        itemStyle: {
            // color: '#b9dec9',
            borderRadius: 7,
            borderWidth: 2
        },
        // label: {
        //     show: false
        // },
        levels: [
            {

            },
            {
                r0: '20%',
                r: '40%',
                itemStyle: {
                    borderRadius: 7,
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential'
                }
            },
            {
                r0: '40%',
                r: '60%',
                itemStyle: {
                    borderRadius: 7,
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential',
                    // align: 'right'
                }
            },
            {
                r0: '60%',
                r: '100%',
                itemStyle: {
                    borderRadius: 7,
                    borderWidth: 2
                },
            }
        ]
    },
    tooltip: {
        trigger: 'item',
    },
}

onMounted(() => {
    myChart = echarts.init(sunRef.value);
    myChart.setOption(option);
});

</script>

<style scoped>
.sun {
    width: 100%;
    height: 100%;
}
</style>
