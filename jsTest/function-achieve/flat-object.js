const obj = {
  a: {
    info: {
      name: 'Joe',
      age: 18
    }
  },
  b: {
    hh: 'aadsf'
  }
}

function isObject(v) {
  // 这里只简单的判断了是不是对象，可能还需要判断数组等情况
  return typeof v === "object";
}

function flattern(v, parentKeys = []) {
  // 递归终止条件：如果 v 不是对象，直接返回 { path: v }
  if (!isObject(v)) {
    return { [parentKeys.join(".")]: v }
  }

  // 是对象的话，递归映射 ⇐ ❶。注意 flattern() 返回的是一个展平的对象
  const subs = Object.entries(v)
    .map(([key, value]) => flattern(value, [...parentKeys, key]));

  // flattern() 要返回一个展平的对象，
  // 而 subs 是多个（当前 v 每个属性对应一个）展平的对象，
  // 当然需要合并成一个返回去的 ⇒ ❶
  return Object.assign({}, ...subs);
}

const r = flattern(obj);

console.log(JSON.stringify(r, null, 2));
