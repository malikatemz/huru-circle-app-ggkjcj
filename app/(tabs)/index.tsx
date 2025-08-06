
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import Header from '../../components/Header';
import FeedCard from '../../components/FeedCard';
import SafetyButton from '../../components/SafetyButton';
import { mockPosts, mockUsers, dailyAffirmations } from '../../data/mockData';
import { useNotifications } from '../../hooks/useNotifications';

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [dailyAffirmation, setDailyAffirmation] = useState('');
  const { notification } = useNotifications();

  const currentUser = mockUsers[0]; // Simulate logged-in user

  useEffect(() => {
    // Set daily affirmation
    const today = new Date().getDate();
    const affirmationIndex = today % dailyAffirmations.length;
    setDailyAffirmation(dailyAffirmations[affirmationIndex]);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Header 
        title="HURU Circle" 
        rightAction={{
          icon: 'notifications-outline',
          onPress: () => console.log('Notifications pressed')
        }}
      />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Daily Affirmation Card */}
        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationTitle}>Today&apos;s Affirmation ✨</Text>
          <Text style={styles.affirmationText}>{dailyAffirmation}</Text>
        </View>

        {/* Emergency Safety Button */}
        <SafetyButton 
          userId={currentUser.id}
          emergencyContacts={currentUser.emergencyContacts}
        />

        {/* Welcome Message */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            Welcome back, {currentUser.displayName}! 👋
          </Text>
          <Text style={styles.welcomeText}>
            How are you feeling today? Remember, you&apos;re not alone on this journey.
          </Text>
        </View>

        {/* Recent Notifications */}
        {notification && (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>📱 {notification.request.content.title}</Text>
            <Text style={styles.notificationText}>{notification.request.content.body}</Text>
          </View>
        )}

        {/* Community Feed */}
        <View style={styles.feedSection}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          {posts.map((post) => (
            <FeedCard
              key={post.id}
              title={`${post.authorName} shared a ${post.type}`}
              content={post.content}
              author={post.authorName}
              timestamp={post.timestamp.toLocaleDateString()}
              likes={post.likes}
              comments={post.comments.length}
              onLike={() => handleLike(post.id)}
              onComment={() => console.log('Comment on', post.id)}
              onPress={() => console.log('View post', post.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  affirmationCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  affirmationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  affirmationText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  welcomeCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  notificationCard: {
    backgroundColor: colors.accent + '10',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 18,
  },
  feedSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
});
