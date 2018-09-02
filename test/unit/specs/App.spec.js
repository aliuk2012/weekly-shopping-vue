// Import Vue and the component being tested
import Vue from 'vue'
import formatToCurrency from '@/filters/formatCurrency'
import App from '@/App'
import VueLocalStorage from 'vue-localstorage'

let vm

describe('App', () => {
  function setVm (Component, propsData) {
    Vue.filter('formatCurrency', formatToCurrency.formatCurrency)
    Vue.use(VueLocalStorage, {
      name: 'ls'
    })
    const Constructor = Vue.extend(Component)
    vm = new Constructor({ propsData: propsData }).$mount()
  }

  beforeEach(function () {
    setVm(App, {})
  })

  // Inspect the raw component options
  it('has a setOperator method', () => {
    expect(App.methods.setOperator).to.be.a('function')
  })

  it('has a getPrice method', () => {
    expect(App.methods.getPrice).to.be.a('function')
  })

  it('has a addPrice method', () => {
    expect(App.methods.addPrice).to.be.a('function')
  })

  it('has a subtractPrice method', () => {
    expect(App.methods.subtractPrice).to.be.a('function')
  })

  it('has a clearPrice method', () => {
    expect(App.methods.clearPrice).to.be.a('function')
  })

  it('has a getTotal method', () => {
    expect(App.methods.getTotal).to.be.a('function')
  })

  it('has a clearTotal method', () => {
    expect(App.methods.clearTotal).to.be.a('function')
  })

  describe('#getPrice', () => {
    it('return 0 by default', () => {
      setVm(App, {})
      expect(vm.getPrice()).to.equal(0)
    })

    it('returns a price in that all the clickedNumbers represent in pennies', () => {
      setVm(App, {})
      vm.clickedNumbers = [1, 2, 3, 4]
      expect(vm.getPrice()).to.equal(1234)
    })
  })

  describe('#getTotal', () => {
    it('return 0 by default', () => {
      setVm(App, {})
      expect(vm.getTotal()).to.equal(0)
    })

    it('returns a total in that all the rollingTotal represent in pennies', () => {
      setVm(App, {})
      vm.rollingTotal = 40
      expect(vm.getTotal()).to.equal(40)
    })
  })

  describe('#addPrice', () => {
    it('adds price to rolling total', () => {
      setVm(App, {})
      vm.rollingTotal = 0
      expect(vm.addPrice(22)).to.equal(22)
    })

    it('should return negative', () => {
      setVm(App, {})
      vm.rollingTotal = 3
      expect(vm.addPrice(-4)).to.equal(-1)
    })
  })

  describe('#subtractPrice', () => {
    it('subtracts price from rolling total', () => {
      setVm(App, {})
      vm.rollingTotal = 10
      expect(vm.subtractPrice(6)).to.equal(4)
    })

    it('should return positve for negative', () => {
      setVm(App, {})
      vm.rollingTotal = 3
      expect(vm.subtractPrice(-4)).to.equal(7)
    })

    it('should return negative', () => {
      setVm(App, {})
      vm.rollingTotal = 3
      expect(vm.subtractPrice(4)).to.equal(-1)
    })
  })

  describe('#clearPrice', () => {
    it('clears temporary price', () => {
      setVm(App, {})
      vm.clickedNumbers = [1, 2, 3]
      vm.clearPrice()
      expect(vm.clickedNumbers).to.be.empty
    })
  })

  describe('#clearTotal', () => {
    it('clears all prices', () => {
      setVm(App, {})
      vm.prices = [1, 2, 3]
      vm.clearTotal()
      expect(vm.prices).to.be.empty
    })

    it('clears all rolling total', () => {
      setVm(App, {})
      vm.rollingTotal = 2000
      vm.clearTotal()
      expect(vm.rollingTotal).to.equal(0)
    })
  })

  describe('#setOperator', () => {
    describe('addition', () => {
      it('calls addPrice', () => {
        setVm(App, {})
        let spy = sinon.spy(vm, 'addPrice')
        let resetSpy = sinon.spy(vm, 'clearPrice')
        vm.clickedNumbers = [1, 2, 3, 4]
        vm.setOperator('+')
        expect(spy.calledOnce).to.be.true
        expect(resetSpy.calledOnce).to.be.true
        expect(vm.prices).to.deep.equal([1234])
        expect(vm.operatorClicked).to.equal('+')
      })
    })

    describe('subtraction', () => {
      it('calls subtractPrice', () => {
        setVm(App, {})
        let spy = sinon.spy(vm, 'subtractPrice')
        let resetSpy = sinon.spy(vm, 'clearPrice')
        vm.clickedNumbers = [1, 2, 3, 4]
        vm.operatorClicked = '-'
        vm.setOperator('-')
        expect(spy.calledOnce).to.be.true
        expect(resetSpy.calledOnce).to.be.true
        expect(vm.prices).to.deep.equal([-1234])
        expect(vm.operatorClicked).to.equal('-')
      })
    })

    describe('equals', () => {
      it('calls addPrice', () => {
        setVm(App, {})
        let spy = sinon.spy(vm, 'addPrice')
        let resetSpy = sinon.spy(vm, 'clearPrice')
        vm.clickedNumbers = [1, 2, 3, 4]

        vm.setOperator('=')
        expect(spy.calledOnce).to.be.true
        expect(resetSpy.calledOnce).to.be.true
        expect(vm.prices).to.deep.equal([1234])
        expect(vm.operatorClicked).to.equal('')
      })

      describe('subtraction', () => {
        it('calls subtractPrice', () => {
          setVm(App, {})
          let spy = sinon.spy(vm, 'subtractPrice')
          let resetSpy = sinon.spy(vm, 'clearPrice')
          vm.clickedNumbers = [1, 2, 3, 4]
          vm.operatorClicked = '-'
          vm.setOperator('=')
          expect(spy.calledOnce).to.be.true
          expect(resetSpy.calledOnce).to.be.true
          expect(vm.prices).to.deep.equal([-1234])
          expect(vm.operatorClicked).to.equal('')
        })
      })
    })
  })
})
