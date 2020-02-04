const mount = require('koa-mount');
const koa = require('koa');

const app = new koa;

app.use(
    mount('/download', require('./1.download/index'))
);

app.listen(3004, () => {
    console.log("listened 3004")
});