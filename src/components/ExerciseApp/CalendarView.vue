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

        <!-- 彈出框，使用 ModelComponent -->
        <model-component v-if="showModal" @close="closeModal">
            <template #title>{{ selectDateTitle }} 的運動計劃</template>
            <template #body>
                <div v-if="selectedDatePlans.length">
                    <!-- 遍歷當天的所有計劃 -->
                    <div v-for="(plan, index) in selectedDatePlans" :key="index" class="plan-details">
                        <h6>計劃名稱: {{ plan.name }}</h6>
                        <button class="btn btn-info btn-block" @click="toggleDetails(index)">
                            {{ showDetails[index] ? '隱藏詳細計劃' : '顯示詳細計劃' }}
                        </button>
                        <div v-if="showDetails[index]">
                            <p>目標: {{ plan.goal }}</p>
                            <p>總運動時間: {{ plan.total_duration }} 分鐘</p>
                            <p>類型: {{ plan.exercise_type }}</p>
                            <!-- 遍歷該計劃中的所有 sets -->
                            <div v-for="(set, setIndex) in plan.sets" :key="setIndex" class="set-details">
                                <h6>動作: {{ set.exercise_name }}</h6>
                                <p>部位: {{ set.body_part }}</p>
                                <p>關節類型: {{ set.joint_type }}</p>
                                <p>組數: {{ set.sets }}</p>
                                <!-- 遍歷每個 set 中的 details -->
                                <div v-for="(detail, detailIndex) in set.details" :key="detailIndex" class="detail">
                                    <p>第 {{ detailIndex + 1 }} 組: 重量 {{ detail.weight }} kg, 次數 {{ detail.reps }}, 實際訓練時間 {{ detail.actual_duration }} 秒, 休息時間 {{ detail.rest_time }} 秒</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success btn-block" @click="isAddingNewPlan = true">新增計劃</button>
                </div>
                <div v-else>
                    <button class="btn btn-success btn-block" @click="isAddingNewPlan = true">新增計劃</button>
                </div>

                <!-- 新增計劃表單 -->
                <new-exercise-plan
                    v-if="isAddingNewPlan"
                    :selected-date="selectedDate"
                    @submitPlan="addNewPlan"
                    @cancelPlan="closeNewPlan"
                />
            </template>
        </model-component>
    </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import ModelComponent from './ModelComponent.vue';  // 使用正確的 ModelComponent
import NewExercisePlan from './NewExercisePlan.vue';
import dayjs from 'dayjs';

export default {
    name: 'CalendarView',
    components: {
        VueCal,
        ModelComponent,
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
            selectedDate: null,
            selectedDatePlans: [],  // 用於儲存當前選中日期的所有計劃
            showModal: false,
            showDetails: [],  // 用於控制每個計劃的詳細信息顯示
            isAddingNewPlan: false,
            events: this.convertPlansToEvents(this.monthlyPlans)
        };
    },
    watch: {
        monthlyPlans(newPlans) {
            this.events = this.convertPlansToEvents(newPlans);
        }
    },
    methods: {
        convertPlansToEvents(plans) {
            return plans.map(plan => ({
                start: dayjs(plan.scheduled_date).format('YYYY-MM-DD'),
                end: dayjs(plan.scheduled_date).format('YYYY-MM-DD'),
                title: `${plan.name} ${plan.total_duration} 分鐘`,
                name: plan.name,
                goal: plan.goal,
                total_duration: plan.total_duration,
                exercise_type: plan.exercise_type,
                sets: plan.sets
            }));
        },
        onDateClick(event) {
            this.selectedDate = dayjs(event).format('YYYY-MM-DD');
            this.selectDateTitle = dayjs(event).format('YYYY/MM/DD');
            // 篩選出所有符合選中日期的計劃
            this.selectedDatePlans = this.events.filter(e => e.start === this.selectedDate);
            this.showDetails = new Array(this.selectedDatePlans.length).fill(false);  // 初始化每個計劃的詳細顯示狀態
            this.isAddingNewPlan = false;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        closeNewPlan() {
            this.isAddingNewPlan = false;
        },
        addNewPlan(newPlan) {
            const newEvent = {
                start: this.selectedDate,
                end: this.selectedDate,
                title: `${newPlan.name} ${newPlan.total_duration} 分鐘`,
                name: newPlan.name,
                goal: newPlan.goal,
                total_duration: newPlan.total_duration,
                exercise_type: newPlan.exercise_type,
                sets: newPlan.sets
            };
            this.events.push(newEvent);
            this.selectedDatePlans.push(newEvent);
            this.showDetails.push(false);  // 新增計劃時，初始設為不顯示詳細信息
            this.isAddingNewPlan = false;
        },
        toggleDetails(index) {
            this.showDetails[index] = !this.showDetails[index];
        }
    }
};
</script>

<style scoped>
.calendar-container {
    margin: 20px;
    max-width: 1000px;
}
.form-group {
    margin-bottom: 1.5rem;
}
input, select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.plan-details {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.detail {
    margin-left: 20px;
}
</style>
