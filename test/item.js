let test = require('jtf')
let timeChain = require('..')
let { zPromise } = require('./helpers/')

test('单项时间设定', async t => {

   let timechain = new timeChain({ delay: 1000 })
   
   let p1 = new zPromise()

   timechain.set(function(value){
      p1.resolve(value)
   }, true, 5000)

   t.deepEqual(true, await p1);

})