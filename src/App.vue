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
              @click="getCoords">Show weather</button>
      <button class="btn"
              @click="getKeyByPosition">Show key</button> -->
      <button class="btn"
              @click="getCurrentConditions('current')">Show current</button>
      <button class="btn"
              @click="getCurrentWeatherLocal">Show local new</button>
      <form>
        <label for="city_input">Or enter a city
          <input type="text"
          class="city_input"
          id="city_input"
          v-model.trim="citySearchQuery"
          @keyup.enter="getCity"
          placeholder="City"
          required />
        </label>
        <!-- <input type="button"
               id="btn_get_city_weather"
               @click="getKeyByTextSearch"
               value="Go"> -->
            <input type="button"
                   class="btn"
                   value="Show city"
                   @click="getCurrentConditions('city')">
      </form>
    </div>
    <div class="display">
      <!-- <div id="display_coords"> {{ currentPosition }} {{ locationKey }} </div> -->
      <div id="display_location"></div>
      <div id="display_weather"></div>
      <div id="display_weather_icon">

        <!-- <img :src="require(`@/assets/icons/${currentConditions.icon}.png`)" alt=""> -->
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
  API_TEXT_SEARCH,
} from '@/config';

export default {
  name: 'App',
  data() {
    return {
      // currentPosition: '',
      currentPosition: {
        latitude: null,
        longitude: null,
      },
      locationKey: '',
      citySearchQuery: '',
      currentConditions: {
        temperature: null,
        text: '',
        icon: null,
      },
      apiCurrentConditions: {},
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
    async getCoords() {
      try {
        const position = await this.getPosition();
        console.log(position);
        this.currentPosition.latitude = position.coords.latitude;
        this.currentPosition.longitude = position.coords.longitude;
        // const currentPosition = `${position.coords.latitude},${position.coords.longitude}`;
        // console.log(currentPosition);
        // return currentPosition;
      } catch (err) {
        console.error(err.message);
      }
    },

    // I need to find a way to fix this!!
    // eslint-disable-next-line consistent-return
    async getKeyByPosition() {
      try {
        const currentPosition = await this.getCoords();
        const response = await axios.get(API_GEOPOSITION, {
          params: {
            apikey: API_KEY,
            q: currentPosition,
          },
        });
        // this.locationKey = response.data.Key;
        const locationKey = response.data.Key;
        console.log(locationKey);
        return locationKey;
      } catch (err) {
        console.error(err.message);
      }
    },

    // eslint-disable-next-line consistent-return
    async getKeyByTextSearch() {
      if (this.citySearchQuery !== '') {
        try {
          const response = await axios.get(API_TEXT_SEARCH, {
            params: {
              apikey: API_KEY,
              q: this.citySearchQuery,
            },
          });
          console.log(response.data[0]);
          const locationKey = response.data[0].Key;
          console.log(locationKey);
          return locationKey;
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.error('Please enter a city');
      }
    },

    async getCurrentWeatherLocal() {
      await this.getCoords();
      const response = await axios.get(API_GEOPOSITION, {
        params: {
          lat: this.currentPosition.latitude,
          lon: this.currentPosition.longitude,
          appid: API_KEY,
          units: 'metric',
        },
      });
      console.log(response);
      this.apiCurrentConditions = response.data;
    },

    async getCurrentConditions(location) {
      let locationKey;
      try {
        if (location === 'current') {
          locationKey = await this.getKeyByPosition();
        } else if (location === 'city') {
          locationKey = await this.getKeyByTextSearch();
        }
        console.log(locationKey);
        const response = await axios.get(API_CURRENT_CONDITIONS + locationKey, {
          params: {
            apikey: API_KEY,
          },
        });
        const conditions = response.data[0];
        console.log(conditions);
        // eslint-disable-next-line prefer-destructuring
        this.apiCurrentConditions = response.data[0];
        console.log(response.data[0].WeatherText, response.data[0].Temperature.Metric.Value);
        this.currentConditions.icon = response.data[0].WeatherIcon;
      } catch (err) {
        console.error(err.message);
      }
    },
  },
};
</script>
