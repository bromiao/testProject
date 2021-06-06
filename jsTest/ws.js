var express = require('express');
var http = require('http');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname));

var server = http.createServer(app);
var wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    console.log('链接成功！');
    ws.on('message', function incoming(data) {
        /**
         * 把消息发送到所有的客户端
         * wss.clients获取所有链接的客户端
         */
        console.log(data)
        wss.clients.forEach(function each(wsServer) {
            let sendData = {
                level: 1,
                data: {
                    title: '帝王畅聊2.0版本上线通知',
                    content: '帝王畅聊APP2.0版本（福利版）正式上线，内有各种福利，更有神秘彩金不定时大放送，即日起可前往帝王下载站【www.7775app.com】下载帝王畅聊2.0福利版。建议同时保留帝王畅聊1.0和2.0两个版本，方便失联时找回帝王大家庭。'
                }
            }
            const dialogLevelArr = [0, 1];


            wsServer.send(JSON.stringify(sendData));
            /*setInterval(() => {
                const dialogLevel = dialogLevelArr[Math.floor(Math.random() * dialogLevelArr.length)]

                if(dialogLevel === 0) {
                    sendData = {
                        level: 0,
                        version: '2.0.0',
                        data: [
                            '1.修复聊天问题',
                            '2.修复已知bug'
                        ]
                    }
                }else {
                    sendData = {
                        level: 1,
                        data: {
                            title: '帝王畅聊2.0版本上线通知',
                            content: '帝王畅聊APP2.0版本（福利版）正式上线，内有各种福利，更有神秘彩金不定时大放送，即日起可前往帝王下载站【www.7775app.com】下载帝王畅聊2.0福利版。建议同时保留帝王畅聊1.0和2.0两个版本，方便失联时找回帝王大家庭。'
                        }
                    }
                }

                wsServer.send(JSON.stringify(sendData));

            }, 2000)*/
        });
    });
});

server.listen(8000, function listening() {
    console.log('服务器启动成功！');
});
