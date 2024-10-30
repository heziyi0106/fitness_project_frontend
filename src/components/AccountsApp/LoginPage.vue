<template>
    <div class="login-container">
        <h2 class="text-center">用戶登入</h2>
        <form @submit.prevent="login" class="login-form">
            <div class="form-group">
                <label for="username">用戶名:</label>
                <input v-model="username" id="username" type="text" required class="form-control" />
            </div>

            <div class="form-group">
                <label for="password">密碼:</label>
                <input v-model="password" id="password" type="password" required class="form-control" />
            </div>

            <button type="submit" class="btn btn-primary btn-block">登入</button>
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
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                // 發起 POST 請求，傳遞用戶名和密碼
                const response = await axios.post('http://127.0.0.1:8000/fitness_api/accounts/login/', {
                    username: this.username,
                    password: this.password,
                });

                // 如果返回了 token，就保存到 localStorage 中
                const token = response.data.token;
                const expirationTime = Date.now() + response.data.expires_in * 1000;
                localStorage.setItem('authToken', token);
                localStorage.setItem('tokenExpirationTime', expirationTime);

                // 更新 App 组件中的 authToken 状态
                this.$root.updateAuthToken(token);

                // 登入成功後跳轉到儀表板頁面
                this.$router.push('/exercises');
            } catch (error) {
                if (error.response) {
                    this.errorMessage = "登入失敗：" + (error.response.data.detail || "請檢查您的憑證");
                } else {
                    this.errorMessage = "登入失敗：請檢查您的網絡連接";
                }
            }
        }
    }
};
</script>

<style scoped>
.login-container {
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
