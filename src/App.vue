<template>
  <div id="app">
    <main class="container">
        <h2>Weather app</h2>
        <UnitsToggleButton @toggle-units="toggleUnits"/>
      <form class="search-form" @submit.prevent @keydown.enter="getCoordsByCityName">
        <div class="search-form__content">
        <SearchCity
          v-model="formData.searchCityQuery"
          placeholder="Search city"
        />
        <button
          type="button"
          class="btn search-form__btn"
          @click="getCoordsByCityName"
          aria-label="Search city"
        />
        <SearchResults
          v-show="!isCityChosen"
          :citiesData="citiesData"
          :searchCityQuery="formData.searchCityQuery"
          @update-coords="updateCoords"
      />
      </div>
       <div class="search-form__error text-s mt-10" v-if="formData.searchError">{{ formData.searchError }}</div>
      </form>
      <LocalWeather @update-coords="updateCoords" />

      <CurrentWeatherDisplay
        v-if="isDataLoaded"
        :currentConditions="currentConditions"
        :units="units"
      />
    </main>
  </div>
</template>

<script>
import axios from 'axios';

import { API_KEY, API_GEOCODING, API_CURRENT_CONDITIONS } from '@/config';
import SearchCity from './components/SearchCity.vue';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay.vue';
import SearchResults from './components/SearchResults.vue';
import LocalWeather from './components/LocalWeather.vue';
import UnitsToggleButton from './components/UnitsToggleButton.vue';

export default {
  name: 'App',
  data() {
    return {
      coords: {
        lat: null,
        lon: null,
      },
      formData: {
        searchCityQuery: null,
        searchError: null,
      },
      isDataLoaded: false,
      isCityChosen: false,
      citiesData: null,
      units: 'metric',
      currentConditions: null,
      // apiData: null,
    };
  },

  components: {
    SearchCity,
    CurrentWeatherDisplay,
    SearchResults,
    LocalWeather,
    UnitsToggleButton,
  },

  methods: {

    async getCoordsByCityName() {
      this.isCityChosen = false;
      this.citiesData = null;
      this.formData.searchError = null;
      try {
        if (this.formData.searchCityQuery === null || this.formData.searchCityQuery === '') {
          throw new Error('Please enter a city name');
        }
        const response = await axios.get(API_GEOCODING, {
          params: {
            q: this.formData.searchCityQuery,
            appid: API_KEY,
            limit: 5,
          },
        });
        // console.log(response.data, response.data.length);
        if (response.data.length === 0) {
          throw new Error('Not found');
        } else {
          this.citiesData = response.data;
        }
        // console.log(response.data);
        // return response.data;
      } catch (err) {
        this.formData.searchError = err.message;
        console.error(err.message);
      }
      return this.citiesData;
    },

    async getCurrentWeather() {
      this.formData.searchError = null;
      try {
        let lat;
        let lon;
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
            units: this.units,
          },
        });
        // console.log(response.data);
        this.isDataLoaded = true;
        // this.apiData = response.data || {};
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
      } catch (err) {
        console.error(err.message);
      }
    },

    updateCoords(e) {
      // console.log(e);
      this.coords = e;
      this.getCurrentWeather();
      this.isCityChosen = true;
    },

    toggleUnits(e) {
      e ? this.units = 'imperial' : this.units = 'metric';
    },
  },

  watch: {
    units() {
      if (this.coords.lat && this.coords.lon) {
        this.getCurrentWeather();
      }
    },
  },
};
</script>
