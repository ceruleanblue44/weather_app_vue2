<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <ul class="multiple__cities" v-if="citiesData && filteredCitiesData.length > 0">
    <li v-for="(city, index) in filteredCitiesData"
        :key="index"
        :data-idx="index"
        @click="chooseCity(city)">
      <span>{{ city.name }}</span>
      <span>{{ city.country }}</span>
      <img :src="setCountryFlag(index)" alt="Country flag" />
      <span>{{ city.state }}</span>
      <span>{{ city.lat }}</span>
      <span>{{ city.lon }}</span>
    </li>
  </ul>
</template>

<script>
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
      return `http://openweathermap.org/images/flags/${country}.png`;
    },

    chooseCity(city) {
      const coords = {};
      ({ lat: coords.lat, lon: coords.lon } = city);
      this.$emit('update-coords', coords);
    },
  },

  computed: {
    filteredCitiesData() {
      return this.citiesData
        ? this.citiesData.filter((city) => city.name.toLowerCase().includes(this.searchCityQuery.toLowerCase()))
        : '';
    },
  },
};
</script>
