// Import Vue and the component being tested
import Vue from 'vue'
import CalculatorDisplay from '@/components/CalculatorDisplay'

describe('CalculatorDisplay', () => {

  // helper function that mounts and returns the rendered text
  function getRenderedText (Component, propsData) {
    const Constructor = Vue.extend(Component)
    const vm = new Constructor({ propsData: propsData }).$mount()
    return vm.$el.textContent
  }

  // Inspect the raw component options
  it('has a clearTotals hook', () => {
    expect(CalculatorDisplay.methods.clearTotals).to.be.a('function')
  })

  it('renders correctly with different props', () => {
    console.log(getRenderedText(CalculatorDisplay, {
      clickedNumbers: [],
      rollingTotal: 0
    }))
    expect(getRenderedText(CalculatorDisplay, {
      clickedNumbers: [],
      rollingTotal: 0
    })).to.equal('£0.00')

    // expect(getRenderedText(CalculatorDisplay, {
    //   msg: 'Bye'
    // })).toBe('Bye')
  })


  // // Evaluate the results of functions in
  // // the raw component options
  // it('sets the correct default data', () => {
  //   expect(typeof MyComponent.data).toBe('function')
  //   const defaultData = MyComponent.data()
  //   expect(defaultData.message).toBe('hello!')
  // })
  //
  // // Inspect the component instance on mount
  // it('correctly sets the message when created', () => {
  //   const vm = new Vue(MyComponent).$mount()
  //   expect(vm.message).toBe('bye!')
  // })
  //
  // // Mount an instance and inspect the render output
  // it('renders the correct message', () => {
  //   const Constructor = Vue.extend(MyComponent)
  //   const vm = new Constructor().$mount()
  //   expect(vm.$el.textContent).toBe('bye!')
  // })
})
