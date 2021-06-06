function test(){
    alert(2);
    return 'test';
}

Function.prototype.before = function(fn){
    var __self = this;
    return function(){
        if(fn.apply(this, arguments)==false){
            return false;
        }
        return __self.apply(__self, arguments);
    }
};
Function.prototype.after = function(fn){
    var __self = this;
    return function(){
        var result = __self.apply(__self, arguments);
        if(result == false){
            return false;
        }
        fn.apply(this,arguments);
        return result;
    }
};

//test
test.after(function(){
    alert(3);
}).before(function(){
    alert(1);
})();


//window.onload
window.onload = function(){
    alert(1);
};
// 动态装饰体现优势，完全无侵入之前的函数。
window.onload = (window.onload || function(){}).after(function(){
    alert(2);
});
