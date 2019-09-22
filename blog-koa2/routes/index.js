const router = require('koa-router')() // 独立于koa2

router.get('/', async (ctx, next) => { // ctx内容，req,res的集合体
  await ctx.render('index', { // render 前端模板相关
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
