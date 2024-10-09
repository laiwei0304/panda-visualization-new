<template>
    <div class="bigContainer">
        <div class="map deco-container">
            <Map />
        </div>
        <div class="smallBox">
            <div class="sun deco-container">
                <ForeSun />
            </div>
            <div class="line deco-container">
                <LineChart2 />
            </div>
            <div class="line deco-container">
                <LineChart />
            </div>
        </div>
    </div>
</template>

<script setup>
import Map from '@/components/Map.vue';
import ForeSun from '@/components/ForeSun.vue';
import LineChart2 from '@/components/LineChart2.vue'
import LineChart from '@/components/LineChart.vue'
</script>

<style scoped>
.bigContainer {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.smallBox {
    display: flex;
    flex: 2;
}

.line {
    flex: 1;
}

.map {
    flex: 3;
}

.deco-container {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px;
}

.sun {
    flex: 1;
}
</style>