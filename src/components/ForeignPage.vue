<template>
    <div class="bigContainer">
        <div class="map deco-container">
            <ForeignMap />
        </div>
        <div class="smallBox">
            <div class="pandaIp deco-container">
                <!-- <Sun /> -->
            </div>
            <div class="bar deco-container">
                <PieChart />
            </div>
        </div>
    </div>
</template>

<script setup>
import ForeignMap from '@/components/ForeignMap.vue';
import BambooBar from '@/components/BambooBar.vue';
import PieChart from '@/components/PieChart.vue'
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

.bar {
    flex: 2;
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

.pandaIp {
    flex: 3;
}
</style>