import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { loadAllPlugins } from '@/plugins'

const app: ReturnType<typeof createApp> = createApp(App)

/** 加载所有 Plugins */
loadAllPlugins(app)

app.use(store).use(router).mount("#app");