<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <ul class="multiple__cities" v-if="citiesData">
    <li v-for="(city, index) in citiesData"
        :key="index"
        :data-idx="index"
        @click="chooseCity($event)">
      <span>{{ city.name }}</span>
      <span>{{ city.country }}</span>
      <img :src="setCountryFlag(index)" alt="Country flag" />
      <span>{{ city.state }}</span>
      <span>{{ city.lat }}</span>
      <span>{{ city.lon }}</span>
    </li>
  </ul>
  <!-- getCurrentWeather('searchCity') -->
</template>

<script>
export default {
  name: 'DisplaySearchResults',
  props: {
    citiesData: Array,
  },
  methods: {
    setCountryFlag(idx) {
      if (!this.citiesData) {
        return '';
      }
      const country = this.citiesData.at(idx).country.toLowerCase();
      return `http://openweathermap.org/images/flags/${country}.png`;
    },

    chooseCity(event) {
      const city = event.currentTarget;
      // console.log(city);
      const { idx } = city.dataset;
      console.log(idx);
      return idx;
      // this.coords.lat = this.citiesData[idx].lat;
      // this.coords.lon = this.citiesData[idx].lon;
    },
  },
};
</script>
