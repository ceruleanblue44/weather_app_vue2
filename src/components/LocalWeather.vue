<template>
  <div>
    <div>Show weather at your current location</div>
    <!-- <button class="btn" @click="getCurrentCoords">Get current coords</button> -->
    <button class="btn btn__local" @click="localCoords">
      Show local weather
    </button>
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

    // eslint-disable-next-line consistent-return
    async getCurrentCoords() {
      try {
        const position = await this.getPosition();
        const coords = {};
        ({ latitude: coords.lat, longitude: coords.lon } = position.coords);
        return coords;
      } catch (err) {
        console.error(err.message);
      }
    },

    async localCoords() {
      const coords = await this.getCurrentCoords();
      // console.log(coords);
      this.$emit('update-coords', coords);
    },

  },
};
</script>
