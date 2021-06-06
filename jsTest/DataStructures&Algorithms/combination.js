function combination(S, k) {
  //当设定取值个数为0或者取出k个正好等于S的长度我们返回结果
  if (k === 0 || S.length === k) {
    return [S.slice(0, k)];
  }
  //把第一个元素与剩下的元素解构出来
  const [first, ...other] = S;
  //记录每次的结果
  let r = [];
  //先取出一个,然后在剩下元素中取k-1个,把每次取出的都与第一个组合返回
  r = r.concat(this.combination(other, k - 1).map((x) => [first, ...x]));
  //然后在剩下的元素中取出k个
  r = r.concat(this.combination(other, k));
  //返回所有结果
  return r;
}
