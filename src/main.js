// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import formatCurrency from './filters/formatCurrency'

Vue.config.productionTip = false

Vue.filter('formatCurrency', formatCurrency.formatCurrency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
