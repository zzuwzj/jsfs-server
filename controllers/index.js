const indexHandler = async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1><a href="/login">Login</a>';
};

module.exports = {
  'GET /': indexHandler
};
