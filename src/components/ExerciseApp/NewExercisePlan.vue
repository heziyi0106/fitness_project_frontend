<template>
    <div class="new-plan-form">
        <h3>新增運動計劃</h3>
        <form @submit.prevent="submitPlan">
            <!-- 計劃名稱 -->
            <div class="form-group">
                <label for="name">計劃名稱:</label>
                <input type="text" id="name" v-model="plan.name" class="form-control" required />
            </div>

            <!-- 目標 -->
            <div class="form-group">
                <label for="goal">目標:</label>
                <select id="goal" v-model.number="plan.goal" class="form-control" required>
                    <option v-for="(label, value) in goalOptions" :key="value" :value="value">{{ label }}</option>
                </select>
            </div>

            <!-- 運動類型 -->
            <div class="form-group">
                <label for="type">運動類型(可複選):</label>
                <select id="type" v-model="plan.exercise_type" class="form-control" multiple required>
                    <option v-for="(label, value) in exerciseTypeOptions" :key="value" :value="value">{{ label }}</option>
                </select>
            </div>

            <!-- 運動時間 -->
            <div class="form-group">
                <label for="duration">運動時間 (分鐘):</label>
                <input type="number" id="duration" v-model="plan.total_duration" class="form-control" step="5" min="0" required />
            </div>

            <!-- 動作組設置 -->
            <exercise-set-form
                v-for="(exerciseSet, index) in plan.sets"
                :key="index"
                :exercise-set="exerciseSet"
                @add-detail="addDetail(index)"
                @update-exercise-set="updateExerciseSet(index, $event)"
                @update-detail="updateDetail(index, $event)"
            />
            <button @click.prevent="addExerciseSet" class="btn btn-primary">新增動作</button>

            <!-- 提交與取消 -->
            <div class="form-group mt-3">
                <button type="submit" class="btn btn-success">保存計劃</button>
                <button type="button" class="btn btn-secondary" @click="cancelPlan">取消</button>
            </div>
        </form>
    </div>
</template>

<script>
import ExerciseSetForm from './ExerciseSetForm.vue';
import tokenSet from '@/api';

export default {
    components: {
        ExerciseSetForm,
    },
    props: {
        selectedDate: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            goalOptions: {
                1: '增肌',
                2: '減脂',
                3: '耐力訓練',
                4: '靈活性提升',
                5: '全面健身'
            },
            exerciseTypeOptions: {
                1: '重量訓練',
                2: '有氧訓練',
                3: '核心訓練',
                4: '柔韌性訓練',
                5: '平衡訓練'
            },
            plan: {
                name: '',
                goal: 5,
                scheduled_date: this.selectedDate,
                exercise_type: [],
                total_duration: 0,
                sets: [
                    {
                        exercise_name: '',
                        body_part: 7,
                        joint_type: 2,
                        sets: 1,
                        details: [
                            { reps: 0, weight: 0, actual_duration: 0, rest_time: 0 }
                        ]
                    }
                ]
            }
        };
    },
    methods: {
        async submitPlan() {
            try {
                const formattedPlan = {
                    name: this.plan.name,
                    goal: this.plan.goal,
                    scheduled_date: this.plan.scheduled_date,
                    exercise_type: this.plan.exercise_type.map(Number), // 傳遞選擇的運動類型 ID，若為文字就轉換成數字
                    total_duration: this.plan.total_duration,
                    sets: this.plan.sets.map(set => ({
                        exercise_name: set.exercise_name,
                        body_part: set.body_part,
                        joint_type: set.joint_type,
                        sets: set.sets,
                        details: set.details.map(detail => ({
                            reps: detail.reps,
                            weight: detail.weight,
                            actual_duration: detail.actual_duration,
                            rest_time: detail.rest_time
                        }))
                    }))
                };

                const response = await tokenSet.post('/fitness_api/exercise/create_exercise_plan/', formattedPlan);
                console.log('計劃提交成功:', response.data);
                this.$emit('submitPlan', response.data);
                this.resetPlan();
            } catch (error) {
                console.error('提交計劃失敗:', error.response ? error.response.data : error);
            }
        },
        addExerciseSet() {
            this.plan.sets.push({
                exercise_name: '',
                body_part: 7,
                joint_type: 2,
                sets: 1,
                details: [
                    { reps: 0, weight: 0, actual_duration: 0, rest_time: 0 }
                ]
            });
        },
        addDetail(index) {
            this.plan.sets[index].details.push({
                reps: 0, weight: 0, actual_duration: 0, rest_time: 0
            });
        },
        updateExerciseSet(index, { field, value }) {
            this.plan.sets[index][field] = value;
        },
        updateDetail(index, { index: detailIndex, field, value }) {
            this.plan.sets[index].details[detailIndex][field] = value;
        },
        resetPlan() {
            this.plan = {
                name: '',
                goal: 5,
                scheduled_date: this.selectedDate,
                exercise_type: [],
                total_duration: 0,
                sets: [
                    {
                        exercise_name: '',
                        body_part: 7,
                        joint_type: 2,
                        sets: 1,
                        details: [
                            { reps: 0, weight: 0, actual_duration: 0, rest_time: 0 }
                        ]
                    }
                ]
            };
        },
        cancelPlan() {
            this.resetPlan();
            this.$emit('cancelPlan'); 
        }
    },
};
</script>

<style scoped>
.new-plan-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
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
</style>
