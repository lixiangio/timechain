"use strict"

let test = require('jtf')
let timeChain = require('..')

test('回调函数', async t => {

   let { zPromise } = require('./helpers/')

   let timechain = new timeChain({ delay: 3000 })

   let promise = new zPromise()

   function callback(value) {
      promise.resolve(value)
   }

   timechain.set(callback, 1)

   t.deepEqual(timechain.get(callback), 1)

   t.deepEqual(await promise, 1)

   t.deepEqual(timechain.get(callback), undefined)

})