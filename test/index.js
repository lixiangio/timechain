let timeChain = require('..')

let timechain = new timeChain({ timeout: 3000 })

timechain.set(111, { a: 111 })

setTimeout(() => {

   console.log(1000, timechain.get(111))

}, 1000);

setTimeout(() => {

   console.log(2000, timechain.get(111))

}, 2000);

setTimeout(() => {

   console.log(3000, timechain.get(111))

}, 3000);

setTimeout(() => {

   console.log(5000, timechain.get(111))

}, 5000);

setTimeout(() => {

   console.log(2995, timechain.get(111))

}, 2995);