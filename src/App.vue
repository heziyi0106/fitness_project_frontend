<template>
	<div id="app">
		<header>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">運動記錄系統</a>
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
							<li class="nav-item">
								<router-link class="nav-link" to="/exercises">運動列表</router-link>  <!-- 新增路徑 -->
							</li>
							<li class="nav-item">
								<router-link class="nav-link" to="/calendar">日曆測試</router-link>  <!-- 新增路徑 -->
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
}
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
