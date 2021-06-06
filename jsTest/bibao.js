function Outblock() {
    var foo = 111;

    return {
        get: function () {
            return foo;
        },
        set: function (value) {
            foo = value;
        }
    }
}

var test = Outblock();

console.log(test.get());
test.set('aaa');
console.log(test.get());
console.log(test.get());

function printSomething(sth) {
    setTimeout(() => {
        console.log(sth)
    }, 1000)
}

for (var i = 0; i < 3; i++) {
    printSomething(i)
}

function getAPI(cb) {
    setTimeout(() => cb("a"), 3000)
}

function getAPIB(cb) {
    setTimeout(() => cb("b"), 2000)
}

function getAPIC(cb) {
    setTimeout(() => cb("c"), 1000)
}

function aggregateValue(cb) {
    var aggregateData = []
    var numberAPICalledSoFar = 0

    function callback(value) {
        aggregateData = [...aggregateData, value]
        if(numberAPICalledSoFar < 2) {
            numberAPICalledSoFar++;
        }else {
            cb(aggregateData)
        }
    }
    getAPI(callback)
    getAPIB(callback)
    getAPIC(callback)
}

aggregateValue((ans) => ans.forEach(console.log))
