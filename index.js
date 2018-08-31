"use strict"

class timeChain {
   /**
    * 
    * @param {Number} delay 默认超时
    */
   constructor(options = {}) {

      let { delay = 0 } = options

      this.delay = delay
      this.timeout = { _called: true }
      this.tasks = new Map()

   }
   /**
    * 设置key、value
    * @param {*} key 保存key，允许任意值
    * @param {*} value 保存value，允许任意值
    * @param {Number} delay 等待延时，可选
    */
   set(key, value, delay) {

      if (!delay) {
         delay = this.delay
      }

      // 仅在定时器called后激活
      if (this.timeout._called === true) {
         this.run(delay)
      }

      // 仅在定时队列为空时激活，非node.js环境使用
      // if (this.tasks.size === 0) {
      //    this.run(delay)
      // }

      return this.tasks.set(key, { value, timestamp: Date.now() + delay })

   }
   /**
    * 取值
    * @param {*} key 
    */
   get(key) {

      let value = this.tasks.get(key)

      if (value) {
         return value.value
      }

   }
   delete(key) {

      return this.tasks.delete(key)

   }
   clear() {

      return this.tasks.clear()

   }
   /**
    * 递归循环触发时间队列，直至队列为空
    * @param {Number} delay 等待时间，单位ms
    */
   run(delay) {

      this.timeout = setTimeout(() => {

         let now = Date.now()
         let keys = this.tasks.keys()

         for (let key of keys) {
            let { value, timestamp } = this.tasks.get(key)
            let delay = timestamp - now
            if (delay > 0) {
               this.run(delay)
               return
            } else {
               if (key instanceof Function) {
                  key(value)
               }
               this.tasks.delete(key)
            }
         }

      }, delay);

   }
}

module.exports = timeChain