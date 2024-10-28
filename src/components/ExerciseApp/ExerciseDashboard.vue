<template>
    <div class="dashboard-container">
        <h1 class="text-center">運動儀表板</h1>
        <!-- 顯示日曆的按鈕 -->
        <section>
            <button @click="toggleCalendar" class="btn btn-primary">顯示月曆</button>
        </section>

        <!-- 動態顯示日曆 -->
        <section v-if="showCalendar" class="calendar-section">
            <calendar-view />
        </section>

        <!-- 本週運動計劃總結 -->
        <section class="weekly-summary">
            <h2>本週運動計劃</h2>
            <ul>
                <li v-for="(plan, index) in weeklyPlans" :key="index">
                    {{ plan.day }}: {{ plan.activity }}，時長: {{ plan.duration }} 分鐘
                </li>
            </ul>
        </section>

        <!-- 身體狀態展示 -->
        <section class="body-stats">
            <h2>當前身體狀態</h2>
            <p>體重: {{ bodyStats.weight }} 公斤</p>
            <p>體脂率: {{ bodyStats.bodyFat }} %</p>
            <p>胸圍: {{ bodyStats.chest }} cm</p>
        </section>
    </div>
</template>

<script>
// 引入 CalendarView 元件
import CalendarView from './CalendarView.vue';

export default {
    name: "ExerciseDashboard",
    components: {
        CalendarView,  // 在 components 中註冊 CalendarView
    },
    data() {
        return {
            showCalendar: true,  // 用於控制日曆顯示
            weeklyPlans: [
                { day: '週一', activity: '力量訓練', duration: 60 },
                { day: '週二', activity: '有氧運動', duration: 45 },
                { day: '週三', activity: '休息', duration: 0 },
                { day: '週四', activity: '全身訓練', duration: 75 },
                { day: '週五', activity: '力量訓練', duration: 60 }
            ],
            bodyStats: {
                weight: 70,
                bodyFat: 18,
                chest: 100
            }
        };
    },
    methods: {
        toggleCalendar() {
            this.showCalendar = !this.showCalendar;  // 切換日曆的顯示狀態
        }
    }
};
</script>

<style scoped>
.dashboard-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1, h2 {
    font-family: Arial, sans-serif;
    font-weight: bold;
}

.weekly-summary, .body-stats {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f9fa;
}

body-stats p {
    margin: 5px 0;
}

.calendar-section {
    margin-top: 20px;
}
</style>