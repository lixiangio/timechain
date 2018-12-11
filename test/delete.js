"use strict"

let test = require('jtf')
let timeChain = require('..')

test('删除', async t => {

   let timechain = new timeChain({ delay: 3000 })

   for (let i = 0; i < 100; i++) {
      let rundom = Math.floor(Math.random() * 10000)
      timechain.set(i, { v: i }, rundom)
   }

   t.deepEqual({ v: 50 }, timechain.delete(50))

   t.deepEqual(undefined, timechain.delete(50))

   t.deepEqual({ v: 51 }, timechain.delete(51))

   t.deepEqual(undefined, timechain.delete(51))

   t.deepEqual({ v: 52 }, timechain.delete(52))

   t.deepEqual(undefined, timechain.delete(52))

})