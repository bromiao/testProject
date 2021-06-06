/*从大的方面来讲，模板方法模式常被架构师用于搭建项目的框架，架构师定好了框架的骨架，
程序员继承框架的结构之后，负责往里面填空*/

// 抽象父类
const Beverage = function () {};

Beverage.prototype.boilWater = function () {
  console.log('把水煮沸');
}

// 空方法，应该由子类重写
Beverage.prototype.brew = function () {};
Beverage.prototype.pourInCup = function () {};
Beverage.prototype.addCondiments = function () {};

Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
}

// 子类Coffee
const Coffee = function () {};
Coffee.prototype = new Beverage();

Coffee.prototype.brew = function () {
  console.log('用沸水冲泡咖啡');
}

Coffee.prototype.pourInCup = function () {
  console.log('把咖啡倒进杯子');
}

Coffee.prototype.addCondiments = function () {
  console.log('加糖和牛奶');
}

const coffee = new Coffee();
coffee.init();



// 子类Tea
const Tea = function () {};
Tea.prototype = new Beverage();

Tea.prototype.brew = function () {
  console.log('用沸水浸泡茶叶');
}

Tea.prototype.pourInCup = function () {
  console.log('把茶水倒进杯子');
}

Tea.prototype.addCondiments = function () {
  console.log('加柠檬');
}

const tea = new Tea();
tea.init();



/*钩子方法*/
var Beverage = function(){};
Beverage.prototype.boilWater = function(){
  console.log( '把水煮沸' );
};
Beverage.prototype.brew = function(){
  throw new Error( '子类必须重写 brew 方法' );
};
Beverage.prototype.pourInCup = function(){
  throw new Error( '子类必须重写 pourInCup 方法' );
};
Beverage.prototype.addCondiments = function(){
  throw new Error( '子类必须重写 addCondiments 方法' );
};
Beverage.prototype.customerWantsCondiments = function(){
  return true; // 默认需要调料
};
Beverage.prototype.init = function(){
  this.boilWater();
  this.brew();
  this.pourInCup();
  if ( this.customerWantsCondiments() ){ // 如果挂钩返回 true，则需要调料
    this.addCondiments();
  }
};
var CoffeeWithHook = function(){};
CoffeeWithHook.prototype = new Beverage();
CoffeeWithHook.prototype.brew = function(){
  console.log( '用沸水冲泡咖啡' );
};
CoffeeWithHook.prototype.pourInCup = function(){
  console.log( '把咖啡倒进杯子' );
};
CoffeeWithHook.prototype.addCondiments = function(){
  console.log( '加糖和牛奶' );
};
CoffeeWithHook.prototype.customerWantsCondiments = function(){
  return window.confirm( '请问需要调料吗？' );
};
var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();



/*不用继承实现模板方法模式*/
var Beverage = function( param ){
  var boilWater = function(){
    console.log( '把水煮沸' );
  };
  var brew = param.brew || function(){
    throw new Error( '必须传递 brew 方法' );
  };
  var pourInCup = param.pourInCup || function(){
    throw new Error( '必须传递 pourInCup 方法' );
  };
  var addCondiments = param.addCondiments || function(){
    throw new Error( '必须传递 addCondiments 方法' );
  };
  var F = function(){};
  F.prototype.init = function(){
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};
var Coffee = Beverage({
  brew: function(){
    console.log( '用沸水冲泡咖啡' );
  },
  pourInCup: function(){
    console.log( '把咖啡倒进杯子' );
  },
  addCondiments: function(){
    console.log( '加糖和牛奶' );
  }
});
var Tea = Beverage({
  brew: function(){
    console.log( '用沸水浸泡茶叶' );
  },
  pourInCup: function(){
    console.log( '把茶倒进杯子' );
  },
  addCondiments: function(){
    console.log( '加柠檬' );
  }
});
var coffee = new Coffee();
coffee.init();
var tea = new Tea();
tea.init();

