/*
示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false

示例 4：
输入：s = "([)]"
输出：false

示例 5：
输入：s = "{[]}"
输出：true
*/


const is_valid_symbol = (s) => {
  // 空字符串直接退出
  if (!s) {
    return
  }
  
  const stack = []
  const left_to_right = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  
  for (let i = 0, len = s.length; i < len; i++) {
    const ch = s[i]
    
    // 匹配到左括号，就入栈
    if (left_to_right[ch]) {
      stack.push(ch)
    } else {
      // 1. 栈内没有左括号
      // 2. 栈内有数据，但栈顶目标对应 不是当前右括号
      if (!stack.length || left_to_right[stack.pop()] !== ch) {
        return false
      }
    }
  }
  
  // 若最后栈内还有元素，则不匹配
  return !stack.length
}

console.time('耗时：')
console.log(`目标字符串：([)])`, `验证${is_valid_symbol('([)])') ? '' : '不'}通过`)
console.timeEnd('耗时：')