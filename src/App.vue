<template>
  <div id="app">
    <main class="container">
    <div class="controls">
      <div>Show weather at your current location</div>
      <button class="btn"
              @click="getCurrentCoords">Get current coords</button>
      <button class="btn"
              @click="getCurrentWeather('local')">Show local weather</button>
      <button class="btn"
              @click="getCoordsByCityName">Get coords by city name</button>

      <form @submit.prevent>
        <SearchCity v-model="formData.searchCityQuery" title="Or enter a city" :error="formData.searchError" placeholder="City" />
        <!-- <label for="city_input">Or enter a city
          <input type="text"
          class="city_input"
          id="city_input"
          v-model.trim="searchCityQuery"
          @keydown.enter.prevent="getCurrentWeather('searchCity')"
          placeholder="City"
          required />
        </label> -->
        <!-- <input type="button"
               id="btn_get_city_weather"
               @click="getKeyByTextSearch"
               value="Go"> -->
            <input type="button"
                   class="btn"
                   value="Show city search weather"
                   @click="getCurrentWeather('searchCity')">
      </form>
    </div>
    <div class="display" v-if="isDataLoaded">
      <!-- <div id="display_coords"> {{ currentPosition }} {{ locationKey }} </div> -->
      <div id="display_location" > {{ currentConditions.city }}, {{ currentConditions.country }} </div>
      <div id="display_time_of_day" > {{ getTimeOfDay }} </div>
      <div id="display_weather"> {{ currentConditions.description }} </div>
      <div id="display_temperature"> {{ Math.round(currentConditions.temp) }} °C </div>
      <div id="display_feels_like"> Feels like: {{ Math.round(currentConditions.feelsLike) }} °C </div>
      <div id="display_humidity"> Humidity: {{ currentConditions.humidity }} % </div>
      <div id="display_wind"> Wind: {{ windConverter }}  {{ currentConditions.windSpeed }} m/s </div>
      <div id="display_weather_icon">
        <img :src="setWeatherIcon" alt="Weather icon">
      </div>
    </div>
  </main>
  </div>
</template>

<script>

import axios from 'axios';
import {
  API_KEY,
  API_GEOCODING,
  API_CURRENT_CONDITIONS,
} from '@/config';
import SearchCity from './components/SearchCity.vue';

export default {
  name: 'App',
  data() {
    return {
      currentPosition: {
        lat: null,
        lon: null,
      },
      formData: {
        searchCityQuery: '',
        searchError: '',
      },
      isDataLoaded: false,
      currentConditions: {
        city: '',
        country: '',
        temp: '',
        feelsLike: '',
        humidity: '',
        description: '',
        icon: '',
        windDir: '',
        windSpeed: '',
      },
      apiData: {},
    };
  },
  components: {
    SearchCity,
  },
  methods: {
    keyDownWeirdness() {
      console.log(123);
    },

    getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },

    // eslint-disable-next-line consistent-return
    async getCurrentCoords() {
      try {
        const position = await this.getPosition();
        // console.log(position);
        this.currentPosition.lat = position.coords.latitude;
        this.currentPosition.lon = position.coords.longitude;
      } catch (err) {
        console.error(err.message);
      }
    },

    async getCoordsByCityName() {
      const response = await axios.get(API_GEOCODING, {
        params: {
          q: this.formData.searchCityQuery,
          appid: API_KEY,
          limit: 5,
        },
      });
      console.log(response.data, response.data.length);
      return response.data[0];
      // return response.data;
      // This method returns an empty array if the search query string is some bs,
      // and then getCurrentWeather('searchCity') tries to destructure the response
      // and throws an error, needs handling!

      // If response.data has several cities, we ask the user which one and pass
      // that data into the getCurrentWeather('searchCity').
    },

    async getCurrentWeather(location) {
      let lat;
      let lon;
      if (location === 'local') {
        await this.getCurrentCoords();
        ({ lat, lon } = this.currentPosition);
        console.log(lat, lon);
      } else if (location === 'searchCity') {
        if (this.formData.searchCityQuery === '') {
          console.error('Please provide a city name!');
          return;
        }
        const response = await this.getCoordsByCityName();
        console.log(response);
        ({ lat, lon } = response);
        // if (response.length > 0) {
        //   ({ lat, lon } = response);
        // } else {
        //   console.error('Nothing was found');
        // }
      }
      const response = await axios.get(API_CURRENT_CONDITIONS, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      });
      // console.log(response.data);
      this.isDataLoaded = true;
      this.apiData = response.data || {};
      this.currentConditions = {
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        windDir: response.data.wind.deg,
        windSpeed: response.data.wind.speed, // meter/sec or miles/hour
      };
    },
  },
  computed: {
    windConverter() {
      if (this.currentConditions.windDir === '') {
        return '';
      }
      const windArr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      const deg = this.currentConditions.windDir;
      const idx = [Math.floor(((deg + (360 / 16) / 2) % 360) / (360 / 16))];
      return windArr[idx];
    },

    getTimeOfDay() {
      let timeOfDay;
      if (!this.currentConditions.icon) {
        timeOfDay = '';
      } else {
        timeOfDay = (this.currentConditions.icon).endsWith('d') ? 'Daytime' : 'Nighttime';
      }
      return timeOfDay;
    },

    setWeatherIcon() {
      return this.currentConditions.icon
        ? `http://openweathermap.org/img/wn/${this.currentConditions.icon}@2x.png`
        : '';
    },
  },
};
</script>
