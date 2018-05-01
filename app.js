const config = require('./config.json');
const lib = require('./lib');
const Koa = require('koa');
const json = require('koa-json')
const Router = require('koa-router');
const router = new Router();

const app = new Koa();
app.use(json())
app.use(router.routes());

router.get('/', (ctx, next) => {
     ctx.body = "Token Info"
});


router.get('/token/:contract', tokenInfoController);
router.get('/balance/:contract/:address', balanceInfoController);

async function tokenInfoController(ctx, next) {
     try {
         const contractAddress = ctx.params.contract;
         const result = await lib.tokenInfo(contractAddress)
         ctx.body = result
     }catch (e) {
          ctx.status = 400;
          ctx.body = {message: e.toString()}
     }
}
async function balanceInfoController(ctx, next) {
    try {
        const contractAddress = ctx.params.contract;
        const userAddress = ctx.params.address;
        const result = await lib.tokenInfo(contractAddress,userAddress)
        ctx.body = result
    }catch (e) {
        ctx.status = 400;
        ctx.body = {message: e.toString()}
    }
}


const server = app.listen(config.port);
console.log(`Run in port : ${server.address().port}`)