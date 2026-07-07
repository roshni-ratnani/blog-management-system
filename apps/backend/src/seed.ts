import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Post } from './models/Post';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';

const dummyData = [
  {
    title: 'Hyperliquid’s UK warning reveals the regulatory test behind its Wall Street push',
    slug: 'hyperliquid-uk-warning-regulatory-test',
    description: 'Hyperliquid’s rapid growth has drawn a warning from Britain’s financial regulator, adding a consumer-protection concern to a platform increasingly popular with traders.',
    content: '<p>Hyperliquid’s rapid growth has drawn a warning from Britain’s financial regulator.</p>',
    author: 'Sarah Smith',
    category: 'Regulation',
    tags: ['Crypto', 'Finance', 'Regulation'],
    readTime: 4,
    imageUrl: 'https://picsum.photos/seed/hyperliquid/1200/600',
    createdAt: new Date('2026-07-05T09:15:00Z'),
  },
  {
    title: 'Crypto exchanges are losing retail traders but are filling the gap with Wall Street-style bets',
    slug: 'crypto-exchanges-losing-retail-traders',
    description: 'Crypto exchanges are seeing the weakest retail-driven activity in years, but some of the biggest platforms are making up for it elsewhere.',
    content: '<p>Crypto exchanges are seeing the weakest retail-driven activity in years.</p>',
    author: 'Mike Johnson',
    category: 'Exchanges',
    tags: ['Crypto', 'Finance', 'Trading'],
    readTime: 6,
    imageUrl: 'https://picsum.photos/seed/crypto-exchanges/1200/600',
    createdAt: new Date('2026-07-04T16:45:00Z'),
  },
  {
    title: 'The art of minimalism in modern web design',
    slug: 'art-of-minimalism-modern-web-design',
    description: 'How less is more when it comes to creating user-friendly and aesthetically pleasing websites.',
    content: '<p>Minimalism is not just a visual style, it is a principle.</p>',
    author: 'Emily Chen',
    category: 'Design',
    tags: ['Web Design', 'Minimalism', 'UI/UX'],
    readTime: 3,
    imageUrl: 'https://picsum.photos/seed/art-of-minimalism/1200/600',
    createdAt: new Date('2026-07-03T11:20:00Z'),
  },
  {
    title: 'Top 10 travel destinations for digital nomads in 2026',
    slug: 'top-10-travel-destinations-digital-nomads',
    description: 'Discover the best cities offering great internet, vibrant communities, and affordable living.',
    content: '<p>Here is the list of top 10 cities for digital nomads...</p>',
    author: 'Chris Walker',
    category: 'Travel',
    tags: ['Travel', 'Digital Nomad', 'Lifestyle'],
    readTime: 7,
    imageUrl: 'https://picsum.photos/seed/nomads/1200/600',
    createdAt: new Date('2026-07-02T08:00:00Z'),
  },
  {
    title: 'Understanding the global economic shifts post-2025',
    slug: 'understanding-global-economic-shifts',
    description: 'An in-depth analysis of emerging markets and the decline of traditional economic powerhouses.',
    content: '<p>The global economy is undergoing a massive shift...</p>',
    author: 'Dr. Alan Turing',
    category: 'Economy',
    tags: ['Economy', 'Global', 'Finance'],
    readTime: 12,
    imageUrl: 'https://picsum.photos/seed/economy/1200/600',
    createdAt: new Date('2026-07-01T13:10:00Z'),
  },
  {
    title: 'How AI is revolutionizing the sports industry',
    slug: 'ai-revolutionizing-sports-industry',
    description: 'From player analytics to fan engagement, artificial intelligence is changing the game.',
    content: '<p>AI is being used to track player performance...</p>',
    author: 'Sam Rivers',
    category: 'Sports',
    tags: ['AI', 'Sports', 'Technology'],
    readTime: 5,
    imageUrl: 'https://picsum.photos/seed/sports/1200/600',
    createdAt: new Date('2026-06-30T15:30:00Z'),
  },
  {
    title: 'Building a sustainable business model in the modern era',
    slug: 'building-sustainable-business-model',
    description: 'Why sustainability is no longer just a buzzword, but a necessity for long-term survival.',
    content: '<p>Businesses must adapt to sustainable practices...</p>',
    author: 'Jessica Alba',
    category: 'Business',
    tags: ['Business', 'Sustainability', 'Environment'],
    readTime: 9,
    imageUrl: 'https://picsum.photos/seed/business/1200/600',
    createdAt: new Date('2026-06-29T09:45:00Z'),
  },
  {
    title: 'The psychology of productivity: Why we procrastinate',
    slug: 'psychology-of-productivity-procrastination',
    description: 'Understanding the root causes of procrastination and how to overcome them effectively.',
    content: '<p>Procrastination is an emotional regulation problem...</p>',
    author: 'Dr. Jane Smith',
    category: 'Lifestyle',
    tags: ['Psychology', 'Productivity', 'Self-help'],
    readTime: 6,
    imageUrl: 'https://picsum.photos/seed/psychology/1200/600',
    createdAt: new Date('2026-06-28T18:20:00Z'),
  },
  {
    title: 'A beginner’s guide to machine learning',
    slug: 'beginners-guide-to-machine-learning',
    description: 'Everything you need to know to get started with ML, without the complex math.',
    content: '<p>Machine learning is a subset of AI...</p>',
    author: 'Tom Hank',
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Coding'],
    readTime: 8,
    imageUrl: 'https://picsum.photos/seed/machine-learning/1200/600',
    createdAt: new Date('2026-06-27T10:05:00Z'),
  },
  {
    title: 'The best coffee shops in Tokyo for remote workers',
    slug: 'best-coffee-shops-tokyo-remote-workers',
    description: 'A curated list of cafes with fast Wi-Fi, great coffee, and comfortable seating.',
    content: '<p>Tokyo has an amazing cafe culture...</p>',
    author: 'Aiko Tanaka',
    category: 'Travel',
    tags: ['Travel', 'Tokyo', 'Remote Work'],
    readTime: 4,
    imageUrl: 'https://picsum.photos/seed/tokyo/1200/600',
    createdAt: new Date('2026-06-26T14:50:00Z'),
  },
  {
    title: 'Why inflation might be here to stay',
    slug: 'why-inflation-might-be-here-to-stay',
    description: 'Experts weigh in on the long-term economic outlook and what it means for your savings.',
    content: '<p>Inflation is eating into savings...</p>',
    author: 'Robert Kiyosaki',
    category: 'Economy',
    tags: ['Economy', 'Finance', 'Inflation'],
    readTime: 10,
    imageUrl: 'https://picsum.photos/seed/inflation/1200/600',
    createdAt: new Date('2026-06-25T08:30:00Z'),
  },
  {
    title: 'The rise of e-sports and its impact on traditional sports',
    slug: 'rise-of-esports-impact',
    description: 'How competitive gaming is drawing massive audiences away from traditional sports networks.',
    content: '<p>E-sports viewership is skyrocketing...</p>',
    author: 'GamerX',
    category: 'Sports',
    tags: ['Gaming', 'Esports', 'Sports'],
    readTime: 5,
    imageUrl: 'https://picsum.photos/seed/esports/1200/600',
    createdAt: new Date('2026-06-24T17:15:00Z'),
  },
  {
    title: 'Mastering the art of public speaking',
    slug: 'mastering-the-art-of-public-speaking',
    description: 'Tips and tricks from seasoned professionals on how to captivate an audience.',
    content: '<p>Public speaking is a crucial skill...</p>',
    author: 'Tony Robbins',
    category: 'Business',
    tags: ['Business', 'Skills', 'Communication'],
    readTime: 7,
    imageUrl: 'https://picsum.photos/seed/public-speaking/1200/600',
    createdAt: new Date('2026-06-23T11:40:00Z'),
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing posts...');
    await Post.deleteMany({});
    console.log('Existing posts deleted.');

    console.log('Seeding new posts...');
    await Post.insertMany(dummyData);
    console.log(`Successfully seeded ${dummyData.length} posts!`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

seedDatabase();
