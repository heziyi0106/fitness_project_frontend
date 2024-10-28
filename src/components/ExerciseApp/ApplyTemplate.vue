<template>
    <div class="apply-template">
        <h3>套用範本</h3>
        <form @submit.prevent="applyTemplate">
            <div class="form-group">
                <label for="template-select">選擇範本:</label>
                <select id="template-select" v-model="selectedTemplate" class="form-control" required>
                    <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">套用範本</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            templates: [],  // 從後端API獲取範本列表
            selectedTemplate: null
        };
    },
    methods: {
        applyTemplate() {
            // 套用範本邏輯，這裡可以發送API請求並返回範本的計劃數據
            console.log('套用範本:', this.selectedTemplate);
            // TODO: 根據範本ID請求計劃，並將結果傳遞回NewExercisePlan
            this.$emit('templateApplied', this.selectedTemplate);
        }
    },
    created() {
        // 從後端API獲取模板
        this.templates = [
            { id: 1, name: '全身訓練範本' },
            { id: 2, name: '有氧運動範本' }
        ];
    }
};
</script>

<style scoped>
.apply-template {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
