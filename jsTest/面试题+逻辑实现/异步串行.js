function flatArray(arr) { return [].concat(...arr.map(x => Array.isArray(x) ? flatArray(x) : x) ) }

function createFlow(effects = []) {
  let sources = flatArray(effects.slice());
  function run(callback) {
    while (sources.length) {
      const task = sources.shift();
      // 把callback放到下一个flow的callback时机里执行
      const next = () => createFlow(sources).run(callback)
      if (typeof task === "function") {
        const res = task();
        if (res && res.then) {
          res.then(next);
          return;
        }
      } else if (task && task.isFlow) {
        task.run(next);
        return;
      }
    }
    callback && callback();
  }
  return {
    run,
    isFlow: true,
  };
}
const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay().then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log('done!')
});
