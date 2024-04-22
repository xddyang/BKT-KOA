import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import connectDB from './util/dbConnect';
import user from './router/user';
import list from './router/list';
import cors from '@koa/cors';
import compress from 'koa-compress';

const app = new Koa();
const router = new Router();

/***
 * 自定义异常状态码
 * 26001 ~ 26010
 * 26001 账号或密码错误
 * 26002 账号已存在, 可直接登录
 * 26003 账号不存在, 请注册账号
 * 26004 用户名重复, 请换一个用户名
 */

// 启用压缩
app.use(compress({ threshold: 1024 }))

// 解决跨域
app.use(cors());

// 使用 koa-bodyparser中间件解析请求体
app.use(bodyParser());

// 连接 MongoDB 数据库
connectDB();

router.use('/api/user', user.routes()); // 用户信息相关
router.use('/api/list', list.routes()); // 列表文章相关

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('成功启动服务: http://localhost:3000');
});