"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * Mongoose schema for a Blog Post.
 * Extended to support rich editorial fields such as author, category, tags, and slug.
 */
var postSchema = new mongoose_1.default.Schema({
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
exports.Post = mongoose_1.default.model('Post', postSchema);
