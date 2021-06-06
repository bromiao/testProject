/**
* 装饰者模式
* */
function consoleA() {
    console.log('111');
}

function consoleB() {
    consoleA();
    /**
     * do other things
     */
}


/**
 * 适配器模式
 */

var Duck = function() {}
var MallardDuck = function() {
    console.log(this)
    Duck.apply(this)
}
MallardDuck.prototype = new Duck();
MallardDuck.prototype.quack = function(){
    console.log('嘎嘎！')
}

var Turkey = function() {}
var WildTurkey = function() {
    console.log(this);
    Turkey.apply(this);
}
WildTurkey.prototype = new Turkey();
WildTurkey.prototype.gobble = function() {
    console.log('咯咯');
}

var TurkeyAdapter = function(oTurkey) {
    console.log(this);
    Duck.apply(this);
    this.oTurkey = oTurkey;
}
TurkeyAdapter.prototype = new Duck()
TurkeyAdapter.prototype.quack = function() {
    this.oTurkey.gobble();
}

var oMallardDuck = new MallardDuck();
var oWildTurkey = new WildTurkey();
var oTurkeyAdapter = new TurkeyAdapter(oWildTurkey);


oMallardDuck.quack()
oWildTurkey.gobble();
oTurkeyAdapter.quack();


/**
 * 发布订阅模式(观察者模式)
 * handles: 事件处理函数集合
 * on: 订阅事件
 * emit: 发布事件
 * off: 删除事件
 **/

class PubSub {
    constructor() {
        this.handles = {};
    }

    // 订阅事件
    on(eventType, handle) {
        if (!this.handles.hasOwnProperty(eventType)) {
            this.handles[eventType] = [];
        }
        if (typeof handle == 'function') {
            this.handles[eventType].push(handle);
        } else {
            throw new Error('缺少回调函数');
        }
        return this;
    }

    // 发布事件
    emit(eventType, ...args) {
        if (this.handles.hasOwnProperty(eventType)) {
            this.handles[eventType].forEach((item, key, arr) => {
                item.apply(null, args);
            })
        } else {
            throw new Error(`"${eventType}"事件未注册`);
        }
        return this;
    }

    // 退订事件
    off(eventType, handle) {
        if (!this.handles.hasOwnProperty(eventType)) {
            throw new Error(`"${eventType}"事件未注册`);
        } else if (typeof handle != 'function') {
            throw new Error('缺少回调函数');
        } else {
            this.handles[eventType].forEach((item, key, arr) => {
                if (item == handle) {
                    arr.splice(key, 1);
                }
            })
        }
        return this; // 实现链式操作
    }
}

// 下面做一些骚操作
let callback = function () {
    console.log('you are so nice');
}

let pubsub = new PubSub();
pubsub.on('completed', (...args) => {
    console.log('+++++++++++++++回调函数实现逻辑+++++++++++++++\n'+args.join(' '));
}).on('completed', callback);

pubsub.emit('completed', 'what', 'a', 'fucking day');
pubsub.off('completed', callback);
pubsub.emit('completed', 'fucking', 'again');
/*pubsub.on('connect');
pubsub.emit('disconnect', {connect: false});*/


/**
 * 职责链模式
 */

var MoneyStack = function (billSize) {
    this.billSize = billSize;
    this.next = null;
}
MoneyStack.prototype = {
    //取款
    withdraw: function (amount) {
        var numOfBills = Math.floor(amount / this.billSize);

        if(numOfBills > 0) {
            //吐钱
            this._ejectMoney(numOfBills);
            //还剩多少钱未吐出
            amount -= this.billSize * numOfBills;
        }

        //如果还有钱未取出的话，就将请求传递下去
        amount > 0 && this.next && this.next.withdraw(amount);
    },
    //设置请求链中的下一个节点
    setNextStack: function (stack) {
        this.next = stack;
    },
    //吐钱时的提示信息
    _ejectMoney: function (numOfBills) {
        console.log(numOfBills + ' $' + this.billSize
            + ' bill(s) has/have been spit out')
    }
}

var ATM = function () {
    //各种金额的吐钱示例
    var stack100 = new MoneyStack(100),
        stack50 = new MoneyStack(50),
        stack20 = new MoneyStack(20),
        stack10 = new MoneyStack(10),
        stack5 = new MoneyStack(5),
        stack1 = new MoneyStack(1);

    //设置吐钱层次结构
    stack100.setNextStack(stack50);
    stack50.setNextStack(stack20);
    stack20.setNextStack(stack10);
    stack10.setNextStack(stack5);
    stack5.setNextStack(stack1);

    //设置顶层为最大数值面额
    this.moneyStacks = stack100;
}

ATM.prototype.withdraw = function (amount) {
    this.moneyStacks.withdraw(amount);
}

//使用示例
var atm = new ATM();
atm.withdraw(186);

