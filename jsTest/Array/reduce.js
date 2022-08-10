// 求和
[3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => a + i);
// 30

// 有初始化值
[3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => a + i, 5);
// 35


// 乘法
[3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => a * i);

// 查找数组中的最大值
[3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => Math.max(a, i), -Infinity);

Math.max(...[3, 5, 4, 3, 6, 2, 3, 4]);


// 连接不均匀数组
let data = [
  ["The", "red", "horse"],
  ["Plane", "over", "the", "ocean"],
  ["Chocolate", "ice", "cream", "is", "awesome"],
  ["this", "is", "a", "long", "sentence"]
]
let dataConcat = data.map(item => item.reduce((a, i) => `${a}  ${i}`))

//  结果
    ['The  red  horse',
    'Plane  over  the  ocean',
    'Chocolate  ice  cream  is  awesome',
    'this  is  a  long  sentence']

// 移除数组中的重复项
let dupes = [1, 2, 3, 'a', 'a', 'f', 3, 4, 2, 'd', 'd']
let withOutDupes = dupes.reduce((noDupes, curVal) => {
  if (noDupes.indexOf(curVal) === -1) {
    noDupes.push(curVal)
  }
  return noDupes
}, [])

    [[3, 4, 5],
    [2, 5, 3],
    [4, 5, 6]
    ].flat();


// 验证括号
[..."(())()(()())"].reduce((a, i) => i === '(' ? a + 1 : a - 1, 0);
//  0

[..."((())()(()())"].reduce((a, i) => i === '(' ? a + 1 : a - 1, 0);
//  1

[..."(())()(()()))"].reduce((a, i) => i === '(' ? a + 1 : a - 1, 0);
//  -1


// 按属性分组
let obj = [
  {name: 'Alice', job: 'Data  Analyst', country: 'AU'},
  {name: 'Bob', job: 'Pilot', country: 'US'},
  {name: 'Lewis', job: 'Pilot', country: 'US'},
  {name: 'Karen', job: 'Software  Eng', country: 'CA'},
  {name: 'Jona', job: 'Painter', country: 'CA'},
  {name: 'Jeremy', job: 'Artist', country: 'SP'},
]
let ppl = obj.reduce((group, curP) => {
  let newkey = curP['country']
  if (!group[newkey]) {
    group[newkey] = []
  }
  group[newkey].push(curP)
  return group
}, {})


// 扁平数组
let flattened = [[3, 4, 5], [2, 5, 3], [4, 5, 6]].reduce(
    (singleArr, nextArray) => singleArr.concat(nextArray), [])

//  结果：[3, 4, 5, 2, 5, 3, 4, 5, 6]


// 反转字符串
const reverseStr = str => [...str].reduce((a, v) => v + a)


// 二进制转十进制
const bin2dec = str => [...String(str)].reduce((acc, cur) => +cur + acc * 2, 0)
