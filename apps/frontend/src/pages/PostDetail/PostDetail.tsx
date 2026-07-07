import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../../hooks/usePost';
import { usePosts } from '../../hooks/usePosts';
import BlogCard from '../../components/BlogCard';
import { getCategoryColor, getPostImage, formatDate } from '../../utils/postHelpers';

const Wrapper = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-black);
  }
`;

const ArticleHeader = styled.header`
  margin-bottom: 2rem;
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
  margin-right: 0.75rem;
`;

const ReadTime = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
`;

const ArticleTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text-primary);
  margin-top: 1rem;
  letter-spacing: -0.02em;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

const AuthorAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-muted);

  strong {
    display: block;
    color: var(--color-text-primary);
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin: 2rem 0;
`;

const ArticleContent = styled.article`
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.85;
  color: var(--color-text-secondary);
  max-width: 760px;
  overflow-wrap: break-word;

  p { margin-bottom: 1.25rem; }
  strong { font-weight: 700; color: var(--color-text-primary); }
  em { font-style: italic; }
  
  h1, h2, h3 {
    font-family: var(--font-serif);
    font-weight: 700;
    color: var(--color-text-primary);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  h1 { font-size: 1.8rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }

  ul, ol {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }

  li { margin-bottom: 0.5rem; }

  blockquote {
    border-left: 4px solid var(--color-border);
    padding: 0.5rem 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    background: #fafafa;
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  code {
    background: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.85em;
  }

  pre {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1rem;
    border-radius: var(--radius-sm);
    overflow-x: auto;
    margin-bottom: 1.25rem;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }
`;

const TagsList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
`;

const Tag = styled.span`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.3rem 0.7rem;
  border-radius: 2px;
  font-size: 0.8rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 3.5rem 0;
`;

const LatestSection = styled.div``;

const SectionLabel = styled.p`
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-align: center;
  margin-bottom: 0.4rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 36px;
    height: 3px;
    background: var(--color-black);
    margin: 0.6rem auto 0;
  }
`;

const LatestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const SkeletonBlock = styled.div`
  @keyframes shimmer {
    0% { background-position: -800px 0; }
    100% { background-position: 800px 0; }
  }
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite;
`;

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = usePost(id || '');
  const { posts: latestPosts } = usePosts();

  if (loading) {
    return (
      <Wrapper>
        <SkeletonBlock style={{ height: '2rem', width: '40%', marginBottom: '1rem' }} />
        <SkeletonBlock style={{ height: '3rem', marginBottom: '2rem' }} />
        <SkeletonBlock style={{ height: '400px', marginBottom: '2rem' }} />
      </Wrapper>
    );
  }

  if (error || !post) {
    return (
      <Wrapper>
        <BackLink to="/">← Back to Blog</BackLink>
        <p>Post not found.</p>
      </Wrapper>
    );
  }

  const color = getCategoryColor(post.category);
  const imageUrl = getPostImage(post.imageUrl, post.id);
  const initials = post.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const relatedPosts = latestPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <Wrapper>
      <BackLink to="/">← Back to Blog</BackLink>

      <ArticleHeader>
        <div>
          <CategoryBadge $color={color}>{post.category}</CategoryBadge>
          <ReadTime>{post.readTime} min read</ReadTime>
        </div>

        <ArticleTitle>{post.title}</ArticleTitle>

        <ArticleMeta>
          <AuthorAvatar>{initials}</AuthorAvatar>
          <AuthorInfo>
            <strong>{post.author}</strong>
            {formatDate(post.createdAt)}
          </AuthorInfo>
        </ArticleMeta>
      </ArticleHeader>

      <FeaturedImage src={imageUrl} alt={post.title} />

      <ArticleContent dangerouslySetInnerHTML={{ __html: post.content || '' }} />

      {post.tags && post.tags.length > 0 && (
        <TagsList>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsList>
      )}

      {relatedPosts.length > 0 && (
        <>
          <Divider />
          <LatestSection>
            <SectionLabel>Publish what you think</SectionLabel>
            <SectionTitle>Latest Blogs</SectionTitle>
            <LatestGrid>
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </LatestGrid>
          </LatestSection>
        </>
      )}
    </Wrapper>
  );
}

export default PostDetail;
