import mongoose from 'mongoose';

/**
 * Mongoose schema for a Blog Post.
 * Extended to support rich editorial fields such as author, category, tags, and slug.
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: 'Anonymous',
  },
  category: {
    type: String,
    required: true,
    default: 'General',
  },
  tags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  readTime: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model('Post', postSchema);
