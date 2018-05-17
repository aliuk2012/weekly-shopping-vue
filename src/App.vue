<template>
  <div class="container">
    <my-calculator-display :price="getPrice()"
                           @clearPrice="clearPrice()"
                           :total="getTotal()"
                           @clearTotal="clearTotal()"></my-calculator-display>
    <div class="calc-grid">
      <my-calculate-number-button value="7"></my-calculate-number-button>
      <my-calculate-number-button value="8"></my-calculate-number-button>
      <my-calculate-number-button value="9"></my-calculate-number-button>
      <my-calculate-operator-button value="=" @userSetOperator="setOperator($event)">=</my-calculate-operator-button>
      <my-calculate-number-button value="4"></my-calculate-number-button>
      <my-calculate-number-button value="5"></my-calculate-number-button>
      <my-calculate-number-button value="6"></my-calculate-number-button>
      <my-calculate-operator-button value="-" @userSetOperator="setOperator($event)">-</my-calculate-operator-button>
      <my-calculate-number-button value="1"></my-calculate-number-button>
      <my-calculate-number-button value="2"></my-calculate-number-button>
      <my-calculate-number-button value="3"></my-calculate-number-button>
      <my-calculate-operator-button value="+" @userSetOperator="setOperator($event)">+</my-calculate-operator-button>
      <my-calculate-number-button value="0"></my-calculate-number-button>
    </div>

    <div>
      <ul>
        <li v-for="(val,index) in prices" v-bind:key="`price-${index}`">
          {{ val | formatCurrency }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CalculatorDisplay from './components/CalculatorDisplay'
import CalculatorNumberButton from './components/CalculatorNumberButton'
import CalculatorOperatorButton from './components/CalculatorOperatorButton'

export default {
  name: 'App',
  components: {
    'my-calculator-display': CalculatorDisplay,
    'my-calculate-number-button': CalculatorNumberButton,
    'my-calculate-operator-button': CalculatorOperatorButton
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
    setOperator: function (value) {
      let operation = value
      let newPrice = Number(this.clickedNumbers.join(''))

      // if first operation default to positive number
      if (this.operatorClicked === '') {
        this.operatorClicked = '+'
      }

      // Adding
      if (this.operatorClicked === '+') {
        this.rollingTotal = this.addPrice(newPrice)
        // Add only if there is a price
        if (newPrice !== 0) {
          this.prices.push(newPrice)
        }
      }

      // Subtracting
      if (this.operatorClicked === '-') {
        this.rollingTotal = this.subtractPrice(newPrice)
        // Add only if there is a price
        if (newPrice !== 0) {
          this.prices.push(newPrice * -1)
        }
      }

      // Set previously clicked operator if its not '='
      if (operation !== '=') {
        this.operatorClicked = operation
      } else {
        this.operatorClicked = ''
      }
      this.clearPrice()
    },
    getPrice: function () {
      return Number(this.clickedNumbers.join('')) || 0
    },
    addPrice: function (newPrice) {
      return this.rollingTotal + newPrice
    },
    subtractPrice: function (newPrice) {
      return this.rollingTotal - newPrice
    },
    clearPrice: function () {
      this.clickedNumbers = []
    },
    getTotal: function () {
      return this.rollingTotal
    },
    clearTotal: function () {
      this.prices = []
      this.rollingTotal = 0
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: floralwhite;
  margin-top: 60px;
}

.container {
  max-width: 750px;
  min-width: 200px;
}

.calc-grid {
  display: grid;
  justify-content: center;
  grid-template-columns: [cal-left] 1fr [cal-center] 1fr [cal-right] 1fr [operations] 1fr;
  grid-template-rows: [top-row] 1fr [mid-1] 1fr [mid-2] 1fr [bottom] 1fr;
  grid-gap: 10px;
}

.button {
  background-color: darken(#9E5DAA,20%);
  font-size: 3em;
  font-weight: 100;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 1em;
  color: floralwhite;
  letter-spacing: 2px;

  &:hover{
    background-color: lighten( #9E5DAA, 10%);
    color: #000;
    font-weight: bold;
  }
}

.button-0 {
  grid-column: 1 / span 3;
}

  ul {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-gap: 10px;
    list-style-type: none;
    padding: 0;
  }
  ul li {
    font-size: 2em;
    letter-spacing: 1px;
  }

</style>
