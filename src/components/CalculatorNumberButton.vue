<template>
  <button type="button"
          v-bind:value="value"
          v-on:click="digitClicked($event)"
          class="btn btn-default">{{ value }}</button>
</template>

<script>
export default {
  props: {
    'value': String,
    'clickedNumbers': Array
  },
  methods: {
    digitClicked: function (event) {
      console.log(this)
      this.$parent.clickedNumbers.push(event.target.value)
    }
  }
}
</script>

<style>
</style>
