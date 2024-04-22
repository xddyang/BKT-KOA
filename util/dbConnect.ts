import mongoose from 'mongoose';

const uri = 'mongodb+srv://xddyang:6zg1EWkHqlqVmHwV@xddyang.gbvwfjt.mongodb.net/';
const connectDB = async ():Promise<void> => {
    try {
        await mongoose.connect(uri);
        console.log('数据库连接成功!')
    } catch (error) {
        console.error('数据库连接失败: ', error);
    }
}

export default connectDB;