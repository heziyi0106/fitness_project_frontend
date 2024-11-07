import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 引入 router
import vuetify from './plugins/vuetify';  // 引入 Vuetify 插件
import 'quill/dist/quill.snow.css';


createApp(App).use(router).use(vuetify).mount('#app');
