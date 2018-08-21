基于事件触发，使用单个setTimeout处理时间队列

```js
let timeChain = require('timechain')

let timechain = new timeChain({ timeout: 3000 })

// 对象示例
timechain.set('name', 666)

setTimeout(() => {

   timechain.get('name')

}, 2000);

// 函数示例
timechain.set(function (value) {
   console.log(value)
}, 888)
```

## 应用场景

* 计划任务定时器

* 等待超时，触发回调

* 变量过期删除


## 过期策略

timechain目前采用的是定时策略。计划同时支持多种过期策略，根据不同的数据类型采用最优策略组合，对于函数类型，依然只能使用定时策略，非函数类型则使用惰性策略+定期策略。


### 定时删除

在设置变量时激活定时器，仅在队列为空时触发，避免创建多个setTimeout。


### 惰性删除

在查询时检查变量是否过期，过期则删除，否则继续保留。

   * 优点：删除操作只在真正需要获取数据时发生，最大限度减少了额外的处理开销。
   
   * 缺点：如果key没有被获取则会产生积压，资源始终得不到释放，导致内存泄漏或溢出的悲剧


### 定期删除

每隔一段时间批量删除已过期的key

   * 优点：简单，效率折中，可以灵活控制删除周期。

   * 缺点: 存在矩形周期特征，时间偏差严重。


## API

#### new timeChain(options)

* `options` *Object* 公共选项

   * `timeout` *Number* 默认超时


#### this.set(key, value, timeout)

* `key` * 保存key，允许任意值

* `value` * 保存value，允许任意值

* `timeout` *Number* 单项超时

设置存储数据的key、value


#### this.get(key)

* `key` * 查询key

通过key获取数据

#### this.delete(key)

* `key` * 删除key

通过key删除数据

#### this.clear()

清空整个数据队列