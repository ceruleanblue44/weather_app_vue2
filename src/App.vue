<template>
  <div id="app">
    <main class="container">
    <div class="controls">
      <div>Show weather at your current location</div>
      <!-- <button id="btn_coords" class="btn" type="button">Get coordinates</button>
      <button id="btn_geopos" class="btn" type="button">Get geoposition</button> -->
      <button id="btn_show_weather"
              class="btn"
              type="button"
              @click="getCoords">Show weather</button>
      <button class="btn"
              @click="getKeyByPosition">Show key</button>
      <button class="btn"
              @click="getCurrentConditions">Show current</button>
      <form>
        <label for="city_input">Or enter a city
          <input type="text"
          class="city_input"
          id="city_input"
          placeholder="City"
          required />
        </label>
        <input type="button" id="btn_get_city_weather" value="Go">
      </form>
    </div>
    <div class="display">
      <div id="display_coords"> {{ currentPosition }} {{ locationKey }} </div>
      <div id="display_location"></div>
      <div id="display_weather"></div>
      <div id="display_weather_icon">
        <img src="" alt="">
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
  API_GEOPOSITION,
  API_CURRENT_CONDITIONS,
  // API_CITY_SEARCH,
  // API_TEXT_SEARCH,
} from '@/config';

export default {
  name: 'App',
  data() {
    return {
      city: '',
      currentPosition: '',
      locationKey: '',
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

    async getCoords() {
      try {
        const { coords } = await this.getPosition();
        console.log(coords);
        const { latitude, longitude } = coords;
        this.currentPosition = `${latitude},${longitude}`;
        console.log(latitude, longitude, this.currentPosition);
      } catch (error) {
        console.log(error);
      }
    },

    // I need to find a way to fix this!!
    // eslint-disable-next-line consistent-return
    async getKeyByPosition() {
      try {
        await this.getCoords();
        const response = await axios.get(API_GEOPOSITION, {
          params: {
            apikey: API_KEY,
            q: this.currentPosition,
          },
        });
        // this.locationKey = response.data.Key;
        const locationKey = response.data.Key;
        // console.log(locationKey);
        return locationKey;
      } catch (error) {
        console.log(error);
      }
    },

    // async getKeyByTextSearch() {
    //   try {

    //   } catch (e) {
    //     console.err(e);
    //   }
    // },

    async getCurrentConditions() {
      try {
        const locationKey = await this.getKeyByPosition();
        const response = await axios.get(API_CURRENT_CONDITIONS + locationKey, {
          params: {
            apikey: API_KEY,
          },
        });
        const conditions = response.data[0];
        console.log(conditions);
        console.log(response.data[0].WeatherText, response.data[0].Temperature.Metric.Value);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
