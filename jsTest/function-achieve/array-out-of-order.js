// O(n)
var arr = [0,1,2,3,4,5,6];

var len = arr.length;
for(var i=0;i<len;i++) {
  var index = Math.floor(Math.random()*(len-i));
  var temp = arr[index];
  arr[index] = arr[len-i-1];
  arr[len-i-1] = temp;
}

console.log(arr)


// O(n^2)
var arr = [0,1,2,3,4,5,6];
function f2(arr1) {
  var arr2 = [];
  while(arr1.length>0){
    var index = Math.floor(Math.random()*arr1.length);
    arr2.push(arr1[index]);
    arr1.splice(index,1);
  }
  return arr2;
}

console.log(f2(arr))
