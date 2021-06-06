const Mock = require('mockjs')

const arr = [];

for(let i=0;i<10;i++) {
    arr[i] = {};
    arr[i].account = Mock.mock('@string("lower", 5)')
    arr[i].alias = Mock.mock('@string("lower", 1, 3)')
    arr[i].click = false;
    arr[i].createTime = 1588490856268;
    arr[i].updateTime = 1588490856268;
    arr[i].valid = true;
}

console.log(arr)
