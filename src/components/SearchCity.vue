<template>
  <label for="city__input">
    <!-- The for attribute on label is not necessary if input is nested in it, but eslint swears :-) -->
    <input type="text" class="search-form__input" id="city__input" v-model="dataValue" :placeholder="placeholder" />
  </label>
</template>

<script>
export default {
  name: 'SearchCity',
  props: {
    placeholder: String,
    value: String,
  },
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
