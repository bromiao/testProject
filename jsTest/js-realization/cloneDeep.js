// 1、使用哈希表
// 解决方案很简单，其实就是循环检测，我们设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可。
function cloneDeep3(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source) // 新增代码，查哈希表

  var target = Array.isArray(source) ? [] : {}
  hash.set(source, target) // 新增代码，哈希表设值

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep3(source[key], hash) // 新增代码，传入哈希表
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

// ES5
function cloneDeep3(source, uniqueList) {
  if (!isObject(source)) return source
  if (!uniqueList) uniqueList = [] // 新增代码，初始化数组

  var target = Array.isArray(source) ? [] : {}

  // ============= 新增代码
  // 数据已经存在，返回保存的数据
  var uniqueData = find(uniqueList, source)
  if (uniqueData) {
    return uniqueData.target
  }

  // 数据不存在，保存源数据，以及对应的引用
  uniqueList.push({
    source: source,
    target: target,
  })
  // =============

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep3(source[key], uniqueList) // 新增代码，传入数组
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

// 新增方法，用于查找
function find(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }
  return null
}

// 拷贝 Symbol
function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [...source] : { ...source } // 改动 1
  hash.set(source, target)

  Reflect.ownKeys(target).forEach((key) => {
    // 改动 2
    if (isObject(source[key])) {
      target[key] = cloneDeep(source[key], hash)
    } else {
      target[key] = source[key]
    }
  })
  return target
}

function isObject(obj) {
  return typeof obj === 'object' && obj != null
}

// 破解递归爆栈
var obj1 = [1, 2, 3, { a: 1, b: 2, c: [1, 2, 3] }]
var deepClone = function (obj) {
  var root = Array.isArray(obj) ? [] : {}
  var nodeList = [
    {
      parent: root,
      key: undefined,
      data: obj,
    },
  ]
  while (nodeList.length) {
    let node = nodeList.pop(),
      parent = node.parent,
      k = node.key,
      data = node.data
    let result = parent
    if (typeof k !== 'undefined') {
      result = parent[k] = Array.isArray(data) ? [] : {}
    }
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object') {
          nodeList.push({
            parent: result,
            key,
            data: data[key],
          })
        } else {
          result[key] = data[key]
        }
      }
    }
  }
  return root
}
