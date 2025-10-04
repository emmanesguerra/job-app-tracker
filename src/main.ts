import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // <-- add this

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

createApp(App).use(router).use(vuetify).mount('#app');
