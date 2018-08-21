"use strict"

class timeChain {
   /**
    * 
    * @param {Number} timeout 默认超时
    */
   constructor(options = {}) {

      let { timeout = 0 } = options

      this.timeout = timeout
      this.tasks = new Map()

   }
   /**
    * 设置key、value
    * @param {*} key 保存key，允许任意值
    * @param {*} value 保存value，允许任意值
    */
   set(key, value, timestamp) {

      // 仅在定时队列为空时允许启动
      if (this.tasks.size === 0) {

         this.run(this.timeout)

      }

      if (!timestamp) {
         timestamp = Date.now() + this.timeout
      }

      return this.tasks.set(key, { value, timestamp })

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
    * 递归循环触发时间队列,，直至队列为空
    * @param {Number} timeout 等待时间，单位ms
    */
   run(timeout) {

      setTimeout(() => {

         let keys = this.tasks.keys()

         for (let key of keys) {
            let { value, timestamp } = this.tasks.get(key)
            let timeout = timestamp - Date.now()
            if (timeout > 0) {
               this.run(timeout)
               return
            } else {
               if (key instanceof Function) {
                  key(value)
               }
               this.tasks.delete(key)
            }
         }

      }, timeout);

   }
}

module.exports = timeChain