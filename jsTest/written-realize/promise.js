const Promise = function (executor) {
  const self = this;
  self.status = 'pending';  // Promise当前状态
  self.data = undefined;    // Promise当前值
  self.onResolvedCallback = [];   // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [];   // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  const resolve = function (value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(function () { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        for (let i in self.onResolvedCallback) {
          self.onResolvedCallback[i](value);
        }
      }
    }, 0);
  }

  const reject = function (reason) {
    setTimeout(function () { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;

        for (let i in self.onRejectedCallback) {
          self.onRejectedCallback[i](reason);
        }
      }
    }, 0)
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}


Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  let Promise2;

  onResolved = typeof onResolved === 'function' ? onResolved : function (value) {return value};
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {throw reason};

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return Promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          const x = onResolved(self.data);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0)
    })
  }

  if (self.status === 'rejected') {
    return Promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          const x = onRejected(self.data);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0)
    })
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    return Promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          const x = onResolved(self.data);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })

      self.onRejectedCallback.push(function (value) {
        try {
          const x = onRejected(self.data);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
}


Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

function resolvePromise(promise, x, resolve, reject) {
  let then;
  let thenCalledOrThrow = false;

  if (promise === x) { // 对应标准2.3.1节
    return reject(new TypeError(`${x} can not be type 'promise'!!!`));
  }

  if (x instanceof Promise) { // 对应标准2.3.2节
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    if (x.status === 'pending') {
      x.then(function (value) {
        resolvePromise(promise, value, resolve, reject)
      }, reject);
    } else {  // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      x.then(resolve, reject);
    }
    return;
  }

  if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) { // 2.3.3
    try {
      then = x.then;
      if (typeof then === 'function') { // 2.3.3.3
        then.call(x, function (res) { // 2.3.3.3.1
          if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true;
          return resolvePromise(promise, res, resolve, reject); // 2.3.3.3.1
        }, function (reason) { // 2.3.3.3.2
          if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true;
          return reject(reason);
        });
      } else { // 2.3.3.4
        resolve(x);
      }
    } catch (e) { // 2.3.3.2
      if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else { // 2.3.4
    resolve(x);
  }
}


Promise.prototype.finally = function (fn) {
  // 在then里面使用setTimeout，保证该回调函数在最后执行
  return this.then(function (value) {
    setTimeout(fn);
    return value;
  }, function (reason) {
    setTimeout(fn);
    return reason;
  })
}


Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let resolvedCount = 0;
    const promiseCount = promises.length;
    const resolvedValues = new Array(promiseCount);

    for (let i = 0; i < promiseCount; i++) {
      Promise.resolve(promises[i]).then(function (value) {
        resolvedCount++;
        resolvedValues[i] = value;
        if (resolvedCount === promiseCount) {
          return resolve(resolvedValues);
        }
      }, function (reason) {
        return reject(reason);
      })
    }
  })
}


Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(function (value) {
        return resolve(value);
      }, function (reason) {
        return reject(reason);
      })
    }
  })
}


Promise.resolve = function (value) {
  const promise = new Promise(function (resolve, reject) {
    resolvePromise(promise, value, resolve, reject);
  })
}


Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  })
}

// 链到Promise链的最后，它就能够捕获前面未处理的错误
Promise.done = Promise.stop = function () {
  return Promise.catch(function (e) { // 此处一定要确保这个函数不能再出错
    console.log(e);
  })
}

Promise.deferred = Promise.defer = function () {
  const dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;

