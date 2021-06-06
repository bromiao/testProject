/**
 * setTimeout/setInterval嵌套深度达到一定层级时会有4ms的延迟
 * 简单利用 postMessage 和 addEventListener('message') 的消息通知组合，来实现模拟定时器的功能
 */
(function () {
  let callbacks = [];
  const messageName = 'better-timeout-msg';

  function setZeroTimeout(fn) {
    callbacks.push(fn);
    window.postMessage(messageName, '*');
  }

  function handleMessage(event) {
    if (event.source == window && event.data === messageName) {
      event.stopPropagation();
      if (callbacks.length > 0) {
        let cb = callbacks.shift();
        cb();
      }
    }
  }

  window.addEventListener('message', handleMessage, true);
  window.setZeroTimeout = setZeroTimeout;
})();

let oriSetTimeout = () => {
  let a = performance.now();
  setTimeout(() => {
    let b = performance.now();
    console.log(b - a);
    setTimeout(() => {
      let c = performance.now();
      console.log(c - b);
      setTimeout(() => {
        let d = performance.now();
        console.log(d - c);
        setTimeout(() => {
          let e = performance.now();
          console.log(e - d);
          setTimeout(() => {
            let f = performance.now();
            console.log(f - e);
            setTimeout(() => {
              let g = performance.now();
              console.log(g - f);
            }, 0);
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  }, 0);
}

let betterZeroTimeout = () => {
  let a = performance.now();
  window.setZeroTimeout(() => {
    let b = performance.now();
    console.log(b - a);
    window.setZeroTimeout(() => {
      let c = performance.now();
      console.log(c - b);
      window.setZeroTimeout(() => {
        let d = performance.now();
        console.log(d - c);
        window.setZeroTimeout(() => {
          let e = performance.now();
          console.log(e - d);
          window.setZeroTimeout(() => {
            let f = performance.now();
            console.log(f - e);
            window.setZeroTimeout(() => {
              let g = performance.now();
              console.log(g - f);
            }, 0);
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  }, 0);
}

console.table('origin', oriSetTimeout());
console.table('origin', betterZeroTimeout());
