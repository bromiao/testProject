/*
* FIFO(First In First Out)先进先出调度算法实现缓存
* 需要一个对象和一个数组作为辅助
* 数组记录进入顺序
* */
function FifoCache(limit) {
    var limit = limit || 10;
    var map = {};
    var keys = [];

    return {
        set: function (key, value) {
            //因为javascript没有将hasOwnProperty作为一个敏感词，
            // 所以我们很有可能将对象的一个属性命名为hasOwnProperty，
            // 这样一来就无法再使用对象原型的 hasOwnProperty 方法来判断属性是否是来自原型链。
            if(!Object.prototype.hasOwnProperty.call(map, key)) {
                if(keys.length === limit) {
                    delete map[keys.shift()] //先进先出，删除队列第一个元素
                }
                keys.push(key);
            }

            map[key] = value; //设置k-v
        },
        get: function (key) {
            console.log(map)
            return map[key];
        }
    }
}



/*
*LRU(Least Recently Used)最近最久未使用调度算法
* */

