/**
 * Returns a consistent color for a given category string.
 * Used for category badge styling across BlogCard and PostDetail.
 */
export const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    technology: '#3B82F6',
    lifestyle: '#EC4899',
    travel: '#10B981',
    business: '#F59E0B',
    economy: '#8B5CF6',
    sports: '#EF4444',
  };
  return map[category.toLowerCase()] || '#6B7280';
};

/**
 * Returns a deterministic image URL from picsum.photos seeded by a numeric hash of the post id.
 * Ensures the same post always renders the same image.
 */
export const getPostImage = (imageUrl: string | undefined, id: string): string => {
  // Accept both remote http URLs and local Base64 data URIs
  if (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('data:'))) {
    return imageUrl;
  }
  // Fallback: deterministic picsum image seeded by post id
  const seed = id
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
  return `https://picsum.photos/seed/${seed}/800/450`;
};

/**
 * Formats a MongoDB-style createdAt timestamp into a human-readable date.
 */
export const formatDate = (createdAt: string): string => {
  const timestamp = parseInt(createdAt);
  const date = isNaN(timestamp) ? new Date(createdAt) : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
};
