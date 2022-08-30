<template>
  <div class="display">
        <div id="display_location">{{ currentConditions.city }}, {{ currentConditions.country }}</div>
        <div id="display_time_of_day">{{ getTimeOfDay }}</div>
        <div id="display_weather">{{ currentConditions.description }}</div>
        <div id="display_temperature">{{ Math.round(currentConditions.temp) }} °{{ unitsTemperature }}</div>
        <div id="display_feels_like">Feels like: {{ Math.round(currentConditions.feelsLike) }} °{{ unitsTemperature }}</div>
        <div id="display_humidity">Humidity: {{ currentConditions.humidity }} %</div>
        <div id="display_wind">Wind: {{ windConverter }} {{ currentConditions.windSpeed }} {{ unitsWindSpeed }}</div>
        <div id="display_weather_icon">
          <img :src="setWeatherIcon" alt="Weather icon" />
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

    getTimeOfDay() {
      let timeOfDay;
      if (!this.currentConditions.icon) {
        timeOfDay = '';
      } else {
        timeOfDay = this.currentConditions.icon.endsWith('d') ? 'Daytime' : 'Nighttime';
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
};
</script>
