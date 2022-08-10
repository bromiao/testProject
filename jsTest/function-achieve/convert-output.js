function destructuringArray(array, destructor) {
  return destructor.reduce((prev, next, index) => {
    if (Array.isArray(next)) {
      return { ...prev, ...destructuringArray(array[index], next) }
    } else {
      prev[next] = array[index]
      return prev
    }
  }, {})
}
console.log(destructuringArray([1, [2, 4], 3], ['a', ['b'], 'c']))