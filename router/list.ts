import Router from 'koa-router';
import { Context } from 'koa';
import userService from '../service/user';
import jwt from '../util/jwt';
const router = new Router();

interface ListRequestBody {
	username?: string,
	password?: string,
	nickname?: string
};

// 获取列表接口
router.post('/getList', jwt.userTokenState, async (ctx: Context) => {
	// const { username, password } = ctx.request.body as UserRequestBody;
	// if (!username || !password) return ctx.body = { code: USER_ERROR_CODE.FULL_DATA_ERROR, msg: '请输入完整个人信息' };

	// const params = { username, password, nickname: '' };
	// try {
	// 	const userData = await userService.accountHandle(params, 'login');	// 登录处理
	// 	ctx.body = (userData?.code === 200)
	// 		? { ...userData, token: jwt.createToken(userData) }
	// 		: userData;
	// } catch (error) {
	// 	console.error(error);
	// }
	return ctx.body = { code: 200, masg: '鉴权成功' };
});

export default router;