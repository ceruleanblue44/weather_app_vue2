<template>
  <div id="app">
    <main class="container">
    <div class="controls">
      <div>Show weather at your current location</div>
      <!-- <button id="btn_coords" class="btn" type="button">Get coordinates</button>
      <button id="btn_geopos" class="btn" type="button">Get geoposition</button> -->
      <button id="btn_show_weather" class="btn" type="button">Show weather</button>
      <CitySearch />
    </div>
    <div class="display">
      <div id="display_coords"></div>
      <div id="display_location"></div>
      <div id="display_weather"></div>
    </div>
  </main>
  </div>
</template>

<script>

import CitySearch from './components/CitySearch.vue';

export default {
  name: 'App',
  components: {
    CitySearch,
  },
};
</script>
