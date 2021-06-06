// 防抖
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

// 思路：
// 每次触发事件时都取消之前的延时调用方法


function debounce(fn, wait = 1000) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

// Test Case 模拟输入搜索
function search(text) {
  console.log(new Date(), text);
}

const handle = debounce(search, 1500);

let str = '';
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    str += 'S';
    handle(str);
  }, Math.random() * 10000);
}


// 节流
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

// 思路：
// 每次触发事件时都判断当前是否有等待执行的延时函数

function throttle(fn, wait) {
  let canRun = true;
  return (...args) => {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, wait);
  };
}

// Test Case 模拟页面滚动
function getPageHeight(h) {
  console.log(new Date(), h);
}

const test = throttle(getPageHeight, 1000);

let pageHeight = 0;
for (let i = 0; i < 1000; i++) {
  setTimeout(() => {
    pageHeight++;
    test(pageHeight);
  }, Math.random() * 10000);
}


function debounce2(func) {
  var t;
  return function () {
    cancelAnimationFrame(t)
    t = requestAnimationFrame(func);
  }
}
