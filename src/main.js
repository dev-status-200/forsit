import './assets/main.css'

import Vue, { createApp } from '@vue/compat';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { plugin, defaultConfig } from '@formkit/vue';
import { createPinia } from 'pinia';
import VueApexCharts from "vue3-apexcharts";
import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 100000000 } },
});
const options = { queryClient }
//Vue.use(VueQueryPlugin, options)

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component('apexchart', VueApexCharts);
const app = createApp(App)
app.use(VueQueryPlugin, options);
app.use(VueApexCharts);
app.use(plugin, defaultConfig);
app.use(createPinia());
app.use(router);
app.mount('#app')
