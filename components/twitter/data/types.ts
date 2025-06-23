export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  following?: boolean;
}

export interface Tweet {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  shares: number;
  isLiked: boolean;
  isRetweeted: boolean;
  image?: string;
  replyTo?: string;
}

export interface TrendingTopic {
  category: string;
  title: string;
  posts: string | null;
}

export interface NavigationItem {
  icon: string;
  label: string;
  active?: boolean;
  badge?: string;
}