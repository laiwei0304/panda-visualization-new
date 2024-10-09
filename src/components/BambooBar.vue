<template>
    <div class="bar" ref="barRef" style="width: 3000px;height:3000px"></div>
</template>

<script setup>
import { inject, onMounted, reactive, ref, setBlockTracking, watchEffect } from "vue";
import * as echarts from 'echarts';
import img from '../assets/images/leaf.svg';

let option = {

    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'shadow'
    //     }
    // },

    //横轴伸缩功能
    // dataZoom: [
    //     {
    //         type: 'inside',
    //         start: 0,
    //         end: 10
    //     },
    //     {
    //         start: 0,
    //         end: 10
    //     }
    // ],
    grid: {
        //调整在容器中位置
        left: '1%',
        right: '1%',
        top: '8%',
        bottom: '1%',

        //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
        containLabel: true
    },

    xAxis: [

        //    { position: "bottom",
        //     data: pandas,
        //     axisTick: {
        //         length: 10 // 刻度线的长度
        //     },
        //     axisLabel: {
        //         margin: 10 // 标签到轴线的距离
        //     }
        // }, 
        {
            position: "bottom",
            data: zoos,
            axisTick: {
                length: 10,
                interval: function (index, value) {
                    return groupSeparates[index]; // 根据标识分组的刻度线
                }
            },
            axisLabel: {
                margin: 10 // 标签到轴线的距离
            },
            //该坐标分区背景的颜色
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: ['rgba(204,232,207,0.8)'
            //             , 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)'
            //             , 'rgba(204,232,207,0.8)', 'rgba(204,232,207,0.8)'
            //             , 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)'
            //             , 'rgba(204,232,207,0.8)', 'rgba(204,232,207,0.8)', 'rgba(204,232,207,0.8)'
            //             , 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)'
            //         ]
            //     }
            // },

            //设置坐标不重叠
            axisLabel: {
                margin: 15,
                interval: 0, // 显示所有标签
                rich: {
                    offset: {
                        width: 0,
                    }
                }
            }
        }],
    yAxis: {
        type: 'value',
        name: '年龄',

        interval: 5,
        //去掉网格线
        splitLine: {
            show: false
        },
    },
    series: [
        {
            name: '熊猫出国年龄',
            type: 'scatter',
            //目前都在竹子上部
            data: outAges,
            symbol: img,// 标记的图形
            symbolSize: [50, 100],
            // itemStyle: {
            //     color: '#24DEF3'
            // },
            z: 3,
            // barGap: '50%',
            // hoverAnimation: true // 是否开启 hover 在拐点标志上的提示动画效果
            tooltip: {
                trigger: 'axis',
                show: false,
            },
        },
        {
            type: 'bar',
            barGap: '-100%',
            symbol: 'rect',
            symbolPosition: "start",
            symbolOffset: [0, 0],
            data: ages,
            // barWidth: '50%',
            z: 1,
            barWidth: '25%',
            tooltip: {
                trigger: 'axis',
                show: false,
            },
            silent: true, //禁用地图的hover事件
            itemStyle: {
                color: function (params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#248067', '#248067', '#69a794', '#69a794', '#69a794', '#69a794',
                        '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840',
                        '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840',
                        '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840'];
                    return colorList[params.dataIndex]
                }
            }
        },
        {
            type: "pictorialBar",
            // itemStyle: {
            //     normal: {
            //         color: '#2ea043',
            //     }
            // },
            symbol: img,
            symbolSize: ['50%', '100%'],
            // symbolClip: true,
            // symbolPosition: "start",
            // symbolBoundingData: 30000,
            data: babyAges,
            z: 1,
            animationDuration: 3000,
            // animationEasing: "elasticOut"
        },
        {
            type: "pictorialBar",
            itemStyle: {

                color: "#ffffff"

            },
            symbolRepeat: "fixed",
            symbolMargin: 16.9, // 小格子的高
            symbol: "rect",
            symbolClip: true,
            symbolSize: [25, 3],
            symbolPosition: "start",
            symbolOffset: [0, -35.2],
            symbolBoundingData: 30000,
            data: ages,
            z: 2,
            animationDuration: 3000,
            tooltip: {
                trigger: 'axis',
                show: false,
            },
            // animationEasing: "elasticOut"
        },

    ],

};

let icon = 'image://' + '../assets/images/leaf.svg';
var pandas = ["伦伦", "欣欣", "大毛", "顺顺", "加盼盼", "加悦悦", "乐乐", "丫丫", "洋洋", "伦伦", "雅伦", "喜伦", "添添", "美香", "小奇迹"];

//动物园 每3只熊猫在一个动物园的话应写为 “动物园1”,“”,“”
var zoos = ["Chapultepec", "", "", "Calgary", "", "", "Memphis", "", "", "Atlanta", "", "", "", "Simithsonian's National", ""]; // 分组显示的标签（组内如果是偶数加上偏移{offset|}，如果是计数放正中间）
//动物园类分割线
var groupSeparates = [true, false, true, false, false, false, true, false, false, false, true, false, false, true];

var ages = [36, 33, 15, 16, 0, 0, 25, 23, 26, 26, 0, 0, 26, 25, 0];
var babyAges = [0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 7, 7, 0, 0, 3];

var outAges = [0, 0, 4, 5, 0, 0, 4, 2, 2, 2, 0, 0, 3, 2, 0];
var returnAges = [];


const barRef = ref(null);
let myChart = null;

// 使用刚指定的配置项和数据显示图表



// option && myChart.setOption(Newoption);
// myChart.lastBandWidth = 0;

// // 监听渲染事件，只要bandWidth发生变化，重新设置标签偏移的值
// myChart.on('rendered', function () {
//     var bandWidth = myChart._chartsViews[0].renderTask.context.outputData._layout.bandWidth;

//     // 假设 yAxisIndex 为 0，表示第一个 y 轴
//     var yAxisIndex = 0;
//     // 获取 y 轴实例
//     var yAxis = myChart.getModel().getComponent('yAxis', yAxisIndex);
//     // 获取 y 轴长度
//     var yAxisLength = myChart.getCoordinateSystem().getAxis(yAxisIndex).getAxisLength();
//     // 获取 y 轴刻度数
//     var yAxisTickCount = yAxis.getTicks().length;
//     // 计算每个刻度值之间的长度
//     var intervalLength = yAxisLength / (yAxisTickCount - 1);
//     if (myChart.lastBandWidth != bandWidth) {
//         myChart.lastBandWidth = bandWidth;
//         // 延时执行否则echarts渲染异常
//         setTimeout(() => {
//             // 加上偏移后重新绘制
//             var optionNew = { xAxis: [{}, {}], series: [{}, {}, {}] };
//             // 增量更新偏移值
//             optionNew.xAxis[1] = { axisLabel: { rich: { offset: { width: myChart.lastBandWidth } } } };
//             optionNew.series[2] = {
//                 symbolMargin: intervalLength, symbolOffset: [0, intervalLength]
//             };
//             //console.info(optionNew);
//             myChart.setOption(optionNew);
//         }, 0);
//     }

// });
onMounted(() => {
    myChart = echarts.init(barRef.value);
    myChart.setOption(option);
})

</script>

<style scoped>
.bar {
    width: 100%;
    height: 100%;
    /* background-color: #ffffff; */
}
</style>