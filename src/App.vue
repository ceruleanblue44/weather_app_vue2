<template>
  <div id="app">
    <main class="container">
    <div class="controls">
      <div>Show weather at your current location</div>
      <!-- <button id="btn_coords" class="btn" type="button">Get coordinates</button>
      <button id="btn_geopos" class="btn" type="button">Get geoposition</button> -->
      <!-- <button id="btn_show_weather"
              class="btn"
              type="button"
              @click="getCoords">Show weather</button>-->
      <button class="btn"
              @click="getCurrentCoords">Get current coords</button>
      <button class="btn"
              @click="getCurrentWeather('local')">Show local weather</button>
      <button class="btn"
              @click="getCoordsByCityName">Get coords by city name</button>

      <!-- <button class="btn"
              @click="getCurrentWeather('citySearch')">Show city search weather</button> -->
      <form>
        <label for="city_input">Or enter a city
          <input type="text"
          class="city_input"
          id="city_input"
          v-model.trim="citySearchQuery"
          @keydown.enter.prevent="getCurrentWeather('citySearch')"
          placeholder="City"
          required />
        </label>
        <!-- <input type="button"
               id="btn_get_city_weather"
               @click="getKeyByTextSearch"
               value="Go"> -->
            <input type="button"
                   class="btn"
                   value="Show city search weather"
                   @click="getCurrentWeather('citySearch')">
      </form>
    </div>
    <div class="display" v-show="isDataLoaded">
      <!-- <div id="display_coords"> {{ currentPosition }} {{ locationKey }} </div> -->
      <div id="display_location" > {{ currentConditions.city }} </div>
      <div id="display_time_of_day" > {{ isDayTime }} </div>
      <div id="display_weather"> {{ currentConditions.description }} </div>
      <div id="display_temperature"> {{ Math.round(currentConditions.temp) }} °C </div>
      <div id="display_feels_like"> Feels like: {{ Math.round(currentConditions.feelsLike) }} °C </div>
      <div id="display_humidity"> Humidity: {{ currentConditions.humidity }} % </div>
      <div id="display_wind"> Wind: {{ windConverter }}  {{ currentConditions.windSpeed }} m/s </div>
      <div id="display_weather_icon">
        <img :src="`http://openweathermap.org/img/wn/${currentConditions.icon}@2x.png`" alt="Weather icon">
      </div>
    </div>
  </main>
  </div>
</template>

<script>

// import CitySearch from './components/CitySearch.vue';
import axios from 'axios';
import {
  API_KEY,
  API_GEOCODING,
  API_CURRENT_CONDITIONS,
} from '@/config';

export default {
  name: 'App',
  data() {
    return {
      currentPosition: {
        lat: null,
        lon: null,
      },
      citySearchQuery: '',
      isDataLoaded: false,
      currentConditions: {},
      apiData: {},
    };
  },
  components: {
    // CitySearch,
  },
  methods: {
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
          q: this.citySearchQuery,
          appid: API_KEY,
        },
      });
      // console.log(response.data[0]);
      return response.data[0];
    },

    async getCurrentWeather(location) {
      let lat;
      let lon;
      if (location === 'local') {
        await this.getCurrentCoords();
        ({ lat, lon } = this.currentPosition);
        console.log(lat, lon);
      } else if (location === 'citySearch') {
        const response = await this.getCoordsByCityName();
        ({ lat, lon } = response);
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
      const windArr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      const deg = this.currentConditions.windDir;
      const idx = [Math.floor(((deg + (360 / 16) / 2) % 360) / (360 / 16))];
      return windArr[idx];
    },

    isDayTime() {
      let timeOfDay;
      if (!this.currentConditions.icon) {
        timeOfDay = '';
      } else {
        timeOfDay = (this.currentConditions.icon).endsWith('d') ? 'Daytime' : 'Nighttime';
      }
      return timeOfDay;
    },
  },
};
</script>
