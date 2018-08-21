let timeChain = require('..')

let timechain = new timeChain({ timeout: 3000 })

timechain.set(function (value) {

   console.log(value)
   
}, 111)

timechain.set(function (value) {

   console.log(value)
   
}, 222)

timechain.set(function (value) {

   console.log(value)
   
}, 333)