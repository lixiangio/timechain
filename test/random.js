let test = require('jtf')
let timeChain = require('..')

test('随机值序列', async t => {

   let timechain = new timeChain({ delay: 3000 })

   for (let i = 0; i < 100; i++) {
      let rundom = Math.floor(Math.random() * 10000)
      timechain.set(i, { v: i }, rundom)
   }

   let last = 0
   for (let item of timechain.tasks) {
      if (last > item[2]) {
         t.deepEqual(last, item[2])
         return
      }
      last = item[2]
   }

   t.ok(true)

})