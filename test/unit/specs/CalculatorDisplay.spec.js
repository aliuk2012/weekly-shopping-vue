import Vue from 'vue'
import CalculatorDisplay from '@/components/CalculatorDisplay'

describe('CalculatorDisplay.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CalculatorDisplay)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
