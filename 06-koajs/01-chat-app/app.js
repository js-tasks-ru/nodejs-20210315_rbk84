const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const subscribers = [];

router.get('/subscribe', async (ctx) => {
  const promise = new Promise((resolve) => subscribers.push(resolve));
  ctx.body = await promise;
});

router.post('/publish', async (ctx) => {
  const message = ctx.request.body.message;

  if (!message) {
    ctx.throw(400);
  }

  subscribers.forEach((resolve) => resolve(String(message)));

  ctx.status = 200;
});

app.use(router.routes());

module.exports = app;
