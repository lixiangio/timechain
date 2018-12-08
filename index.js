"use strict"

class timeChain {
   /**
    * @param {Object} options 选项
    * @param {Number} options.delay 默认等待超时时间，单位ms
    */
   constructor({ delay = 0 }) {

      this.delay = delay
      this.tasks = []
      this.timestamp = Number.MAX_VALUE

   }
   /**
    * 设置key、value
    * @param {*} key 支持任意数据类型
    * @param {*} value 支持任意数据类型
    * @param {Number} delay 等待延时，可选
    */
   set(key, value, delay = this.delay) {

      let { tasks } = this

      let timestamp = Date.now() + delay

      // 当设定时间小于任务运行时间时，重置定时器
      if (timestamp < this.timestamp) {

         tasks.unshift([key, value, timestamp])

         this.timestamp = timestamp

         this.setTimeout()

      }

      // 按时间顺序插入数组
      else if (timestamp > this.timestamp) {

         for (let index in tasks) {
            let item = tasks[index]
            if (timestamp < item[2]) {
               tasks.splice(index, 0, [key, value, timestamp])
               break
            }
         }

      }

   }
   /**
    * 取值
    * @param {*} key 
    */
   get(key) {

      for (let [_key, value] of this.tasks) {
         if (key === _key) {
            return value
         }
      }

   }
   /**
    * 删除值
    * @param {*} key 
    */
   delete(key) {

      let { tasks } = this

      for (let index in tasks) {
         let item = tasks[index]
         if (item[0] === key) {
            return tasks.splice(index, 1)
         }
      }

   }
   /**
    * 清空任务队列，关闭定时器
    */
   clear() {

      this.tasks = []

   }
   /**
    * 递归循环触发时间队列，直至队列为空
    * @param {Number} delay 等待时间，单位ms
    */
   setTimeout() {

      let [task] = this.tasks

      if (!task) {

         this.timestamp = Number.MAX_VALUE
         
         return

      }

      let timestamp = task[2]

      let delay = timestamp - Date.now()

      if (delay > 0) {

         clearTimeout(this.timeout)

         this.timeout = setTimeout(() => {

            this.setTimeout()

         }, delay)

      } else {

         let [key, value] = task

         // 执行回调函数
         if (key instanceof Function) {

            try {
               key(value)
            } catch (error) {
               throw error
            }

         }

         this.tasks.splice(0, 1)

         this.setTimeout()

      }

   }
}

module.exports = timeChain