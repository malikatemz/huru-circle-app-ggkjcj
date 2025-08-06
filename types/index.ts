
export interface User {
  id: string;
  realName: string;
  displayName: string;
  email: string;
  role: 'teen' | 'mentor' | 'parent' | 'admin';
  age?: number;
  parentId?: string;
  isVerified: boolean;
  createdAt: Date;
  lastActive: Date;
  emergencyContacts: EmergencyContact[];
  preferences: UserPreferences;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

export interface UserPreferences {
  notifications: {
    dailyAffirmations: boolean;
    reminders: boolean;
    challenges: boolean;
    encouragement: boolean;
  };
  privacy: {
    showRealName: boolean;
    allowMentorContact: boolean;
  };
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'prayer' | 'discussion' | 'challenge' | 'affirmation';
  timestamp: Date;
  likes: number;
  comments: Comment[];
  isModerated: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  flagCount: number;
  tags: string[];
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: Date;
  likes: number;
  isModerated: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'walking' | 'meditation' | 'service' | 'creative';
  duration: number; // in days
  points: number;
  participants: string[];
  createdBy: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'great' | 'good' | 'okay' | 'struggling' | 'difficult';
  notes?: string;
  timestamp: Date;
  triggers?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'affirmation' | 'reminder' | 'challenge' | 'encouragement' | 'emergency';
  data?: any;
  isRead: boolean;
  timestamp: Date;
  scheduledFor?: Date;
}

export interface Subscription {
  id: string;
  parentId: string;
  teenId: string;
  plan: 'basic' | 'premium';
  amount: number;
  currency: 'KSH';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  paymentMethod: 'mpesa' | 'card';
}

export interface Donation {
  id: string;
  donorId?: string;
  amount: number;
  currency: 'KSH';
  message?: string;
  isAnonymous: boolean;
  timestamp: Date;
  paymentMethod: 'mpesa' | 'card';
  tillNumber?: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  topChallenges: Challenge[];
  engagementMetrics: {
    postsPerDay: number;
    commentsPerDay: number;
    likesPerDay: number;
  };
  moderationQueue: number;
  flaggedContent: number;
}
