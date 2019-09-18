//----------- 标准输入输出
// process.stdin.pipe(process.stdout)

//----------- 网络IO默认为stream方式     req,res本身就是stream对象
// const http = require('http');
// const server = http.createServer((req, res) => {
//     if(req.method === 'POST'){
//         req.pipe(res)
//     }
// })
//
// server.listen(8000)

//------------- 复制文件
// const fs = require('fs');
// const path = require('path');
//
// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-bak.txt');
//
// const readStream = fs.createReadStream(fileName1); // 创建一个stream对象（水桶）
// const writeStream = fs.createWriteStream(fileName2);
//
// readStream.pipe(writeStream);
//
// readStream.on('data', chunk => { // 一点点读取,监听每次读取的内容
//     console.log(chunk.toString());
// })
//
// readStream.on('end', () => {
//     console.log('copy done');
// })

const http = require('http');
const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, 'data.txt');

const server = http.createServer((req, res) => {
    if(req.method === 'GET'){
        const readStream = fs.createReadStream(fileName1);
        readStream.pipe(res)
    }
})

server.listen(8000)
