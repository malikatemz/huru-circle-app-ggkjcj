
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import AdminDashboard from '../../components/AdminDashboard';
import MentorSignup from '../../components/MentorSignup';
import MentorChat from '../../components/MentorChat';
import NotificationSettings from '../../components/NotificationSettings';
import { User, AdminAnalytics, MentorApplication, ChatMessage } from '../../types';

// Mock data
const mockUser: User = {
  id: 'user1',
  realName: 'John Doe',
  displayName: 'JohnD',
  email: 'john@example.com',
  role: 'teen', // Change this to 'admin', 'mentor', or 'developer' to test different views
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
  badges: [],
};

const mockAnalytics: AdminAnalytics = {
  totalUsers: 1250,
  activeUsers: 890,
  topChallenges: [],
  engagementMetrics: {
    postsPerDay: 45,
    commentsPerDay: 120,
    likesPerDay: 380,
  },
  moderationQueue: 12,
  flaggedContent: 3,
};

const mockMentor: User = {
  ...mockUser,
  id: 'mentor1',
  displayName: 'Sarah M.',
  role: 'mentor',
};

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user1',
    receiverId: 'mentor1',
    content: 'Hi Sarah! I wanted to talk about the goal-setting challenge.',
    timestamp: new Date('2024-01-15T10:00:00'),
    isRead: true,
    type: 'text',
    isModerated: true,
  },
  {
    id: '2',
    senderId: 'mentor1',
    receiverId: 'user1',
    content: 'Hello! I\'d love to help you with that. What specific aspect of goal-setting are you working on?',
    timestamp: new Date('2024-01-15T10:05:00'),
    isRead: true,
    type: 'text',
    isModerated: true,
  },
];

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [currentView, setCurrentView] = useState<'profile' | 'admin' | 'mentorSignup' | 'mentorChat' | 'notifications'>('profile');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  const handleRoleChange = (newRole: 'teen' | 'mentor' | 'admin' | 'developer' | 'leader') => {
    setUser(prevUser => ({ ...prevUser, role: newRole }));
    setCurrentView('profile');
  };

  const handleMentorApplication = (application: Omit<MentorApplication, 'id' | 'submittedAt' | 'status'>) => {
    console.log('Mentor application submitted:', application);
    // In a real app, this would be sent to the backend
  };

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: user.role === 'mentor' ? 'user1' : 'mentor1',
      content,
      timestamp: new Date(),
      isRead: false,
      type: 'text',
      isModerated: false,
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handlePreferencesChange = (preferences: any) => {
    setUser(prevUser => ({ ...prevUser, preferences }));
  };

  const renderRoleSelector = () => (
    <View style={styles.roleSelector}>
      <Text style={styles.roleSelectorTitle}>Demo: Switch Role</Text>
      <View style={styles.roleButtons}>
        {['teen', 'mentor', 'admin', 'developer', 'leader'].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleButton,
              user.role === role && styles.roleButtonActive
            ]}
            onPress={() => handleRoleChange(role as any)}
          >
            <Text style={[
              styles.roleButtonText,
              user.role === role && styles.roleButtonTextActive
            ]}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderProfileActions = () => {
    const actions = [];

    // Admin/Developer/Leader actions
    if (['admin', 'developer', 'leader'].includes(user.role)) {
      actions.push(
        <Button
          key="admin"
          text="Admin Dashboard"
          onPress={() => setCurrentView('admin')}
          variant="primary"
          style={styles.actionButton}
        />
      );
    }

    // Mentor actions
    if (user.role === 'mentor') {
      actions.push(
        <Button
          key="mentorChat"
          text="Mentor Chat"
          onPress={() => setCurrentView('mentorChat')}
          variant="secondary"
          style={styles.actionButton}
        />
      );
    }

    // Teen actions
    if (user.role === 'teen') {
      actions.push(
        <Button
          key="becomeMentor"
          text="Become a Mentor"
          onPress={() => setCurrentView('mentorSignup')}
          variant="outline"
          style={styles.actionButton}
        />
      );

      if (user.mentorId) {
        actions.push(
          <Button
            key="chatMentor"
            text="Chat with Mentor"
            onPress={() => setCurrentView('mentorChat')}
            variant="secondary"
            style={styles.actionButton}
          />
        );
      }
    }

    // Common actions
    actions.push(
      <Button
        key="notifications"
        text="Notification Settings"
        onPress={() => setCurrentView('notifications')}
        variant="outline"
        style={styles.actionButton}
      />
    );

    return actions;
  };

  if (currentView === 'admin') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AdminDashboard
          user={user}
          analytics={mockAnalytics}
          onAddChallenge={() => Alert.alert('Feature', 'Challenge creation coming soon')}
          onAddEvent={() => Alert.alert('Feature', 'Event creation coming soon')}
          onManageMentors={() => Alert.alert('Feature', 'Mentor management coming soon')}
          onViewAnalytics={() => Alert.alert('Feature', 'Detailed analytics coming soon')}
        />
        <View style={styles.backButtonContainer}>
          <Button
            text="Back to Profile"
            onPress={() => setCurrentView('profile')}
            variant="outline"
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (currentView === 'mentorSignup') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MentorSignup
          onSubmitApplication={handleMentorApplication}
          onBack={() => setCurrentView('profile')}
        />
      </SafeAreaView>
    );
  }

  if (currentView === 'mentorChat') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MentorChat
          currentUser={user}
          otherUser={user.role === 'mentor' ? { ...mockUser, id: 'user1' } : mockMentor}
          messages={messages}
          onSendMessage={handleSendMessage}
          onBack={() => setCurrentView('profile')}
        />
      </SafeAreaView>
    );
  }

  if (currentView === 'notifications') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.notificationsHeader}>
          <TouchableOpacity onPress={() => setCurrentView('profile')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.notificationsTitle}>Notification Settings</Text>
        </View>
        <NotificationSettings
          userId={user.id}
          initialPreferences={user.preferences}
          onPreferencesChange={handlePreferencesChange}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Icon name="person" size={32} color={colors.primary} />
          </View>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.role}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Text>
          {user.isVerified && (
            <View style={styles.verifiedBadge}>
              <Icon name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>

        {renderRoleSelector()}

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{user.points}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{user.streakDays}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{user.badges.length}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
          <View style={styles.levelCard}>
            <Text style={styles.levelText}>Current Level: {user.level}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Actions</Text>
          {renderProfileActions()}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Active</Text>
            <Text style={styles.infoValue}>
              {new Date(user.lastActive).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '600',
  },
  roleSelector: {
    padding: 20,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  roleSelectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    fontSize: 12,
    color: colors.textLight,
  },
  roleButtonTextActive: {
    color: colors.white,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  levelCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  actionsSection: {
    padding: 20,
  },
  actionButton: {
    marginBottom: 12,
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  backButtonContainer: {
    padding: 20,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  notificationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 16,
  },
});

export default ProfileScreen;
