import bcrypt from 'bcryptjs';

/**
 * 时间戳转化函数
 * @params { number } timestamp - 时间戳, 默认当前时间戳
 * @params { number } format - 时间转化格式, 例如: YYYYMMDD
 * @return { string } 格式时间
 */

const dataFormat = (timestamp: number = Date.now()): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}${month}${day}`;
};

/**
 * 生成唯一ID
 * 组成: 当前时间戳+随机6位数
 * 例: 202402286532
 */
const createUserId = () => {
	const dateStr = Date.now();
	const random = Math.floor(100000 + Math.random() * 900000);
	return dateStr + random;
};

/**
 * 对比数据库密码
 * @params { string } userpwd - 用户密码
 * @params { string } dbpwd - 数据库密码
 * @return { promise } Boolean
 */
const compasePassword = (userpwd: string, dbpwd: string | null | undefined): Promise<Boolean> => {
	return new Promise((resolve, reject) => {
		if (typeof dbpwd === 'string') {
			bcrypt.compare(userpwd, dbpwd, (error) => {
				!error ? resolve(true) : reject(false);
			});
		}
	});
};

export default {
	createUserId,
	dataFormat,
	compasePassword,
};