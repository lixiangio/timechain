let test = require('jtf')
let timeChain = require('..')
let { zPromise } = require('./helpers/')

test('单项测试', async t => {

   let timechain = new timeChain({ timeout: 1000 })
   
   let p1 = new zPromise()

   timechain.set(function(value){
      p1.resolve(value)
   }, 999, Date.now() + 5000)

   t.deepEqual(999, await p1);

});