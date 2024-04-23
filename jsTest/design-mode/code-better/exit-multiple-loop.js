/************使用return退出多重循环************/

var print = function (...args) {
  console.log(...args);
};
var func = function () {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      for (var k = 0; k < 10; k++) {
        if (k === 5) {
          return print(i, j, k);
        }
        console.log(1111, i, j, k);
      }
    }
  }
};
func();
