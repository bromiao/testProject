function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 3000);
    });
    return p;
}


function getImgAsync() {
    return new Promise((resolve, reject) => {
        var img = new Image()

        img.src = '//img.alicdn.com/tfs/TB1_U5vknZmx1VjSZFGXXax2XXa-990-360.jpg_q60.jpg'
        img.onload = () => {
            resolve(img)
        }
    })
}

function Timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('资源请求超时！')
        }, 5000)
    })
}

//all一般用于图片、音乐等资源请求完成后做初始化操作
Promise.all([runAsync1(), runAsync2(), runAsync3()])
    .then( res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })


//race一般用于资源请求超时处理
Promise.race([getImgAsync(), Timeout()])
    .then(res => {
        console.log(res)

        document.body.appendChild(res)
    })
    .catch(err => {
        console.log(err)
    })