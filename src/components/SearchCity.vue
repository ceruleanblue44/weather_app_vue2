<template>
  <!-- <div class="search-form__content"> -->
    <label for="city__input">
      <!-- The for attribute on label is not necessary if input is nested in it, but eslint swears :-) -->
      <input type="text" class="search-form__input" id="city__input" v-model="dataValue" :placeholder="placeholder" />
    </label>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'SearchCity',
  props: {
    // error: String,
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
