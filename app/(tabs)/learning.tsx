
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LearningHub from '../../components/LearningHub';
import Header from '../../components/Header';
import { Alert } from 'react-native';

// Mock learning content data
const mockLearningContent = [
  {
    id: '1',
    title: 'Building Healthy Relationships',
    description: 'Learn the foundations of creating and maintaining meaningful connections with others.',
    type: 'video' as const,
    duration: '15 min',
    category: 'relationships' as const,
    difficulty: 'beginner' as const,
    points: 50,
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Understanding Your Emotions',
    description: 'Explore different emotions and learn healthy ways to process and express them.',
    type: 'interactive' as const,
    duration: '20 min',
    category: 'personal-growth' as const,
    difficulty: 'beginner' as const,
    points: 75,
    isCompleted: true,
  },
  {
    id: '3',
    title: 'Prayer and Meditation Basics',
    description: 'Discover different approaches to prayer and meditation for spiritual growth.',
    type: 'audio' as const,
    duration: '12 min',
    category: 'faith' as const,
    difficulty: 'beginner' as const,
    points: 40,
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Goal Setting for Teens',
    description: 'Learn how to set realistic, achievable goals and create action plans.',
    type: 'article' as const,
    duration: '8 min',
    category: 'personal-growth' as const,
    difficulty: 'intermediate' as const,
    points: 60,
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Managing Stress and Anxiety',
    description: 'Practical techniques for dealing with stress and anxiety in daily life.',
    type: 'video' as const,
    duration: '18 min',
    category: 'wellness' as const,
    difficulty: 'intermediate' as const,
    points: 80,
    isCompleted: false,
  },
  {
    id: '6',
    title: 'Communication Skills Workshop',
    description: 'Advanced techniques for effective communication in various situations.',
    type: 'interactive' as const,
    duration: '25 min',
    category: 'skills' as const,
    difficulty: 'advanced' as const,
    points: 100,
    isCompleted: false,
  },
];

const LearningScreen: React.FC = () => {
  const [content, setContent] = useState(mockLearningContent);

  const handleStartContent = (contentId: string) => {
    console.log('Starting content:', contentId);
    Alert.alert(
      'Start Learning',
      'This would open the learning content. In a full implementation, this would navigate to the content viewer.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => console.log('Content started') },
      ]
    );
  };

  const handleCompleteContent = (contentId: string) => {
    console.log('Completing content:', contentId);
    setContent(prevContent =>
      prevContent.map(item =>
        item.id === contentId ? { ...item, isCompleted: true } : item
      )
    );
    Alert.alert('Congratulations!', 'You have completed this learning module and earned points!');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Learning Hub" showBack={false} />
      <LearningHub
        content={content}
        onStartContent={handleStartContent}
        onCompleteContent={handleCompleteContent}
      />
    </SafeAreaView>
  );
};

export default LearningScreen;
