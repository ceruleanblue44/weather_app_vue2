<template>
    <!-- <form>
    <label for="city_input">Or enter a city
      <input type="text"
      class="city_input"
      id="city_input"
      placeholder="City"
      required />
    </label>
    <input type="button" id="btn_get_city_weather" value="Go">
  </form> -->
  <label for="city_input">Or enter a city
    <input type="text"
    class="city_input"
    id="city_input"
    :value="citySearchQuery"
    @input="$emit('updateCity', $event.target.value)"
    placeholder="City"
    required />
</label>
</template>

<script>
export default {
  name: 'CitySearch',
  props: ['citySearchQuery'],
  model: {
    prop: 'citySearchQuery',
    event: 'updateCity',
  },
  computed: {

  },
  // methods: {
  //   keyDownWeirdness() {
  //     console.log(123);
  //   },
  // },
};
</script>
