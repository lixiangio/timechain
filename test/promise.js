let timeChain = require('..')

let timechain = new timeChain({ timeout: 3000 })

let reject1
new Promise(function(resolve, reject) {
   reject1 = reject
}).catch(function(error){
   console.error(error)
})

let reject2
new Promise(function(resolve, reject) {
   reject2 = reject
}).catch(function(error){
   console.error(error)
})

timechain.set(reject1, 111)

timechain.set(reject2, 222)