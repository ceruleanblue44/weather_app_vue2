<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="units__toggle">
      <span class="units__text text-xs">Metric:<br /> °C,&nbsp;m/s</span>
      <!-- <div class="switch" @click="isChecked"> -->
      <div class="switch">
        <label for="units-checkbox" class="">
        <input type="checkbox" name="units" id="units-checkbox" @change="toggle">
        <span class="slider round"></span>
        </label>
      </div>
      <span class="units__text text-xs">Imperial:<br /> °F,&nbsp;mph</span>
  </div>
</template>

<script>
export default {
  name: 'UnitsToggleButton',
  data() {
    return {
      isToggled: false,
    };
  },
  methods: {
    toggle() {
      this.isToggled = !this.isToggled;
      this.$emit('toggle-units', this.isToggled);
    },
  },
};
</script>
