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
      <button class="btn"
              @click="handleMultipleCities">Handle multiple cities</button>

      <form @submit.prevent @keydown.enter="enterKeyTest">
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
        <ul class="multiple__cities" v-if="citiesData">
          <!-- Use spans to display all info -->
          <li v-for="(city, index) in citiesData" :key="index">
            <span>{{ city.name }}</span>
            <span>{{ city.country }}</span>
            <!-- <img src="http://openweathermap.org/images/flags/`${city.country}.toLowerCase()`.png" alt="flag"> -->
            <span>{{ city.state }}</span>
            <span>{{ city.lat }}</span>
            <span>{{ city.lon }}</span>
            </li>
        </ul>
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
      coords: {
        lat: null,
        lon: null,
      },
      formData: {
        searchCityQuery: null,
        searchError: null,
      },
      isDataLoaded: false,
      citiesData: null,
      currentConditions: {
        // city: '',
        // country: '',
        // temp: '',
        // feelsLike: '',
        // humidity: '',
        // description: '',
        // icon: '',
        // windDir: '',
        // windSpeed: '',
      },
      apiData: {},
    };
  },
  components: {
    SearchCity,
  },
  methods: {
    enterKeyTest() {
      console.log('Oh, crap!');
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
        this.coords.lat = position.coords.latitude;
        this.coords.lon = position.coords.longitude;
      } catch (err) {
        console.error(err.message);
      }
    },

    // eslint-disable-next-line consistent-return
    async getCoordsByCityName() {
      try {
        if (this.formData.searchCityQuery === null || '') {
          throw new Error('Please provide a city name!');
        }
        const response = await axios.get(API_GEOCODING, {
          params: {
            q: this.formData.searchCityQuery,
            appid: API_KEY,
            limit: 5,
          },
        });
        // console.log(response.data, response.data.length);
        if (response.data.length > 0) {
          this.coords.lat = response.data[0].lat;
          this.coords.lon = response.data[0].lon;
          this.citiesData = response.data;
        } else {
          throw new Error('Nothing arrived');
        }
        // console.log(response.data);
        return response.data;
      } catch (err) {
        console.error(err.message);
        // return err.message;
      }
      // If response.data has several cities, we ask the user which one and pass
      // that data into the getCurrentWeather('searchCity').
    },

    handleMultipleCities() {
      return this.citiesData;
    },

    async getCurrentWeather(location) {
      let lat;
      let lon;
      if (location === 'local') {
        await this.getCurrentCoords();
      } else if (location === 'searchCity') {
        await this.getCoordsByCityName();
      }
      if (!this.coords.lat || !this.coords.lon) {
        throw new Error('Empty coords');
      } else {
        ({ lat, lon } = this.coords);
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
      } || {};
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

    // setCountryFlag() {
    //   return this.citiesData.forEach(city => city.country.toLowerCase())
    // },
  },
};
</script>
