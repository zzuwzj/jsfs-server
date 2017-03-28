/**
 * controller 处理模块
 * @return function
 */

const fs = require('fs');
const path = require('path');

const logger = require('./util/logger');

const rootPath = __dirname;

const addControllers = router => {
  const files = fs.readdirSync(path.resolve(rootPath, 'controllers'));
  const jsFiles = files.filter( f => f.endsWith('.js'));

  for(const f of jsFiles) {
    logger.info(`processing cntroller: ${f} ...`);
    const handlerMapping = require(path.resolve(rootPath, 'controllers', f));
    addRouteHandler(router, handlerMapping);
  }
}

const addRouteHandler = (router, handlerMapping) => {
  for (const url in handlerMapping) {
    const methodAndPath = url.split(' ');
    if (methodAndPath.length === 2) {
      const method = methodAndPath[0].toUpperCase()
      const urlPath = methodAndPath[1]

      logger.info(`register handler ${method} ${urlPath}`)
      switch(method) {
        case 'GET':
          router.get(urlPath, handlerMapping[url]);
          break;
        case 'POST':
          router.post(urlPath, handlerMapping[url]);
          break;
        default:
          logger.info(`cannto handle ${method}`);
      }
    } else {
      logger.info(`invalid URL: ${url}`);
    }
  }
}

module.exports = dir => {
  const controllerDir = dir || 'controllers'; // 默认扫描controllers目录
  const router = require('koa-router')();

  addControllers(router);

  return router.routes();
}
