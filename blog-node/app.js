const querystring = require('querystring')
const hangleBlogRouter = require('./src/router/blog')
const hangleUserRouter = require('./src/router/user')

const serverHandle = (req, res) =>{
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[0])

    // 处理blog路由
    const blogData = hangleBlogRouter(req, res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    // 处理user路由
    const userData = hangleUserRouter(req, res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    // 处理未命中 返回404
    res.writeHead(404, {"content-type" : "text/plain"})
    res.write("404 Not Found\n")
    res.end()

};

module.exports = serverHandle;
// env: process.env.NODE_ENV
