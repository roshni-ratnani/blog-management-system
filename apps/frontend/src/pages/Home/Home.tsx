import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import BlogCard from '../../components/BlogCard';
import { usePosts } from '../../hooks/usePosts';
import { getCategoryColor, getPostImage, formatDate } from '../../utils/postHelpers';

const PageWrapper = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
`;

const SectionLabel = styled.p`
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: var(--color-black);
    margin: 0.75rem auto 0;
  }
`;

const ClearFilterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  margin: -1.5rem auto 3rem;
  transition: all 0.2s ease;
  width: max-content;
  text-decoration: none;

  &:hover {
    color: var(--color-black);
    border-color: var(--color-black);
  }
`;

/* --- Hero Section --- */

const HeroLink = styled(Link)`
  display: block;
  text-decoration: none;
  margin-bottom: 4rem;
  transition: transform 0.2s ease;
  
  &:hover img {
    filter: brightness(0.92);
  }
`;

const HeroMetaTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CategoryBadge = styled.span<{ $color: string }>`
  background: ${({ $color }) => $color}18;
  color: ${({ $color }) => $color};
  padding: 0.25rem 0.6rem;
  border-radius: 2px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroReadTime = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const HeroTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeroTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  flex: 1;
`;

const HeroMetaBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
  padding-bottom: 0.5rem;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
`;

const HeroImage = styled.img`
  width: 100%;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  transition: filter 0.3s ease;

  @media (max-width: 768px) {
    aspect-ratio: 16 / 9;
  }
`;

const HeroExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 800px;
`;

/* --- Split Section --- */

const SplitSection = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1.2fr;
  gap: 3rem;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MediumPostLink = styled(Link)`
  display: block;
  text-decoration: none;
  
  &:hover img { filter: brightness(0.92); }
`;

const MediumImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-sm);
  margin-bottom: 1.2rem;
  transition: filter 0.3s ease;
`;

const MediumTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const MediumExcerpt = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
`;

const ListPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ListPostItem = styled(Link)`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1rem;
  text-decoration: none;
  align-items: center;

  &:hover img { filter: brightness(0.92); }

  @media (max-width: 480px) {
    grid-template-columns: 100px 1fr;
  }
`;

const ListPostImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: var(--radius-sm);
  transition: filter 0.3s ease;
`;

const ListPostContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListPostTitle = styled.h4`
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.4;
  margin-bottom: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ListPostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
`;

/* --- Latest Section --- */

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3.5rem;
`;

const LoadMoreBtn = styled.button`
  background: var(--color-black);
  color: var(--color-white);
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  cursor: pointer;
  margin-top: 1.5rem;
  width: max-content;
  align-self: flex-start;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  border: 1px solid ${({ $active }) => ($active ? 'var(--color-black)' : 'var(--color-border)')};
  background: ${({ $active }) => ($active ? 'var(--color-black)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-white)' : 'var(--color-text-secondary)')};
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  font-family: var(--font-sans);
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    border-color: var(--color-black);
    color: var(--color-black);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const NavBtn = styled(PageBtn)`
  width: auto;
  padding: 0 0.75rem;
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  color: var(--color-text-muted);

  h3 {
    font-family: var(--font-serif);
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: var(--color-text-secondary);
  }

  p {
    font-size: 0.9rem;
  }
`;

const LoadingState = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 2rem;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const SkeletonCard = styled.div`
  @keyframes shimmer {
    0% { background-position: -800px 0; }
    100% { background-position: 800px 0; }
  }

  aspect-ratio: 16 / 9;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite;
`;

const Dot = styled.span`
  color: var(--color-border);
`;


function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const { posts, loading, totalPages, currentPage, goToPage } = usePosts(search);

  // Derive layouts
  const isSearchActive = !!search;
  const showComplexLayout = !isSearchActive && currentPage === 1 && posts.length >= 5;

  // Breakdown for complex layout
  const heroPost = showComplexLayout ? posts[0] : null;
  const mediumPost = showComplexLayout ? posts[1] : null;
  const listPosts = showComplexLayout ? posts.slice(2, 5) : [];
  const gridPosts = showComplexLayout ? posts.slice(5) : posts;

  return (
    <PageWrapper>
      
      {/* Show header only for search or grid-only views (or later if needed, but the design shows it above the Latest Blogs) */}
      {!showComplexLayout && (
        <>
          <SectionLabel>{search ? `Search Results for "${search}"` : 'Publish what you think'}</SectionLabel>
          <SectionTitle style={search ? { marginBottom: '1.5rem' } : undefined}>
            {search ? (posts.length > 0 || loading ? 'Found Blogs' : 'No Results') : 'Latest Blogs'}
          </SectionTitle>
          
          {search && (
            <div style={{ textAlign: 'center' }}>
              <ClearFilterLink to="/">
                ✕ Clear Filter
              </ClearFilterLink>
            </div>
          )}
        </>
      )}

      {loading && posts.length === 0 ? (
        <LoadingState>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </LoadingState>
      ) : posts.length === 0 ? (
        <EmptyState>
          {search ? (
            <>
              <h3>No matching posts found</h3>
              <p>Try adjusting your search query or category.</p>
            </>
          ) : (
            <>
              <h3>No posts yet</h3>
              <p>Be the first to publish something!</p>
            </>
          )}
        </EmptyState>
      ) : (
        <>
          {/* Complex Layout Components */}
          {showComplexLayout && heroPost && mediumPost && (
            <>
              <HeroLink to={`/post/${heroPost.id}`}>
                <HeroMetaTop>
                  <CategoryBadge $color={getCategoryColor(heroPost.category)}>{heroPost.category}</CategoryBadge>
                  <HeroReadTime>{heroPost.readTime} min read</HeroReadTime>
                </HeroMetaTop>
                
                <HeroTitleRow>
                  <HeroTitle>{heroPost.title}</HeroTitle>
                  
                  <HeroMetaBottom>
                    <AuthorAvatar>{heroPost.author.slice(0, 2).toUpperCase()}</AuthorAvatar>
                    <span>{heroPost.author}</span>
                    <Dot>·</Dot>
                    <span>{formatDate(heroPost.createdAt)}</span>
                  </HeroMetaBottom>
                </HeroTitleRow>

                <HeroImage src={getPostImage(heroPost.imageUrl, heroPost.id)} alt={heroPost.title} />
                <HeroExcerpt>{heroPost.description}</HeroExcerpt>
              </HeroLink>

              <SplitSection>
                {/* Left Side: Medium Post */}
                <MediumPostLink to={`/post/${mediumPost.id}`}>
                  <HeroMetaTop style={{ marginBottom: '0.6rem' }}>
                    <CategoryBadge $color={getCategoryColor(mediumPost.category)}>{mediumPost.category}</CategoryBadge>
                    <HeroReadTime>{mediumPost.readTime} min read</HeroReadTime>
                  </HeroMetaTop>
                  <MediumImage src={getPostImage(mediumPost.imageUrl, mediumPost.id)} alt={mediumPost.title} />
                  <MediumTitle>{mediumPost.title}</MediumTitle>
                  <MediumExcerpt>{mediumPost.description}</MediumExcerpt>
                </MediumPostLink>

                {/* Right Side: List Posts */}
                <ListPostsWrapper>
                  {listPosts.map(post => (
                    <ListPostItem key={post.id} to={`/post/${post.id}`}>
                      <ListPostImage src={getPostImage(post.imageUrl, post.id)} alt={post.title} />
                      <ListPostContent>
                        <ListPostTitle>{post.title}</ListPostTitle>
                        <ListPostMeta>
                          <span style={{ color: getCategoryColor(post.category), fontWeight: 600 }}>{post.category}</span>
                          <Dot>·</Dot>
                          <span>{formatDate(post.createdAt)}</span>
                        </ListPostMeta>
                      </ListPostContent>
                    </ListPostItem>
                  ))}
                  
                  {totalPages > 1 && (
                    <LoadMoreBtn onClick={() => goToPage(currentPage + 1)}>
                      Load More Blogs
                    </LoadMoreBtn>
                  )}
                </ListPostsWrapper>
              </SplitSection>

              {/* Title for grid below */}
              <SectionLabel>Publish what you think</SectionLabel>
              <SectionTitle>Latest Blogs</SectionTitle>
            </>
          )}

          {/* Standard Grid for remaining posts */}
          <Grid>
            {gridPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </Grid>
        </>
      )}

      {/* Only show standard pagination if we are not on the first page of complex layout */}
      {totalPages > 1 && (!showComplexLayout || currentPage > 1) && (
        <PaginationBar>
          <NavBtn onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            ← Prev
          </NavBtn>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageBtn key={page} $active={page === currentPage} onClick={() => goToPage(page)}>
              {page}
            </PageBtn>
          ))}
          <NavBtn onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next →
          </NavBtn>
        </PaginationBar>
      )}
    </PageWrapper>
  );
}

export default Home;
