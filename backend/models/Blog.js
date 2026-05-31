const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  image: String,
  date: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

module.exports = mongoose.model('Blog', BlogSchema);
