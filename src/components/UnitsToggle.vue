<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="units__toggle">
      <span class="units__text">Metric: °C, m/s</span>
      <div class="switch" @click="isChecked">
        <label for="units-checkbox" class="">
        <input type="checkbox" name="units" id="units-checkbox">
        <span class="slider round"></span>
        </label>
      </div>
      <span class="units__text">Imperial: °F, mph</span>
  </div>
</template>

<script>
export default {
  name: 'UnitsToggle',
  props: {
    units: String,
  },
  methods: {
    isChecked() {
      const checkBox = document.getElementById('units-checkbox');
      checkBox.checked
        ? console.log('Checked')
        : console.log('Not checked');
    },
  },
};
</script>
