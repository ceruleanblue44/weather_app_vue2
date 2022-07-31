<template>
    <form>
    <label for="city_input">Or enter a city
      <input type="text"
      class="city_input"
      id="city_input"
      placeholder="City"
      required />
    </label>

    <input type="button" id="btn_get_city_weather" value="Go">
  </form>
</template>

<script>
export default {
  name: 'CitySearch',
};
</script>
