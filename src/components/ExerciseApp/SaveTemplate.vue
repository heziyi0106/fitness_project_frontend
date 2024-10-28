<template>
    <div class="save-template">
        <h3>儲存模板</h3>
        <form @submit.prevent="submitTemplate">
            <div class="form-group">
                <label for="template-name">範本名稱:</label>
                <input type="text" id="template-name" v-model="templateName" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-success">儲存範本</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['plan'], // 接收從NewExercisePlan傳來的計劃
    data() {
        return {
            templateName: ''
        };
    },
    methods: {
        submitTemplate() {
            // 這裡調用API來儲存模板，傳遞plan和templateName
            const templateData = {
                name: this.templateName,
                exercises: this.plan
            };
            console.log('儲存模板:', templateData);
            // TODO: 保存模板到後端
        }
    }
};
</script>

<style scoped>
.save-template {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
