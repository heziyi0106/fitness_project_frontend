<template>
    <div class="register-container">
        <h2 class="text-center">用戶註冊</h2>
        <form @submit.prevent="register" class="register-form">
            <div class="form-group">
                <label for="username">用戶名：</label>
                <input v-model="username" id="username" type="text" required class="form-control" />
            </div>

            <div class="form-group">
                <label for="password">密碼：</label>
                <input v-model="password" id="password" type="password" required class="form-control" />
            </div>

            <div class="form-group">
                <label for="confirmPassword">確認密碼：</label>
                <input v-model="confirmPassword" id="confirmPassword" type="password" required class="form-control" />
            </div>

            <button type="submit" class="btn btn-primary btn-block">註冊</button>
        </form>

        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
        };
    },
    methods: {
        async register() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "密碼和確認密碼不匹配！";
                return;
            }

            try {
                await axios.post('http://127.0.0.1:8000/fitness_api/accounts/register/', {
                    username: this.username,
                    password: this.password
                });

                this.$router.push('/login');
            } catch (error) {
                this.errorMessage = '註冊失敗，請檢查您的資料。';
                console.error('註冊錯誤:', error);
            }
        }
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.text-center {
    text-align: center;
    font-family: Arial, sans-serif;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-block {
    width: 100%;
}

.text-danger {
    color: red;
}
</style>
