<template>
  <label for="city__input" :error="error">
    <span class="form__title">{{ title }}</span>
    <input type="text" class="city__input" id="city__input" v-model="dataValue" :placeholder="placeholder" />
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'SearchCity',
  props: {
    title: String,
    error: String,
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
  methods: {
    enterKeyTest() {
      console.log('Oh, crap!');
    },
  },
};
</script>
