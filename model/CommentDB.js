const { Schema, model } = require('mongoose');
const Populate = require('./util/Populate');

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String, required: true, minLength: 1, maxLength: 255 },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });


commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('replies'))
  .pre('find', Populate('replies'));


module.exports = model('Comment', commentSchema);