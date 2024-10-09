<template>
    <div ref="chartRef" class="ip"></div>
    <img src="../assets/images/pandamiddle.png" ref="pandaRef" id="panda">
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import img11 from '../assets/images/ip/P51-1.png'
import img12 from '../assets/images/ip/P52-1.png'
import img13 from '../assets/images/ip/P53-1.png'
import img14 from '../assets/images/ip/P54-1.png'
import img21 from '../assets/images/ip/P41-1.png'
import img22 from '../assets/images/ip/P42-1.png'
import img23 from '../assets/images/ip/P43-1.png'
import img24 from '../assets/images/ip/P44-1.png'
import img31 from '../assets/images/ip/P21-1.png'
import img32 from '../assets/images/ip/P22-1.png'
import img33 from '../assets/images/ip/P23-1.png'
import img34 from '../assets/images/ip/P24-1.png'
import img41 from '../assets/images/ip/P31-1.png'
import img42 from '../assets/images/ip/P32-1.png'
import img43 from '../assets/images/ip/P33-1.png'
import img44 from '../assets/images/ip/P34-1.png'
import img51 from '../assets/images/ip/P11-1.png'
import img52 from '../assets/images/ip/P12-1.png'
import img53 from '../assets/images/ip/P13-1.png'
import img54 from '../assets/images/ip/P14-1.png'

const chartRef = ref(null);
const color = ["#0080ae", "#009abd", "#88be6e", "#ffd867", "#f0c9cf", "#f17666"];
// const color2 = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
const color3 = ['#4FA772', '#ACD59F', '#EEEFD7'];
// const ip = {
//     A: {
//         a: [[1, 2], [3, 4]],
//         b: {}
//     },
//     B: {
//         a: {},
//         b: {}
//     }
// };
// const ip = [
//     {
//         A: ...,
//         b: ...,
//         obj: { c: 1 }
//     },
//     {
//         A: ...,
//         b: ...,
//         obj: { c: 1 }
//     },
//     // 可以继续添加更多的对象
// ];

// 定义一个函数用来生成子节点
function generateChildNode(name, color, pandaImg) {
    return {
        name: name,
        value: 1,
        itemStyle: {
            color: color,
        },
        label: {
            position: 'outside',
            formatter: [
                '  {IP|}',
            ].join('\n'),
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
                IP: {
                    height: 50,
                    align: 'left',
                    backgroundColor: {
                        image: pandaImg,
                    }
                },
            }
        },
    };
}

// 定义一个函数用来生成父节点
function generateParentNode(name, children) {
    return {
        name: name,
        value: 1,
        itemStyle: {
            color: color[0],
        },
        children: children,
    };
}

// const data = [
//     // 动态第一个父节点
//     generateParentNode('动态', [
//         // 动态第一个孩子
//         {
//             name: '书籍相关',
//             value: 1,
//             itemStyle: {
//                 color: color[1],
//             },
//             children: [
//                 generateChildNode('Chamomile', '#f99e1c', img11),
//                 generateChildNode('Chamomile', '#f99e1c', img12),
//                 generateChildNode('Chamomile', '#f99e1c', img13),
//                 generateChildNode('Chamomile', '#f99e1c', img14),
//             ],
//         },
//         // 动态第二个孩子
//         {
//             name: '影视相关',
//             value: 1,
//             itemStyle: {
//                 color: '#dfbd7e',
//             },
//             children: [
//                 generateChildNode('Chamomile', '#f99e1c', img21),
//                 generateChildNode('Chamomile', '#f99e1c', img22),
//                 generateChildNode('Chamomile', '#f99e1c', img23),
//                 generateChildNode('Chamomile', '#f99e1c', img24),
//             ],
//         },
//     ]),
//     // 静态第二个父节点
//     generateParentNode('静态', [
//         // 第一个孩子
//         {
//             name: 'LOGO',
//             value: 1,
//             itemStyle: {
//                 color: color[1],
//             },
//             children: [
//                 generateChildNode('Chamomile', '#f99e1c', img31),
//                 generateChildNode('Chamomile', '#f99e1c', img32),
//                 generateChildNode('Chamomile', '#f99e1c', img33),
//                 generateChildNode('Chamomile', '#f99e1c', img43),
//             ],
//         },
//         // 第二个孩子
//         {
//             name: '地标性建筑',
//             value: 1,
//             itemStyle: {
//                 color: '#dfbd7e',
//             },
//             children: [
//                 generateChildNode('Chamomile', '#f99e1c', img41),
//                 generateChildNode('Chamomile', '#f99e1c', img42),
//                 generateChildNode('Chamomile', '#f99e1c', img43),
//                 generateChildNode('Chamomile', '#f99e1c', img44),
//             ],
//         },
//         // 第三个孩子
//         {
//             name: '中国著名熊猫IP',
//             value: 1,
//             itemStyle: {
//                 color: color[1],
//             },
//             children: [
//                 generateChildNode('Chamomile', '#f99e1c', img51),
//                 generateChildNode('Chamomile', '#f99e1c', img52),
//                 generateChildNode('Chamomile', '#f99e1c', img53),
//                 generateChildNode('Chamomile', '#f99e1c', img54),
//             ],
//         },
//     ]),
// ];

const data = [
    {
        name: '动态',
        itemStyle: {
            color: color[0]
        },
        children: [

            //动态第一个孩子
            {
                name: '书籍相关',
                // value保证每个比例相同
                value: 1,
                itemStyle: {
                    color: "#76c0cb"
                },
                children: [
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img11
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img12
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img13
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img14
                                    }
                                },
                            }
                        },

                    },
                ],
            },

            //动态第二个孩子
            {
                name: '影视相关',
                value: 1,
                itemStyle: {
                    color: '#0aa3b5'
                },
                children: [
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img21
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img22
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img23
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img24
                                    }
                                },
                            }
                        },

                    },
                ],
            },
        ],
    },
    {
        name: '静态',
        itemStyle: {
            color: color[2]
        },
        children: [

            //第一个孩子
            {
                name: 'LOGO',
                // value保证每个比例相同
                value: 1,
                itemStyle: {
                    color: color3[0]
                },
                children: [
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img31
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img32
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img33
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img34
                                    }
                                },
                            }
                        },

                    },
                ],
            },

            //静态第二个孩子
            {
                name: '地标性建筑',
                value: 1,
                itemStyle: {
                    color: color3[1]
                },
                children: [
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img41
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img42
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img43
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img44
                                    }
                                },
                            }
                        },

                    },
                ],
            },

            //静态第三个孩子
            {
                name: '中国著名熊猫IP',
                // value保证每个比例相同
                value: 1,
                itemStyle: {
                    color: color3[2]
                },
                children: [
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img51
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img52
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img53
                                    }
                                },
                            }
                        },

                    },
                    {
                        // name: 'Chamomile',
                        value: 0.25,
                        itemStyle: {
                            color: '#f99e1c'
                        },
                        label: {

                            position: 'outside',
                            formatter: [
                                '  {IP|}',
                            ].join('\n'),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                IP: {
                                    height: 50,
                                    align: 'left',
                                    backgroundColor: {
                                        image: img54
                                    }
                                },
                            }
                        },

                    },
                ],
            },
        ],

    },
];

const option = {
    title: {
        text: '熊猫IP',
        textStyle: {
            fontSize: 25,
            align: 'center'
        },
        subtextStyle: {
            align: 'center'
        },
    },
    series: {
        type: 'sunburst',
        nodeClick: 'false', // 禁用数据下钻
        data: data,
        radius: [0, '95%'],
        sort: undefined,
        emphasis: {
            focus: 'ancestor'
        },
        levels: [
            {},
            {
                r0: '40%',
                r: '50%',
                itemStyle: {
                    borderRadius: 7,
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential'
                }
            },
            {
                r0: '50%',
                r: '65%',
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
                r0: '70%',
                r: '72%',
                itemStyle: {
                    borderRadius: 7,
                    borderWidth: 2
                },
            }
        ]
    }
};

let myChart = null;

onMounted(() => {
    myChart = echarts.init(chartRef.value);
    myChart.setOption(option);
});
</script>

<style scoped>
/* Your component-specific styles here */
.ip {
    width: 100%;
    height: 100%;
}

#panda {
    z-index: 10;
    position: absolute;
    /* 设置为绝对定位 */
    top: 32%;
    /* 距离父元素顶部的距离 */
    left: 34%;
    /* 距离父元素左侧的距离 */
    height: 35%;
    /* width: 30%; */
    /* border: 1px solid black; */
}
</style>