<template>
    <div class="logout-container">
        <h2>登出</h2>
        <p>你確定要登出嗎？</p>
        <button @click="logout" class="btn btn-danger">確認登出</button>
    </div>
</template>

<script>
// import axios from 'axios';
import tokenSet from '@/api';

export default {
    methods: {
        async logout() {
            try {
                // 發送有token的登出請求到後端
                await tokenSet.post('/fitness_api/accounts/logout/');

                // 調用 App.vue 中的 logout 方法來清除 Token 並更新狀態
                this.$root.logout();  // 先呼叫全局的 logout 方法

                // 清除本地 Token 並重定向到登入頁面
                localStorage.removeItem('authToken');
                this.$router.push('/login');  // 確保狀態更新後再跳轉
                
            } catch (error) {
                console.error('登出失敗:', error);
            }
        }
    }
};
</script>

<style scoped>
.logout-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h2 {
    font-family: Arial, sans-serif;
    font-weight: bold;
}

button {
    margin-top: 20px;
}
</style>
