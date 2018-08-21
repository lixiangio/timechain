let timeChain = require('..')

let timechain = new timeChain({ timeout: 1000 })

timechain.set(function(value){
   console.log(value)
}, 999, Date.now() + 5000)