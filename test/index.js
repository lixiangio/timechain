let test = require('ava')
let timeChain = require('..')
let { sleep } = require('./helpers/')

let timechain = new timeChain({ timeout: 3000 })

timechain.set(666, { a: 1 })

test('main', async t => {

   await sleep(1000)

   t.deepEqual({ a: 1 }, timechain.get(666));

   await sleep(1000)

   t.deepEqual({ a: 1 }, timechain.get(666));

   await sleep(1000)

   t.deepEqual(undefined, timechain.get(666));

   await sleep(1000)

   t.deepEqual(undefined, timechain.get(666));

   // setTimeout(() => {

   //    console.log(2995, timechain.get(111))

   // }, 2995);
   
})