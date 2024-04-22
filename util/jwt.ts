import jwt from 'jsonwebtoken';
import { Next, Context } from 'koa';

// 秘钥
const secretKey = 'react-bk-project';

// 创建TOKEN
const createToken = (userInfo: Object) => {
	// 当前时间戳
	const nowTime = new Date();

	// 失效时间戳
    // const expireTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 1, 0, 0, 0, 0);

	// test 30分钟
	const expireTime = new Date(nowTime.getTime() + 30 * 60 * 1000);
    
    // 计算过期时间与当前时间的时间差，以秒为单位
    const expiresIn = Math.floor((expireTime.getTime() - nowTime.getTime()) / 1000);

	// 参数: token描述信息 / 秘钥 / 有效时间
	return jwt.sign({ userInfo }, secretKey, { expiresIn });
};

// 验证TOKEN
const verify = (token: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (error, decoded) => {
			if (error) {
				reject(error);
			} else {
				resolve(decoded);
			}
		})
	});
};

const userTokenState = async (ctx: Context, next: Next) => {
	if (!ctx.header['authorization']) {
		ctx.response.status = 403;
		ctx.body = { code: 403, msg: '用户未登录' };
		return;
	}
	// 获取请求头中的token
	const token = ctx.header['authorization'];
	// 验证token
	await verify(token).then(res => {
		ctx.userInfo = res;
		return next();
	}).catch(err => {
		ctx.response.status = 401;
		ctx.body = { msg: '登录状态异常, 请重新登录', ...err };
	});
}

export default {
	userTokenState,
	createToken
};