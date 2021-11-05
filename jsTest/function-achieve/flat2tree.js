let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

function arrToTree(arr, pid) {
  return arr.filter(item => item.pid === pid).map(item => ({...item, children: arrToTree(arr, item.id)}))
}



function arrToTree2(arr) {
  const result = []
  const resMap = new Map()
  for (let item of arr) {
    const children = []
    if (item.pid === 0) {
      result.push({...item, children})
    } else {
      let resArr = resMap.get(item.pid)
      resArr && resArr.push({...item, children})
    }
    resMap.set(item.id, children)
  }

  return result;
}


function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  //
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}

console.time('test')
/*console.log(arrToTree(arr, 0))
console.log(arrToTree2(arr))*/
console.log(arrayToTree(arr))
console.timeEnd('test')
