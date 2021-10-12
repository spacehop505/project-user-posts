const { Schema, model } = require('mongoose');
const Populate = require('./util/Populate');

const UserPostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String, required: true, minLength: 1, maxLength: 255 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

//UserPostSchema
// .pre('findOne', Populate('author'))
// .pre('find', Populate('author'));


module.exports = model('UserPost', UserPostSchema);