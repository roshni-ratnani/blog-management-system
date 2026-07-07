import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../types/post';
import { getCategoryColor, getPostImage, formatDate } from '../../utils/postHelpers';

interface BlogCardProps {
  post: Post;
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:hover img {
    filter: brightness(0.92);
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-sm);
  transition: filter 0.3s ease;
`;

const CardBody = styled.div`
  padding: 1.25rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const CategoryBadge = styled.span<{ $color: string }>`
  background: ${({ $color }) => $color}1A;
  color: ${({ $color }) => $color};
  padding: 0.2rem 0.55rem;
  border-radius: 2px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Dot = styled.span`
  color: var(--color-border);
`;

const CardTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.4;
  margin-bottom: 0.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardExcerpt = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

/**
 * BlogCard renders a single post preview in the home grid.
 * Clicking anywhere navigates to the full post detail page.
 */
function BlogCard({ post }: BlogCardProps) {
  const color = getCategoryColor(post.category);
  const imageUrl = getPostImage(post.imageUrl, post.id);
  const dateStr = formatDate(post.createdAt);

  return (
    <Link to={`/post/${post.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <Card>
        <CardImage src={imageUrl} alt={post.title} loading="lazy" />
        <CardBody>
          <CardMeta>
            <CategoryBadge $color={color}>{post.category}</CategoryBadge>
            <Dot>·</Dot>
            <span>{post.readTime} min read</span>
            <Dot>·</Dot>
            <span>{dateStr}</span>
          </CardMeta>
          <CardTitle>{post.title}</CardTitle>
          <CardExcerpt>{post.description}</CardExcerpt>
        </CardBody>
      </Card>
    </Link>
  );
}

export default BlogCard;
