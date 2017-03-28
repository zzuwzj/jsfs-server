// 引入koa, koa 2 导入的是一个class
const Koa = require('koa');
// 引入koa-bodyparser，返回的是一个函数，处理post请求的body
const bodyParser = require('koa-bodyparser')();
const onerror = require('koa-onerror');

const controller = require('./controller');
const logger = require('./util/logger');

// 创建一个koa app
const app = new Koa();

onerror(app);

// 记录请求的url
app.use(async (ctx, next) => {
  logger.info(`Processing ${ctx.request.method} ${ctx.request.url} ...`)
  await next();
});

app.use(bodyParser);

// add router middleware
app.use(controller())

// 监听3000端口
app.listen(3000)
logger.info('server started and listening port 3000 ...');
