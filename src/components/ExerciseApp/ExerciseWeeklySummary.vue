<template>
    <div id="weekly-summary">
        <h2>本週運動紀錄</h2>
        <div v-for="day in weeklyData" :key="day.date">
            <h3>{{ day.date }}</h3>
            <p>有氧運動: {{ day.aerobic }} 分鐘</p>
            <p>重訓: {{ day.strength_training }} 分鐘</p>
            <p v-if="!day.aerobic && !day.strength_training">尚未紀錄運動</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            weeklyData: []  // 存放本週的運動紀錄
        };
    }
};
</script>
