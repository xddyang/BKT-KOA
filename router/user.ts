import Router from 'koa-router';
import { Context } from 'koa';
import userService from '../service/user';
import jwt from '../util/jwt';
const router = new Router();

// user相关接口自定义异常状态码
const USER_ERROR_CODE = {
	FULL_DATA_ERROR: 1001,	// 信息不完整
};

interface UserRequestBody {
	username?: string,
	password?: string,
	nickname?: string
};

// 登录接口
router.post('/login', async (ctx: Context) => {
	const { username, password } = ctx.request.body as UserRequestBody;
	if (!username || !password) return ctx.body = { code: USER_ERROR_CODE.FULL_DATA_ERROR, msg: '请输入完整个人信息' };

	const params = { username, password, nickname: '' };
	try {
		const userData = await userService.accountHandle(params, 'login');	// 登录处理
		const arr = [];
		for (let i = 0; i<99999; i++) {
			arr.push({
				ef: 'ewfewf',
				eqfew: 'wefewf'
			})
		}
		ctx.body = (userData?.code === 200)
			? { ...userData, token: jwt.createToken(userData), arr }
			: userData;
	} catch (error) {
		console.error(error);
	}
});

// 注册接口
router.post('/register', async (ctx: Context) => {
	const { username, password, nickname } = ctx.request.body as UserRequestBody;
	if (!username || !password || !nickname) return ctx.body = { code: USER_ERROR_CODE.FULL_DATA_ERROR, msg: '请输入完整个人信息' };
	const params = { username, password, nickname };
	try {
		const userData = await userService.accountHandle(params, 'register');
		ctx.body = (userData?.code === 200)
			? { ...userData, token: jwt.createToken(userData) }
			: userData;
	} catch (error) {
		console.error(error);
	}
});

// 获取用户信息
router.post('/getUserInfo', jwt.userTokenState, async (ctx: Context) => {
	ctx.body = { code: 200, msg: '注册成功!', userInfo: {} }
});

// 用户信息更新接口
router.post('/updateUserInfo', jwt.userTokenState, async (ctx: Context) => {
	ctx.body = { code: 200, msg: '鉴权成功!' }
});

export default router;