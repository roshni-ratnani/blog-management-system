import { PostService } from '../services/postService';

/**
 * GraphQL Resolvers — the Controller layer.
 * Each resolver extracts its arguments and delegates to the PostService.
 *
 * The `Post` field resolvers below provide safe defaults for legacy documents
 * that were created before the schema was extended (e.g., missing slug, author).
 * This avoids a data migration and keeps the API backwards compatible.
 */
export const resolvers = {
  // Field-level resolvers: called per-document, provide defaults for old records
  Post: {
    slug: (parent: any) =>
      parent.slug || parent.title?.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-') || 'post',
    author: (parent: any) => parent.author || 'Anonymous',
    category: (parent: any) => parent.category || 'General',
    tags: (parent: any) => parent.tags || [],
    readTime: (parent: any) => parent.readTime || 1,
    imageUrl: (parent: any) => parent.imageUrl || '',
  },

  Query: {
    getPosts: async (_: any, { page = 1, limit = 5, search }: { page?: number; limit?: number; search?: string }) => {
      return await PostService.getAllPosts(page, limit, search);
    },
    getPost: async (_: any, { id }: { id: string }) => {
      return await PostService.getPostById(id);
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      args: {
        title: string;
        description: string;
        content: string;
        author: string;
        category: string;
        tags?: string[];
        imageUrl?: string;
      }
    ) => {
      return await PostService.createPost(args);
    },
  },
};

