<template>
    <div id="cp-container">
        <div id="cp-heatmap-container" class="deco-container">
            <div id="cp-heatmap" ref="heatMapRef"></div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, nextTick} from 'vue';  
    import * as echarts from 'echarts';

    const heatMapRef = ref(null);  
    let heatMap = null; 

    // prettier-ignore
    const xAxisData = [
        '2001', '2002', '2003', '2004', '2005', '2006', '2007',
        '2008', '2009', '2010', '2011', '2012', '2013', '2014', 
        '2015', '2016', '2017', '2018', '2019', '2020', 
    ];
    // prettier-ignore
    const yAxisData = [
        '中国内地','中国台湾', '美国', '中国香港','中国澳门', '日本', '德国','英国','法国','俄罗斯','比利时'
    ];
    // prettier-ignore
    const data = [
        [0,0,35], [0,1,1],[0,2,8],[0,6,2],[0,8,1],
        [1,0,7],[1,2,5],
        [2,0,9],[2,1,1],[2,2,9],[2,8,1],
        [3,0,12],[3,2,10],[3,5,3],
        [4,0,14],[4,1,37],[4,2,4],
        [5,0,20],[5,1,37],[5,2,1],[5,5,1],[5,9,1],
        [6,0,21],[6,1,9],[6,2,1],[6,3,7],[6,5,1],[6,8,1],[6,9,1],[6,10,1],
        [7,0,33],[7,1,26],[7,2,6],[7,3,2],[7,5,3],[7,7,1],
        [8,0,14],[8,1,14],[8,2,11],[8,5,2],[8,8,1],
        [9,0,27],[9,1,10],[9,2,11],[9,3,1],[9,4,5],[9,5,1],[9,6,2],[9,7,1],[9,8,1],[9,9,1],
        [10,0,12],[10,1,2],[10,2,17],[10,4,3],[10,5,6],[10,8,5],
        [11,0,16],[11,1,5],[11,2,8],[11,3,1],[11,6,1],[11,7,1],[11,8,1],[11,9,1],[11,10,1],
        [12,0,13],[12,1,12],[12,2,9],[12,3,3],[12,4,1],[12,5,3],[12,7,1],
        [13,0,13],[13,1,17],[13,2,11],[13,3,5],[13,5,1],[13,6,1],[13,8,2],[13,10,3],
        [14,0,9],[14,1,3],[14,2,3],[14,3,3],[14,7,1],[14,10,1],
        [15,0,23],[15,1,3],[15,2,10],[15,3,5],[15,4,3],[15,6,1],[15,9,1],[15,10,2],
        [16,0,16],[16,1,4],[16,2,10],[16,3,10],[16,4,3],[16,6,8],[16,7,2],[16,10,1],
        [17,0,11],[17,1,4],[17,2,5],[17,3,3],[17,4,1],[17,5,2],[17,6,1],[17,8,4],[17,9,1],
        [18,0,20],[18,1,4],[18,2,2],[18,3,3],[18,4,1],[18,6,4],[18,7,2],[18,8,1],[18,9,5],[18,10,2],
        [19,0,8],[19,1,3],[19,2,1],[19,3,1],[19,5,2],[19,6,1],[19,7,1],
        [20,0,15],[20,1,4],[20,2,1],[20,4,1],[20,5,1],[20,7,1],
    ];
    const heatMapOpt = {
        title:{
            text:'国家/地区大熊猫相关报道的年份分布'
        },
        tooltip: {
            position: 'top'
        },
        grid: {
            bottom: '20%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            splitArea: {
            show: true
            }
        },
        yAxis: {
            type: 'category',
            data: yAxisData,
            splitArea: {
            show: true
            }
        },
        visualMap: {
            min: 0,
            max: 40,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
        },
        series: [
            {
            name: '报道数量',
            type: 'heatmap',
            data: data,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
    };

    // 初始化ECharts图表  
    function initCharts() {
        heatMap = echarts.init(heatMapRef.value);

        nextTick(() => {    
            // 在这里可以安全地执行依赖于更新后 DOM 的操作 
            heatMap.setOption(heatMapOpt);
        });  
         
    };  

    // 生命周期钩子
    onMounted(() => {  
        initCharts();
    });  
    onUnmounted(() => {  
      if (heatMap) {  
        heatMap.dispose();  
      }
    });  
</script>

<style scoped>
    #cp-container{
        height: 100%;
        width: 100%;
    }
    #cp-heatmap-container{
        /* border: 1px solid black; */
        height: 400px;
        width: 800px;
    }
    #cp-heatmap{
        height: 100%;
        width: 100%;
    }
    .deco-container{
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        border: 1px solid #fff;
        margin: 10px;
    }
</style>