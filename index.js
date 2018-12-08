"use strict"

class timeChain {
   /**
    * @param {Number} delay 默认等待超时时间，单位ms
    */
   constructor({ delay = 0 }) {

      this.delay = delay
      this.tasks = new Map()
      this.timestamp = 0

   }
   /**
    * 设置key、value
    * @param {*} key 支持任意数据类型
    * @param {*} value 支持任意数据类型
    * @param {Number} delay 等待延时，可选
    */
   set(key, value, delay = this.delay) {

      let timestamp = Date.now() + delay

      // 当设定时间小于任务运行时间时，重置定时器
      if (timestamp < this.timestamp) {
         clearTimeout(this.timeout)
         this.timestamp = timestamp
         this.setTimeout(delay)
      }

      // 仅在定时队列为空时激活
      else if (this.tasks.size === 0) {
         this.setTimeout(delay)
      }

      return this.tasks.set(key, {
         value,
         timestamp
      })

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
   setTimeout(delay) {

      this.timeout = setTimeout(() => {

         let nowTime = Date.now()
         let keys = this.tasks.keys()

         for (let key of keys) {

            let { value, timestamp } = this.tasks.get(key)

            let delay = timestamp - nowTime

            if (delay > 0) {

               return this.setTimeout(delay)

            } else {

               // 执行回调函数
               if (key instanceof Function) {

                  try {
                     key(value)
                  } catch (error) {
                     throw error
                  }

               }

               this.tasks.delete(key)

            }

         }

      }, delay)

   }
}

module.exports = timeChain