const express = require('./like-express')

// http 请求实例
const app = express()

app.use((req, res, next) => { // 第一个参数没有写路由地址，都会命中
    console.log('请求开始...', req.method, req.url);
    next()
});

app.use((req, res, next) => {
    // 处理cookie
    console.log('处理cookie');
    req.cookie = {
        userId: '1234'
    }
    next()
});

app.use((req, res, next) => {
    // 处理postData ,异步
    setTimeout(() => {
        console.log('处理postData');
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
});

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由');
    next()
});
app.get('/api', (req, res, next) => {
    console.log('get /api 路由');
    next()
});
app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next()
});

app.get('/api/getCookie', (req, res, next) => {
    console.log('get /api/getCookie ');
    res.json({
        errno: 0,
        data: req.cookie
    })
});

app.post('/api/getPostData', (req, res, next) => {
    console.log('get /api/getPostData ');
    res.json({
        errno: 0,
        data: req.body
    })
});
app.use((req, res, next) => {
    console.log('404');
    res.json({
        errno: -1,
        data: '404 not fount'
    })
});

app.listen(3000, () => {
    console.log('server');
})
