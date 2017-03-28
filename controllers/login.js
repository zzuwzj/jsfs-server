const loginHandler = async (ctx, next) => {
  ctx.response.body = `<h1>Login</h1>
  <form action="/signin" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input name="pwd" type="password"></p>
    <p><input type="submit" value="登录"></p>
  </form>`;
};

const signinHandler = async (ctx, next) => {
  const name = ctx.request.body.name || '';
  const pwd = ctx.request.body.pwd || '';

  console.log(`signin with name: ${name}, password: ${pwd}`);

  if (name === 'koa' && pwd === '1234') {
    ctx.response.body = `<h1>Welcome, ${name}!`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/login">Try again</a></p>`;
  }
}

module.exports = {
  'GET /login': loginHandler,
  'POST /signin': signinHandler
}
