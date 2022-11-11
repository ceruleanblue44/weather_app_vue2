<template>
  <ul class="city-list" v-if="citiesData">
    <li class="city-list__item" v-for="(city, index) in citiesData"
        :key="index"
        @click="chooseCity(city)"
        @keydown.enter="chooseCity(city)">
      <div class="city-list__item-location">
        <div class="text-m">{{ city.name }}, {{ city.country }}</div>
        <div class="text-s" v-if="city.state">{{ city.state }}</div>
      </div>
      <div class="city-list__item-flag">
        <img :src="setCountryFlag(index)" alt="Country flag" />
      </div>
      <div class="city-list__item-coords">
        <div class="text-xs">lat: {{ city.lat.toFixed(3) }}</div>
        <div class="text-xs">lon: {{ city.lon.toFixed(3) }}</div>
      </div>

    </li>
  </ul>
</template>

<script>
import { API_FLAGS } from '@/config';

export default {
  name: 'SearchResults',
  props: {
    citiesData: Array,
    searchCityQuery: String,
  },
  methods: {
    setCountryFlag(idx) {
      if (!this.citiesData) {
        return '';
      }
      const country = this.citiesData.at(idx).country.toLowerCase();
      return `${API_FLAGS}/${country}.png`;
    },

    chooseCity(city) {
      const coords = {};
      ({ lat: coords.lat, lon: coords.lon } = city);
      this.$emit('update-coords', coords);
    },
  },

  // computed: {
  //   filteredCitiesData() {
  //     return this.citiesData
  //       ? this.citiesData.filter((city) => city.name.toLowerCase().includes(this.searchCityQuery.toLowerCase()))
  //       : '';
  //   },
  // },
};
</script>
