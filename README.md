# Blog Management System

A full-stack blog management platform built with a modern monorepo architecture. Create, browse, and manage blog posts with a rich text editor, category filtering, search, image uploads, and a beautiful responsive UI.

---

## Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** – lightning-fast dev server and bundler
- **Apollo Client** – GraphQL state management and caching
- **React Router v6** – client-side routing with data router support
- **Styled Components** – component-scoped CSS-in-JS
- **TipTap** – rich text editor (Bold, Italic, Headings, Lists, Code, etc.)

### Backend
- **Node.js** with **TypeScript**
- **Apollo Server 4** with **Express** – GraphQL API server
- **Mongoose** – MongoDB ODM
- **dotenv** – environment variable management
- **nodemon** – auto-restart in development

### Infrastructure
- **MongoDB** (local) – document database for posts
- **npm Workspaces** – monorepo package management
- **concurrently** – runs frontend and backend in parallel

---

## Project Structure

```
blog-management-datacube/
├── apps/
│   ├── backend/
│   │   └── src/
│   │       ├── config/
│   │       │   └── db.ts           # MongoDB connection setup
│   │       ├── graphql/
│   │       │   ├── typeDefs.ts     # GraphQL schema definitions
│   │       │   └── resolvers.ts    # GraphQL resolvers
│   │       ├── models/
│   │       │   └── Post.ts         # Mongoose Post model
│   │       ├── services/
│   │       │   └── postService.ts  # Business logic layer
│   │       ├── seed.ts             # Database seeder (15 demo posts)
│   │       └── index.ts            # App entry point
│   │
│   └── frontend/
│       └── src/
│           ├── components/
│           │   ├── BlogCard/        # Reusable post card component
│           │   ├── Header/          # Sticky top navigation bar
│           │   ├── Footer/          # Footer with categories
│           │   └── RichTextEditor/  # TipTap editor wrapper
│           ├── graphql/
│           │   └── queries.ts       # Apollo GraphQL queries & mutations
│           ├── hooks/
│           │   ├── usePosts.ts      # Fetch paginated/searched posts
│           │   └── useCreatePost.ts # Create post mutation with cache refetch
│           ├── pages/
│           │   ├── Home/            # Home layout (Hero, Split, Grid)
│           │   ├── CreatePost/      # Blog post form with rich editor
│           │   └── PostDetail/      # Full post view
│           ├── styles/
│           │   └── GlobalStyles.ts  # CSS design tokens and reset
│           ├── types/
│           │   └── post.ts          # TypeScript interfaces
│           ├── utils/
│           │   └── postHelpers.ts   # Image, date, category helpers
│           ├── App.tsx              # Outlet layout wrapper
│           ├── Root.tsx             # Router + Apollo Provider setup
│           └── main.tsx             # App entry point
│
├── package.json                     # Root workspace config + scripts
└── README.md
```

---

## Features

- **Home Page Layout** – Hero post (largest, newest), split-section with a medium card and vertical list, followed by a 3-column blog grid
- **Load More** – Loads the next page of posts on demand
- **Search** – Real-time search across all posts via MongoDB `$regex`
- **Category Filter** – Filter posts by category with a clear/reset option
- **Create Post** – Full form with slug auto-generation, rich text editor, image upload (Base64), category, tags, and auto-calculated read time
- **Unsaved Changes Warning** – Custom modal blocks navigation if the user tries to leave a partially filled form
- **Post Detail View** – Renders the full TipTap HTML content with a hero image
- **Responsive Design** – Mobile-friendly across all pages and breakpoints

---

## Getting Started

### Prerequisites
- **Node.js** `v18.x` (enforced by Volta in `package.json`)
- **MongoDB** running locally on port `27017`

### 1. Clone the repository
```bash
git clone <repository-url>
cd blog-management-datacube
```

### 2. Install all dependencies
```bash
npm install
```
> This installs packages for both `apps/backend` and `apps/frontend` via npm workspaces.

### 3. Configure environment variables
Create a `.env` file inside `apps/backend/`:
```env
MONGODB_URI=mongodb://localhost:27017/blogdb
PORT=4000
```

### 4. Seed the database
Populate the database with 15 demo blog posts:
```bash
./node_modules/.bin/tsc apps/backend/src/seed.ts --esModuleInterop && node apps/backend/src/seed.js
```

### 5. Run the development servers
Start both the backend and frontend concurrently from the root:
```bash
npm run dev
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:5173         |
| Backend  | http://localhost:4000/graphql |

---

## GraphQL API

### Queries

#### `getPosts` – Paginated list of posts
```graphql
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
```

#### `getPost` – Single post by ID
```graphql
query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    content
    author
    category
    tags
    imageUrl
    readTime
    createdAt
  }
}
```

### Mutations

#### `createPost` – Create a new blog post
```graphql
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
  }
}
```

---

## Available Scripts

All scripts run from the **root** directory:

| Command         | Description                                                  |
|-----------------|--------------------------------------------------------------|
| `npm run dev`   | Starts backend (port 4000) and frontend (5173) concurrently  |
| `npm run build` | Builds both apps for production                              |
| `npm run start` | Runs compiled backend + Vite preview server                  |
