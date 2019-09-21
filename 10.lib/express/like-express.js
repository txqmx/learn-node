const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
    constructor(){
        // 存放中间件的列表
        this.routes = {
            all: [],   // app.use(...)
            get: [],   // app.get(...)
            post: []   // app.post(...)
        }
    }
    // 通用函数
    register(path){
        const info = {};
        if(typeof path === 'string'){
            info.path = path;
            // 从第二参数开始，转换成数组，存入stack
            info.stack = slice.call(arguments,1) // stack 为传入的中间件
        } else {
            info.path = '/';
            info.stack = slice.call(arguments,0)
        }
        return info
    }
    use(){
        const info = this.register.apply(this, arguments);
        this.routes.all.push(info)
    }
    get(){
        const info = this.register.apply(this, arguments);
        this.routes.get.push(info)
    }
    post(){
        const info = this.register.apply(this, arguments);
        this.routes.post.push(info)
    }
    match(method, url){
        let stack = [];
        if(url === '/favicon.ico'){
            return stack
        }
        // 获取routes
        let curRoutrs = [];
        curRoutrs = curRoutrs.concat(this.routes.all);
        curRoutrs = curRoutrs.concat(this.routes[method])

        curRoutrs.forEach(routeInfo => {
            if(url.indexOf(routeInfo.path) === 0) {
                // url === '/api/get-cookie' 且 routeInfo.path === '/'
                // url === '/api/get-cookie' 且 routeInfo.path === '/api'
                // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
                stack = stack.concat(routeInfo.stack)
            }
        });
        return stack
    }
    // 核心的 next 机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            const middleware = stack.shift()
            if(middleware){
                // 执行中间件函数
                middleware(req, res, next)
            }
        };
        next()
    }
    callback(){
        return (req,res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            };
            const url = req.url;
            const method = req.method.toLowerCase()

            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }
    listen(...args){
        const server = http.createServer(this.callback());
        server.listen(...args)
    }
}

// 工厂函数
module.exports = () => {
    return new LikeExpress()
};
