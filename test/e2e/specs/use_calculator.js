// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'calculator is displayed': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('.calc-display')
      .assert.elementPresent('.calc-grid')
  },
  'using the calculator - adding two numbers': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('body', 5000)
      .click('.button-1')
      .click('.button-2')
      .click('.button-3')
      .click('.button-4')
      .assert.containsText('.calc-display .h3--price div', '£12.34')
      .click('.button-add')
      .assert.cssClassPresent('.button-add', 'operator-selected')
      .click('.button-5')
      .click('.button-6')
      .click('.button-7')
      .click('.button-8')
      .click('.button-9')
      .click('.button-0')
      .assert.containsText('.calc-display .h3--price div', '£5,678.90')
      .click('.button-eq')
      .assert.containsText('.calc-display .h3--total div', '£5,691.24')
      .assert.cssClassNotPresent('.button-add', 'operator-selected')
      .assert.cssClassNotPresent('.button-eq', 'operator-selected')
      .assert.containsText('.calc-display .h3--price div', '£0.00')
  },
  'using the calculator - subtract two numbers': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('body', 5000)
      .click('.h3--total')
      .pause(500)
      .acceptAlert()
      .click('.button-5')
      .click('.button-6')
      .click('.button-7')
      .click('.button-8')
      .click('.button-9')
      .click('.button-0')
      .assert.containsText('.calc-display .h3--price div', '£5,678.90')
      .click('.button-minus')
      .click('.button-1')
      .click('.button-2')
      .click('.button-3')
      .click('.button-4')
      .assert.cssClassPresent('.button-minus', 'operator-selected')
      .assert.containsText('.calc-display .h3--price div', '£12.34')
      .click('.button-eq')
      .assert.containsText('.calc-display .h3--total div', '£5,666.56')
      .assert.cssClassNotPresent('.button-minus', 'operator-selected')
      .assert.cssClassNotPresent('.button-eq', 'operator-selected')
      .assert.containsText('.calc-display .h3--price div', '£0.00')
      .end()
  }
}
