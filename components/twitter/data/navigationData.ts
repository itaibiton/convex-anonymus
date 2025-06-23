import { NavigationItem, TrendingTopic } from './types';

export const navigationItems: NavigationItem[] = [
  { icon: 'Home', label: 'Home', active: true },
  { icon: 'Search', label: 'Explore' },
  { icon: 'Bell', label: 'Notifications', badge: '20+' },
  { icon: 'Mail', label: 'Messages' },
  { icon: 'Users', label: 'Grok' },
  { icon: 'Bookmark', label: 'Lists' },
  { icon: 'Bookmark', label: 'Bookmarks' },
  { icon: 'Briefcase', label: 'Jobs' },
  { icon: 'Users', label: 'Communities' },
  { icon: 'User', label: 'Premium' },
  { icon: 'Users', label: 'Verified Orgs' },
  { icon: 'User', label: 'Profile' },
  { icon: 'MoreHorizontal', label: 'More' },
];

export const trendingTopics: TrendingTopic[] = [
  {
    category: 'Business & finance · Trending',
    title: 'Market',
    posts: '382K posts',
  },
  {
    category: 'Trending in Israel',
    title: 'עבר דין',
    posts: null,
  },
  {
    category: 'Trending in Israel',
    title: 'במדי עבאס',
    posts: null,
  },
  {
    category: 'Politics · Trending',
    title: 'The Iranian',
    posts: '1.04M posts',
  },
  {
    category: 'Technology · Trending',
    title: 'React Bits',
    posts: '45.2K posts',
  },
  {
    category: 'Sports · Trending',
    title: 'Champions League',
    posts: '892K posts',
  },
];