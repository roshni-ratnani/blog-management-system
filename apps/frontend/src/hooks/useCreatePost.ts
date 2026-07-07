import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../graphql/queries';

interface CreatePostArgs {
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
}

/**
 * Custom hook to handle creating a new blog post via GraphQL mutation.
 * Automatically refetches the posts list on success.
 *
 * @param onSuccess - Optional callback invoked after a successful mutation.
 * @returns submitPost function, loading state, and any errors.
 */
export const useCreatePost = (onSuccess?: () => void) => {
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { page: 1, limit: 8, search: '' } }],
    onCompleted: () => {
      if (onSuccess) onSuccess();
    },
  });

  const submitPost = (args: CreatePostArgs) => {
    createPost({ variables: args });
  };

  return {
    submitPost,
    loading,
    error,
  };
};
