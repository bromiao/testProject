const worker = new Worker('worker.js');


// worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。
worker.postMessage('hello, worker!')

// 接收子线程发回来的消息。
worker.onmessage = function (event) {
  console.log('receive message' + event.data);

  doSomething();
}

function doSomething() {
  // 执行特定任务
  // ...

  worker.postMessage('work done!');

  // Worker 完成任务以后，主线程就可以把它关掉。
  // worker.terminate();
}


worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
// worker.addEventListener('error', function (event) {
//   // ...
// });



// 主线程
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
worker.postMessage(uInt8Array);

// Transferable Objects 格式
// (超大文件)对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担
// worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);
