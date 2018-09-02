<template>
  <!--<button type="button"-->
          <!--v-bind:value="value"-->
          <!--v-on:click="digitClicked($event)"-->
          <!--class="btn btn-default">{{ value }}</button>-->
  <button type="button"
       class="button"
       v-on:click="digitClicked(value)"
       v-bind:class="['button-' + value]">
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    'value': String,
    'clickedNumbers': Array
  },
  methods: {
    digitClicked: function (digit) {
      this.$parent.clickedNumbers.push(digit)
    }
  }
}
</script>

<style>
</style>
