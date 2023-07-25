import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";

import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";

import { appAxios } from "@/utils/appAxios.js";
import store from "@/store";

const app =  createApp(App);

app.component('SideBar', SideBar);
app.component("AppHeader",HeaderBar);
app.use(router);
app.use(store)
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app')
