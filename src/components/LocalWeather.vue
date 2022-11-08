<template>
  <div class="search-local">
    <button class="btn btn__local" aria-label="Search current location" @click="localCoords">
    </button>
    <div class="ml-10 mt-8">Current location</div>
  </div>
</template>

<script>
export default {
  name: 'LocalWeather',
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },

    async getCurrentCoords() {
      const coords = {};
      try {
        const position = await this.getPosition();
        ({ latitude: coords.lat, longitude: coords.lon } = position.coords);
      } catch (err) {
        console.error(err.message);
      }
      return coords;
    },

    async localCoords() {
      const coords = await this.getCurrentCoords();
      // console.log(coords);
      this.$emit('update-coords', coords);
    },

  },
};
</script>
