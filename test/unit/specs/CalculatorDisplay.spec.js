// Import Vue and the component being tested
import Vue from 'vue'
import formatToCurrency from '@/filters/formatCurrency'
import CalculatorDisplay from '@/components/CalculatorDisplay'

let vm

describe('CalculatorDisplay', () => {
  function setVm (Component, propsData) {
    Vue.filter('formatCurrency', formatToCurrency.formatCurrency)
    const Constructor = Vue.extend(Component)
    vm = new Constructor({ propsData: propsData }).$mount()
  }

  beforeEach(function () {
    setVm(CalculatorDisplay, {
      price: 5577,
      total: 45678
    })
  })

  // Inspect the raw component options
  it('has a promptClearPrice method', () => {
    expect(CalculatorDisplay.methods.promptClearPrice).to.be.a('function')
  })

  it('has a promptClearTotals method', () => {
    expect(CalculatorDisplay.methods.promptClearTotals).to.be.a('function')
  })

  it('renders correctly with default props', () => {
    setVm(CalculatorDisplay, {
      price: 0,
      total: 0
    })

    expect(vm.$el.textContent).to.equal('Price: £0.00 Total: £0.00')
  })

  it('renders correctly with different props', () => {
    expect(vm.$el.textContent).to.equal('Price: £55.77 Total: £456.78')
  })

  // it('clears the values', () => {
  //   vm.find('.h3--price').click()
  // })
})
