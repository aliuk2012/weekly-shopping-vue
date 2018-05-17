<template>
  <div class="calc-display">
    <h2 class="h3 h3--price" @click="promptClearPrice();">
      <small>Price:</small>
      <div>{{ price | formatCurrency }}</div>
    </h2>
    <h2 class="h3 h3--total" @click="promptClearTotals();">
      <small>Total:</small>
      <div>{{ total | formatCurrency }}</div>
    </h2>
  </div>
</template>

<script>

export default {
  props: {
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    promptClearPrice: function () {
      if (confirm('Clear the values you entered?')) {
        this.$emit('clearPrice')
      }
    },
    promptClearTotals: function (clearValue) {
      if (confirm('Clear the totals?')) {
        this.$emit('clearTotal')
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
