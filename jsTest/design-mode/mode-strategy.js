const strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  }
}

const calculateBonus = function (level, salary) {
  return strategies[level](salary);
}

const salary = 10000;
console.log('%c绩效为S的员工，年终奖：' + calculateBonus('S', salary));
console.log('%绩效为A的员工，年终奖：' + calculateBonus('A', salary));
console.log('%绩效为B的员工，年终奖：' + calculateBonus('B', salary));
