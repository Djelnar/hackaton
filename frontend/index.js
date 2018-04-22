const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const fs = require('fs')

router.get('*', async ctx => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream(path.join(__dirname, 'build', 'index.html'))
})

app
  .use(serve('build'))
  .use(router.routes())
  .listen(3000, (err) => {
    if (err) throw err
  })