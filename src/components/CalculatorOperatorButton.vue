<template>
  <div type="button"
       class="button"
       role = "button"
       v-bind:class="getStyleClass(value)"
       v-on:click="sendOperator(value);getStyleClass(value);">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userClick: {}
    }
  },
  props: {
    'classname': String,
    'value': String,
    'clickedNumbers': Array,
    'operatorClicked': String,
    'prices': Array
  },
  methods: {
    getStyleClass: function (operator) {
      return {
        'operator-selected': this.$parent.operatorClicked === operator && operator !== '=',
        'button-add': operator === '+',
        'button-minus': operator === '-',
        'button-eq': operator === '='
      }
    },
    sendOperator: function (operator) {
      this.$emit('userSetOperator', operator)
    }
  }
}
</script>

<style lang="scss" >

.button-add {
  grid-column: 4 / -1;
  grid-row: 3 / span 2;
  align-self: center;
  height: 100%;
}

.operator-selected {
  background-color: #9E5DAA;
  color: #000;
  font-weight: bold;
  &:hover {
    background-color: #9E5DAA;
  }
}
</style>
