<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="col-xs-6">
          <h2 class="h3">
            <div><small>Price:</small></div>
            <div>{{ getPriceEntered }}</div>
          </h2>
        </div>
        <div class="col-xs-6">
          <h2 class="h3">
            <div><small>Total:</small></div>
            <div>{{ getRollingTotal }}</div>
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-9 col-md-3">
        <div class="btn-group btn-group-lg" role="group" aria-label="...">
          <my-calculate-number-button value="7"></my-calculate-number-button>
          <my-calculate-number-button value="8"></my-calculate-number-button>
          <my-calculate-number-button value="9"></my-calculate-number-button>
          <button type="button" value="+" v-on:click="setOperator($event)" class="btn btn-default">+</button>
        </div>
        <div class="btn-group btn-group-lg" role="group" aria-label="...">
          <my-calculate-number-button value="4"></my-calculate-number-button>
          <my-calculate-number-button value="5"></my-calculate-number-button>
          <my-calculate-number-button value="6"></my-calculate-number-button>
          <button type="button" value="-" v-on:click="setOperator($event)" class="btn btn-default">-</button>
        </div>
        <div class="btn-group btn-group-lg" role="group" aria-label="...">
          <my-calculate-number-button value="1"></my-calculate-number-button>
          <my-calculate-number-button value="2"></my-calculate-number-button>
          <my-calculate-number-button value="3"></my-calculate-number-button>
          <button type="button" class="btn btn-default">=</button>
        </div>
      </div>
    </div>
    {{ operatorClicked }}
    <div v-for="(val) in prices">
      {{val}}
    </div>

  </div>
</template>

<script>

import CalculatorNumberButton from './components/CalculatorNumberButton'

function formatCurrency (value) {
  // convert pence to pounds
  return '£' + ((Number(value / 100) || 0)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
}

export default {
  name: 'App',
  components: {'my-calculate-number-button': CalculatorNumberButton},
  computed: {
    getPriceEntered: function () {
      let value = this.clickedNumbers.join('') || 0;
      return formatCurrency(value)
    },
    getRollingTotal: function () {
      return formatCurrency(this.rollingTotal)
    }
  },
  data: function () {
    return {
      total: 0,
      rollingTotal: 0,
      prices: [],
      operatorClicked: '',
      clickedNumbers: []
    }
  },
  methods: {
    setOperator: function (event) {
      let operation =  this.operatorClicked = event.target.value,
        clickedNumbers = Number(this.clickedNumbers.join(''));

      // Add the numbers to a stack
      this.prices.push(clickedNumbers);

      if (operation === '+') {
        this.rollingTotal += clickedNumbers
      }else if (operation === '-') {
        this.rollingTotal -= clickedNumbers
      }
      this.clickedNumbers = []
    },
    getTempTotal: function () {
      return this.clickedNumbers.join('') || 0
    }
  }
}
//

//
// new Vue({
//   el: '#app',
//   data: {
//     total: 0,
//     rollingTotal: 0,
//     prices: [],
//     operatorClicked:'',
//     clickedNumbers: [],
//   },
//   computed: {
//     total: 0
//   },
//   computed:{
//     getPriceEntered: function(){
//       var value = this.clickedNumbers.join('') || 0;
//       return formatCurrency(value);
//     },
//     getRollingTotal: function(){
//       return formatCurrency(this.rollingTotal);
//     }
//   },
//   methods: {
//     setOperator: function (event){
//       var operation =  this.operatorClicked = event.target.value,
//         clickedNumbers = Number(this.clickedNumbers.join(''));
//
//       //Add the numbers to a stack
//       this.prices.push(clickedNumbers);
//
//       if (operation === "+"){
//         this.rollingTotal += clickedNumbers
//       }else if (operation === "-"){
//         this.rollingTotal -= clickedNumbers
//       }
//       this.clickedNumbers = [];
//     },
//     getTempTotal: function(){
//       return this.clickedNumbers.join('') || 0;
//     }
//   }
// })

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
