// import config from '../configs'

const url = 'ws://server_address';

// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
let ws = new WebSocket(url);
ws.onopen = function(){
    console.log("open");
    ws.send("WebSocket hello world!!");
};
ws.onmessage = function(ev){
    console.log(ev.data);
};
ws.onclose = function(ev){
    alert("close");
};
ws.onerror = function(ev){
    console.log(ev);
    alert("error");
};


export default ws;
