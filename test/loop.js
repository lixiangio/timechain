"use strict"

let test = require('jtf')
let timeChain = require('..')
let { sleep } = require('./helpers')

test('同步循环', async t => {

   let timechain = new timeChain({ delay: 3000 })

   for (let i = 0; i < 500; i++) {
      timechain.set(i, { v: i })
   }

   t.deepEqual(500, timechain.tasks.length)

   t.ok(timechain.get(50))

   await sleep(3010)

   t.ok(!timechain.get(200))

   t.deepEqual(0, timechain.tasks.length)

})


test('延时循环', async t => {

   let timechain = new timeChain({ delay: 3000 })

   for (let i = 0; i < 500; i++) {
      await sleep(10)
      timechain.set(i, { v: i })
   }

   await sleep(1000)

   t.ok(timechain.get(450))

})