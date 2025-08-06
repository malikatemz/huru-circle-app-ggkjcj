
export interface User {
  id: string;
  realName: string;
  displayName: string;
  email: string;
  role: 'teen' | 'mentor' | 'parent' | 'admin' | 'developer' | 'leader';
  age?: number;
  parentId?: string;
  mentorId?: string;
  isVerified: boolean;
  createdAt: Date;
  lastActive: Date;
  emergencyContacts: EmergencyContact[];
  preferences: UserPreferences;
  points: number;
  level: 'HURU Explorer' | 'HURU Builder' | 'HURU Leader';
  badges: Badge[];
  streakDays: number;
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

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  points: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'airtime' | 'book' | 'voucher' | 'digital';
  isAvailable: boolean;
  requiresApproval: boolean;
  image?: string;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  rewardId: string;
  pointsSpent: number;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  requestedAt: Date;
  approvedAt?: Date;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  isModerated: boolean;
}

export interface MentorApplication {
  id: string;
  applicantId: string;
  realName: string;
  email: string;
  phone: string;
  experience: string;
  motivation: string;
  references: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'webinar' | 'meetup' | 'challenge' | 'prayer';
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual: boolean;
  maxParticipants?: number;
  participants: string[];
  createdBy: string;
  isActive: boolean;
  points: number;
}

export interface Journal {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: 'great' | 'good' | 'okay' | 'struggling' | 'difficult';
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}
