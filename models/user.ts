import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

// 用户数据模型
const userSchema = new Schema({
	nickname: String,	// 用户昵称
	username: { type: String, unique: true },	// 账号, unique标识该字段具有唯一性
	userid: { type: String, unique: true, index: true },		// 用户唯一ID, 用于前端封装请求携带其他操作
	password: String,	// 密码
	avatar: { type: String, default: 'https://imger.nl/images/2024/02/23/1.png' },	// 用户头像, 暂时没找到合适图床, 暂不支持用户自己修改
	createTime: { type: Date, default: Date.now() }		// 用户创建时间
}, { versionKey: false });

// 密码对比方法
userSchema.statics.compasePassword = function (userPassword: string, dbPassword: string): Promise<Boolean> {
	return new Promise((resolve, reject) => {
		bcrypt.compare(userPassword, dbPassword, (error, result) => {
			!error ? resolve(true) : reject(false);
		});
	})
}

export default mongoose.model('User', userSchema);