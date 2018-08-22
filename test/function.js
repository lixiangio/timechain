let test = require('ava')
let timeChain = require('..')
let { zPromise } = require('./helpers/')

let timechain = new timeChain({ timeout: 3000 })

test('执行函数', async t => {

   let p1 = new zPromise()
   let p2 = new zPromise()
   let p3 = new zPromise()

   timechain.set(function (value) {
      p1.resolve(value)
   }, 1)

   t.deepEqual(1, await p1);


   timechain.set(function (value) {
      p2.resolve(value)
   }, 2)

   t.deepEqual(2, await p2);


   timechain.set(function (value) {
      p3.resolve(value)
   }, { a: 1 })

   t.deepEqual({ a: 1 }, await p3);

});