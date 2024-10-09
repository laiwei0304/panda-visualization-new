<template>
    <div id="rsc-container">
        <div id="reas-sun-chart" ref="reasSunChartRef"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';

const reasSunChartRef = ref(null);
let reasSunChart = null;

const reasData = [
    {
        name: '签署合作协定',
        itemStyle: { color: '#83cbac' },
        tooltip: {
            position: [300, 100],
            extraCssText: 'max-width:250px; white-space:pre-wrap;text-indent: 3ch;line-height: 2em;font-size: 13px;',
            formatter: function (p) {
                return '<div>赠送或租借熊猫往往是作为两国关系加强和深化的象征性举措之一。签署合作协定进一步巩固了两国之间的友好关系，并为未来的合作提供了框架和指导。熊猫外交也为两国带来了经济合作的机会。熊猫的到来通常会引发旅游业的繁荣，吸引更多游客和投资。此外，熊猫外交还可以促进两国在科研、教育、文化产业等领域的合作与交流，带来经济效益。</div>'
            }
        },
        children: [
            {
                name: '澳大利亚',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '英国',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '法国',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '马来西亚',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '荷兰',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '德国',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '芬兰',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '丹麦',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '俄罗斯',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '奥地利',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '卡塔尔',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '韩国',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '泰国',
                value: 1,
                tooltip: {
                    show: false
                },
            },
            {
                name: '新加坡',
                value: 1,
                tooltip: {
                    show: false
                },
            },
        ]
    },
    {
        name: '庆祝建交周年',
        itemStyle: { color: '#d2d97a' },
        tooltip: {
            position: [100, 250],
            extraCssText: 'max-width:250px; white-space:pre-wrap;text-indent: 3ch;line-height: 2em;font-size: 13px;',
            formatter: function (p) {
                return '<div>庆祝建交周年是两国关系中的重要纪念活动，通过这一机会，两国可以回顾和庆祝双边关系的发展历程，强调双方的友好合作和互信。赠送或租借熊猫作为其中的一部分，进一步增强了这一纪念活动的意义和特殊性。</div>'
            }
        },
        children: [
            {
                name: '俄罗斯',
                value: 1,
                itemStyle: { color: '#e2e7bf' },
                tooltip: {
                    show: false
                },
            },
            {
                name: '荷兰',
                value: 1,
                itemStyle: { color: '#e2e7bf' },
                tooltip: {
                    show: false
                },
            },
            {
                name: '德国',
                value: 1,
                itemStyle: { color: '#e2e7bf' },
                tooltip: {
                    show: false
                },
            },
            {
                name: '马来西亚',
                value: 1,
                itemStyle: { color: '#e2e7bf' },
                tooltip: {
                    show: false
                },
            },
            {
                name: '西班牙',
                value: 1,
                itemStyle: { color: '#e2e7bf' },
                tooltip: {
                    show: false
                },
            },
        ]
    },
    {
        name: '其他',
        itemStyle: { color: '#add5a2' },
        tooltip: {
            position: [100, 200],
            extraCssText: 'max-width:250px; white-space:pre-wrap;text-indent: 3ch;line-height: 2em;font-size: 13px;',
            formatter: function (p) {
                return '<div>赠送或租借熊猫还可以因为其他外交事件。例如，2017年一带一路印尼峰会暨全印尼县政府自主博览会启动大会在杭州召开，一份雅万高铁贷款协议也在杭州正式签署。同年，熊猫彩陶和湖春来到印尼。</div>'
            }
        },
        children: [
            {
                name: '美国',
                value: 1,
                itemStyle: { color: '#dfecd5' },
                tooltip: {
                    show: false
                },
            },
            {
                name: '印尼',
                value: 1,
                itemStyle: { color: '#dfecd5' },
                tooltip: {
                    show: false
                },
            },
            {
                name: '比利时',
                value: 1,
                itemStyle: {
                    color: '#dfecd5',
                },
                tooltip: {
                    show: false
                },
            },
        ],
    }
];
const reasSunChartOpt = {
    title: {
        text: '赠送(租借)熊猫原因',
        // left: "center",
        // textStyle: {
        //     show:true,
        //     fontWeight:'normal',
        //     color: "#000000",
        //     fontSize: '20',
        // },                 
    },
    series: [{
        type: 'sunburst',
        data: reasData,
        radius: [20, '80%'],
        itemStyle: {
            borderRadius: 7,
            borderWidth: 2,
            color: '#b9dec9',
        },
        levels: [
            {
                // 留给数据下钻的节点属性
                itemStyle: {
                    color: '#b0d5df'
                },
            },
        ],
    }],
    tooltip: {
        trigger: 'item',
    },
};

// 初始化图表
function initCharts() {
    reasSunChart = echarts.init(reasSunChartRef.value);

    nextTick(() => {
        // 在这里可以安全地执行依赖于更新后 DOM 的操作 
        reasSunChart.setOption(reasSunChartOpt);
    });
};

// 生命周期钩子
onMounted(() => {
    initCharts();
});
onUnmounted(() => {
    if (reasSunChart) {
        reasSunChart.dispose();
    }
}); 
</script>

<style scoped>
#rsc-container {
    width: 100%;
    height: 100%;
    /* border: 1px solid black; */
}

#reas-sun-chart {
    width: 100%;
    height: 100%;
}

.deco-container {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px;
}
</style>