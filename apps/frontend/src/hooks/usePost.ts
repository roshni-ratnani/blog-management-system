import { useQuery } from '@apollo/client';
import { GET_POST } from '../graphql/queries';
import { Post } from '../types/post';

/**
 * Custom hook to fetch a single blog post by its ID.
 * Skips the query if no ID is provided.
 *
 * @param id - The MongoDB ID of the post to fetch.
 * @returns The post data, loading state, and any errors.
 */
export const usePost = (id: string) => {
  const { loading, error, data } = useQuery<{ getPost: Post }>(GET_POST, {
    variables: { id },
    skip: !id,
  });

  return {
    post: data?.getPost || null,
    loading,
    error,
  };
};
