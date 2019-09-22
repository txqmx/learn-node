const { ErrorModel } = require('../model/resModel');

module.exports = async (ctx, next) => { // koa2中间件规范
    if(ctx.session.username){
        await next()
        return
    }
    ctx.body = new ErrorModel('未登录')
}
