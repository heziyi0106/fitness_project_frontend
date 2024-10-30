<template>
    <div class="calendar-container">
        <h2 class="text-center my-4">選擇日期</h2>
        
        <!-- Vue Cal 日曆 -->
        <vue-cal
            ref="vueCal"
            style="height: 600px"
            :events="events"
            @cell-click="onDateClick"
            :time="false"
            default-view="month"
            class="mb-4"
        />

        <!-- 彈出框 -->
        <div v-if="showModal" class="modal-backdrop">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ selectDateTitle }} 運動計劃</h5>
                        <button type="button" class="close" @click="closeModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <!-- 已有運動計劃 -->
                        <div v-if="selectedDatePlan">
                            <h6>{{ selectedDatePlan.title }}</h6>
                            <button class="btn btn-info btn-block" @click="toggleDetails">
                                {{ showDetails ? '隱藏詳細計劃' : '顯示詳細計劃' }}
                            </button>
                            <div v-if="showDetails">
                                <p>計劃名稱: {{ selectedDatePlan.name }}</p>
                                <p>目標: {{ selectedDatePlan.goal }}</p>
                                <p>總運動時間: {{ selectedDatePlan.total_duration }} 分鐘</p>
                                <p>類型: {{ selectedDatePlan.exercise_type }}</p>
                            </div>
                            <!-- 新增計劃按鈕，放在已有計劃下方 -->
                            <button class="btn btn-success btn-block" @click="isAddingNewPlan = true">新增計劃</button>
                        </div>
                        
                        <!-- 尚無運動計劃時，顯示新增計劃按鈕 -->
                        <div v-else>
                            <button class="btn btn-success btn-block" @click="isAddingNewPlan = true">新增計劃</button>
                        </div>

                        <!-- 新增運動計劃的表單（根據 isAddingNewPlan 控制顯示） -->
                        <new-exercise-plan
                            v-if="isAddingNewPlan"
                            @submitPlan="addNewPlan"
                            @cancelPlan="closeNewPlan"
                        />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">關閉</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueCal from 'vue-cal';  // 引入 Vue Cal 元件
import 'vue-cal/dist/vuecal.css';  // 引入樣式
import NewExercisePlan from './NewExercisePlan.vue';  // 引入新建計劃的表單元件

export default {
    name: 'CalendarView',
    components: {
        VueCal,
        NewExercisePlan,
    },
    props: {
        monthlyPlans: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectDateTitle: null,
            selectedDate: null,        // 當前選擇的日期
            selectedDatePlan: null,    // 當前選擇的日期的運動計劃
            showModal: false,          // 控制彈出框顯示
            showDetails: false,        // 控制計劃詳細信息顯示
            isAddingNewPlan: false,    // 控制是否顯示新增計劃表單
            events: this.convertPlansToEvents(this.monthlyPlans)  // 初始載入的事件
        };
    },
    watch: {
        monthlyPlans(newPlans) {
            // 當 props 傳遞的 monthlyPlans 更新時，更新事件資料
            this.events = this.convertPlansToEvents(newPlans);
        }
    },
    methods: {
        // 將計劃轉換為 Vue Cal 事件格式
        convertPlansToEvents(plans) {
            return plans.map(plan => ({
                start: plan.scheduled_date,
                end: plan.scheduled_date,
                title: `${plan.name} ${plan.total_duration} 分鐘`,
                name: plan.name, // 額外存儲數據以便顯示
                goal: plan.goal,
                total_duration: plan.total_duration,
                exercise_type: plan.exercise_type
            }));
        },
        // 點擊日期時觸發
        onDateClick(event) {
            this.selectedDate = event;            
            // 格式化日期為 YYYY/MM/DD
            const year = this.selectedDate.getFullYear();
            const month = (this.selectedDate.getMonth() + 1).toString().padStart(2, '0');  // 月份從0開始，所以要+1
            const day = this.selectedDate.getDate().toString().padStart(2, '0');
            this.selectDateTitle = `${year}/${month}/${day}`;

            // 格式化日期为 YYYY-MM-DD
            const formattedDate = this.selectedDate.toISOString().split('T')[0];

            this.selectedDate = formattedDate
            this.selectedDatePlan = this.events.find(e => e.start === this.selectedDate) || null;
            this.showDetails = false;   // 初始化為不顯示詳細計劃
            this.isAddingNewPlan = false; // 初始化為不顯示新增計劃表單
            this.showModal = true;      // 顯示彈出框
            document.body.style.overflow = 'hidden';  // 防止背景滾動
        },
        closeModal() {
            this.showModal = false;     // 關閉彈出框
            document.body.style.overflow = '';  // 恢復背景滾動
        },
        closeNewPlan() {
            this.isAddingNewPlan = false; // 關閉新增計劃表單
        },
        addNewPlan(newPlan) {
            // 新增計劃，將新計劃加入到事件中
            const newEvent = {
                start: this.selectedDate,
                end: this.selectedDate,
                title: `${newPlan.name} ${newPlan.total_duration} 分鐘`,
                name: newPlan.name,
                goal: newPlan.goal,
                total_duration: newPlan.total_duration,
                exercise_type: newPlan.exercise_type
            };
            this.events.push(newEvent);
            this.isAddingNewPlan = false; // 隱藏新增計劃表單
            this.showDetails = true;      // 顯示詳細信息
        },
        toggleDetails() {
            this.showDetails = !this.showDetails;  // 切換詳細計劃顯示狀態
        }
    }
};
</script>

<style scoped>
.calendar-container {
    margin: 20px;
    max-width: 1000px;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}

.modal-dialog {
    width: 90%;
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    z-index: 1060;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.modal-footer {
    text-align: right;
}

.btn-block {
    width: 100%;
    margin-bottom: 10px;
}
</style>
