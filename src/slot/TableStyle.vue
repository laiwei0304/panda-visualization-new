<script setup>
const { index } = defineProps(['index'])
</script>

<template>
    <div class="item" :id="'section-' + index">
        <!-- 非具名插槽 -->
        <slot>默认插槽内容</slot>
        <!-- 这个内容会被插入的内容覆盖 -->
    </div>
</template>

<style scoped>
.item {
    height: 98vh;
    border-radius: 20px;
    background-color: #fff4df
}
</style>