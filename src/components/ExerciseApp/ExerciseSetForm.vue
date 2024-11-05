<template>
    <div class="exercise-set-form">
        <h4>動作</h4>
        <div class="form-group">
            <label for="exerciseName">動作名稱:</label>
            <input type="text" :value="exerciseSet.exercise_name" @input="updateExerciseName($event.target.value)" class="form-control" required />
        </div>
        <div class="form-group">
            <label for="bodyPart">目標部位:</label>
            <select :value="exerciseSet.body_part" @change="updateBodyPart($event.target.value)" class="form-control" required>
                <option v-for="(label, value) in bodyPartOptions" :key="value" :value="value">{{ label }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="jointType">關節類型:</label>
            <select :value="exerciseSet.joint_type" @change="updateJointType($event.target.value)" class="form-control" required>
                <option v-for="(label, value) in jointTypeOptions" :key="value" :value="value">{{ label }}</option>
            </select>
        </div>
        <h5>每組詳細設定</h5>
        <div v-for="(detail, index) in exerciseSet.details" :key="index" class="detail-set">
            <label>反覆次數:</label>
            <input type="number" :value="detail.reps" @input="updateDetail(index, 'reps', $event.target.value)" class="form-control" required />
            <label>訓練重量 (kg):</label>
            <input type="number" :value="detail.weight" @input="updateDetail(index, 'weight', $event.target.value)" class="form-control" required />
            <label>實際訓練時間 (秒):</label>
            <input type="number" :value="detail.actual_duration" @input="updateDetail(index, 'actual_duration', $event.target.value)" class="form-control" required />
            <label>休息時間 (秒):</label>
            <input type="number" :value="detail.rest_time" @input="updateDetail(index, 'rest_time', $event.target.value)" class="form-control" required />
        </div>
        <button @click.prevent="$emit('add-detail')" class="btn btn-primary">新增組</button>
    </div>
</template>

<script>
export default {
    props: {
        exerciseSet: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            bodyPartOptions: {
                1: '胸部',
                2: '背部',
                3: '腿部',
                4: '肩膀',
                5: '手臂',
                6: '核心',
                7: '全身'
            },
            jointTypeOptions: {
                1: '單關節',
                2: '多關節'
            }
        };
    },
    methods: {
        updateExerciseName(value) {
            this.$emit('update-exercise-set', { field: 'exercise_name', value });
        },
        updateBodyPart(value) {
            this.$emit('update-exercise-set', { field: 'body_part', value: Number(value) });
        },
        updateJointType(value) {
            this.$emit('update-exercise-set', { field: 'joint_type', value: Number(value) });
        },
        updateDetail(index, field, value) {
            this.$emit('update-detail', { index, field, value: Number(value) });
        }
    }
};
</script>

<style scoped>
.exercise-set-form {
    margin-top: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>
