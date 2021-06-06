/**
 * 写出递归的思路， 1. 终止条件  2. 编写出递归公式
 * @param n
 * @returns {number|*}
 */
// 一般递归
function fib(n) {
  if (n === 0 || n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}

// 尾递归
function fn(arr, sum = 0) {
  if (arr.length === 0) return sum;
  return fn(arr.slice(1), arr[0] + sum);
}
fn([1, 2, 3, 4]);

// 递归优化
let mapData = new Map();
function fibPlus(n) {
  if (n === 0 || n === 1) return 1;
  if (mapData.get(n)) return mapData.get(n);
  let value = fibPlus(n - 1) + fibPlus(n - 2);
  mapData.set(n, value);
  return value;
}
