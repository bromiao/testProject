/*const Spirit = function (name) {
  this.name = name;
}

Spirit.prototype.attack = function (type) {
  if (type === 'waveBoxing') {
    console.log(this.name + '：使用波动拳');
  } else if (type === 'whirlKick') {
    console.log(this.name + '：使用旋风腿');
  }
}

const spirit = new Spirit('Ryu');
spirit.attack('waveBoxing');
spirit.attack('whirlKick');*/



/*分解attack作为一个单独的类存在*/
const Attack = function (spirit) {
  this.spirit = spirit;
}

Attack.prototype.start = function (type) {
  return this.list[type].call(this);
}

Attack.prototype.list = {
  waveBoxing: function () {
    console.log(this.spirit.name + '：使用波动拳');
  },
  whirlKick: function () {
    console.log(this.spirit.name + '：使用旋风腿');
  }
}

const Spirit = function (name) {
  this.name = name;
  this.attackObj = new Attack(this);
}

Spirit.prototype.attack = function (type) {
  this.attackObj.start(type);
}

const spirit = new Spirit('Ryu2');
spirit.attack( 'waveBoxing' ); // 输出：RYU2: 使用波动拳
spirit.attack( 'whirlKick' ); // 输出：RYU2: 使用旋风腿
