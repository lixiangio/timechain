const test = require('jtf')
const timeChain = require('..')

test('随机值序列', async t => {

   const timechain = new timeChain({ delay: 3000 })

   for (let i = 10; i < 100; i++) {
      let rundom = Math.floor(Math.random() * 10000)
      timechain.set(i, { v: 8 }, rundom)
   }

   let last = 0;
   for (let item of timechain.tasks) {
      if (last > item[2]) {
         t.deepEqual(last, item[2]);
         return
      }
      last = item[2];
   }

   t.ok(true)

})