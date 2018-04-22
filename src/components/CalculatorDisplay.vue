<template>
  <div class="calc-display">
    <h2 class="h3">
      <small>Price:</small>
      <div>{{ getPriceEntered }}</div>
    </h2>
    <h2 class="h3 h3--right-aligned">
      <small>Total:</small>
      <div>{{ getRollingTotal }}</div>
    </h2>
  </div>
</template>

<script>
function formatCurrency (value) {
  // convert pence to pounds
  return '£' + ((Number(value / 100) || 0)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
}

export default {
  props: ['clickedNumbers', 'rollingTotal'],
  computed: {
    getPriceEntered: function () {
      console.log(this);
      let value = this.$parent.clickedNumbers.join('') || 0;
      return formatCurrency(value)
    },
    getRollingTotal: function () {
      return formatCurrency(this.$parent.rollingTotal)
    }
  }
}
</script>

<style lang="scss">
.calc-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.h3 div {
  font-size: 1.5em;
}

.h3--right-aligned {

  text-align: right;
}

small {
  color: #696969 ;
  color: floralwhite;
  font-weight: 100;
  font-size: 1.2em;
}

</style>
