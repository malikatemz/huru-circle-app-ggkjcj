
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';
import { Post } from '../types';

interface ModerationCardProps {
  post: Post;
  onModerate: (postId: string, action: 'approve' | 'reject') => void;
  onFlag: (postId: string) => void;
}

export default function ModerationCard({ post, onModerate, onFlag }: ModerationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFlag = () => {
    Alert.alert(
      'Flag Content',
      'Are you sure you want to flag this content for review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Flag', style: 'destructive', onPress: () => onFlag(post.id) }
      ]
    );
  };

  const handleModerate = (action: 'approve' | 'reject') => {
    Alert.alert(
      `${action === 'approve' ? 'Approve' : 'Reject'} Content`,
      `Are you sure you want to ${action} this post?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action === 'approve' ? 'Approve' : 'Reject', onPress: () => onModerate(post.id, action) }
      ]
    );
  };

  const getModerationStatusColor = () => {
    switch (post.moderationStatus) {
      case 'approved': return colors.success;
      case 'rejected': return colors.error;
      case 'pending': return colors.warning;
      default: return colors.textLight;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
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
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getModerationStatusColor() }]}>
            <Text style={styles.statusText}>{post.moderationStatus}</Text>
          </View>
          {post.flagCount > 0 && (
            <View style={styles.flagBadge}>
              <Icon name="flag" size={12} color={colors.error} />
              <Text style={styles.flagCount}>{post.flagCount}</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.content} numberOfLines={isExpanded ? undefined : 3}>
          {post.content}
        </Text>
        {post.content.length > 100 && (
          <Text style={styles.expandText}>
            {isExpanded ? 'Show less' : 'Show more'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.flagButton} onPress={handleFlag}>
          <Icon name="flag-outline" size={16} color={colors.error} />
          <Text style={styles.flagButtonText}>Flag</Text>
        </TouchableOpacity>

        {post.moderationStatus === 'pending' && (
          <View style={styles.moderationActions}>
            <TouchableOpacity
              style={[styles.moderationButton, styles.rejectButton]}
              onPress={() => handleModerate('reject')}
            >
              <Icon name="close" size={16} color={colors.white} />
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.moderationButton, styles.approveButton]}
              onPress={() => handleModerate('approve')}
            >
              <Icon name="checkmark" size={16} color={colors.white} />
              <Text style={styles.approveButtonText}>Approve</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  header: {
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
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  flagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  flagCount: {
    color: colors.error,
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  content: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  expandText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.error + '10',
  },
  flagButtonText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  moderationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  moderationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  rejectButton: {
    backgroundColor: colors.error,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  rejectButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  approveButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});
