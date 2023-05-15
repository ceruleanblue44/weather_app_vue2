<template>
  <label for="city__input">
    <!-- The for attribute on label is not necessary if input is nested in it, but eslint swears :-) -->
    <input type="text" class="search-form__input" id="city__input" v-model="dataValue" :placeholder="placeholder" />
  </label>
</template>

<script>
export default {
  // compatConfig: {
  //   // COMPONENT_V_MODEL: false,
  //   // or, for full vue 3 compat in this component:
  //   MODE: 3,
  // },
  name: 'SearchCity',
  props: {
    placeholder: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  computed: {
    dataValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
