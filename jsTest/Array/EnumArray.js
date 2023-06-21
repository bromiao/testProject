/**
 * @description 枚举类封装，key/value互查
 */
class EnumArray extends Array {
  getLabelByValue(value) {
    return this.find(item => item?.value === value)?.label || '-'
  }
  
  getValueByLabel(label) {
    return this.find(item => item?.label === label)?.value || '-'
  }

  getEnumObjByValue(value) {
    return this.find(item => item?.value === value) || null
  }
}


function createEnum(enums) {
  return Object.freeze(new EnumArray(...enums))
}

const sex = createEnum([
  {
    label: '男',
    value: 0
  },
  {
    label: '女',
    value: 1
  }
])

console.log(1111, sex.getLabelByValue(0))
console.log(2222, sex.getValueByLabel('女'))
console.log(3333, sex.getEnumObjByValue(2))