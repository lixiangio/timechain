const zPromise = require('zpromise')

module.exports = {
   zPromise,
   sleep(time = 0) {
      return new Promise(resolve => setTimeout(resolve, time))
    },
}