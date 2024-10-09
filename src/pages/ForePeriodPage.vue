<template>
    <div id="fpp-container">
        <div id="timeline" class="deco-container">
            <TimeLine />
        </div>
        <div class="firstLine">
            <div id="sunChart" class="deco-container">
                <SunChart />
            </div>
            <div id="fpp-bar-chart-container" class="deco-container">
                <div id="fpp-bar-chart" ref="fppBarChartRef"></div>
            </div>
        </div>

        <!-- <div id="fpp-text-container">
            <div id="fpp-text1">
                <div class="fpp-title" style="color: #b9dec9">赠送时期</div>
                <div class="fpp-title" style="color: #b9dec9">（1957年-1982年）</div>
                <p class="fpp-text-content">从1950年代起，至1982年止，熊猫外交模式一直是纯政治性的赠送模式，
                    既不和商业挂钩，又不采取租借的形式。1982年，为了响应保护濒危动物的全球性号召，
                    中华人民共和国政府宣布从1982年开始停止赠送大熊猫出国。
                    这标志着传统的政治性赠送模式下的“熊猫外交”宣告结束。</p>
            </div>
            <div id="fpp-text2">
                <div class="fpp-title" style="color:#45b787">巡展与商业性租借时期</div>
                <div class="fpp-title" style="color:#45b787">（1983年-1994年）</div>
                <p class="fpp-text-content">大熊猫采取短至数月、长至1年巡展的方式出国。
                    大熊猫巡展是一种既可以带有政治色彩，又可以带来商业效益的活动。
                </p>
            </div>
            <div id="fpp-text3">
                <div class="fpp-title" style="color:#248067">合作研究时期</div>
                <div class="fpp-title" style="color:#248067">（1995年至今）</div>
                <p class="fpp-text-content">为了解决大熊猫出国带来的种种问题，更好地保护大熊猫，
                    中国野生动物保护协会和中国动物园协会与国际动物保护机构达成协议，
                    中国可以将一对健康、有繁殖能力的大熊猫送至其他国家进行为期10年的合作研究，
                    其间繁殖的后代归中方所有。若大熊猫意外死亡，其遗体也归中方所有。
                    中方可派出技术人员与外方共同进行对大熊猫的研究工作，
                    外方每年付给中方100万美元，10年总共支付1000万美元。</p>
            </div>
        </div> -->
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import pandaImg from '@/assets/images/panda.png'
import TimeLine from '@/components/TimeLine.vue'
import SunChart from '@/components/ReasSunChart.vue'

const fppBarChartRef = ref(null);
let fppBarChart = null;

const cmpBarChartOpt = {
    title: {
        text: '历年出 (回) 国大熊猫数量',
        // left: "center",
        // top: 0,
        // textStyle: {
        //     show:true,
        //     fontWeight:'normal',
        //     color: "#000000",
        //     fontSize: '20',
        // },                 
    },
    legend: {
        data: ['赠送', '巡展与商业性租借', '合作研究'],
        show: false
    },
    xAxis: {
        data: makeYearData(),
        splitLine: {
            show: false,
        }
    },
    yAxis: {
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#cfcfcf'],
            }
        }
    },
    series: [
        {
            name: '赠送时期-出国',
            type: 'bar',
            barWidth: '40%',
            data: makeData1(),
            color: "#0080ae",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10;
            }
        },
        {
            name: '赠送时期-回国',
            type: 'bar',
            barWidth: '40%',
            data: [],
            color: "#0080ae",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10;
            }
        },
        {
            name: '巡展与商业性租借时期-出国',
            type: 'bar',
            barWidth: '40%',
            data: makeData2(),
            color: "#88be6e",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        },
        {
            name: '巡展与商业性租借时期-回国',
            type: 'bar',
            barWidth: '30%',
            data: makeBackData2(),
            color: "#88be6e",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        },
        {
            name: '合作研究时期-出国',
            type: 'bar',
            barWidth: '30%',
            data: makeData3(),
            color: "#ffd867",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 200;
            }
        },
        {
            name: '合作研究时期-回国',
            type: 'bar',
            barWidth: '30%',
            data: makeBackData3(),
            color: "#ffd867",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 200;
            }
        },
        {
            name: '2023年回国',
            type: 'scatter',
            data: [[67, -1]],
            symbolSize: 20,
            symbol: "image://" + pandaImg,
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 200;
            },
            tooltip: {
                formatter: "2023年，由于新冠疫情，回国熊猫数量达到18只~"
            },
        }
    ],
    tooltip: {
        trigger: 'item',
    },
    grid: {
        //调整在容器中位置
        left: '1%',
        right: '1%',
        top: '30%',
        bottom: '1%',
        //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
        containLabel: true
    },
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};

// 制作数据函数
function makeYearData() {
    var yearData = [];
    for (var i = 1957; i <= 2024; i++) {
        yearData.push(i);
    }
    return yearData;
};
function makeData1() {
    var data1 = [];
    for (var i = 1957; i <= 2024; i++) {
        if (i === 1957 || i === 1958 || i === 1980 || i === 1982) {
            data1.push(1);
        } else if (i === 1959) {
            data1.push(6);
        } else if (i === 1972) {
            data1.push(4);
        } else if (i === 1973 || i === 1974 || i === 1975 || i === 1978) {
            data1.push(2);
        } else {
            data1.push(0);
        }
    }
    return data1;
};
function makeData2() {
    var data2 = [];
    for (var i = 1957; i <= 2024; i++) {
        if (i === 1984 || i === 1994) {
            data2.push(2);
        } else if (i === 1992) {
            data2.push(1);
        } else {
            data2.push(0);
        }
    }
    return data2;
};
function makeData3() {
    var data3 = [];
    for (var i = 1957; i <= 2024; i++) {
        if (i === 1995 || i === 2002 || i === 2005 || i === 2006) {
            data3.push(1);
        } else if (i === 1996 || i === 2001 || i === 2007 || i === 2009 || i === 2011 || i === 2023) {
            data3.push(2);
        } else if (i === 1999 || i === 2010 || i === 2013 || i === 2013 || i === 2018 || i === 2022 || i === 2020) {
            data3.push(3);
        } else if (i === 2000 || i === 2014) {
            data3.push(6);
        } else if (i === 2003) {
            data3.push(7);
        } else if (i === 2012) {
            data3.push(5);
        } else if (i === 2015) {
            data3.push(4);
        } else if (i === 2017 || i === 2021) {
            data3.push(8);
        } else if (i === 2019) {
            data3.push(9);
        } else {
            data3.push(0);
        }
    }
    return data3;
};
function makeBackData2() {
    var backData2 = [];
    for (var i = 1957; i <= 2024; i++) {
        if (i === 1984) {
            backData2.push(-2);
        } else {
            backData2.push(0);
        }
    }
    return backData2;
};
function makeBackData3() {
    var backData3 = [];
    for (var i = 1957; i <= 2024; i++) {
        if (i === 2001 || i === 2010 || i === 2013 || i === 2017) {
            backData3.push(-2);
        } else if (i === 2003 || i === 2004 || i === 2014 || i === 2018) {
            backData3.push(-1);
        } else if (i === 2019) {
            backData3.push(-3);
        } else if (i === 2020) {
            backData3.push(-4);
        } else {
            backData3.push(0);
        }
    }
    return backData3;
}

// 初始化图表
function initCharts() {
    fppBarChart = echarts.init(fppBarChartRef.value);

    nextTick(() => {
        // 在这里可以安全地执行依赖于更新后 DOM 的操作 
        fppBarChart.setOption(cmpBarChartOpt);
    });
};

// 生命周期钩子
onMounted(() => {
    initCharts();
});
onUnmounted(() => {
    if (fppBarChart) {
        fppBarChart.dispose();
    }
});  
</script>

<style scoped>
#fpp-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

/* #fpp-text-container{
        margin-top: 30px;
        background-color: white;
        height: 200px;
        flex:1;
        display: flex;
    }
    #fpp-text1{
        flex:2.6;
        display: flex;
        flex-direction: column;
        height: 200px;
    }
    .fpp-title{
        flex:1;
        text-align: center;
        margin-top: 1px;
        font-size: 14px;
        font-weight: bold;
    }
    .fpp-text-content{
        flex:9;
        margin: 20px;
        text-indent: 3ch;
        line-height: 2em;
        font-size: 13px;
    }
    #fpp-text2{
        flex:1;
        margin-left: 9px;
        border-right: 1px solid rgb(207, 207, 207);
        border-left: 1px solid rgb(207, 207, 207);
        height: 200px;
    }
    #fpp-text3{
        flex:2.8;
        margin-left: 9px;
        height: 200px;
    } */
#fpp-bar-chart-container {
    flex: 5;
}

#sunChart {
    flex: 2;
}

#timeline {
    flex: 3;
}

#fpp-bar-chart {
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

.firstLine {
    flex: 3;
    display: flex;
    flex-direction: row;
}
</style>