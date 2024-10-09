<template>
    <div class=" bigContainer">
        <div class="map deco-container">
            <DomeTime />
        </div>
        <div class="smallBox">
            <div class="pandaIp deco-container" style="position: relative;">
                <Sun />
            </div>
            <div class=" bar deco-container">
                <ThreePieCharts />
            </div>
        </div>
    </div>
</template>

<script setup>
import DomeTime from '@/components/DomeTime.vue';
import ThreePieCharts from '@/components/ThreePieCharts.vue';
import Sun from '@/components/Sun.vue'
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
    flex: 1;
}

.deco-container {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px;
}

.pandaIp {
    flex: 2;
}
</style>