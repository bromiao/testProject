const getData = () => {
  return new Promise(resolve =>
    setTimeout(() => resolve('data'), 1000)
  )
}

// 实现的async函数应该像这样， 应该1s后打印出data
async function test() {
  const data = await getData();

  console.log(data);
  return data;
}

// async函数会被编译成generator函数
function* testG() {
  // async被编译成了yield
  const data = yield getData();
  console.log('data:', data);
  const data2 = yield getData();
  console.log('data2:', data2);
  return data + '1234';
}

function asyncToGenerator(generatorFunc) {
  return function () {
    // 对应const gen = testG()
    const gen = generatorFunc.apply(this, arguments);

    // const test = asyncToGenerator(testG)
    // 对应test()---应具备链式调用test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数，用来一步一步跨过yield的阻碍
      // key有next和throw两种值，分别对应gen的next和throw方法
      // arg参数则是用来接收promise resolve出来的值，并将其传递给下一个yield
      function step(key, arg) {
        let generatorResult;

        // 把方法包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部可以通过catch获取到错误信息
        try {
          generatorResult = gen[key](arg);
        } catch (e) {
          return reject(e);
        }

        // gen.next()得到的结果是一个 {value, done} 的结构
        const {value, done} = generatorResult;

        if (done) {
          // 若完成 就resolve这个promise
          // 当done为true时，意味着所有yield已完成
          // 此时的value值就是generator函数最后的返回值
          return resolve(value);
        } else {
          // 处于yield过程中，调用gen.next()
          // 这里要注意的是Promise.resolve可以接受一个promise参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          // 始终返回 {value: Promise, done: false}
          return Promise.resolve(
            // 对应yield后面的Promise
            value
          ).then(
            // value这个promise被resolve的时候，就会执行next
            // 并且done为false的时候， 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val);
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step("throw", err);
            }
          )
        }
      }

      // 进入yield
      step('next');
    })
  }
}

const testGAsync = asyncToGenerator(testG);
testGAsync().then(res => {
  // 此处的res为generator函数(testG)return出的值
  console.log(res);
})
