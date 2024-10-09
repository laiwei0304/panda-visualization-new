<template>
    <div class="pie" id="pie"></div>
</template>

<script>
import { inject, onMounted, reactive, ref, setBlockTracking } from "vue";
export default {
    setup() {
        // let $http = inject("axios");
        let $echarts = inject("echarts");

        onMounted(() => {

            let myChart = $echarts.init(document.getElementById("pie"));

            let option = {

                title: {
                    text: '熊猫性别比',
                    left: 'left',
                    top: 0,
                    textStyle: {
                        color: '#000',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'left',
                    top: 'bottom',
                    // bottom: 10,
                    data: [
                        { value: 45, name: '雄性', itemStyle: { color: '#000' } },
                        { value: 40, name: '雌性', itemStyle: { color: '#fff' } },
                    ],
                    itemWidth: 24, // 设置宽度
                    itemHeight: 14, // 设置高度
                    itemGap: 5, // 设置间距
                    textStyle: {


                        color: '#000',
                        // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                        fontWeight: '400',
                        // 字体系列
                        fontFamily: 'Source Han Sans CN',
                        // 字体大小
                        fontSize: 12
                    }
                },
                visualMap: {
                    show: false,
                    min: 40,
                    max: 45,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 45, name: '雄性', itemStyle: { color: '#000' } },
                            { value: 40, name: '雌性', itemStyle: { color: '#fff' } },
                        ].sort(function (a, b) {
                            return a.value - b.value;
                        }),
                        color: ['#51CEC6', '#FFB703'],
                        roseType: 'radius',
                        label: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            // color: '#c23531',
                            // shadowBlur: 50,
                            // shadowColor: 'rgba(0, 0, 0, 0.5)',
                            borderColor: '#000', // 添加边框颜色
                            borderWidth: 1, // 添加边框宽度
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表
            myChart.setOption(option);

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

        });
    },
};
</script>

<style>
.pie {
    width: 50%;
    height: 40vh;
    float: left;
    padding: 0.2rem;
    /* background-color: #ffffff; */
}
</style>
