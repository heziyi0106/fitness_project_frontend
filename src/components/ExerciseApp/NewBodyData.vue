<template>
    <div class="new-body-data-form">
        <h3>輸入身體組成資訊</h3>
        <form @submit.prevent="submitForm">
            <div class="form-group" v-for="(field, index) in formFields" :key="index">
                <label :for="field.name">{{ field.label }}:</label>
                <input
                    :type="field.type"
                    v-model.number="bodyData[field.name]"
                    :id="field.name"
                    class="form-control"
                    :min="field.min"
                    required
                />
            </div>
            <button type="submit" class="btn btn-success">保存資料</button>
            <button type="button" @click="$emit('cancel-form')" class="btn btn-secondary">取消</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        formFields: {
            type: Array,
            required: true,
        },
        initialData: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            bodyData: { ...this.initialData }
        };
    },
    methods: {
        submitForm() {
            this.$emit('submit-body-data', this.bodyData);
        },
    },
};
</script>

<style scoped>
.new-body-data-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
}
.form-group {
    margin-bottom: 1.5rem;
}
input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
