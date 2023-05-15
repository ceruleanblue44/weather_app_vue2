// import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
// import { apiProxy } from './proxy';
import './assets/styles/normalize.css';
import './assets/styles/styles.scss';
import './assets/styles/UnitsToggleButton.scss';
import './assets/styles/CurrentWeatherDisplay.scss';
import './assets/styles/SearchResults.scss';
import './assets/styles/SearchForm.scss';
import './assets/styles/LocalWeather.scss';

// Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');

createApp(App).mount('#app');
// App.use('/api', apiProxy);
