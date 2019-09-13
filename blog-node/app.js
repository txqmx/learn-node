const querystring = require('querystring')
const hangleBlogRouter = require('./src/router/blog')
const hangleUserRouter = require('./src/router/user')

// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}


const serverHandle = (req, res) =>{
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 处理 postData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由

        // const blogData = hangleBlogRouter(req, res)
        // if(blogData){
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }

        const blogResult = hangleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            });
            return
        }

        // 处理user路由
        // const userData = hangleUserRouter(req, res)
        // if(userData){
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }

        const userResult = hangleUserRouter(req, res)
        if(userResult){
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 处理未命中 返回404
        res.writeHead(404, {"content-type" : "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
};

module.exports = serverHandle;
// env: process.env.NODE_ENV
