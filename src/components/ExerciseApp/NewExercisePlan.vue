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
                <select id="goal" v-model="plan.goal" class="form-control" required>
                    <option value="muscle_gain">增肌</option>
                    <option value="fat_loss">減脂</option>
                    <option value="endurance">耐力訓練</option>
                    <option value="flexibility">靈活性提升</option>
                    <option value="general_fitness">全面健身</option>
                </select>
            </div>

            <!-- 運動類型 -->
            <div class="form-group">
                <label for="type">運動類型(可複選):</label>
                <select id="type" v-model="plan.exercise_type" class="form-control" multiple required>
                    <option v-for="type in exerciseTypes" :key="type.id" :value="type.id">{{ type.description }}</option>
                </select>
            </div>

            <!-- 運動時間 -->
            <div class="form-group">
                <label for="duration">運動時間 (分鐘):</label>
                <input type="number" id="duration" v-model="plan.total_duration" class="form-control" step="5" min="0" required />
            </div>

            <!-- 動作組設置 -->
            <div class="form-group" v-for="(exerciseSet, index) in plan.sets" :key="index">
                <h4>動作 {{ index + 1 }}</h4>
                <!-- 其他組屬性填寫... -->
                <div v-for="(detail, detailIndex) in exerciseSet.details" :key="detailIndex">
                    <label>反覆次數:</label>
                    <input type="number" v-model="detail.reps" required />
                    <!-- 其他詳細屬性填寫... -->
                </div>
            </div>
            <button type="submit" class="btn btn-success">保存計劃</button>
        </form>
    </div>
</template>

<script>
import tokenSet from '@/api';

export default {
    props: {
        selectedDate: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            exerciseTypes: [], // 運動類型選項
            plan: {
                name: '',
                goal: '',
                scheduled_date: this.selectedDate,
                exercise_types: [],
                total_duration: 0,
                sets: [
                    {
                        exercise_name: '',
                        body_part: 'full_body',
                        joint_type: 'multi_joint',
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
                const response = await tokenSet.post('/fitness_api/exercise/create_exercise_plan/', this.plan);
                console.log('計劃提交成功:', response.data);
            } catch (error) {
                console.error('提交計劃失敗:', error);
            }
        },
        addExerciseSet() {
            this.plan.sets.push({
                exercise_name: '',
                body_part: 'full_body',
                joint_type: 'multi_joint',
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
        }
    }
};
</script>

<style scoped>
.new-plan-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
}
.detail-set {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
