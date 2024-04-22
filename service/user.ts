import UserModel from '../models/user';
import util from '../util/util';

type AccountHandleData = {
    username: string,
    password: string,
    nickname: string
};

// ?: 属性可选
type UserData = {
    code: number,
    username?: string,
    nickname?: string,
    avatar?: string,
    createTime?: Date,
    userid?: string,
    msg?: string
};

class UserService {
    /**
     * 用户账户处理方法: 登录 & 注册
     * @param {AccountHandleData} params
     * @param {String} handleType 处理类型标识, login: 登录, register: 注册
     */
    async accountHandle(params: AccountHandleData, handleType: string): Promise<UserData> {
        const { username, password, nickname } = params;
        try {
            const user = await UserModel.findOne({ username }).lean();

            if (user) {
                switch (handleType) {
                    case 'login':
                        if (password === user.password) {
                            const { _id, password, ...data } = user;
                            return { code: 200, userInfo: data } as UserData;
                        } else {
                            return { code: 26001, msg: '密码错误' };
                        }
                    case 'register':
                        return { code: 26002, msg: '账号已存在, 可直接登录' };
                }
            } else {
                switch (handleType) {
                    case 'login':
                        return { code: 26003, msg: '账号不存在, 请注册账号' };
                    case 'register':
                        const userName = await UserModel.findOne({ username }).lean();
                        if (userName) {
                            return { code: 26004, msg: '用户名重复, 请换一个用户名' };
                        } else {
                            const userDb = new UserModel({ username, password, nickname, userid: util.createUserId() });
                            const userInfo = await userDb.save();
                            const { _id, password: pwd, ...data } = userInfo.toObject();
                            return { code: 200, userInfo: data } as UserData;
                        }
                }
            }
        } catch (error) {
            console.error(error);
        }
        return { code: 500, msg: '服务发生错误' }; // 添加默认返回值
    };

	// 获取用户信息
	async getUserInfo(userId: string) {
		try {

		} catch(error) {
			console.error(error);
		}
	}
}

export default new UserService();
