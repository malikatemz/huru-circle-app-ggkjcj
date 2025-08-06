
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import Header from '../../components/Header';
import ModerationCard from '../../components/ModerationCard';
import { mockPosts, mockUsers } from '../../data/mockData';
import { Post } from '../../types';

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<'all' | 'prayer' | 'discussion' | 'moderation'>('all');

  const currentUser = mockUsers[1]; // Simulate mentor/admin user
  const isAdmin = currentUser.role === 'mentor' || currentUser.role === 'admin';

  const handleModerate = (postId: string, action: 'approve' | 'reject') => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, moderationStatus: action === 'approve' ? 'approved' : 'rejected' }
          : post
      )
    );
  };

  const handleFlag = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, flagCount: post.flagCount + 1 }
          : post
      )
    );
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return post.moderationStatus === 'approved';
    if (activeTab === 'moderation') return post.moderationStatus === 'pending' || post.flagCount > 0;
    return post.type === activeTab && post.moderationStatus === 'approved';
  });

  const tabs = [
    { key: 'all', label: 'All Posts' },
    { key: 'prayer', label: 'Prayer Wall' },
    { key: 'discussion', label: 'Discussions' },
    ...(isAdmin ? [{ key: 'moderation', label: 'Moderation' }] : []),
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <Header 
        title="Community" 
        rightAction={{
          icon: 'add-circle-outline',
          onPress: () => console.log('Create post')
        }}
      />

      {/* Tab Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
            {tab.key === 'moderation' && posts.filter(p => p.moderationStatus === 'pending').length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {posts.filter(p => p.moderationStatus === 'pending').length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {activeTab === 'moderation' ? (
          <View style={styles.moderationSection}>
            <Text style={styles.sectionTitle}>Content Moderation</Text>
            <Text style={styles.sectionSubtitle}>
              Review flagged content and pending posts
            </Text>
            {filteredPosts.map((post) => (
              <ModerationCard
                key={post.id}
                post={post}
                onModerate={handleModerate}
                onFlag={handleFlag}
              />
            ))}
          </View>
        ) : (
          <View style={styles.postsSection}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'all' ? 'Community Posts' : 
               activeTab === 'prayer' ? 'Prayer Wall' : 'Discussions'}
            </Text>
            {filteredPosts.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No posts yet. Be the first to share!
                </Text>
              </View>
            ) : (
              filteredPosts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.authorInfo}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{post.authorName.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text style={styles.authorName}>{post.authorName}</Text>
                        <Text style={styles.timestamp}>
                          {post.timestamp.toLocaleDateString()} • {post.type}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.postContent}>{post.content}</Text>
                  <View style={styles.postActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionText}>❤️ {post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionText}>💬 {post.comments.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleFlag(post.id)}
                    >
                      <Text style={styles.actionText}>🚩 Flag</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.white,
  },
  badge: {
    backgroundColor: colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  moderationSection: {
    padding: 16,
  },
  postsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  postCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.textLight,
  },
});
