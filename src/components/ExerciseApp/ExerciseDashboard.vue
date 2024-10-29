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
                    {{ plan.scheduled_date }}，<strong>{{ plan.name }}</strong>，目標: {{ plan.goal }}，時長: {{ plan.total_duration }} 分鐘，卡路里消耗: {{ plan.manual_calories_burned }}
                </li>
            </ul>
        </section>

        <!-- 身體狀態展示 -->
        <!-- <section class="body-stats">
            <h2>當前身體狀態</h2>
            <p>身高: {{ bodyStats.height }} 公分</p>
            <p>體重: {{ bodyStats.weight }} 公斤</p>
            <p>體脂率: {{ bodyStats.body_fat_percentage }} %</p>
            <p>身體質量指數: {{ bodyStats.bmi }}</p>
            <p>內臟脂肪等級: {{ bodyStats.visceral_fat }}</p>
            <p>基礎代謝率: {{ bodyStats.basal_metabolic_rate }} 大卡/每日</p>
            <p>腰圍: {{ bodyStats.waist }} 公分</p>
            <p>臀圍: {{ bodyStats.hip }} 公分</p>
            <p>胸圍: {{ bodyStats.chest }} 公分</p>
            <p>肩圍: {{ bodyStats.shoulder }} 公分</p>
            <p>上臂圍: {{ bodyStats.upper_arm }} 公分</p>
            <p>下臂圍: {{ bodyStats.lower_arm }} 公分</p>
            <p>大腿圍: {{ bodyStats.thigh }} 公分</p>
            <p>小腿圍: {{ bodyStats.calf }} 公分</p>
        </section> -->
    </div>
</template>

<script>
import axios from 'axios';
import CalendarView from './CalendarView.vue';

export default {
    name: "ExerciseDashboard",
    components: {
        CalendarView,  // 在 components 中註冊 CalendarView
    },
    data() {
        return {
            showCalendar: true,  // 用於控制日曆顯示
            weeklyPlans: [],     // 保存每週的運動計劃

        };
    },
    mounted() {
        // 在組件加載後向後端 API 發送請求，獲取本週的計劃
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.get('http://127.0.0.1:8000/fitness_api/exercise/weekly_plans/', {
                headers: {
                    Authorization: `Token ${token}` // 使用Token來授權
                }
            })
            .then(response => {
                // 成功後將計劃保存到 weeklyPlans
                this.weeklyPlans = response.data;
            })
            .catch(error => {
                console.error('無法獲取本週運動計劃數據:', error);
            });
        } else {
            console.error('Token 不存在，請先登錄');
        }
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

.weekly-summary {
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
