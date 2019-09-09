const http = require('http');
const querystring = require('querystring'); // node自带

// 处理get请求
// const server = http.createServer((req, res) => {
//     const url = req.url;
//     req.query = querystring.parse(url.split('?')[1]); // 解析get请求参数
//     res.end(
//         JSON.stringify(req.query)
//     )
// });

// 处理post请求
const server = http.createServer((req, res) => {
    if(req.method === 'POST'){
        // req 数据格式
        console.log(req.headers['content-type']);
        // 接收数据
        let postData = '' ;
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('end', () => {
            console.log(postData);
            res.end('hello world')
        })
    }
});

server.listen(8000);
