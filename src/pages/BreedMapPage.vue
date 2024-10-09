<template>
    <div id="bmp-container">
        <div id="bmp-content-container">
            <div id="breed-map-container" class="deco-container">
                <div id="breed-map" ref="breedMapRef"></div>
            </div>
            <div id="bmp-right-container">
                <div id="bmp-vari-chart-container" class="deco-container">
                    <div id="bmp-vari-chart" ref="bmpVariChartRef"></div>
                </div>
                <div id="bmp-bar-chart-container" class="deco-container">
                    <div id="bmp-bar-chart" ref="bmpBarChartRef"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import chinaMapJson from '@/assets/json/china.json';
import pandaImg from '@/assets/images/pandaSet3.png';
import bambooImg from '@/assets/images/bamboo.svg';

const breedMapRef = ref(null);
let breedMap = null;

const bmpBarChartRef = ref(null);
let bmpBarChart = null;

const bmpVariChartRef = ref(null);
let bmpVariChart = null;

// 圈养大熊猫种群数量-散点图系列配置 
const breedMapOpt = {
    title: {
        text: '圈养大熊猫种群数量分布'
    },
    // 提示框组件
    tooltip: {
        show: false,
        // trigger: "item", // 触发类型-数据项图形hover触发
        // position: 'top',
        // formatter:"{b}: {c}", // hover提示框展示的内容
    },
    geo: {
        map: "china",
        roam: false, // 是否开启鼠标缩放和平移漫游
        zoom: 1.20, // 当前视角的缩放比例
        select: {
            disabled: true, // 数据项图形是否能被选中
        },
        itemStyle: {
            normal: {
                borderWidth: 1, //边界线大小
                borderColor: '#c6dfc8', //边界线颜色
                // areaColor: '#1ba784', //默认区域颜色
                areaColor: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, // 线性渐变的方向和范围  
                    [
                        { offset: 0, color: 'rgba(27, 167, 132, 1)' }, // 起始颜色和透明度  
                        { offset: 1, color: 'rgba(27, 167, 132, 0.5)' } // 结束颜色和透明度  
                    ]
                ),
                padding: 2
            },
            emphasis: {
                // borderWidth: 1, //边界线大小
                // borderColor: '#a9a9a9', //边界线颜色
                // areaColor: '#ffffff', //默认区域颜色
                // padding: 1
                // areaColor: '#f2ce2b', //鼠标滑过区域颜色
                borderWidth: 1, //边界线大小
                borderColor: '#c6dfc8', //边界线颜色
                // areaColor: '#1ba784', //默认区域颜色
                areaColor: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, // 线性渐变的方向和范围  
                    [
                        { offset: 0, color: 'rgba(27, 167, 132, 1)' }, // 起始颜色和透明度  
                        { offset: 1, color: 'rgba(27, 167, 132, 0.5)' } // 结束颜色和透明度  
                    ]
                ),
                padding: 2
            }
        },
        label: {
            normal: {
                show: false, // 是否在数据图形上展示省份名称
            },
            emphasis: {
                show: true,
                textStyle: {
                    color: '#333'//鼠标经过字体颜色
                }
            }
        },
    },
    series: [{
        name: '标点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [ // 这里填入你的散点数据  
            { name: "中国大熊猫保护研究中心", value: [103.631631, 30.975043], total: 193, male: 88, female: 105 },
            { name: "成都大熊猫繁育研究基地", value: [104.150916, 30.743319], total: 128, male: 57, female: 71 },
            { name: "陕西省珍稀野生动物抢救饲养研究中心", value: [108.310116, 34.091342], total: 21, male: 9, female: 12 },
            { name: "北京动物园", value: [116.343376, 39.947735], total: 12, male: 4, female: 8 },
            { name: "重庆动物园", value: [106.51248, 29.509414], total: 8, male: 2, female: 6 },
            { name: "兰州动物园", value: [103.779311, 36.259785], total: 2, male: 1, female: 1 },
            { name: "海峡大熊猫交流研究中心(福州)", value: [119.291288, 26.094863], total: 1, male: 0, female: 1 },
            { name: "上海动物园", value: [121.369284, 31.199023], total: 1, male: 1, female: 0 },
            { name: "香港海洋公园", value: [114.187322, 22.249656], total: 4, male: 2, female: 2 },
            { name: "澳门石排湾郊野公园", value: [113.569403, 22.128698], total: 2, male: 1, female: 1 },
            { name: "台北市立动物园", value: [121.591349, 25.001471], total: 3, male: 1, female: 2 },
        ],
        animation: false,//坐标点是否显示动画
        symbol: 'image://' + pandaImg,
        symbolSize: [40, 30],//标记的大小
        symbolOffset: [0, 0],//标记相对于原本位置的偏移
        itemStyle: {
            // 设置散点透明度为不透明（即 1）  
            opacity: 1,
        },
        label: {
            normal: {
                show: false,
            },
            emphasis: {
                show: true,
                position: 'left',
                formatter: function (p) {
                    return '{title|' + p.name + '}{abg|}\n' +
                        '{totalHead|数量/只}{maleHead|雄性/只}{femaleHead|雌性/只}\n' +
                        '{hr|}\n' +
                        '{total|' + p.data.total + '}{male|' + p.data.male + '}{female|' + p.data.female + '}';
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
                    total: {
                        color: '#650000',
                        height: 25,
                        width: 70,
                        padding: [0, 0, 0, 0],
                        align: 'center',
                    },
                    totalHead: {
                        color: '#333',
                        height: 25,
                        align: 'center',
                        width: 70,
                        padding: [0, 0, 0, 0],
                    },
                    hr: {
                        borderColor: '#7a7374',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    },
                    male: {
                        color: '#650000',
                        width: 70,
                        padding: [0, 0, 0, 0],
                        align: 'center'
                    },
                    maleHead: {
                        color: '#333',
                        width: 70,
                        padding: [0, 0, 0, 0],
                        align: 'center'
                    },
                    female: {
                        color: '#650000',
                        width: 70,
                        align: 'center',
                        padding: [0, 0, 0, 0]
                    },
                    femaleHead: {
                        color: '#333',
                        width: 70,
                        align: 'center',
                        padding: [0, 0, 0, 0]
                    }
                }
            },
        },
    }],
};

// 柱状图配置
const bmpBarChartOpt = {
    title: {
        text: '不同年龄大熊猫种群性别结构'
    },
    color: ['#f17666', '#009abd'],
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (p) {
            if (p.value >= 0) {
                return '年龄/岁: ' + p.name + '<br/>' + p.seriesName + ': ' + p.value;
            } else {
                return '年龄/岁: ' + p.name + '<br/>' + p.seriesName + ': ' + p.value * (-1);
            }

        }
    },
    legend: {
        data: ['雄性数量/只', '雌性数量/只'],
        x: 'center',
        y: 'bottom',
    },
    grid: {
        top: '12%',
        left: '2%',
        right: '4%',
        bottom: '8%',
        containLabel: true
    },
    xAxis: [{
        type: 'value',
        interval: 5, // 步长
        min: -25,
        max: 25,
        axisLabel: {
            formatter: function (v) {
                if (v >= 0) {
                    return v;
                } else {
                    return v * (-1);
                }
            }
        }
    }],
    yAxis: [{
        type: 'category',
        axisTick: {
            show: false,
        },
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    }],
    series: [
        {
            name: '雌性数量/只',
            type: 'bar',
            stack: 'total',
            data: [22, 11, 13, 11, 14, 13, 16, 18, 8, 2, 12, 7, 2, 10, 7, 4, 3, 2, 5, 3, 3, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1, 0, 1, 0, 1],
        },
        {
            name: '雄性数量/只',
            type: 'bar',
            stack: 'total',
            data: [-20, -8, -4, -17, -12, -15, -11, -11, -11, -11, -5, -1, -6, -10, -6, -2, -5, 0, -1, -1, -1, -4, -1, , 0, -1, 0, -3, -1, -1],
        },
    ]
}

// 数量变化图表配置
const bmpVariChartOpt = {
    title: {
        text: '历年圈养大熊猫种群数量变化',
        // left: 'center', // 标题水平居中  
        // top: 'top', // 标题距离容器顶部 5px  
        // textStyle: {  
        //     color: 'red', // 标题颜色  
        //     fontWeight: 'bold', // 标题字体粗细  
        //     fontSize: 20 // 标题字体大小  
        // },  
    },
    color: ['#e54035'],
    xAxis: {
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        name: beginYear + '',
        nameLocation: 'middle',
        nameGap: 22,
        nameTextStyle: {
            color: '#333',
            fontSize: 20,
            // fontFamily: 'Arial'
        },
        min: -2800,
        max: 2800
    },
    yAxis: {
        data: makeCategoryData(),
        show: false
    },
    grid: {
        top: '20%',
        left: '20%',
        right: '20%',
        bottom: '20%',
    },
    series: [
        {
            name: 'all',
            type: 'pictorialBar',
            symbol: 'image://' + bambooImg,
            symbolSize: [20, 40],
            symbolRepeat: true,
            data: makeSeriesData(beginYear),
            animationEasing: 'elasticOut'
        },
        {
            name: 'all',
            type: 'pictorialBar',
            symbol: 'image://' + bambooImg,
            symbolSize: [20, 40],
            symbolRepeat: true,
            data: makeSeriesData(beginYear, true),
            animationEasing: 'elasticOut'
        }
    ]
};

const beginYear = 2003;
const endYear = 2013;
const lineCount = 10;
let intervalId;

// 圈养大熊猫每年数量
const breedAmount = [164, 166, 192, 220, 244, 270, 293, 316, 331, 339, 375];

// 数量变化函数
function makeCategoryData() {
    var categoryData = [];
    for (var i = 0; i < lineCount; i++) {
        categoryData.push(i + 'a');
    }
    return categoryData;
}
function makeSeriesData(year, negative) {
    const r = (year - beginYear + 1) * 20;
    const seriesData = [];
    for (let i = 0; i < lineCount; i++) {
        let sign = negative ? -1 * (i % 3 ? 0.9 : 1) : 1 * ((i + 1) % 3 ? 0.9 : 1);
        seriesData.push({
            value:
                sign *
                (year <= beginYear + 1
                    ? Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5
                        ? 5
                        : 0
                    : (lineCount - Math.abs(i - lineCount / 2 + 0.5)) * r),
            symbolOffset: i % 2 ? ['50%', 0] : undefined
        });
    }
    return seriesData;
}

// 初始化ECharts图表  
function initCharts() {
    echarts.registerMap("china", chinaMapJson);
    breedMap = echarts.init(breedMapRef.value);
    bmpBarChart = echarts.init(bmpBarChartRef.value);
    bmpVariChart = echarts.init(bmpVariChartRef.value);

    nextTick(() => {
        // 在这里可以安全地执行依赖于更新后 DOM 的操作 
        var currentYear = beginYear;
        intervalId = setInterval(function () {
            currentYear++;
            if (currentYear > endYear) {
                currentYear = beginYear;
            }
            bmpVariChart.setOption({
                xAxis: {
                    name: currentYear + '年 ' + breedAmount[currentYear - 2003] + '只'
                },
                series: [
                    {
                        data: makeSeriesData(currentYear)
                    },
                    {
                        data: makeSeriesData(currentYear, true)
                    }
                ]
            });
        }, 800);
        bmpVariChart.setOption(bmpVariChartOpt);
        bmpBarChart.setOption(bmpBarChartOpt);
        breedMap.setOption(breedMapOpt);
    });

};

// 生命周期钩子
onMounted(() => {
    initCharts();
});
onUnmounted(() => {
    if (breedMap) {
        breedMap.dispose();
    }
    if (bmpBarChart) {
        bmpBarChart.dispose();
    }
    if (bmpVariChart) {
        bmpVariChart.dispose();
    }
});  
</script>

<style scoped>
#bmp-container {
    /* background-color: lightgoldenrodyellow; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

#bmp-content-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    /* border: 1px solid black; */
}

#breed-map-container {
    flex: 6;
}

#breed-map {
    height: 100%;
    width: 100%;
}

#bmp-right-container {
    flex: 4;
    display: flex;
    flex-direction: column;
}

#bmp-vari-chart-container {
    flex: 1;
}

#bmp-vari-chart {
    height: 100%;
    width: 100%;
}

#bmp-bar-chart-container {
    flex: 1;
}

#bmp-bar-chart {
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