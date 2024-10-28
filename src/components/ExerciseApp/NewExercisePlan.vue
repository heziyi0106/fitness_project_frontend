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
                <select id="type" v-model="plan.exercise_types" class="form-control" multiple required>
                    <option v-for="type in exerciseTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
            </div>

            <!-- 運動時間 -->
            <div class="form-group">
                <label for="duration">運動時間 (分鐘):</label>
                <input type="number" id="duration" v-model="plan.total_duration" class="form-control" step="5" min="0" required />
            </div>

            <!-- 動作組設置 -->
            <div class="form-group" v-for="(exerciseSet, index) in plan.exercise_sets" :key="index">
                <h4>動作 {{ index + 1 }}</h4>
                <label for="exercise_name">動作名稱:</label>
                <input type="text" v-model="exerciseSet.exercise_name" class="form-control" required />

                <label for="body_part">訓練部位:</label>
                <select v-model="exerciseSet.body_part" class="form-control" required>
                    <option value="chest">胸部</option>
                    <option value="back">背部</option>
                    <option value="legs">腿部</option>
                    <option value="shoulders">肩膀</option>
                    <option value="arms">手臂</option>
                    <option value="core">核心</option>
                    <option value="full_body">全身</option>
                </select>

                <label for="joint_type">關節類型:</label>
                <select v-model="exerciseSet.joint_type" class="form-control" required>
                    <option value="single_joint">單關節</option>
                    <option value="multi_joint">多關節</option>
                </select>

                <label for="sets">組數:</label>
                <input type="number" v-model="exerciseSet.sets" class="form-control" min="0" required />

                <h5>每組詳細設定</h5>
                <div v-for="(detail, detailIndex) in exerciseSet.details" :key="detailIndex" class="detail-set">
                    <label for="reps">反覆次數:</label>
                    <input type="number" v-model="detail.reps" class="form-control" min="0" required />

                    <label for="weight">訓練重量 (kg):</label>
                    <input type="number" v-model="detail.weight" class="form-control" min="0" required />

                    <label for="actual_duration">實際訓練時間 (秒):</label>
                    <input type="number" v-model="detail.actual_duration" class="form-control" step="10" min="0" required />

                    <label for="rest_time">休息時間 (秒):</label>
                    <input type="number" v-model="detail.rest_time" class="form-control" step="10" min="0" required />
                </div>

                <!-- 新增一組詳細設定 -->
                <button @click.prevent="addDetail(index)" class="btn btn-primary">新增組</button>
            </div>

            <!-- 新增一個動作 -->
            <button @click.prevent="addExerciseSet" class="btn btn-primary">新增動作</button>

            <!-- 提交與取消 -->
            <div class="form-group mt-3">
                <button type="submit" class="btn btn-success">保存計劃</button>
                <button type="button" class="btn btn-secondary" @click="cancelPlan">取消</button>
            </div>
        </form>

        <!-- 儲存模板按鈕 -->
        <button @click="toggleSaveTemplate" class="btn btn-info mt-3">
            {{ showSaveTemplateModal ? '收合' : '儲存範本' }}
        </button>
        <save-template v-if="showSaveTemplateModal" :plan="plan" @close="closeSaveTemplate" />

        <!-- 套用模板按鈕 -->
        <button @click="toggleApplyTemplate" class="btn btn-warning mt-3">
            {{ showApplyTemplateModal ? '收合' : '套用範本' }}
        </button>
        <apply-template v-if="showApplyTemplateModal" @templateApplied="applyTemplate" @close="closeApplyTemplate" />
    </div>
</template>

<script>
import SaveTemplate from './SaveTemplate.vue';  // 引入 SaveTemplate 組件
import ApplyTemplate from './ApplyTemplate.vue';  // 引入 ApplyTemplate 組件

export default {
    components: {
        SaveTemplate,
        ApplyTemplate
    },
    data() {
        return {
            exerciseTypes: [], // 假设你从后端拉取运动类型数据
            plan: {
                name: '',
                goal: '',
                exercise_types: [], // 多选的运动类型
                total_duration: 0,
                exercise_sets: [
                    {
                        exercise_name: '',
                        body_part: 'full_body',
                        joint_type: 'multi_joint',
                        sets: 0,
                        details: [
                            { reps: 0, weight: 0, actual_duration: 0, rest_time: 0 }
                        ]
                    }
                ]
            },
            showSaveTemplateModal: false,
            showApplyTemplateModal: false
        };
    },
    methods: {
        submitPlan() {
            console.log(this.plan);
            // 提交表單邏輯
        },
        cancelPlan() {
            this.plan = {
                name: '',
                goal: '',
                exercise_types: [],
                total_duration: 0,
                exercise_sets: [
                    {
                        exercise_name: '',
                        body_part: 'full_body',
                        joint_type: 'multi_joint',
                        sets: 0,
                        details: [
                            { reps: 0, weight: 0, actual_duration: 0, rest_time: 0 }
                        ]
                    }
                ]
            };
        },
        addExerciseSet() {
            this.plan.exercise_sets.push({
                exercise_name: '',
                body_part: 'full_body',
                joint_type: 'multi_joint',
                sets: 0,
                details: [
                    { reps: 0, weight: 0, actual_duration: 0, rest_time: 0 }
                ]
            });
        },
        addDetail(index) {
            this.plan.exercise_sets[index].details.push({
                reps: 0, weight: 0, actual_duration: 0, rest_time: 0
            });
        },
        toggleSaveTemplate() {
            this.showSaveTemplateModal = !this.showSaveTemplateModal;
        },
        closeSaveTemplate() {
            this.showSaveTemplateModal = false;
        },
        toggleApplyTemplate() {
            this.showApplyTemplateModal = !this.showApplyTemplateModal;
        },
        closeApplyTemplate() {
            this.showApplyTemplateModal = false;
        },
        applyTemplate(templateId) {
            // 套用範本邏輯
            console.log('套用範本ID:', templateId);
            this.showApplyTemplateModal = false;
        }
    },
    created() {
        // 假设你会从后端API获取运动类型列表
        this.exerciseTypes = [
            { id: 1, name: '力量訓練' },
            { id: 2, name: '有氧運動' },
            { id: 3, name: '核心訓練' },
            { id: 4, name: '柔韌性訓練' },
            { id: 5, name: '平衡訓練' }
        ];
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
