"use strict"

let test = require('jtf')
let timeChain = require('..')

test('回调函数', async t => {

   let { zPromise } = require('./helpers/')

   let timechain = new timeChain({ delay: 3000 })

   let p1 = new zPromise()
   let p2 = new zPromise()

   timechain.set(function (value) {
      p1.resolve(value)
   }, 1)

   t.deepEqual(1, await p1)

   timechain.set(function (value) {
      p2.resolve(value)
   }, 2)

   t.deepEqual(2, await p2)

})