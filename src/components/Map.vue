<template>
    <div ref="mapRef" id="map">
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import WorldMapJson from '@/assets/json/world.json';

//要换
import pandaImg from '@/assets/images/pandaSet1.png';

const mapRef = ref(null);
let myMap = null;
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

const option = {
    // 调整布局
    layoutCenter: ['50%', '50%'],//位置
    layoutSize: '150%',//大小

    //标题
    title: {
        text: '海外外交熊猫分布'
    },

    // 提示框组件
    tooltip: {
        // trigger: "item"
        show: false,
        // trigger: "item", // 触发类型-数据项图形hover触发
        // position: 'top',
        // formatter:"{b}: {c}", // hover提示框展示的内容
    },

    visualMap: {
        // nameMap: nameMap,
        show: true,
        left: 'left',
        top: 'middle',
        seriesIndex: [0],
        type: 'piecewise',
        pieces: [
            { min: 5, max: 5, color: '#0080ae' },
            { min: 4, max: 4, color: '#88be6e' },
            { min: 3, max: 3, color: '#ffd867' },
            { min: 2, max: 2, color: '#f0c9cf' },
            { min: 1, max: 1, color: "#f17666" }
        ],
        textStyle: {
            color: '#000',
        },
        // text: ['熊猫只数'],
    },

    //区域层
    geo: {
        map: "foreign",
        roam: false, // 是否开启鼠标缩放和平移漫游

        zoom: 1.20, // 当前视角的缩放比例

        select: {
            disabled: true, // 数据项图形是否能被选中
        },
        itemStyle: {
            //基本样式
            normal: {
                // borderWidth: 1, //边界线大小
                // borderColor: '#c6dfc8', //边界线颜色
                // areaColor: '#1ba784', //默认区域颜色
                // areaColor: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1, // 线性渐变的方向和范围  
                //     [
                //         { offset: 0, color: 'rgba(27, 167, 132, 1)' }, // 起始颜色和透明度  
                //         { offset: 1, color: 'rgba(27, 167, 132, 0.5)' } // 结束颜色和透明度  
                //     ]
                // ),
                // padding: 2
                borderWidth: 1, //边界线大小
                borderColor: '#a9a9a9', //边界线颜色
                areaColor: '#f1f2f2', //默认区域颜色
                padding: 1

            },

            //悬停效果
            emphasis: {
                areaColor: '#f2ce2b', //鼠标滑过区域颜色


            }
        },

        // 不显示国家名 但还是显示了
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
            { name: 'Russia', value: 2, },
            { name: 'Japan', value: 4, },
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

    // 散点图配置
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
                { name: 'United States', value: 4, },//
                { name: 'Russia', value: 2, },//
                { name: 'Japan', value: 4, },//
                { name: 'Singapore', value: 2, },//
                { name: 'Malaysia', value: 2 },//
                { name: 'Indonesia', value: 2, },//
                { name: 'Korea', value: 5, },//
                { name: 'Australia', value: 2, },//
                { name: 'Spain', value: 5 },//
                { name: 'France', value: 4 },//
                { name: 'Belgium', value: 5 },
                { name: 'Netherlands', value: 2 },
                { name: 'Denmark', value: 2 },
                { name: 'Germany', value: 4 },
                { name: 'Austria', value: 2 },
                { name: 'Finland', value: 2 },
                { name: 'Carta', value: 2 }
            ],
        },
        {
            name: '标点',
            type: 'scatter',
            coordinateSystem: 'geo',
            // 放同一坐标轴

            data: [ // 这里填入你的散点数据  
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
            ],
            animation: false,//坐标点是否显示动画
            symbol: 'image://' + pandaImg,

            //熊猫图标的大小
            symbolSize: [30, 20],//标记的大小
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
                            '{totalHead|数量/只}\n' +
                            '{hr|}\n' +
                            '{total|' + p.data.number + '}';
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

onMounted(() => {
    echarts.registerMap("foreign", WorldMapJson);
    myMap = echarts.init(mapRef.value);

    myMap.setOption(option);

});
</script>

<style>
#map {
    width: 100%;
    height: 100%;
}
</style>