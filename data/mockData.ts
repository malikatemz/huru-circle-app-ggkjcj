
import { User, Post, Challenge, MoodEntry, Notification } from '../types';

// African proverbs for cultural identity
export const africanProverbs = [
  "If you want to go fast, go alone. If you want to go far, go together. - African Proverb",
  "When the roots of a tree begin to decay, it spreads death to the branches. - African Proverb",
  "A bird will always use another bird's feathers to feather its own nest. - African Proverb",
  "The child who is not embraced by the village will burn it down to feel its warmth. - African Proverb",
  "Smooth seas do not make skillful sailors. - African Proverb",
  "However far the stream flows, it never forgets its source. - African Proverb",
  "When spider webs unite, they can tie up a lion. - African Proverb",
  "The best time to plant a tree was 20 years ago. The second best time is now. - African Proverb",
];

// Daily affirmations with African wisdom
export const dailyAffirmations = [
  "I am rooted in my heritage and growing towards my future.",
  "Like the baobab tree, I stand strong and provide shelter for others.",
  "I carry the wisdom of my ancestors and the hope of tomorrow.",
  "My journey is unique, but I am never alone in my community.",
  "I am a bridge between tradition and progress.",
  "Every challenge is an opportunity to grow stronger, like the acacia in the savanna.",
  "I honor my past, embrace my present, and create my future.",
  "Ubuntu: I am because we are. My success lifts my community.",
];

// Bible verses for spiritual growth
export const bibleVerses = [
  "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future. - Jeremiah 29:11",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
  "I can do all things through Christ who strengthens me. - Philippians 4:13",
  "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. - Joshua 1:9",
  "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing. - Zephaniah 3:17",
];

export const mockUsers: User[] = [
  {
    id: '1',
    realName: 'John Doe',
    displayName: 'JohnD',
    email: 'john@example.com',
    role: 'teen',
    age: 17,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    lastActive: new Date(),
    emergencyContacts: [
      {
        id: '1',
        name: 'Mary Doe',
        phone: '+254712345678',
        email: 'mary@example.com',
        relationship: 'Mother',
        isPrimary: true,
      },
    ],
    preferences: {
      notifications: {
        dailyAffirmations: true,
        reminders: true,
        challenges: true,
        encouragement: true,
      },
      privacy: {
        showRealName: false,
        allowMentorContact: true,
      },
    },
  },
  {
    id: '2',
    realName: 'Sarah Wilson',
    displayName: 'SarahW',
    email: 'sarah@example.com',
    role: 'mentor',
    age: 28,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    lastActive: new Date(),
    emergencyContacts: [],
    preferences: {
      notifications: {
        dailyAffirmations: true,
        reminders: true,
        challenges: true,
        encouragement: true,
      },
      privacy: {
        showRealName: true,
        allowMentorContact: true,
      },
    },
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    authorName: 'JohnD',
    content: 'Feeling grateful for this community. Your support means everything! 🙏',
    type: 'prayer',
    timestamp: new Date('2024-01-20T10:30:00'),
    likes: 15,
    comments: [
      {
        id: '1',
        authorId: '2',
        authorName: 'SarahW',
        content: 'So glad to have you here! Keep shining! ✨',
        timestamp: new Date('2024-01-20T11:00:00'),
        likes: 3,
        isModerated: true,
      },
    ],
    isModerated: true,
    moderationStatus: 'approved',
    flagCount: 0,
    tags: ['gratitude', 'community'],
  },
  {
    id: '2',
    authorId: '2',
    authorName: 'SarahW',
    content: 'Remember: You are braver than you believe, stronger than you seem, and smarter than you think. 💪',
    type: 'affirmation',
    timestamp: new Date('2024-01-20T09:15:00'),
    likes: 28,
    comments: [],
    isModerated: true,
    moderationStatus: 'approved',
    flagCount: 0,
    tags: ['motivation', 'strength'],
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '30-Day Gratitude Journal',
    description: 'Write down 3 things you&apos;re grateful for each day',
    type: 'creative',
    duration: 30,
    points: 100,
    participants: ['1'],
    createdBy: '2',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-14'),
    isActive: true,
  },
  {
    id: '2',
    title: 'Daily 20-Minute Walk',
    description: 'Take a mindful walk for 20 minutes each day',
    type: 'walking',
    duration: 14,
    points: 70,
    participants: ['1'],
    createdBy: '2',
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-03'),
    isActive: true,
  },
];

export const mockMoodEntries: MoodEntry[] = [
  {
    id: '1',
    userId: '1',
    mood: 'good',
    notes: 'Had a great day at school, feeling positive',
    timestamp: new Date('2024-01-20T18:00:00'),
    triggers: ['school', 'friends'],
  },
  {
    id: '2',
    userId: '1',
    mood: 'okay',
    notes: 'Feeling a bit stressed about exams',
    timestamp: new Date('2024-01-19T20:30:00'),
    triggers: ['exams', 'stress'],
  },
];

export const dailyAffirmations = [
  'You are capable of amazing things.',
  'Your potential is limitless.',
  'Every challenge is an opportunity to grow.',
  'You are loved and valued.',
  'Your voice matters.',
  'You have the strength to overcome any obstacle.',
  'Today is full of possibilities.',
  'You are exactly where you need to be.',
  'Your dreams are valid and achievable.',
  'You bring light to the world.',
];

export const bibleVerses = [
  'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future. - Jeremiah 29:11',
  'I can do all things through Christ who strengthens me. - Philippians 4:13',
  'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. - Joshua 1:9',
  'Cast all your anxiety on him because he cares for you. - 1 Peter 5:7',
  'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing. - Zephaniah 3:17',
];
