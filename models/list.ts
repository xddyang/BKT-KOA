import mongoose from "mongoose";
const Schema = mongoose.Schema;

// 用户数据模型
const listSchema = new Schema({
	userid: { type: String, unique: true, index: true },

}, { versionKey: false });

export default mongoose.model('List', listSchema);