<template>
  <div class="calc-display">
    <h2 class="h3 h3--price" @click="clearTotals('price');">
      <small>Price:</small>
      <div>{{ getPriceEntered }}</div>
    </h2>
    <h2 class="h3 h3--total" @click="clearTotals('total');">
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
      let value = this.$parent.clickedNumbers.join('') || 0
      return formatCurrency(value)
    },
    getRollingTotal: function () {
      return formatCurrency(this.$parent.rollingTotal)
    }
  },
  methods: {
    clearTotals: function (clearValue) {
      let confirmMsg = ''

      if (clearValue === 'total') {
        confirmMsg = 'Clear the totals?'
      } else {
        confirmMsg = 'Clear the values you entered?'
      }

      if (confirm(confirmMsg)) {
        if (clearValue === 'total') {
          this.$parent.prices = []
          this.$parent.rollingTotal = 0
        } else if (clearValue === 'price') {
          this.$parent.clickedNumbers = []
        }
      }
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

.h3--total {
  text-align: right;
}

small {
  color: #696969 ;
  color: floralwhite;
  font-weight: 100;
  font-size: 1.2em;
}

</style>
