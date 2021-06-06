const Player = {
  attack: function () {
    console.log('玩家攻击！');
  },
  defense: function () {
    console.log('玩家防御！');
  },
  jump: function () {
    console.log('玩家跳跃！');
  },
  crouch: function () {
    console.log('玩家蹲下！')
  }
}


const makeCommand = function (receiver, state) {    // 创建命令
  return function () {
    receiver[state]();
  }
}


const commands = {
  "119": "jump",      // W
  "115": "crouch",    // S
  "97": "defense",    // A
  "100": "attack"     // D
}


const commandStack = [];    // 保存命令的堆栈

document.onkeypress = function (ev) {
  const keyCode = ev.keyCode,
        command = makeCommand(Player, commands[keyCode]);

  if (command) {
    command();    // 执行命令
    commandStack.push(command);   // 将执行过的命令保存到堆栈中
  }
}

document.getElementById('replay').onclick = function () {
  let command;

  while (command = commandStack.shift()) {
    command();
  }
}
