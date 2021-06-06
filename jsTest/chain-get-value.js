var res = {
    user: {
        posts: [
            {id: 111, content: 'aldfja'},
            {id: 112, content: 'aldfja111'},
            {id: 113, content: 'aldfja6666', time: '2020'}
        ]
    }
}

//处理链式取值问题
const getValue = (arr, obj) => arr.reduce((o, v) => (o && o[v]) ? o[v] : null, obj);
console.log(getValue(['user', 'posts', 1, 'time'], res));
console.log(getValue(['user', 'posts', 2, 'time'], res));
