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
            selectedDatePlan: null,
            showModal: false,
            showDetails: false,
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
                exercise_type: plan.exercise_type
            }));
        },
        onDateClick(event) {
            this.selectedDate = dayjs(event).format('YYYY-MM-DD');
            this.selectDateTitle = dayjs(event).format('YYYY/MM/DD');
            this.selectedDatePlan = this.events.find(e => e.start === this.selectedDate) || null;
            this.showDetails = false;
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
                exercise_type: newPlan.exercise_type
            };
            this.events.push(newEvent);
            this.isAddingNewPlan = false;
            this.showDetails = true;
        },
        toggleDetails() {
            this.showDetails = !this.showDetails;
        }
    }
};
</script>

<style scoped>
.calendar-container {
    margin: 20px;
    max-width: 1000px;
}
</style>
