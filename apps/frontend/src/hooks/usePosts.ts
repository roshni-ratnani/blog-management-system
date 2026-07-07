import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import { Post } from '../types/post';

interface PaginatedPostsData {
  getPosts: {
    posts: Post[];
    totalPages: number;
  };
}

/**
 * Custom hook to fetch paginated blog posts from the GraphQL API.
 * Abstracts Apollo Client and pagination state away from UI components.
 *
 * @returns posts, pagination state, loading/error, and page navigation helper.
 */
export const usePosts = (searchQuery: string = '') => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const { data, loading, error } = useQuery<PaginatedPostsData>(GET_POSTS, {
    variables: { page: currentPage, limit, search: searchQuery },
    fetchPolicy: 'cache-and-network',
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    posts: data?.getPosts.posts || [],
    totalPages: data?.getPosts.totalPages || 1,
    currentPage,
    goToPage,
    loading,
    error,
  };
};
