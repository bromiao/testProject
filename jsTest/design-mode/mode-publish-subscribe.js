/*let salesOffices = {};    // 定义售楼处

salesOffices.clientList = {};   // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function (key, fn) {   // 添加订阅者
  if (!this.clientList[key]) {    // 如果还没有订阅过此类消息，就给该类创建一个缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);   // 订阅的消息添加进缓存列表
}

salesOffices.trigger = function () {    // 发布消息
  const key = Array.prototype.shift.call(arguments),    // 取出消息类型
        fns = this.clientList[key];   // 取出该消息类型的回调函数集合

  if (!fns || !fns.length) {    // 如果没有订阅该消息，则返回
    return false;
  }

  for (let i = 0, fn; fn = fns[i++]; ) {
    fn.apply(this, arguments);    // arguments 是发布消息时带上的参数
  }
}

salesOffices.listen('squareMeter88', function (price) {
  console.log('价格：' + price);
})*/

const event = {
  clientList: [],
  listen: function (key, fn) {   // 添加订阅者
    if (!this.clientList[key]) {    // 如果还没有订阅过此类消息，就给该类创建一个缓存列表
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);   // 订阅的消息添加进缓存列表
  },
  trigger: function () {    // 发布消息
    const key = Array.prototype.shift.call(arguments),    // 取出消息类型
      fns = this.clientList[key];   // 取出该消息类型的回调函数集合

    if (!fns || !fns.length) {    // 如果没有订阅该消息，则返回
      return false;
    }

    for (let i = 0, fn; fn = fns[i++]; ) {
      fn.apply(this, arguments);    // arguments 是发布消息时带上的参数
    }
  }
}

event.remove = function (key, fn) {
  const fns = this.clientList[key];

  if (!fns) {   // 如果key对应的消息没人订阅，则返回
    return false;
  }

  if (!fn) {    // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
    fns && (fns.length = 0);
  } else {
    for (let i = fns.length - 1; i >= 0; i--) {   // 反向遍历订阅的回调函数列表
      let _fn = fns[i];
      if (_fn === fn) {
        fns.splice(i, 1);   // 删除订阅者的回调函数
      }
    }
  }
}

const installEvent = function (obj) {
  for (let i in event) {
    obj[i] = event[i];
  }
}

const salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter110', fn1 = function (price) {
  console.log('小明订阅的信息------','价格', price);
})
salesOffices.listen('squareMeter110', fn2 = function (price) {
  console.log('小红订阅的信息------','价格', price);
})

salesOffices.remove('squareMeter110', fn1);
salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter110', 3000000);
