import { Post } from '../models/Post';

interface CreatePostInput {
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
}

/**
 * Generates a URL-friendly slug from a post title.
 * Appends a short timestamp suffix to guarantee uniqueness.
 */
const generateSlug = (title: string): string => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`;
};

/**
 * Estimates reading time (in minutes) based on average 200 words/minute reading speed.
 */
const calculateReadTime = (content: string): number => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

/**
 * PostService is the business logic layer.
 * It abstracts all Mongoose/database operations away from the GraphQL resolvers,
 * ensuring the resolvers remain thin controllers.
 */
export const PostService = {
  /**
   * Fetch a paginated list of posts, optionally filtered by a search query.
   */
  async getAllPosts(page: number = 1, limit: number = 5, search?: string) {
    try {
      const skip = (page - 1) * limit;
      
      // Build the query object
      const query: any = {};
      if (search && search.trim() !== '') {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }

      const [posts, totalCount] = await Promise.all([
        Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Post.countDocuments(query),
      ]);

      return {
        posts,
        totalPages: Math.ceil(totalCount / limit),
      };
    } catch (error) {
      console.error('Error in getAllPosts service:', error);
      throw new Error('Failed to fetch posts from database');
    }
  },

  /**
   * Fetch a single post by its MongoDB document ID.
   */
  async getPostById(id: string) {
    try {
      return await Post.findById(id);
    } catch (error) {
      console.error('Error in getPostById service:', error);
      throw new Error('Failed to fetch post from database');
    }
  },

  /**
   * Create a new blog post.
   * Automatically generates a unique slug and calculates reading time.
   */
  async createPost(data: CreatePostInput) {
    try {
      const slug = generateSlug(data.title);
      const readTime = calculateReadTime(data.content);

      const newPost = new Post({
        ...data,
        slug,
        readTime,
        tags: data.tags || [],
        imageUrl: data.imageUrl || '',
      });

      return await newPost.save();
    } catch (error) {
      console.error('Error in createPost service:', error);
      throw new Error('Failed to save post to database');
    }
  },
};
