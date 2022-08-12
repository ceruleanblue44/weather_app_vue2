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
  <label for="city__input" :title="title" :error="error">Or enter a city
    <input type="text"
    class="city__input"
    id="city__input"
    v-model="dataValue"
    :placeholder="placeholder"
    required />
    <span class="form__error" v-if="error">{{ error }}</span>
</label>
</template>

<script>
export default {
  name: 'SearchCity',
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
