<template>
  <div class="search-form__content">
    <label for="city__input" :error="error">
      <!-- The for attribute on label is not necessary if input is nested in it, but eslint swears :-) -->
      <input type="text" class="search-form__input" id="city__input" v-model="dataValue" :placeholder="placeholder" />
    </label>
    <span class="search-form__error text-s" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'SearchCity',
  props: {
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
