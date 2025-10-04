import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';

// Import Pinia
import { createPinia } from 'pinia';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Install plugins
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
