
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface FeedCardProps {
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  onPress?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  isLiked?: boolean;
}

export default function FeedCard({
  title,
  content,
  author,
  timestamp,
  likes,
  comments,
  onPress,
  onLike,
  onComment,
  isLiked = false,
}: FeedCardProps) {
  return (
    <TouchableOpacity
      style={[commonStyles.card, styles.card]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={commonStyles.avatar}>
          <Icon name="person" size={20} color={colors.textLight} />
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.author}>{author}</Text>
          <Text style={commonStyles.textLight}>{timestamp}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLike}
          activeOpacity={0.7}
        >
          <Icon
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? colors.error : colors.textLight}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onComment}
          activeOpacity={0.7}
        >
          <Icon name="chatbubble-outline" size={20} color={colors.textLight} />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 4,
  },
  likedText: {
    color: colors.error,
  },
});
