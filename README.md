基于链式事件触发策略，使用单个setTimeout处理过期时间队列

### Install

```
npm install timechain
```

### 示例

```js
let timeChain = require('timechain')

let timechain = new timeChain({ delay: 3000 })

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

### 应用场景

* 等待超时回调，例如网络请求超时

* 变量过期删除，例如验证码、优惠券过期

* 计划任务定时器


### 过期策略

每种过期策略都有其优势和劣势，timechain目前采用的是定时删除策略。计划同时支持多种过期策略，针对不同的数据类型选用最佳的过期策略。

对于函数类型，只能使用定时策略，非函数类型则使用惰性策略 + 定期策略（借鉴于Redis）。


#### 定时删除

为每个资源创建定时器，在设置变量时激活定时器，仅在队列为空时触发，避免创建多个setTimeout。

定时删除可以通过一些优化策略来控制定时器的使用频率，如基于链式策略使同一个时间点只存在一个定时器，或基于公差进一步减少对定时器的使用。

   * 优点：高时效，支持主动触发，可及时释放超时的资源，减少内存占用，支持超时回调函数。
   
   * 缺点：会创建多个定时器，但通过链式策略，可以减少多个定时器同时存在的数量。

#### 惰性删除

只在查询时检查变量是否过期，过期则删除，否则继续保留。

   * 优点：删除操作只在真正需要获取数据时发生，最大限度减少了额外的处理开销。
   
   * 缺点：被动执行，如果key没有被获取则会产生数据积压，资源始终得不到释放，存在内存泄漏风险

   * 应用场景：适用于key/value的存取，需要搭配定期删除，否则产生现内存泄漏。


#### 定期删除

使用固定时间周期，每隔一段时间集中删除已过期的key

   * 优点：简单，效率折中，可以灵活控制删除周期。

   * 缺点: 存在明显矩形周期特征，时效很低。


### API

#### new timeChain(options)

* `options` *Object* 公共选项

   * `delay` *Number* 默认超时


#### this.set(key, value, delay)

* `key` * 保存key，支持任意数据类型

* `value` * 保存value，支持任意数据类型

* `delay` *Number* 超时间隔，单位ms

设置存储数据的key、value


#### this.get(key)

* `key` * 查询key

通过key获取数据

#### this.delete(key)

* `key` * 删除key

通过key删除数据

#### this.clear()

清空任务队列，关闭定时器