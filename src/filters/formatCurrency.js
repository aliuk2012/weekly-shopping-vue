export default {
  formatCurrency: (value) => {
    if (!value) return '£0.00'
    return '£' + (Number(value / 100)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
  }
}
