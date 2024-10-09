<template>
    <div ref="chartRef" class="map"></div>
</template>

<script setup>
import { onMounted, reactive, inject, ref } from "vue";
import foreignMapJson from '@/assets/json/world.json';
import pandaImg from '@/assets/images/pandaSet3.png';

const chartRef = ref(null);
let foreignMap = null;

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

const asia = [
    {
        name: "亚特兰大动物园",
        value: [-84.42, 33.77],
        number: '4',
    },
    {
        name: "马德里动物园",
        value: [-3.75, 40.41],
        number: '5',
    },
    {
        name: "博瓦勒动物园",
        value: [5.07, 45.70],
        number: '4',
    },
    {
        name: "天堂动物园",
        value: [3.85, 50.58],
        number: '5',
    },
    {
        name: "欧维汉动物园",
        value: [4.99, 52.18],
        number: '2',
    },
    {
        name: "柏林动物园",
        value: [13.41, 52.51],
        number: '4',
    },
    {
        name: "哥本哈根动物园",
        value: [12.57, 55.68],
        number: '2',
    },
    {
        name: "莫斯科动物园",
        value: [37.61, 55.75],
        number: '2',
    },
    {
        name: "艾赫泰里动物园",
        value: [24.06, 62.55],
        number: '2',
    },
    {
        name: "三星爱宝乐园",
        value: [127.17, 37.18],
        number: '5',
    },
    {
        name: "上野动物园",
        value: [139.46, 35.42],
        number: '2',
    },
    {
        name: "冒险世界",
        value: [135.43, 34.00],
        number: '2',
    },
    {
        name: "马来西亚国家动物园",
        value: [101.75, 3.21],
        number: '2',
    },
    {
        name: "河川动物园",
        value: [103.81, 1.35],
        number: '2',
    },
    {
        name: "印尼野生动物园",
        value: [107.60, -6.90],
        number: '2',
    },
    {
        name: "阿德莱德动物园",
        value: [138.49, -35.21],
        number: '2',
    },
    {
        name: "豪尔熊猫馆",
        value: [51.52, 25.28],
        number: '2',
    },
];

// 中国地图配置  
const foreignOpt = {
    layoutCenter: ['50%', '50%'],//位置
    // layoutSize: '170%',

    title: {
        text: '海外外交熊猫分布'
    },
    visualMap: {
        // nameMap: nameMap,
        show: true,
        left: 'left',
        top: 'middle',
        seriesIndex: [0],
        type: 'piecewise',
        pieces: [
            { min: 8, max: 10, color: 'rgb(254,57,101)' },
            { min: 7, max: 8, color: 'rgb(252,157,154)' },
            { min: 4, max: 6, color: 'rgb(249,205,173)' },
            { min: 2, max: 4, color: 'rgb(200,200,169)' },
            { min: 0, max: 2, color: 'rgb(131,175,155)' }
        ],
        textStyle: {
            color: '#000',
        },
        // text: ['熊猫只数'],
    },
    // 提示框组件
    tooltip: {
        trigger: "item"
        // show: false,
        // trigger: "item", // 触发类型-数据项图形hover触发
        // position: 'top',
        // formatter:"{b}: {c}", // hover提示框展示的内容
    },

    geo: {
        map: "foreign",
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
            emphasis: {
                show: true,
                textStyle: {
                    color: '#333'//鼠标经过字体颜色
                }
            }
        },
        regions: [
            { name: 'United States', value: 4, },
            { name: 'Russia', value: 3, },
            { name: 'Japan', value: 10, },
            { name: 'Singapore', value: 3, },
            { name: 'Malaysia', value: 2 },
            { name: 'Indonesia', value: 2, },
            { name: 'Korea', value: 5, },
            { name: 'Australia', value: 5, },
            { name: 'Spain', value: 5 },
            { name: 'France', value: 4 },
            { name: 'Belgium', value: 5 },
            { name: 'United Kingdom', value: 2 },
            { name: 'Netherlands', value: 3 },
            { name: 'Denmark', value: 2 },
            { name: 'Germany', value: 4 },
            { name: 'Austria', value: 2 },
            { name: 'Finland', value: 2 },
            { name: 'Carta', value: 2 }
        ],
    },
    series: [
        {
            z: 1,
            name: "有熊猫国家",
            type: "map",
            mapType: "world",
            coordinateSystem: 'geo',
            // nameMap: nameMap,
            geoIndex: 0,
            roam: true,
            silent: true, //禁用地图的hover事件
            data: [
                { name: 'United States', value: 4, },
                { name: 'Russia', value: 3, },
                { name: 'Japan', value: 10, },
                { name: 'Singapore', value: 3, },
                { name: 'Malaysia', value: 2 },
                { name: 'Indonesia', value: 2, },
                { name: 'Korea', value: 5, },
                { name: 'Australia', value: 5, },
                { name: 'Spain', value: 5 },
                { name: 'France', value: 4 },
                { name: 'Belgium', value: 5 },
                { name: 'United Kingdom', value: 2 },
                { name: 'Netherlands', value: 3 },
                { name: 'Denmark', value: 2 },
                { name: 'Germany', value: 4 },
                { name: 'Austria', value: 2 },
                { name: 'Finland', value: 2 },
                { name: 'Carta', value: 2 }
            ],
        },
        {
            name: "Icon",
            type: 'scatter',
            coordinateSystem: 'geo',
            animation: false,//坐标点是否显示动画
            symbol: 'image://' + './public/icon/panda.png',
            symbolSize: [25, 25],//标记的大小
            symbolOffset: [0, 0],//标记相对于原本位置的偏移
            label: {
                formatter: '{b}',
                position: 'right',
                // show: true,//是否显示地名
                color: '#000',
            },
            z: 9,
            data: asia.map(item => {
                return {
                    name: item.name,
                    value: item.value, // 这里应该是坐标值
                    number: item.number, // 这里是额外的信息
                };
            }),
            tooltip: {//仅在 options中最外层的 tooltip.trigger 为 'item'时有效
                show: true,
                position: 'bottom',//提示框位置
                backgroundColor: "rgba(26, 104, 64,0.8)", //设置背景图片 rgba格式
                borderColor: '#9a9c9d',
                textStyle: {
                    color: '#fff'
                },
                formatter: function (params, ticket, callback) {
                    var _dt = params.data;
                    if (params.data) {
                        var strHtml = '<div>';
                        strHtml += '<table class="table">';
                        // strHtml += '<tr><td colspan="2" style="text-align:center">国家简介</td></tr>';
                        strHtml += '<tr><td>动物园名称：</td><td>' + _dt.name + '</td></tr>';
                        strHtml += '<tr><td>熊猫数量：</td><td>' + _dt.number + '</td></tr>';
                        // strHtml += '<tr><td>首都：</td><td>' + _dt.capital + '</td></tr>';
                        // strHtml += '<tr><td>国土面积：</td><td>' + _dt.area + '</td></tr>';
                        strHtml += '</table>';
                        strHtml += '</div>'
                        return strHtml;
                    }
                }
            }
        }
    ],
    // series: [{
    //     name: '标点',
    //     type: 'scatter',
    //     coordinateSystem: 'geo',
    //     data: [ // 这里填入你的散点数据  
    //         {
    //             name: "亚特兰大动物园",
    //             value: [-84.42, 33.77],
    //             number: '4',
    //         },
    //         {
    //             name: "马德里动物园",
    //             value: [-3.75, 40.41],
    //             number: '5',
    //         },
    //         {
    //             name: "博瓦勒动物园",
    //             value: [5.07, 45.70],
    //             number: '4',
    //         },
    //         {
    //             name: "天堂动物园",
    //             value: [3.85, 50.58],
    //             number: '5',
    //         },
    //         {
    //             name: "欧维汉动物园",
    //             value: [4.99, 52.18],
    //             number: '2',
    //         },
    //         {
    //             name: "柏林动物园",
    //             value: [13.41, 52.51],
    //             number: '4',
    //         },
    //         {
    //             name: "哥本哈根动物园",
    //             value: [12.57, 55.68],
    //             number: '2',
    //         },
    //         {
    //             name: "莫斯科动物园",
    //             value: [37.61, 55.75],
    //             number: '2',
    //         },
    //         {
    //             name: "艾赫泰里动物园",
    //             value: [24.06, 62.55],
    //             number: '2',
    //         },
    //         {
    //             name: "三星爱宝乐园",
    //             value: [127.17, 37.18],
    //             number: '5',
    //         },
    //         {
    //             name: "上野动物园",
    //             value: [139.46, 35.42],
    //             number: '2',
    //         },
    //         {
    //             name: "冒险世界",
    //             value: [135.43, 34.00],
    //             number: '2',
    //         },
    //         {
    //             name: "马来西亚国家动物园",
    //             value: [101.75, 3.21],
    //             number: '2',
    //         },
    //         {
    //             name: "河川动物园",
    //             value: [103.81, 1.35],
    //             number: '2',
    //         },
    //         {
    //             name: "印尼野生动物园",
    //             value: [107.60, -6.90],
    //             number: '2',
    //         },
    //         {
    //             name: "阿德莱德动物园",
    //             value: [138.49, -35.21],
    //             number: '2',
    //         },
    //         {
    //             name: "豪尔熊猫馆",
    //             value: [51.52, 25.28],
    //             number: '2',
    //         },
    //     ],
    //     animation: false,//坐标点是否显示动画
    //     symbol: 'image://' + pandaImg,
    //     symbolSize: [25, 25],//标记的大小
    //     symbolOffset: [0, 0],//标记相对于原本位置的偏移
    //     itemStyle: {
    //         // 设置散点透明度为不透明（即 1）  
    //         opacity: 1,
    //     },
    //     label: {
    //         normal: {
    //             show: false,
    //         },
    //         emphasis: {
    //             show: true,
    //             position: 'left',
    //             formatter: function (p) {
    //                 return '{title|' + p.name + '}{abg|}\n' +
    //                     '{totalHead|数量/只}{maleHead|雄性/只}{femaleHead|雌性/只}\n' +
    //                     '{hr|}\n' +
    //                     '{total|' + p.number + '}{male|' + p.number + '}{female|' + p.number + '}';
    //             },
    //             backgroundColor: '#f1f0ed',
    //             borderColor: '#7a7374',
    //             borderWidth: 1,
    //             borderRadius: 4,
    //             rich: {
    //                 title: {
    //                     color: '#f1f0ed',
    //                     align: 'center',
    //                 },
    //                 abg: {
    //                     backgroundColor: '#7a7374',
    //                     width: '100%',
    //                     align: 'right',
    //                     height: 25,
    //                     borderRadius: [4, 4, 0, 0]
    //                 },
    //                 total: {
    //                     color: '#650000',
    //                     height: 25,
    //                     width: 70,
    //                     padding: [0, 0, 0, 0],
    //                     align: 'center',
    //                 },
    //                 totalHead: {
    //                     color: '#333',
    //                     height: 25,
    //                     align: 'center',
    //                     width: 70,
    //                     padding: [0, 0, 0, 0],
    //                 },
    //                 hr: {
    //                     borderColor: '#7a7374',
    //                     width: '100%',
    //                     borderWidth: 0.5,
    //                     height: 0
    //                 },
    //                 male: {
    //                     color: '#650000',
    //                     width: 70,
    //                     padding: [0, 0, 0, 0],
    //                     align: 'center'
    //                 },
    //                 maleHead: {
    //                     color: '#333',
    //                     width: 70,
    //                     padding: [0, 0, 0, 0],
    //                     align: 'center'
    //                 },
    //                 female: {
    //                     color: '#650000',
    //                     width: 70,
    //                     align: 'center',
    //                     padding: [0, 0, 0, 0]
    //                 },
    //                 femaleHead: {
    //                     color: '#333',
    //                     width: 70,
    //                     align: 'center',
    //                     padding: [0, 0, 0, 0]
    //                 }
    //             }
    //         },
    //     },
    // }],
    // // 野生大熊猫种群数量-区域颜色图系列配置  
    // wildOpt: {
    //     title: {
    //         text: '海外外交熊猫分布'
    //     },
    //     // 提示框组件
    //     tooltip: {
    //         show: false,
    //         // trigger: "item", // 触发类型-数据项图形hover触发
    //         // position:"top",
    //         // formatter: "{b}: {c}只", // hover提示框展示的内容
    //     },
    //     // 视觉映射组件
    //     visualMap: {
    //         show: true,
    //         itemWidth: 20,
    //         itemHeight: 200,
    //         orient: "vertical", // 显示方式
    //         left: "left", // 距离容器左侧的位置
    //         top: "middle",
    //         min: 0, // 数据最小值
    //         max: 1500, // 指定数据最大值
    //         inRange: {
    //             color: ["#ffffff", "#1ba784"], // 范围颜色-从小到大渐变颜色区间
    //         },
    //         hoverLink: true, // 是否启用数据项图形hover时的联动高亮效果
    //         text: ["高", "低"], // 组件两侧的文本
    //         // seriesIndex:0,  // 指定取哪个系列的数据
    //     },
    //     series: [{
    //         name: '区域颜色',
    //         type: 'map',
    //         map: 'china', // 地图类型，这里以中国地图为例
    //         roam: false, // 是否开启鼠标缩放和平移漫游
    //         zoom: 1.20, // 当前视角的缩放比例
    //         select: {
    //             disabled: true, // 数据项图形是否能被选中
    //         },
    //         itemStyle: {
    //             normal: {
    //                 borderWidth: 1, //边界线大小
    //                 borderColor: '#a9a9a9', //边界线颜色
    //                 areaColor: '#ffffff', //默认区域颜色
    //                 padding: 1
    //             },
    //             emphasis: {
    //                 areaColor: '#f2ce2b', //鼠标滑过区域颜色
    //             }
    //         },
    //         select: {
    //             disabled: true, // 数据项图形是否能被选中
    //         },
    //         data: [ // 这里填入你的区域颜色数据  
    //             { name: 'United States', value: 4, },
    //             { name: 'Russia', value: 3, },
    //             { name: 'Japan', value: 10, },
    //             { name: 'Singapore', value: 3, },
    //             { name: 'Malaysia', value: 2 },
    //             { name: 'Indonesia', value: 2, },
    //             { name: 'Korea', value: 5, },
    //             { name: 'Australia', value: 5, },
    //             { name: 'Spain', value: 5 },
    //             { name: 'France', value: 4 },
    //             { name: 'Belgium', value: 5 },
    //             { name: 'United Kingdom', value: 2 },
    //             { name: 'Netherlands', value: 3 },
    //             { name: 'Denmark', value: 2 },
    //             { name: 'Germany', value: 4 },
    //             { name: 'Austria', value: 2 },
    //             { name: 'Finland', value: 2 },
    //             { name: 'Carta', value: 2 }
    //         ],
    //     }],
    // },
    // // 圈养大熊猫种群数量-散点图系列配置
    // breedOpt: {
    //     title: {
    //         text: '圈养大熊猫种群数量分布'
    //     },
    //     // 提示框组件
    //     tooltip: {
    //         show: false,
    //         // trigger: "item", // 触发类型-数据项图形hover触发
    //         // position: 'top',
    //         // formatter:"{b}: {c}", // hover提示框展示的内容
    //     },
    //     geo: {
    //         map: "china",
    //         roam: false, // 是否开启鼠标缩放和平移漫游
    //         zoom: 1.20, // 当前视角的缩放比例
    //         select: {
    //             disabled: true, // 数据项图形是否能被选中
    //         },
    //         itemStyle: {
    //             normal: {
    //                 borderWidth: 1, //边界线大小
    //                 borderColor: '#c6dfc8', //边界线颜色
    //                 // areaColor: '#1ba784', //默认区域颜色
    //                 areaColor: new echarts.graphic.LinearGradient(
    //                     0, 0, 0, 1, // 线性渐变的方向和范围  
    //                     [
    //                         { offset: 0, color: 'rgba(27, 167, 132, 1)' }, // 起始颜色和透明度  
    //                         { offset: 1, color: 'rgba(27, 167, 132, 0.5)' } // 结束颜色和透明度  
    //                     ]
    //                 ),
    //                 padding: 2
    //             },
    //             emphasis: {
    //                 borderWidth: 1, //边界线大小
    //                 borderColor: '#a9a9a9', //边界线颜色
    //                 areaColor: '#ffffff', //默认区域颜色
    //                 padding: 1
    //                 // areaColor: '#f2ce2b', //鼠标滑过区域颜色
    //             }
    //         },
    //         label: {
    //             normal: {
    //                 show: false, // 是否在数据图形上展示省份名称
    //             },
    //             emphasis: {
    //                 show: true,
    //                 textStyle: {
    //                     color: '#333'//鼠标经过字体颜色
    //                 }
    //             }
    //         },
    //     },
    //     series: [{
    //         name: '标点',
    //         type: 'scatter',
    //         coordinateSystem: 'geo',
    //         data: [

    //         ];
    //         animation: false,//坐标点是否显示动画
    //         symbol: 'image://' + pandaImg,
    //         symbolSize: [25, 25],//标记的大小
    //         symbolOffset: [0, 0],//标记相对于原本位置的偏移
    //         itemStyle: {
    //             // 设置散点透明度为不透明（即 1）  
    //             opacity: 1,
    //         },
    //         label: {
    //             normal: {
    //                 show: false,
    //             },
    //             emphasis: {
    //                 show: true,
    //                 position: 'left',
    //                 formatter: function (p) {
    //                     return '{title|' + p.name + '}{abg|}\n' +
    //                         '{totalHead|数量/只}{maleHead|雄性/只}{femaleHead|雌性/只}\n' +
    //                         '{hr|}\n' +
    //                         '{total|' + p.number + '}';
    //                 },
    //                 backgroundColor: '#f1f0ed',
    //                 borderColor: '#7a7374',
    //                 borderWidth: 1,
    //                 borderRadius: 4,
    //                 rich: {
    //                     title: {
    //                         color: '#f1f0ed',
    //                         align: 'center',
    //                     },
    //                     abg: {
    //                         backgroundColor: '#7a7374',
    //                         width: '100%',
    //                         align: 'right',
    //                         height: 25,
    //                         borderRadius: [4, 4, 0, 0]
    //                     },
    //                     total: {
    //                         color: '#650000',
    //                         height: 25,
    //                         width: 70,
    //                         padding: [0, 0, 0, 0],
    //                         align: 'center',
    //                     },
    //                     totalHead: {
    //                         color: '#333',
    //                         height: 25,
    //                         align: 'center',
    //                         width: 70,
    //                         padding: [0, 0, 0, 0],
    //                     },
    //                     hr: {
    //                         borderColor: '#7a7374',
    //                         width: '100%',
    //                         borderWidth: 0.5,
    //                         height: 0
    //                     },
    //                     male: {
    //                         color: '#650000',
    //                         width: 70,
    //                         padding: [0, 0, 0, 0],
    //                         align: 'center'
    //                     },
    //                     maleHead: {
    //                         color: '#333',
    //                         width: 70,
    //                         padding: [0, 0, 0, 0],
    //                         align: 'center'
    //                     },
    //                     female: {
    //                         color: '#650000',
    //                         width: 70,
    //                         align: 'center',
    //                         padding: [0, 0, 0, 0]
    //                     },
    //                     femaleHead: {
    //                         color: '#333',
    //                         width: 70,
    //                         align: 'center',
    //                         padding: [0, 0, 0, 0]
    //                     }
    //                 }
    //             },
    //         },
    //     }],
    // }
};


// myChart.setOption({
//     layoutCenter: ['50%', '50%'],//位置
//     layoutSize: '170%',//大小

//     tooltip: {
//         trigger: "item"
//     },
//     // toolbox: {
//     //   feature: {
//     //     saveAsImage: {}
//     //   }
//     // },
//     // title: {
//     //   text: "城市销量",
//     //   left: "45%",
//     //   textStyle: {
//     //     color: "#fff",
//     //     fontSize: 20,
//     //     textShadowBlur: 10,
//     //     textShadowColor: "#33ffff"
//     //   }
//     // },
//     visualMap: {
//         // nameMap: nameMap,
//         show: true,
//         left: 'left',
//         top: 'middle',
//         seriesIndex: [0],
//         type: 'piecewise',
//         pieces: [
//             { min: 8, max: 10, color: 'rgb(254,57,101)' },
//             { min: 7, max: 8, color: 'rgb(252,157,154)' },
//             { min: 4, max: 6, color: 'rgb(249,205,173)' },
//             { min: 2, max: 4, color: 'rgb(200,200,169)' },
//             { min: 0, max: 2, color: 'rgb(131,175,155)' }
//         ],
//         textStyle: {
//             color: '#000',
//         },
//         // text: ['熊猫只数'],
//     },
//     geo: {
//         // z: 10,
//         show: true,
//         map: "world",
//         zoom: 1.1,
//         // silent: true, //禁用地图的hover事件
//         label: {
//             normal: {
//                 show: false,
//                 fontSize: 12,
//             },
//             emphasis: {
//                 show: false,
//             },
//             // regions: [
//             //   {
//             //     name: 'China', // 区域的名称,确保使用地图数据中定义的正确名称
//             //     selected: true, // 设置为 true 表示该区域高亮显示
//             //     itemStyle: {
//             //       emphasis: {
//             //         areaColor: '#FFD700' // 高亮显示时的区域颜色
//             //       }
//             //     }
//             //   }
//             // ]
//         },
//         regions: [
//             { name: 'United States', value: 4, },
//             { name: 'Russia', value: 3, },
//             { name: 'Japan', value: 10, },
//             { name: 'Singapore', value: 3, },
//             { name: 'Malaysia', value: 2 },
//             { name: 'Indonesia', value: 2, },
//             { name: 'Korea', value: 5, },
//             { name: 'Australia', value: 5, },
//             { name: 'Spain', value: 5 },
//             { name: 'France', value: 4 },
//             { name: 'Belgium', value: 5 },
//             { name: 'United Kingdom', value: 2 },
//             { name: 'Netherlands', value: 3 },
//             { name: 'Denmark', value: 2 },
//             { name: 'Germany', value: 4 },
//             { name: 'Austria', value: 2 },
//             { name: 'Finland', value: 2 },
//             { name: 'Carta', value: 2 }
//         ],
//         roam: true,

//         itemStyle: {
//             normal: {
//                 areaColor: '#dee1e6',
//                 borderColor: '#ffffff',
//             },
//             // emphasis: {
//             //   areaColor: '#0099CC',
//             //   focus: "self",
//             // }
//         },
//         // projection: {
//         //   project: point => [
//         //     (point[0] / 180) * Math.PI,
//         //     -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2))
//         //   ],
//         //   unproject: point => [
//         //     (point[0] * 180) / Math.PI,
//         //     ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90
//         //   ]
//         // }
//     },
//     series: [
//         {
//             z: 1,
//             name: "有熊猫国家",
//             type: "map",
//             mapType: "world",
//             coordinateSystem: 'geo',
//             // nameMap: nameMap,
//             geoIndex: 0,
//             roam: true,
//             silent: true, //禁用地图的hover事件
//             data: [
//                 { name: 'United States', value: 4, },
//                 { name: 'Russia', value: 3, },
//                 { name: 'Japan', value: 10, },
//                 { name: 'Singapore', value: 3, },
//                 { name: 'Malaysia', value: 2 },
//                 { name: 'Indonesia', value: 2, },
//                 { name: 'Korea', value: 5, },
//                 { name: 'Australia', value: 5, },
//                 { name: 'Spain', value: 5 },
//                 { name: 'France', value: 4 },
//                 { name: 'Belgium', value: 5 },
//                 { name: 'United Kingdom', value: 2 },
//                 { name: 'Netherlands', value: 3 },
//                 { name: 'Denmark', value: 2 },
//                 { name: 'Germany', value: 4 },
//                 { name: 'Austria', value: 2 },
//                 { name: 'Finland', value: 2 },
//                 { name: 'Carta', value: 2 }
//             ],
//         },
//         {
//             name: "Icon",
//             type: 'scatter',
//             coordinateSystem: 'geo',
//             animation: false,//坐标点是否显示动画
//             symbol: 'image://' + './public/icon/panda.png',
//             symbolSize: [25, 25],//标记的大小
//             symbolOffset: [0, 0],//标记相对于原本位置的偏移
//             label: {
//                 formatter: '{b}',
//                 position: 'right',
//                 // show: true,//是否显示地名
//                 color: '#000',
//             },
//             z: 9,
//             data: asia.map(item => {
//                 return {
//                     name: item.name,
//                     value: item.value, // 这里应该是坐标值
//                     number: item.number, // 这里是额外的信息
//                 };
//             }),
//             tooltip: {//仅在 options中最外层的 tooltip.trigger 为 'item'时有效
//                 show: true,
//                 position: 'bottom',//提示框位置
//                 backgroundColor: "rgba(26, 104, 64,0.8)", //设置背景图片 rgba格式
//                 borderColor: '#9a9c9d',
//                 textStyle: {
//                     color: '#fff'
//                 },
//                 formatter: function (params, ticket, callback) {
//                     var _dt = params.data;
//                     if (params.data) {
//                         var strHtml = '<div>';
//                         strHtml += '<table class="table">';
//                         // strHtml += '<tr><td colspan="2" style="text-align:center">国家简介</td></tr>';
//                         strHtml += '<tr><td>动物园名称：</td><td>' + _dt.name + '</td></tr>';
//                         strHtml += '<tr><td>熊猫数量：</td><td>' + _dt.number + '</td></tr>';
//                         // strHtml += '<tr><td>首都：</td><td>' + _dt.capital + '</td></tr>';
//                         // strHtml += '<tr><td>国土面积：</td><td>' + _dt.area + '</td></tr>';
//                         strHtml += '</table>';
//                         strHtml += '</div>'
//                         return strHtml;
//                     }
//                 }
//             }
//         }
//     ],
// });
// myChart.off('click')
// myChart.on("click", function (args) {
//     console.log(args);
// })
//             });
//         });
// return {
//     getState,
//     mapData,
// };
//     },
// };


// 初始化ECharts图表  
function initCharts() {
    echarts.registerMap("foreign", foreignMapJson);
    foreignMap = echarts.init(chartRef.value);
    foreignMap.setOption(foreignOpt);
};

// 生命周期钩子
onMounted(() => {
    initCharts();
});

</script>

<style>
.map {
    width: 100%;
    height: 100%;
}
</style>
