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
                        <h5 class="modal-title">我的運動計劃</h5>
                        <button type="button" class="close" @click="closeModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div v-if="selectedDatePlan">
                            <!-- 已有運動計劃 -->
                            <h6>計劃名稱: {{ selectedDatePlan.title }}</h6>
                        </div>
                        <div v-else>
                            <!-- 尚無運動計劃，顯示新增計劃表單 -->
                            <new-exercise-plan @submitPlan="addNewPlan" @cancelPlan="closeModal" />
                        </div>
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
import VueCal from 'vue-cal';  // 引入 Vue Cal 組件
import 'vue-cal/dist/vuecal.css';  // 引入樣式
import NewExercisePlan from './NewExercisePlan.vue';  // 引入新建計劃的表單組件

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
            selectedDate: null,       // 當前選擇的日期
            selectedDatePlan: null,   // 當前選擇的日期的運動計劃
            showModal: false,         // 控制彈出框顯示
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
                title: `${plan.name} ${plan.total_duration} 分鐘`
            }));
        },
        // 點擊日期時觸發
        onDateClick(event) {
            this.selectedDatePlan = this.events.find(e => e.start === event.date) || null;
            this.showModal = true;  // 顯示彈出框
            document.body.style.overflow = 'hidden';  // 防止背景滾動
        },
        closeModal() {
            this.showModal = false;  // 關閉彈出框
            document.body.style.overflow = '';  // 恢復背景滾動
        },
        addNewPlan(newPlan) {
            // 新增計劃，將新計劃加入到事件中
            const newEvent = {
                start: this.selectedDate,
                end: this.selectedDate,
                title: `${newPlan.name} ${newPlan.total_duration} 分鐘`
            };
            this.events.push(newEvent);
            this.closeModal();  // 關閉模態框
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
</style>
