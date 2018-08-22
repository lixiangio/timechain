let test = require('ava')
let timeChain = require('..')
let { zPromise } = require('./helpers/')

let timechain = new timeChain({ timeout: 1000 })

test('单项测试', async t => {

   let p1 = new zPromise()

   timechain.set(function(value){
      p1.resolve(value)
   }, 999, Date.now() + 5000)

   t.deepEqual(999, await p1);

});