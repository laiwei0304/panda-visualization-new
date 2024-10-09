<template>
    <div id="wmp-container">
        <div id="wmp-content-container">
            <div id="wild-map-container" class="deco-container">
                <div id="wild-map" ref="wildMapRef"></div>
            </div>
            <div id="wmp-right-container">
                <div id="wmp-bar-chart-container" class="deco-container">
                    <div id="wmp-bar-chart" ref="wmpBarChartRef"></div>
                </div>
                <div id="wmp-vari-chart-container" class="deco-container">
                    <div id="wmp-vari-chart" ref="wmpVariChartRef"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import chinaMapJson from '@/assets/json/china.json';
import pandaImg from '@/assets/images/panda.png';
import bambooImg from '@/assets/images/bamboo.svg';

const wildMapRef = ref(null);
let wildMap = null;

const wmpBarChartRef = ref(null);
let wmpBarChart = null;

const wmpVariChartRef = ref(null);
let wmpVariChart = null;

// 自定义label样式
const dataLabelTemp = {
    normal: {
        show: false,
    },
    emphasis: {
        show: true,
        position: 'left',
        offset: [0, 90],
        formatter: function (p) {
            return '{title|' + p.name + '}{abg|}\n' +
                '{valueHead|种群数量/只}' +
                // '{rateHead|比例/%}'+
                '{densityHead|种群密度/(只/平方米)}\n' +
                '{hr|}\n' +
                '{value|' + p.value + '}' +
                // '{rate|'+p.data.rate+'}'+
                '{density|' + p.data.density + '}';
        },
        backgroundColor: '#f1f0ed',
        borderColor: '#7a7374',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
            title: {
                color: '#f1f0ed',
                align: 'center',
            },
            abg: {
                backgroundColor: '#7a7374',
                width: '100%',
                align: 'right',
                height: 25,
                borderRadius: [4, 4, 0, 0]
            },
            hr: {
                borderColor: '#7a7374',
                width: 240,
                borderWidth: 0.5,
                height: 0
            },
            value: {
                color: '#650000',
                width: 90,
                height: 25,
                padding: [0, 0, 0, 0],
                align: 'center',
                // backgroundColor:"red",
            },
            valueHead: {
                color: '#333',
                width: 90,
                height: 25,
                padding: [0, 0, 0, 0],
                align: 'center',
                // backgroundColor:"red",
            },
            density: {
                color: '#650000',
                width: 130,
                height: 25,
                align: 'center',
                padding: [0, 0, 0, 0],
                // backgroundColor:"blue",
            },
            densityHead: {
                color: '#333',
                width: 130,
                height: 25,
                align: 'center',
                padding: [0, 0, 0, 0],
                // backgroundColor:"blue",
            },
            // rate:{
            //     color: '#650000',
            //     width: 60,
            //     height: 25,
            //     align: 'center',
            //     padding: [0, 0, 0, 0],
            //     // backgroundColor:"green",
            // },
            // rateHead:{
            //     color: '#333',
            //     width: 60,
            //     height: 25,
            //     align: 'center',
            //     padding: [0, 0, 0, 0],
            //     // backgroundColor:"green",
            // },
        }
    }
};
const noDataLabelTemp = {
    normal: {
        show: false,
    },
    emphasis: {
        show: true,
        formatter: '{b}',
        textStyle: {
            color: '#333'//鼠标经过字体颜色
        }
    }
};

// 野生大熊猫种群数量-区域颜色图系列配置   
const wildMapOpt = {
    title: {
        text: '野生大熊猫种群数量分布'
    },
    // 提示框组件
    tooltip: {
        show: false,
        // trigger: "item", // 触发类型-数据项图形hover触发
        // position:"top",
        // formatter: "{b}: {c}只", // hover提示框展示的内容
    },
    // 视觉映射组件
    visualMap: {
        show: true,
        itemWidth: 20,
        itemHeight: 200,
        orient: "vertical", // 显示方式
        left: "left", // 距离容器左侧的位置
        top: "middle",
        min: 0, // 数据最小值
        max: 1500, // 指定数据最大值
        inRange: {
            color: ["#f1f2f2", "#1ba784"], // 范围颜色-从小到大渐变颜色区间
        },
        hoverLink: true, // 是否启用数据项图形hover时的联动高亮效果
        text: ["高", "低"], // 组件两侧的文本
        // seriesIndex:0,  // 指定取哪个系列的数据
    },
    series: [{
        name: '区域颜色',
        type: 'map',
        map: 'china', // 地图类型，这里以中国地图为例
        roam: false, // 是否开启鼠标缩放和平移漫游
        zoom: 1.20, // 当前视角的缩放比例
        select: {
            disabled: true, // 数据项图形是否能被选中
        },
        itemStyle: {
            normal: {
                borderWidth: 1, //边界线大小
                borderColor: '#c0c4c3', //边界线颜色
                areaColor: '#ffffff', //默认区域颜色
                padding: 1
            },
            emphasis: {
                areaColor: "#ffd867", //鼠标滑过区域颜色
            }
        },
        select: {
            disabled: true, // 数据项图形是否能被选中
        },
        data: [ // 这里填入你的区域颜色数据  
            { name: "四川省", value: 1387, rate: 74.4, density: 0.0684, label: dataLabelTemp },
            { name: "陕西省", value: 345, rate: 18.5, density: 0.0957, label: dataLabelTemp },
            { name: "甘肃省", value: 132, rate: 7.1, density: 0.0699, label: dataLabelTemp },
            { name: "北京市", value: 0, label: noDataLabelTemp },
            { name: "天津市", value: 0, label: noDataLabelTemp },
            { name: "河北省", value: 0, label: noDataLabelTemp },
            { name: "山西省", value: 0, label: noDataLabelTemp },
            { name: "内蒙古自治区", value: 0, label: noDataLabelTemp },
            { name: "辽宁省", value: 0, label: noDataLabelTemp },
            { name: "吉林省", value: 0, label: noDataLabelTemp },
            { name: "黑龙江省", value: 0, label: noDataLabelTemp },
            { name: "上海市", value: 0, label: noDataLabelTemp },
            { name: "江苏省", value: 0, label: noDataLabelTemp },
            { name: "浙江省", value: 0, label: noDataLabelTemp },
            { name: "安徽省", value: 0, label: noDataLabelTemp },
            { name: "福建省", value: 0, label: noDataLabelTemp },
            { name: "江西省", value: 0, label: noDataLabelTemp },
            { name: "山东省", value: 0, label: noDataLabelTemp },
            { name: "河南省", value: 0, label: noDataLabelTemp },
            { name: "湖北省", value: 0, label: noDataLabelTemp },
            { name: "湖南省", value: 0, label: noDataLabelTemp },
            { name: "广东省", value: 0, label: noDataLabelTemp },
            { name: "广西壮族自治区", value: 0, label: noDataLabelTemp },
            { name: "海南省", value: 0, label: noDataLabelTemp },
            { name: "重庆市", value: 0, label: noDataLabelTemp },
            { name: "贵州省", value: 0, label: noDataLabelTemp },
            { name: "云南省", value: 0, label: noDataLabelTemp },
            { name: "西藏自治区", value: 0, label: noDataLabelTemp },
            { name: "青海省", value: 0, label: noDataLabelTemp },
            { name: "宁夏回族自治区", value: 0, label: noDataLabelTemp },
            { name: "新疆维吾尔自治区", value: 0, label: noDataLabelTemp },
            { name: "香港特别行政区", value: 0, label: noDataLabelTemp },
            { name: "澳门特别行政区", value: 0, label: noDataLabelTemp },
            { name: "台湾省", value: 0, label: noDataLabelTemp },
            { name: "南海诸岛", value: 0, label: noDataLabelTemp },
        ],
    }],
};

// 柱状图配置
const wmpBarChartOpt = {
    title: {
        text: '各山系野生大熊猫种群数量和种群密度'
    },
    color: ["#0080ae", "#ffd867",],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        top: '25%',
        right: '10%',
        bottom: '20%',
    },
    legend: {
        data: ['种群数量', '种群密度',],
        x: 'center',
        y: 'bottom',
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            alignWithLabel: true
        },
        data: ['秦岭', '岷山', '邛崃山', '大相岭', '小相岭', '凉山']
    }],
    yAxis: [{
        type: 'value',
        name: '种群密度/\n(只/平方米)',
        position: 'right',
        alignTicks: true,
        axisLine: {
            show: true,
            // lineStyle: {
            //     color: '#63bbd0',
            // }
        },
        axisLabel: {
            formatter: '{value}'
        }
    },
    {
        type: 'value',
        name: '种群数量/只',
        position: 'left',
        alignTicks: true,
        axisLine: {
            show: true,
            // lineStyle: {
            //     color: '#f17666',
            // }
        },
        axisLabel: {
            formatter: '{value}'
        }
    }],
    series: [
        {
            name: '种群数量',
            type: 'bar',
            yAxisIndex: 1,
            data: [347, 797, 528, 38, 30, 124]
        },
        {
            name: '种群密度',
            type: 'bar',
            data: [0.093, 0.082, 0.077, 0.031, 0.025, 0.041]
        },
    ]
};

// 数量变化图表配置
const wmpVariChartOpt = {
    title: {
        text: '历次调查野生大熊猫种群数量变化'
    },
    tooltip: {
        trigger: 'axis'
    },
    color: ["#88be6e", "#ffd867", "#f0c9cf", "#f17666"],
    legend: {
        data: ['四川省', '陕西省', '甘肃省', '合计'],
        x: 'center',
        y: 'bottom',
    },
    grid: {
        top: '15%',
        left: '3%',
        right: '8%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['第一次', '第二次', '第三次', '第四次']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '四川省',
            type: 'line',
            stack: 'Total',
            data: [1915, 909, 1206, 1387]
        },
        {
            name: '陕西省',
            type: 'line',
            stack: 'Total',
            data: [237, 109, 273, 345]
        },
        {
            name: '甘肃省',
            type: 'line',
            stack: 'Total',
            data: [307, 96, 117, 132]
        },
        {
            name: '合计',
            type: 'line',
            stack: 'Total',
            data: [2459, 1114, 1596, 1864]
        },
    ]
};

// 初始化ECharts图表  
function initCharts() {
    echarts.registerMap("china", chinaMapJson);
    wildMap = echarts.init(wildMapRef.value);
    wmpBarChart = echarts.init(wmpBarChartRef.value);
    wmpVariChart = echarts.init(wmpVariChartRef.value);

    nextTick(() => {
        // 在这里可以安全地执行依赖于更新后 DOM 的操作 
        wildMap.setOption(wildMapOpt);
        wmpBarChart.setOption(wmpBarChartOpt);
        wmpVariChart.setOption(wmpVariChartOpt);
    });

};

// 生命周期钩子
onMounted(() => {
    initCharts();
});
onUnmounted(() => {
    if (wildMap) {
        wildMap.dispose();
    }
    if (wmpBarChart) {
        wmpBarChart.dispose();
    }
    if (wmpVariChart) {
        wmpVariChart.dispose();
    }
});  
</script>

<style scoped>
#wmp-container {
    /* background-color: lightgoldenrodyellow; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

#wmp-content-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    /* border: 1px solid black; */
}

#wild-map-container {
    flex: 6;
}

#wild-map {
    height: 100%;
    width: 100%;
}

#wmp-right-container {
    flex: 4;
    display: flex;
    flex-direction: column;
}

#wmp-vari-chart-container {
    flex: 1;
}

#wmp-vari-chart {
    height: 100%;
    width: 100%;
}

#wmp-bar-chart-container {
    flex: 1;
}

#wmp-bar-chart {
    height: 100%;
    width: 100%;
    /* background-color: lightpink; */
}

.deco-container {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px;
}
</style>