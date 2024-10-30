<template>
    <div class="dashboard-container">
        <h1 class="text-center">運動儀表板</h1>
        
        <!-- 顯示日曆的按鈕 -->
        <section class="calendar-toggle">
            <button @click="toggleCalendar" class="btn btn-primary">顯示月曆</button>
        </section>

        <!-- 動態顯示日曆，將 monthlyPlans 傳給 CalendarView -->
        <section v-if="showCalendar" class="calendar-section">
            <calendar-view :monthlyPlans="monthlyPlans" />
        </section>

        <!-- 本週運動計劃總結 -->
        <section class="weekly-summary">
            <h2 class="section-title">本週運動計劃</h2>
            <ul v-if="Object.keys(weeklyPlans).length > 0" class="plan-list">
                <li v-for="(plan, index) in weeklyPlans" :key="index" class="plan-item">
                    <strong>{{ plan.scheduled_date }}</strong> - <strong>{{ plan.name }}</strong>，目標: {{ plan.goal }}，時長: {{ plan.total_duration }} 分鐘，卡路里消耗: {{ plan.manual_calories_burned }}
                </li>
            </ul>
            <p v-else class="empty-message">{{ weeklyPlansMessage }}</p>
        </section>

        <!-- 身體狀態展示 -->
        <section class="body-status">
            <h2 class="section-title">當前身體狀態</h2>
            <div v-if="Object.keys(bodyStatus).length > 0">
                <p v-if="bodyStatus.height">身高: {{ bodyStatus.height }} 公分</p>
                <p v-if="bodyStatus.weight">體重: {{ bodyStatus.weight }} 公斤</p>
                <p v-if="bodyStatus.body_fat_percentage">體脂率: {{ bodyStatus.body_fat_percentage }} %</p>
                <p v-if="bodyStatus.bmi">身體質量指數: {{ bodyStatus.bmi }}</p>
                <!-- 略 -->
            </div>
            <p v-else class="empty-message">{{ bodyStatusMessage }}</p>
        </section>
    </div>
</template>

<script>
import CalendarView from './CalendarView.vue';
import axios from 'axios';

export default {
    name: "ExerciseDashboard",
    components: {
        CalendarView,
    },
    data() {
        return {
            showCalendar: false,  // 用於控制日曆顯示
            weeklyPlans: [],     // 保存每週的運動計劃
            weeklyPlansMessage: "加載中...",  // 初始提示
            bodyStatus: {},      // 保存身體狀態
            bodyStatusMessage: "加載中...",  // 初始提示
            monthlyPlans: [],    // 保存每月的運動計劃
            clickTimes: 0 // 用於檢查月度計劃是否已加載
        };
    },
    mounted() {
        this.fetchWeeklyPlans();
        this.fetchBodyStatus();        
    },
    methods: {
        toggleCalendar() {
            // 切換顯示日曆狀態
            this.showCalendar = !this.showCalendar;
            this.clickTimes ++;

            // 檢查按鈕是否打開，且尚未加載過月度計劃，則調用API加載計劃
            if (this.showCalendar && this.clickTimes<2) {
                console.log("Monthly plans not loaded, fetching data...");
                this.fetchMonthlyPlans();
            } else if (this.showCalendar) {
                console.log("Monthly plans already loaded.");
            }
        },
        fetchMonthlyPlans() {
            const token = localStorage.getItem('authToken');
            if (token) {
                axios.get('http://127.0.0.1:8000/fitness_api/exercise/monthly_plans/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        this.monthlyPlans = response.data;  // 保存月度運動計劃
                    } else {
                        console.error("無法獲取月度運動計劃");
                    }
                })
                .catch(error => {
                    console.error('無法獲取月度運動計劃數據:', error);
                });
            }
        },
        fetchWeeklyPlans() {
            const token = localStorage.getItem('authToken');
            if (token) {
                axios.get('http://127.0.0.1:8000/fitness_api/exercise/weekly_plans/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(response => {                    
                    if (response.data && Object.keys(response.data).length > 0) {
                        this.weeklyPlans = response.data;
                    } else {
                        this.weeklyPlansMessage = "本週沒有計畫";  // 如果數據為空，顯示提示
                    }
                })
                .catch(error => {
                    console.error('無法獲取本週運動計劃數據:', error);
                });
            } else {
                console.error('Token 不存在，請先登錄');
            }
        },
        fetchBodyStatus() {
            const token = localStorage.getItem('authToken');
            if (token) {
                axios.get('http://127.0.0.1:8000/fitness_api/exercise/body_composition/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                .then(response => {
                    if (response.data && Object.keys(response.data).length > 0) {
                        this.bodyStatus = response.data;
                    } else {
                        this.bodyStatusMessage = "沒有數據";
                    }
                })
                .catch(error => {
                    console.error('無法獲取身體狀態數據:', error);
                    this.bodyStatusMessage = "無法獲取身體測量數據";
                });
            } else {
                console.error('Token 不存在，請先登錄');
                this.bodyStatusMessage = "請先登錄以查看身體測量數據";
            }
        },
    }
};
</script>

<style scoped>
/* 整體容器樣式 */
.dashboard-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

/* 標題樣式 */
h1, h2 {
    text-align: center;
    margin-bottom: 20px;
}

/* 本週運動計劃 */
.weekly-summary, .body-status {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f9fa;
}

.plan-list {
    list-style: none;
    padding-left: 0;
}

.plan-item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
}

.plan-item:last-child {
    border-bottom: none;
}

.empty-message {
    color: #999;
    text-align: center;
}

/* 身體狀態樣式 */
.body-status {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.section-title {
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
}

p {
    margin: 5px 0;
    font-size: 16px;
}

.empty-message {
    color: #ff6b6b;
    text-align: center;
    font-weight: bold;
}
</style>
