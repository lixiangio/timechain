"use strict"

class timeChain {
   /**
    * @param {Object} options 选项
    * @param {Number} options.delay 默认等待超时时间，单位ms
    */
   constructor({ delay = 0 }) {

      this.delay = delay;
      this.tasks = [];
      this.runtimestamp = Number.MAX_VALUE;

   }
   /**
    * 设置key、value
    * @param {*} key 支持任意数据类型
    * @param {*} value 支持任意数据类型
    * @param {Number} delay 等待延时，可选
    */
   set(key, value, delay = this.delay) {

      const { tasks } = this;

      const { length } = tasks;

      const timestamp = Date.now() + delay;

      if (length) {

         // 设定时间大于任务运行时间
         if (timestamp > this.runtimestamp) {

            // 反向遍历，按时间由大到小顺序插入数组（可以用二分法提升性能）
            for (let index = length - 1; index >= 0; index--) {

               const item = tasks[index];
               if (timestamp > item[2]) {
                  tasks.splice(index + 1, 0, [key, value, timestamp]);
                  return
               }

            }
   
         }
   
         // 设定时间小于任务运行时间
         else if (timestamp < this.runtimestamp) {
   
            tasks.unshift([key, value, timestamp]);
   
            // 重置运行时间
            this.runtimestamp = timestamp;
   
            this.setTimeout();
   
         }
   
         else {
   
            tasks.splice(1, 0, [key, value, timestamp]);
   
         }

      } else {

         this.runtimestamp = timestamp;
         
         tasks.push([key, value, timestamp]);

         this.setTimeout();

      }

   }
   /**
    * 取值
    * @param {*} key 
    */
   get(key) {

      for (const [_key, value] of this.tasks) {
         if (key === _key) {
            return value;
         }
      }

   }
   /**
    * 删除值
    * @param {*} key 
    */
   delete(key) {

      const { tasks } = this;

      for (const index in tasks) {

         const item = tasks[index];
         if (item[0] === key) {
            const [task] = tasks.splice(index, 1);
            return task[1];
         }

      }

   }
   /**
    * 清空任务队列，关闭定时器
    */
   clear() {

      this.tasks = [];

   }
   /**
    * 递归循环触发时间队列，直至队列为空
    * @param {Number} delay 等待时间，单位ms
    */
   setTimeout() {

      const [task] = this.tasks;

      if (!task) return

      const [key, value, timestamp] = task;

      const delay = timestamp - Date.now()

      if (delay > 0) {

         clearTimeout(this.timeout)

         this.timeout = setTimeout(() => {

            // 异步删除时只能用循环匹配
            this.delete(key)

            this.task(key, value)

         }, delay)

      } else {

         this.tasks.splice(0, 1);

         this.task(key, value);

      }

   }
   /**
    * 执行任务
    * @param {*} key 
    * @param {*} value 
    */
   task(key, value) {

      // 执行回调函数
      if (key instanceof Function) {

         try {
            key(value)
         } catch (error) {
            throw error
         }

      }

      this.setTimeout();

   }
}

module.exports = timeChain;