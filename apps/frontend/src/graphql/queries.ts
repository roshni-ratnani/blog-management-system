import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($page: Int, $limit: Int, $search: String) {
    getPosts(page: $page, limit: $limit, search: $search) {
      posts {
        id
        title
        slug
        description
        author
        category
        tags
        imageUrl
        readTime
        createdAt
      }
      totalPages
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      slug
      description
      content
      author
      category
      tags
      imageUrl
      readTime
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $description: String!
    $content: String!
    $author: String!
    $category: String!
    $tags: [String!]
    $imageUrl: String
  ) {
    createPost(
      title: $title
      description: $description
      content: $content
      author: $author
      category: $category
      tags: $tags
      imageUrl: $imageUrl
    ) {
      id
      title
      slug
    }
  }
`;
