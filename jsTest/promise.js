function async1(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

let count = 1;
async1(1000).then(function () {
    console.log(count++)

    return async1(1000)
}).then(function () {
    console.log(count++)
})

function async2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var random = Math.ceil(Math.random() * 10)

            if(random <=5 ) {
                resolve(random)
            }else {
                reject('数字太大了，哥们儿！')
            }
        }, 2000)
    })
}

/*async2().then(res => {
    console.log('ok->'+res)
}, err => {
    console.log('error->'+err)
})*/

async2()
    .then( res => {
        console.log(111)
        console.log(res)
        console.log(data)
    })
    .catch( err => {
        console.log(err)
    })