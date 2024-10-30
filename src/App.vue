<template>
    <div id="app">
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/exercises">運動記錄系統</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/">首頁</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/about">關於</router-link>
                            </li>
                            <!-- 判斷是否有 Token -->
                            <li v-if="!authToken" class="nav-item">
                                <router-link class="nav-link" to="/login">登入</router-link>
                            </li>
                            <li v-if="!authToken" class="nav-item">
                                <router-link class="nav-link" to="/register">註冊</router-link>
                            </li>
                            <li v-if="authToken" class="nav-item">
                                <router-link class="nav-link" to="/logout">登出</router-link>
                            </li>
                            <li v-if="authToken" class="nav-item">
                                <router-link class="nav-link" to="/exercises">運動儀表板</router-link>
                            </li>
                            <li v-if="isAuthenticated">
                                Token 剩餘時間: {{ tokenRemainingTime }} 秒
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <main class="container my-5">
            <!-- 這裡會根據路由動態渲染對應的元件 -->
            <router-view></router-view>
        </main>

        <footer class="bg-light text-center py-3">
            <p>&copy; 2024 My Fitness App</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            authToken: localStorage.getItem('authToken') || null,  // 初始讀取 Token
            tokenRemainingTime: 0,  // 初始化為 0
			isUserLoggedOut: false  // 標示是否為用户主動登出
        };
    },
    computed: {
        isAuthenticated() {
            const expirationTime = localStorage.getItem('tokenExpirationTime');
            const now = Date.now();
            return this.authToken && expirationTime && now < expirationTime;
        }
    },
    mounted() {
        this.updateTokenRemainingTime();
        this.startTokenExpirationCheck();
    },
    methods: {
        // 定期檢查 Token 是否過期並更新剩餘時間
        startTokenExpirationCheck() {
            setInterval(() => {
                const expirationTime = localStorage.getItem('tokenExpirationTime');
                const now = Date.now();
                if (expirationTime && now >= expirationTime) {
                    this.handleTokenExpiration();
                } else {
                    // 更新 token 剩餘時間
                    this.updateTokenRemainingTime();
                }
            }, 1000);  // 每秒檢查一次
        },
        // 處理 Token 過期邏輯
        handleTokenExpiration() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpirationTime');
            this.authToken = null;
            this.tokenRemainingTime = 0;

            // 如果不是用户手动登出，才延遲彈出 token 过期提示
            if (!this.isUserLoggedOut) {
                // 在 logout 之前弹出提示框
                setTimeout(() => {
                    alert("您的 Token 已過期，請重新登錄");
                }, 150);  // 延遲 0.2 秒後顯示
            }

            this.$router.push('/login');  // Token 過期後跳轉到登入頁面
        },
        // 更新 Token 剩餘時間
        updateTokenRemainingTime() {
            const expirationTime = localStorage.getItem('tokenExpirationTime');
            const now = Date.now();
            const remainingTime = expirationTime - now;
            this.tokenRemainingTime = remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0;

            // 如果剩餘時間等於 0，立即處理 Token 過期
            if (this.tokenRemainingTime === 0 && this.authToken) {
                this.handleTokenExpiration();
            }
        },
        // 更新 Token
        updateAuthToken(token) {
            this.authToken = token;
            this.updateTokenRemainingTime();
        },
        // 修改 logout 方法以設定登出標誌
		logout() {
			this.isUserLoggedOut = true;  // 設置为用户主动登出
			localStorage.removeItem('authToken');
			localStorage.removeItem('tokenExpirationTime');
			this.authToken = null;
			this.tokenRemainingTime = 0;
			this.$router.push('/login');
		}
    }
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

nav .nav-link {
    color: #5a5a5a;
}

nav .nav-link:hover {
    color: #007bff;
}

main {
    margin-top: 60px;
}

footer {
    background-color: #f8f9fa;
}
</style>
