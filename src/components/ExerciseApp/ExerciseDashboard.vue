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
                <div v-for="(field, index) in formFields" :key="index">
                    <p>{{ field.label }}: {{ bodyStatus[field.name] }} {{ field.unit }}</p>
                </div>
                <p>測量時間: {{ formatMeasuredAt(bodyStatus.measured_at) }}</p>
                <p>BMI: {{ bodyStatus.bmi }}</p>
            </div>
            <p v-else class="empty-message">{{ bodyStatusMessage }}</p>
            <button class="btn btn-info" @click="showForm = !showForm">更新身體狀態</button>
        </section>

        <!-- 新增身體組成數據表單 -->
        <section v-if="showForm" class="body-data-form">
            <new-body-data 
                :formFields="formFields" 
                @submit-body-data="submitForm" 
                @cancel-form="showForm = false" 
            />
        </section>
    </div>
</template>

<script>
import CalendarView from './CalendarView.vue';
import NewBodyData from './NewBodyData.vue';
import tokenSet from '@/api';
import dayjs from 'dayjs';

export default {
    name: "ExerciseDashboard",
    components: {
        CalendarView,
        NewBodyData,
    },
    data() {
        return {
            showCalendar: false,
            weeklyPlans: [],
            weeklyPlansMessage: "加載中...",
            bodyStatus: {},
            bodyStatusMessage: "加載中...",
            monthlyPlans: [],
            clickTimes: 0,
            showForm: false,
            formFields: [
                { name: 'height', label: '身高（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'weight', label: '體重（公斤）', type: 'number', min: 0, unit: 'kg', errorMessage: '請勿輸入負值' },
                { name: 'body_fat_percentage', label: '體脂率（百分比）', type: 'number', min: 0, unit: '%', errorMessage: '請勿輸入負值' },
                { name: 'muscle_mass', label: '肌肉量（公斤）', type: 'number', min: 0, unit: 'kg', errorMessage: '請勿輸入負值' },
                { name: 'visceral_fat', label: '內臟脂肪等級', type: 'number', min: 0, unit: '', errorMessage: '請勿輸入負值' },
                { name: 'basal_metabolic_rate', label: '基礎代謝率 (kcal/day)', type: 'number', min: 0, unit: 'kcal/day', errorMessage: '請勿輸入負值' },
                { name: 'waist_circumference', label: '腰圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'hip_circumference', label: '臀圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'chest_circumference', label: '胸圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'shoulder_circumference', label: '肩圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'upper_arm_circumference', label: '上臂圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'lower_arm_circumference', label: '下臂圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'thigh_circumference', label: '大腿圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
                { name: 'calf_circumference', label: '小腿圍（公分）', type: 'number', min: 0, unit: 'cm', errorMessage: '請勿輸入負值' },
            ]
        };
    },
    mounted() {
        this.fetchWeeklyPlans();
        this.fetchBodyStatus();        
    },
    methods: {
        toggleCalendar() {
            this.showCalendar = !this.showCalendar;
            this.clickTimes++;
            if (this.showCalendar && this.clickTimes < 2) {
                this.fetchMonthlyPlans();
            }
        },
        formatMeasuredAt(date) {
            if (!date) return '未提供日期';
            return dayjs(date).format('YYYY/MM/DD HH:mm');
        },
        async fetchMonthlyPlans() {
            try {
                const response = await tokenSet.get('/fitness_api/exercise/monthly_plans/');
                this.monthlyPlans = response.data || [];
            } catch (error) {
                console.error('無法獲取月度運動計劃數據:', error);
            }
        },
        async fetchWeeklyPlans() {
            try {
                const response = await tokenSet.get('/fitness_api/exercise/weekly_plans/');
                this.weeklyPlans = response.data || [];
                if (Object.keys(this.weeklyPlans).length === 0) {
                    this.weeklyPlansMessage = '本週沒有運動計劃';
                }
            } catch (error) {
                console.error('無法獲取本週運動計劃數據:', error);
            }
        },
        async fetchBodyStatus() {
            try {
                const response = await tokenSet.get('/fitness_api/exercise/body_composition/');
                this.bodyStatus = response.data || {};
                if (Object.keys(this.bodyStatus).length === 0) {
                    this.bodyStatusMessage = '沒有數據';
                }
            } catch (error) {
                console.error('無法獲取身體狀態數據:', error);
                this.bodyStatusMessage = "無法獲取身體測量數據";
            }
        },
        async submitForm(newData) {
            try {
                const response = await tokenSet.post('/fitness_api/exercise/body_composition/', newData);
                console.log('身體狀態更新成功:', response.data);
                this.fetchBodyStatus();
                this.showForm = false;
            } catch (error) {
                console.error('提交表單失敗:', error);
            }
        }
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
