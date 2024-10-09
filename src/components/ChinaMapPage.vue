<template>
    <div id="cmp-container">
        <div id="cmp-content-container">
            <div id="cmp-top-container">
                <div id="cmp-select-container">
                    <span>选择数据 </span>
                    <select v-model="selectedOption">
                        <option value="wild">国内野生大熊猫</option>
                        <option value="breed">国内圈养大熊猫</option>
                    </select>
                </div>
            </div>
            <div id="cmp-bottom-container">
                <div id="china-map-container" class="deco-container">
                    <div id="china-map" ref="chinaMapRef"></div>
                </div>
                <div id="cmp-right-container">
                    <div id="cmp-vari-chart-container" class="deco-container">
                        <div id="cmp-vari-chart" ref="cmpVariChartRef"></div>
                    </div>
                    <div id="cmp-bar-chart-container" class="deco-container">
                        <div id="cmp-bar-chart" ref="cmpBarChartRef"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, watch, nextTick} from 'vue';  
    import * as echarts from 'echarts';
    import chinaMapJson from '@/assets/json/china.json';
    import pandaImg from '@/assets/images/panda.png';
    import bambooImg from '@/assets/images/bamboo.svg';

    const chinaMapRef = ref(null);  
    let chinaMap = null; 
    
    const cmpBarChartRef = ref(null);
    let cmpBarChart = null;

    const cmpVariChartRef = ref(null);
    let cmpVariChart = null;

    // 自定义label样式
    const dataLabelTemp = {
        normal:{
            show:false,
        },
        emphasis:{
            show:true,
            position:'left',
            offset:[0,90],
            formatter:function(p){
                return '{title|'+p.name+'}{abg|}\n'+
                '{valueHead|种群数量/只}'+
                // '{rateHead|比例/%}'+
                '{densityHead|种群密度/(只/平方米)}\n'+
                '{hr|}\n'+
                '{value|'+p.value+'}'+
                // '{rate|'+p.data.rate+'}'+
                '{density|'+p.data.density+'}';
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
        normal:{
            show: false,  
        },                   
        emphasis:{
            show: true,
            formatter: '{b}',
            textStyle: {
                color: '#333'//鼠标经过字体颜色
            }
        }
    };

    // 中国地图配置  
    const chinaMapOptConf = {
        // 野生大熊猫种群数量-区域颜色图系列配置  
        wildOpt: {
            title: {
                text: '野生大熊猫种群数量分布'
            },
            // 提示框组件
            tooltip: {
                show:false,
                // trigger: "item", // 触发类型-数据项图形hover触发
                // position:"top",
                // formatter: "{b}: {c}只", // hover提示框展示的内容
            },
            // 视觉映射组件
            visualMap: {
                show:true,
                itemWidth:20,
                itemHeight:200,
                orient: "vertical", // 显示方式
                left: "left", // 距离容器左侧的位置
                top:"middle",
                min: 0, // 数据最小值
                max: 1500, // 指定数据最大值
                inRange: {
                    color: ["#ffffff", "#1ba784"], // 范围颜色-从小到大渐变颜色区间
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
                        borderColor: '#a9a9a9', //边界线颜色
                        areaColor: '#ffffff', //默认区域颜色
                        padding: 1
                    },
                    emphasis: {
                        areaColor: '#f2ce2b', //鼠标滑过区域颜色
                    }
                },
                select: {
                    disabled: true, // 数据项图形是否能被选中
                },  
                data: [ // 这里填入你的区域颜色数据  
                    {name: "四川省", value: 1387, rate:74.4, density: 0.0684, label: dataLabelTemp},
                    {name: "陕西省", value: 345, rate:18.5, density: 0.0957, label: dataLabelTemp},
                    {name: "甘肃省", value: 132, rate:7.1, density: 0.0699, label: dataLabelTemp},
                    {name: "北京市", value: 0 ,label: noDataLabelTemp},
                    {name: "天津市", value: 0 ,label: noDataLabelTemp},
                    {name: "河北省", value: 0 ,label: noDataLabelTemp},
                    {name: "山西省", value: 0 ,label: noDataLabelTemp},
                    {name: "内蒙古自治区", value: 0 ,label: noDataLabelTemp},
                    {name: "辽宁省", value: 0 ,label: noDataLabelTemp},
                    {name: "吉林省", value: 0 ,label: noDataLabelTemp},
                    {name: "黑龙江省", value: 0 ,label: noDataLabelTemp},
                    {name: "上海市", value: 0 ,label: noDataLabelTemp},
                    {name: "江苏省", value: 0 ,label: noDataLabelTemp},
                    {name: "浙江省", value: 0 ,label: noDataLabelTemp},
                    {name: "安徽省", value: 0 ,label: noDataLabelTemp},
                    {name: "福建省", value: 0 ,label: noDataLabelTemp},
                    {name: "江西省", value: 0 ,label: noDataLabelTemp},
                    {name: "山东省", value: 0 ,label: noDataLabelTemp},
                    {name: "河南省", value: 0 ,label: noDataLabelTemp},
                    {name: "湖北省", value: 0 ,label: noDataLabelTemp},
                    {name: "湖南省", value: 0 ,label: noDataLabelTemp},
                    {name: "广东省", value: 0 ,label: noDataLabelTemp},
                    {name: "广西壮族自治区", value: 0 ,label: noDataLabelTemp},
                    {name: "海南省", value: 0 ,label: noDataLabelTemp},
                    {name: "重庆市", value: 0 ,label: noDataLabelTemp},
                    {name: "贵州省", value: 0 ,label: noDataLabelTemp},
                    {name: "云南省", value: 0 ,label: noDataLabelTemp},
                    {name: "西藏自治区", value: 0 ,label: noDataLabelTemp},
                    {name: "青海省", value: 0 ,label: noDataLabelTemp},
                    {name: "宁夏回族自治区", value: 0 ,label: noDataLabelTemp},
                    {name: "新疆维吾尔自治区", value: 0 ,label: noDataLabelTemp},
                    {name: "香港特别行政区", value: 0 ,label: noDataLabelTemp},
                    {name: "澳门特别行政区", value: 0 ,label: noDataLabelTemp},
                    {name: "台湾省", value: 0 ,label: noDataLabelTemp},
                    {name: "南海诸岛", value: 0 ,label: noDataLabelTemp},
                ],  
            }],
        },
        // 圈养大熊猫种群数量-散点图系列配置
        breedOpt: {
            title: {
                text: '圈养大熊猫种群数量分布'
            },
            // 提示框组件
            tooltip: {
                show:false,
                // trigger: "item", // 触发类型-数据项图形hover触发
                // position: 'top',
                // formatter:"{b}: {c}", // hover提示框展示的内容
            },
            geo:{
                map:"china",
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
                        borderWidth: 1, //边界线大小
                        borderColor: '#a9a9a9', //边界线颜色
                        areaColor: '#ffffff', //默认区域颜色
                        padding: 1
                        // areaColor: '#f2ce2b', //鼠标滑过区域颜色
                    }
                },
                label: {
                    normal: {
                        show: false, // 是否在数据图形上展示省份名称
                    },
                    emphasis:{
                        show: true,
                        textStyle: {
                            color: '#333'//鼠标经过字体颜色
                        }
                    }
                },
            },
            series:[{
                name: '标点',  
                type: 'scatter',  
                coordinateSystem: 'geo',  
                data: [ // 这里填入你的散点数据  
                    {name:"中国大熊猫保护研究中心", value:[103.631631,30.975043],total:193, male:88, female:105},
                    {name:"成都大熊猫繁育研究基地", value:[104.150916,30.743319],total:128, male:57, female:71},
                    {name:"陕西省珍稀野生动物抢救饲养研究中心", value:[108.310116,34.091342],total:21, male:9, female:12},
                    {name:"北京动物园", value:[116.343376,39.947735],total:12, male:4, female:8},
                    {name:"重庆动物园", value:[106.51248,29.509414],total:8, male:2, female:6},
                    {name:"兰州动物园", value:[103.779311,36.259785],total:2, male:1, female:1},
                    {name:"海峡大熊猫交流研究中心(福州)", value:[119.291288,26.094863],total:1, male:0, female:1},
                    {name:"上海动物园", value:[121.369284,31.199023],total:1, male:1, female:0},
                    {name:"香港海洋公园", value:[114.187322,22.249656],total:4, male:2, female:2},
                    {name:"澳门石排湾郊野公园", value:[113.569403,22.128698],total:2, male:1, female:1},
                    {name:"台北市立动物园", value:[121.591349,25.001471],total:3, male:1, female:2},
                ],  
                animation: false,//坐标点是否显示动画
                symbol: 'image://' + pandaImg,
                symbolSize: [25, 25],//标记的大小
                symbolOffset: [0, 0],//标记相对于原本位置的偏移
                itemStyle: {  
                    // 设置散点透明度为不透明（即 1）  
                    opacity: 1,   
                },    
                label: {
                    normal:{
                        show:false,
                    },
                    emphasis:{
                        show:true,
                        position:'left',
                        formatter:function(p){
                            return '{title|'+p.name+'}{abg|}\n'+
                            '{totalHead|数量/只}{maleHead|雄性/只}{femaleHead|雌性/只}\n'+
                            '{hr|}\n'+
                            '{total|'+p.data.total+'}{male|'+p.data.male+'}{female|'+p.data.female+'}';
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
                            total:{
                                color: '#650000',
                                height:25,
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
        }
    };

    // 柱状图配置
    const  barChartOptConf={
        wildOpt:{
            title: {
                text: '各山系野生大熊猫种群数量和种群密度'
            },
            color: ['#f17666','#63bbd0'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
                }
            },
            grid: {
                top:'25%',
                right: '10%',
                bottom:'20%',
            },
            legend: {
                data: [ '种群数量','种群密度',],
                x:'center',
                y:'bottom',
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
        },
        breedOpt:{
            title: {
                text: '不同年龄大熊猫种群性别结构'
            },
            color:['#f17666','#63bbd0'],
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                },
                formatter:function(p){
                    if(p.value>=0){
                        return '年龄/岁: '+p.name+'<br/>'+p.seriesName+': '+p.value;
                    }else{
                        return '年龄/岁: '+p.name+'<br/>'+p.seriesName+': '+p.value*(-1);
                    }
                    
                }
            },
            legend: {
                data: ['雄性数量/只', '雌性数量/只'],
                x:'center',
                y:'bottom',
            },
            grid: {
                top:'12%',
                left: '2%',
                right: '4%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                interval:5, // 步长
                min:-25,
                max:25,
                axisLabel:{
                    formatter:function(v){
                        if(v>=0){
                            return v;
                        }else{
                            return v*(-1);
                        }
                    }
                }
            }],
            yAxis: [{
                type: 'category',
                axisTick: {
                    show:false,
                },
                data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
            }],
            series: [
            {
                name:'雌性数量/只',
                type:'bar',
                stack: 'total',
                data:[22,11,13,11,14,13,16,18,8,2,12,7,2,10,7,4,3,2,5,3,3,2,2,2,1,2,2,2,1,1,2,1,0,1,0,1],
            },
            {
                name:'雄性数量/只',
                type:'bar',
                stack: 'total',
                data:[-20,-8,-4,-17,-12,-15,-11,-11,-11,-11,-5,-1,-6,-10,-6,-2,-5,0,-1,-1,-1,-4,-1,,0,-1,0,-3,-1,-1],
            },
        ]
        }
    };

    // 数量变化图表配置
    const variChartOptConf = {
        wildOpt:{
            title: {
                text: '历次调查野生大熊猫种群数量变化'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['四川省', '陕西省', '甘肃省', '合计'],
                x:'center',
                y:'bottom',
            },
            grid: {
                top:'15%',
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
        },
        breedOpt:{
            title:{
                text:'历年圈养大熊猫种群数量变化',
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
                left:'20%',
                right:'20%',
                bottom:'20%',
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
        },
    };

    const beginYear = 2003;
    const endYear = 2023;
    const lineCount = 10;
    let intervalId;

    // 数量变化函数
    function makeCategoryData() {
        var categoryData = [];
        for (var i = 0; i < lineCount; i++) {
            categoryData.push(i + 'a');
        }
        return categoryData;
    }
    function makeSeriesData(year, negative) {
        const r = (year - beginYear + 1) * 10;
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

    // 当前选中的选项 
    const selectedOption = ref('breed');
    
    // 更新页面
    function updatePage(value) {
        if(value==='wild'){
            chinaMap.clear();
            chinaMap.setOption(chinaMapOptConf['wildOpt']);

            cmpBarChart.clear();
            cmpBarChart.setOption(barChartOptConf['wildOpt']);
            
            cmpVariChart.clear();
            if (intervalId) {  
                clearInterval(intervalId);  
                console.log('定时器已停止');  
                intervalId = null; // 清除ID以避免重复清除  
            }  
            cmpVariChart.setOption(variChartOptConf['wildOpt']);
        }else if(value==='breed'){
            chinaMap.clear();
            chinaMap.setOption(chinaMapOptConf['breedOpt']);
            cmpBarChart.clear();
            cmpBarChart.setOption(barChartOptConf['breedOpt']);

            cmpVariChart.clear();
            var currentYear = beginYear;
            intervalId = setInterval(function () {
                currentYear++;
                if (currentYear > endYear) {
                    currentYear = beginYear;
                }
                cmpVariChart.setOption({
                    xAxis: {
                        name: currentYear
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
            cmpVariChart.setOption(variChartOptConf['breedOpt']);
        }
    }

    watch(selectedOption,(newVal)=>{
        updatePage(newVal);
    });

    // 初始化ECharts图表  
    function initCharts() {
        echarts.registerMap("china",chinaMapJson);
        chinaMap = echarts.init(chinaMapRef.value);  
        cmpBarChart = echarts.init(cmpBarChartRef.value);
        cmpVariChart = echarts.init(cmpVariChartRef.value);

        nextTick(() => {    
            // 在这里可以安全地执行依赖于更新后 DOM 的操作 
            updatePage(selectedOption.value);
        });  
         
    };  

    // 生命周期钩子
    onMounted(() => {  
        initCharts();
    });  
    onUnmounted(() => {  
      if (chinaMap) {  
        chinaMap.dispose();  
      }
      if(cmpBarChart){
        cmpBarChart.dispose();
      }
      if(cmpVariChart){
        cmpVariChart.dispose();
      }
    });  
</script>

<style scoped>
    #cmp-container{
        /* background-color: lightgoldenrodyellow; */
        display: flex;
        align-items: center;
        justify-content:center;
        height:100%;
        width:100%;
    }
    #cmp-content-container{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: fit-content;
        /* border: 1px solid black; */
    }
    #cmp-top-container{
        margin-top: 20px;
        /* background-color: lightblue; */
    }
    #cmp-select-container{
        height:fit-content;
        width:fit-content;
        margin-left: 20px;
    }
    #cmp-select-container span{
        font-size: 15px;
    }
    #cmp-select-container select{
        font-size: 15px;
        border: 1px solid #999999;
    }
    #cmp-bottom-container{
        display: flex;
        flex-direction: row;
    }
    #china-map-container{
        height:560px;
        width:560px;
    }
    #china-map{
        height:100%;
        width:100%;
    }
    #cmp-right-container{
        width:400px;
        display: flex;
        flex-direction: column;
    }
    #cmp-vari-chart-container{
        flex:1;
    }
    #cmp-vari-chart{
        height:100%;
        width:100%;
    }
    #cmp-bar-chart-container{
        flex:1;
    }
    #cmp-bar-chart{
        height:100%;
        width:100%;
        /* background-color: lightpink; */
    }
    .deco-container{
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        border: 1px solid #fff;
        margin: 10px;
    }
</style>