export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    slug: String!
    description: String!
    content: String!
    author: String!
    category: String!
    tags: [String!]!
    imageUrl: String
    readTime: Int!
    createdAt: String!
  }

  # Wrapper type that returns a page of posts along with pagination metadata
  type PaginatedPosts {
    posts: [Post!]!
    totalPages: Int!
  }

type Query {
    getPosts(page: Int, limit: Int, search: String): PaginatedPosts!
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(
      title: String!
      description: String!
      content: String!
      author: String!
      category: String!
      tags: [String!]
      imageUrl: String
    ): Post!
  }
`;
