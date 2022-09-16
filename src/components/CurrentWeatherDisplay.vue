<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div :class="['weather-display', getTimeOfDay]">
    <div class="block-left">
      <!-- <div id="display_time_of_day">{{ getTimeOfDay }}</div> -->
      <div id="display_weather">{{ currentConditions.description }}</div>
      <div id="display_feels_like">Feels like: {{ Math.round(currentConditions.feelsLike) }} °{{ unitsTemperature }}</div>
      <div id="display_humidity">Humidity: {{ currentConditions.humidity }} %</div>
      <div id="display_wind">Wind: {{ windConverter }} {{ currentConditions.windSpeed }} {{ unitsWindSpeed }}
        <div class="wind-icon ml-20">
          <svg :style="setWindArrow" width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9072 30.7679C12.9407 30.8517 13.0593 30.8517 13.0928 30.7679L24.892 1.27009C24.9273
          1.18174 24.8309 1.09863 24.7487 1.14658L13 8L1.25127 1.14658C1.16908 1.09863 1.0727 1.18174 1.10804
          1.27009L12.9072 30.7679Z" stroke="teal" stroke-width="1.5"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="block-right">
      <div id="display_location">{{ currentConditions.city }}, {{ currentConditions.country }}</div>
      <div id="display_temperature">{{ Math.round(currentConditions.temp) }} °{{ unitsTemperature }}</div>
      <div id="display_weather_icon">
      <img :src="setWeatherIcon" alt="Weather icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeatherDisplay',
  props: {
    currentConditions: Object,
    units: String,
  },
  computed: {
    windConverter() {
      if (this.currentConditions.windDir === '') {
        return '';
      }
      const windArr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      const deg = this.currentConditions.windDir;
      const idx = [Math.floor(((deg + 360 / 16 / 2) % 360) / (360 / 16))];
      return windArr[idx];
    },

    setWindArrow() {
      if (this.currentConditions.windDir === '') {
        return '';
      }
      return `transform: rotate(${this.currentConditions.windDir}deg)`;
    },

    getTimeOfDay() {
      let timeOfDay;
      if (!this.currentConditions.icon) {
        timeOfDay = '';
      } else {
        timeOfDay = this.currentConditions.icon.endsWith('d') ? 'day' : 'night';
      }
      return timeOfDay;
    },

    setWeatherIcon() {
      return this.currentConditions.icon
        ? `http://openweathermap.org/img/wn/${this.currentConditions.icon}@2x.png`
        : '';
    },
    unitsTemperature() {
      if (this.units === 'metric') {
        return 'C';
      }
      return 'F';
    },
    unitsWindSpeed() {
      if (this.units === 'metric') {
        return 'm/s';
      }
      return 'mph';
    },
  },
  created() {

  },
};
</script>
