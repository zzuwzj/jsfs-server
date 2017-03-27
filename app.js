// 引入koa, koa 2 导入的是一个class
const Koa = require('koa');

// 引入koa-router，返回的是一个函数
const router = require('koa-router')();

// 引入koa-bodyparser，处理post请求的body
const bodyParser = require('koa-bodyparser')();

const onerror = require('koa-onerror');

// 创建一个koa app
const app = new Koa();

onerror(app);

// 记录请求的url
app.use(async (ctx, next) => {
  console.log(`Processing ${ctx.request.method} ${ctx.request.url} ...`)
  await next();
});

// add url-route
router.get('/hello/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/login', async (ctx, next) => {
  ctx.response.body = `<h1>Login</h1>
  <form action="/signin" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input name="pwd" type="password"></p>
    <p><input type="submit" value="登录"></p>
  </form>`;
});

router.post('/signin', async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let pwd = ctx.request.body.pwd || '';

  console.log(`signin with name: ${name}, password: ${pwd}`);

  if (name === 'koa' && pwd === '1234') {
    ctx.response.body = `<h1>Welcome, ${name}!`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/login">Try again</a></p>`;
  }
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1><a href="/login">Login</a>';
});

app.use(bodyParser);

// add router middleware
app.use(router.routes())

// 监听3000端口
app.listen(3000)
console.log('server started and listening port 3000 ...');
