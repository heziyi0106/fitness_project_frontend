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
                            <h6>計劃名稱: {{ selectedDatePlan.name }}</h6>
                            <p>目標: {{ selectedDatePlan.goal }}</p>
                            <p>總運動時間: {{ selectedDatePlan.total_duration }} 分鐘</p>
                            <p>類型: {{ selectedDatePlan.exercise_type }}</p>
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
    data() {
        return {
            selectedDate: null, // 被選擇的日期
            selectedDatePlan: null, // 該日期的運動計劃
            showModal: false, // 控制彈出框顯示
            events: [
                {
                    start: '2024-10-28',
                    end: '2024-10-28',
                    title: '力量訓練 60 分鐘'
                },
                {
                    start: '2024-10-29',
                    end: '2024-10-29',
                    title: '有氧運動 45 分鐘'
                }
            ],
            selectedEvent: null
        };
    },
    methods: {
        // 點擊日期時觸發
        onDateClick(event) {
            // this.selectedDate = event.date;
            this.selectedDatePlan = this.events.find(e => e.start === event.date) || null;
            this.showModal = true;  // 顯示彈出框
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.showModal = false;
            document.body.style.overflow = '';  // 恢复背景滚动
        },
        addNewPlan(newPlan) {
            // 新增計劃，將新計劃加入到該日期中
            const newEvent = {
                // start: this.selectedDate,
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
    z-index: 1050; /* 确保层级足够高 */
}

.modal-dialog {
    width: 90%;
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    z-index: 1060; /* 确保层级高于背景 */
    max-height: 80vh; /* 限制模态框的高度，避免内容过长时超出 */
    overflow-y: auto; /* 启用模态框内部滚动 */
}


.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.modal-footer {
    text-align: right;
}
</style>
