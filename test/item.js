let timeChain = require('..')

let timechain = new timeChain({ timeout: 1000 })

timechain.set(function(){
   console.log(999)
}, undefined, Date.now() + 5000)