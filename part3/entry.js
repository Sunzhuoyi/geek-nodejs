const mount = require('koa-mount');
const koa = mount('koa');

const app = new koa;

app.use(
    mount('/download', require('./1.download/index'))
);

app.listen(3000, () => {
    console.log("listened 3000")
});