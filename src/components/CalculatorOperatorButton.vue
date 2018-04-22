<template>
  <div type="button"
       class="button"
       role = "button"
       v-bind:class="getStyleClass(value)"
       v-on:click="setOperator(value); getStyleClass(value)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    'classname': String,
    'value': String,
    'clickedNumbers': Array,
    'operatorClicked': String,
    'prices': Array
  },
  methods: {
    setOperator: function (value) {
      let operation = value,
        clickedNumbers = Number(this.$parent.clickedNumbers.join(''));

      if (operation !== '='){
        this.$parent.operatorClicked = value;
      }

      // Add the numbers to a stack
      this.$parent.prices.push(clickedNumbers);

      if (operation === '+') {
        this.$parent.rollingTotal += clickedNumbers
      } else if (operation === '-') {
        this.$parent.rollingTotal -= clickedNumbers
      } else if (operation === '=') {
        console.log('eq');
        if (this.$parent.operatorClicked === '+') {
          console.log('add');
          this.$parent.rollingTotal += clickedNumbers;
        } else if (this.$parent.operatorClicked === '-') {
          console.log('minus');
          this.$parent.rollingTotal -= clickedNumbers;
        }
        this.$parent.operatorClicked = '';
      }
      this.$parent.clickedNumbers = []
    },

    getStyleClass: function (operator){
      return {
        'operator-selected': this.$parent.operatorClicked == operator && this.$parent.operatorClicked != "=",
        'button-add': operator === '+'
      }
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
