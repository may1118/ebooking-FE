import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { message, notification } from 'ant-design-vue'

import { loadAllPlugins } from "@/plugins";

import Vue3VideoPlayer from 'vue3-player-video'

const app: ReturnType<typeof createApp> = createApp(App);

app.provide('$message', message) //全局注册
app.provide('$notification', notification)

/** 加载所有 Plugins */
loadAllPlugins(app);

app
  .use(store)
  .use(router)
  .use(Vue3VideoPlayer, { 
    lang: 'zh-CN',
  })
  .mount("#app");
