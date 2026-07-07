import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'create', element: <CreatePost /> },
      { path: 'post/:id', element: <PostDetail /> },
    ],
  },
]);

function Root() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default Root;
