
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GamificationDashboard from '../../components/GamificationDashboard';
import Header from '../../components/Header';
import { User, Badge, Reward } from '../../types';
import { Alert } from 'react-native';

// Mock user data with gamification features
const mockUser: User = {
  id: 'user1',
  realName: 'John Doe',
  displayName: 'JohnD',
  email: 'john@example.com',
  role: 'teen',
  age: 17,
  isVerified: true,
  createdAt: new Date('2024-01-01'),
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
      showRealName: false,
      allowMentorContact: true,
    },
  },
  points: 750,
  level: 'HURU Builder',
  streakDays: 12,
  badges: [
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first challenge',
      icon: 'footsteps',
      earnedAt: new Date('2024-01-05'),
      points: 25,
    },
    {
      id: '2',
      name: 'Consistent Learner',
      description: 'Completed 5 learning modules',
      icon: 'school',
      earnedAt: new Date('2024-01-10'),
      points: 50,
    },
    {
      id: '3',
      name: 'Community Helper',
      description: 'Helped 3 community members',
      icon: 'people',
      earnedAt: new Date('2024-01-12'),
      points: 75,
    },
    {
      id: '4',
      name: 'Streak Master',
      description: 'Maintained a 10-day streak',
      icon: 'flame',
      earnedAt: new Date('2024-01-14'),
      points: 100,
    },
  ],
};

// Mock rewards data
const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Airtime - KSh 100',
    description: 'Mobile airtime credit for your phone',
    pointsCost: 200,
    type: 'airtime',
    isAvailable: true,
    requiresApproval: true,
  },
  {
    id: '2',
    name: 'Inspirational Book',
    description: 'Choose from our collection of inspiring books',
    pointsCost: 500,
    type: 'book',
    isAvailable: true,
    requiresApproval: true,
  },
  {
    id: '3',
    name: 'Coffee Shop Voucher',
    description: 'KSh 300 voucher for local coffee shops',
    pointsCost: 600,
    type: 'voucher',
    isAvailable: true,
    requiresApproval: true,
  },
  {
    id: '4',
    name: 'Digital Badge Collection',
    description: 'Exclusive digital badges for your profile',
    pointsCost: 150,
    type: 'digital',
    isAvailable: true,
    requiresApproval: false,
  },
  {
    id: '5',
    name: 'Airtime - KSh 500',
    description: 'Premium mobile airtime credit',
    pointsCost: 1000,
    type: 'airtime',
    isAvailable: true,
    requiresApproval: true,
  },
  {
    id: '6',
    name: 'Study Materials Kit',
    description: 'Notebooks, pens, and study accessories',
    pointsCost: 800,
    type: 'voucher',
    isAvailable: false,
    requiresApproval: true,
  },
];

const ProgressScreen: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);

  const handleRedeemReward = (rewardId: string) => {
    console.log('Redeeming reward:', rewardId);
    
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (user.points < reward.pointsCost) {
      Alert.alert('Insufficient Points', 'You don\'t have enough points to redeem this reward.');
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Are you sure you want to redeem "${reward.name}" for ${reward.pointsCost} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            // Deduct points
            setUser(prevUser => ({
              ...prevUser,
              points: prevUser.points - reward.pointsCost,
            }));

            if (reward.requiresApproval) {
              Alert.alert(
                'Redemption Submitted',
                'Your reward redemption has been submitted for approval. You will be notified once it\'s processed.',
                [{ text: 'OK' }]
              );
            } else {
              Alert.alert(
                'Reward Redeemed',
                'Congratulations! Your reward has been added to your account.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GamificationDashboard
        user={user}
        availableRewards={rewards}
        onRedeemReward={handleRedeemReward}
      />
    </SafeAreaView>
  );
};

export default ProgressScreen;
