
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import Button from './Button';
import { User, Challenge, Event, MentorApplication, AdminAnalytics } from '../types';

interface AdminDashboardProps {
  user: User;
  analytics: AdminAnalytics;
  onAddChallenge: () => void;
  onAddEvent: () => void;
  onManageMentors: () => void;
  onViewAnalytics: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  analytics,
  onAddChallenge,
  onAddEvent,
  onManageMentors,
  onViewAnalytics,
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'content' | 'users' | 'moderation'>('overview');

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Dashboard Overview</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Icon name="people" size={24} color={colors.primary} />
          <Text style={styles.statNumber}>{analytics.totalUsers}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="pulse" size={24} color={colors.success} />
          <Text style={styles.statNumber}>{analytics.activeUsers}</Text>
          <Text style={styles.statLabel}>Active Users</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="flag" size={24} color={colors.warning} />
          <Text style={styles.statNumber}>{analytics.moderationQueue}</Text>
          <Text style={styles.statLabel}>Pending Moderation</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="alert-triangle" size={24} color={colors.error} />
          <Text style={styles.statNumber}>{analytics.flaggedContent}</Text>
          <Text style={styles.statLabel}>Flagged Content</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Button
          text="Add New Challenge"
          onPress={onAddChallenge}
          style={styles.actionButton}
          variant="primary"
        />
        <Button
          text="Create Event"
          onPress={onAddEvent}
          style={styles.actionButton}
          variant="secondary"
        />
        <Button
          text="Manage Mentors"
          onPress={onManageMentors}
          style={styles.actionButton}
          variant="outline"
        />
      </View>
    </View>
  );

  const renderContentManagement = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Content Management</Text>
      
      <View style={styles.contentSection}>
        <Text style={styles.subsectionTitle}>Challenges</Text>
        <Button
          text="Create New Challenge"
          onPress={onAddChallenge}
          style={styles.actionButton}
          variant="primary"
        />
        <Button
          text="Manage Existing Challenges"
          onPress={() => Alert.alert('Feature', 'Challenge management coming soon')}
          style={styles.actionButton}
          variant="outline"
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.subsectionTitle}>Events</Text>
        <Button
          text="Create New Event"
          onPress={onAddEvent}
          style={styles.actionButton}
          variant="primary"
        />
        <Button
          text="Manage Existing Events"
          onPress={() => Alert.alert('Feature', 'Event management coming soon')}
          style={styles.actionButton}
          variant="outline"
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.subsectionTitle}>Learning Content</Text>
        <Button
          text="Upload Videos"
          onPress={() => Alert.alert('Feature', 'Video upload coming soon')}
          style={styles.actionButton}
          variant="secondary"
        />
        <Button
          text="Add Prompts"
          onPress={() => Alert.alert('Feature', 'Prompt management coming soon')}
          style={styles.actionButton}
          variant="secondary"
        />
      </View>
    </View>
  );

  const renderUserManagement = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>User Management</Text>
      
      <View style={styles.contentSection}>
        <Text style={styles.subsectionTitle}>Mentors</Text>
        <Button
          text="Review Applications"
          onPress={onManageMentors}
          style={styles.actionButton}
          variant="primary"
        />
        <Button
          text="Manage Active Mentors"
          onPress={() => Alert.alert('Feature', 'Mentor management coming soon')}
          style={styles.actionButton}
          variant="outline"
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.subsectionTitle}>Users</Text>
        <Button
          text="View All Users"
          onPress={() => Alert.alert('Feature', 'User list coming soon')}
          style={styles.actionButton}
          variant="secondary"
        />
        <Button
          text="Parent Contacts"
          onPress={() => Alert.alert('Feature', 'Parent contact list coming soon')}
          style={styles.actionButton}
          variant="secondary"
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.subsectionTitle}>Analytics</Text>
        <Button
          text="View Detailed Analytics"
          onPress={onViewAnalytics}
          style={styles.actionButton}
          variant="outline"
        />
      </View>
    </View>
  );

  const renderModeration = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Content Moderation</Text>
      
      <View style={styles.moderationStats}>
        <View style={styles.moderationCard}>
          <Text style={styles.moderationNumber}>{analytics.moderationQueue}</Text>
          <Text style={styles.moderationLabel}>Pending Review</Text>
        </View>
        <View style={styles.moderationCard}>
          <Text style={styles.moderationNumber}>{analytics.flaggedContent}</Text>
          <Text style={styles.moderationLabel}>Flagged Items</Text>
        </View>
      </View>

      <Button
        text="Review Pending Content"
        onPress={() => Alert.alert('Feature', 'Content moderation coming soon')}
        style={styles.actionButton}
        variant="primary"
      />
      <Button
        text="Manage Flagged Content"
        onPress={() => Alert.alert('Feature', 'Flagged content management coming soon')}
        style={styles.actionButton}
        variant="secondary"
      />
      <Button
        text="AI Monitoring Settings"
        onPress={() => Alert.alert('Feature', 'AI monitoring settings coming soon')}
        style={styles.actionButton}
        variant="outline"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, {user.displayName}</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'content' && styles.activeTab]}
          onPress={() => setSelectedTab('content')}
        >
          <Text style={[styles.tabText, selectedTab === 'content' && styles.activeTabText]}>
            Content
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'users' && styles.activeTab]}
          onPress={() => setSelectedTab('users')}
        >
          <Text style={[styles.tabText, selectedTab === 'users' && styles.activeTabText]}>
            Users
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'moderation' && styles.activeTab]}
          onPress={() => setSelectedTab('moderation')}
        >
          <Text style={[styles.tabText, selectedTab === 'moderation' && styles.activeTabText]}>
            Moderation
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'content' && renderContentManagement()}
        {selectedTab === 'users' && renderUserManagement()}
        {selectedTab === 'moderation' && renderModeration()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
  quickActions: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
  contentSection: {
    marginBottom: 24,
  },
  moderationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  moderationCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  moderationNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.warning,
  },
  moderationLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
});

export default AdminDashboard;
