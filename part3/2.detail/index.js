const mount = require('koa-mount');
const static = require('koa-static')
const app = new (require('koa'));
const rpcClient = require('./client');
const template = require('./template');

const detailTemplate = template(__dirname + '/template/index.html');

app.use(mount('/static', static(`${__dirname}/source/static/`)))

app.use(async (ctx) => {
    console.log(12, JSON.stringify(ctx))
    if (!ctx.query.columnid) {
        ctx.status = 400;
        ctx.body = ctx
        return
    }
    const result = await new Promise((resolve, reject) => {
        rpcClient.write({
            columnid: ctx.query.columnid
        }, function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })
    ctx.status = 200;
    ctx.body = detailTemplate(result)
})

module.exports = app;