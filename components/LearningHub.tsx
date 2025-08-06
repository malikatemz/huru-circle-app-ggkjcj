
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import Button from './Button';

interface LearningContent {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'audio' | 'interactive';
  duration: string;
  category: 'personal-growth' | 'relationships' | 'faith' | 'skills' | 'wellness';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  isCompleted: boolean;
  thumbnail?: string;
}

interface LearningHubProps {
  content: LearningContent[];
  onStartContent: (contentId: string) => void;
  onCompleteContent: (contentId: string) => void;
}

const LearningHub: React.FC<LearningHubProps> = ({
  content,
  onStartContent,
  onCompleteContent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'grid' },
    { id: 'personal-growth', name: 'Personal Growth', icon: 'trending-up' },
    { id: 'relationships', name: 'Relationships', icon: 'people' },
    { id: 'faith', name: 'Faith', icon: 'heart' },
    { id: 'skills', name: 'Skills', icon: 'build' },
    { id: 'wellness', name: 'Wellness', icon: 'fitness' },
  ];

  const contentTypes = [
    { id: 'all', name: 'All Types', icon: 'apps' },
    { id: 'video', name: 'Videos', icon: 'play-circle' },
    { id: 'article', name: 'Articles', icon: 'document-text' },
    { id: 'audio', name: 'Audio', icon: 'headset' },
    { id: 'interactive', name: 'Interactive', icon: 'game-controller' },
  ];

  const filteredContent = content.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'play-circle';
      case 'article':
        return 'document-text';
      case 'audio':
        return 'headset';
      case 'interactive':
        return 'game-controller';
      default:
        return 'book';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.textLight;
    }
  };

  const renderContentCard = (item: LearningContent) => (
    <View key={item.id} style={styles.contentCard}>
      <View style={styles.contentHeader}>
        <View style={styles.contentIcon}>
          <Icon name={getContentIcon(item.type)} size={24} color={colors.primary} />
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text style={styles.contentDescription}>{item.description}</Text>
        </View>
        {item.isCompleted && (
          <View style={styles.completedBadge}>
            <Icon name="checkmark-circle" size={20} color={colors.success} />
          </View>
        )}
      </View>

      <View style={styles.contentMeta}>
        <View style={styles.metaItem}>
          <Icon name="time" size={14} color={colors.textLight} />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(item.difficulty) }]} />
          <Text style={styles.metaText}>{item.difficulty}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="star" size={14} color={colors.accent} />
          <Text style={styles.metaText}>{item.points} pts</Text>
        </View>
      </View>

      <View style={styles.contentActions}>
        {item.isCompleted ? (
          <Button
            text="Review"
            onPress={() => onStartContent(item.id)}
            variant="outline"
            style={styles.actionButton}
          />
        ) : (
          <Button
            text="Start Learning"
            onPress={() => onStartContent(item.id)}
            variant="primary"
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Hub</Text>
        <Text style={styles.subtitle}>Grow your knowledge and earn points</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterChip,
                  selectedCategory === category.id && styles.filterChipActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Icon 
                  name={category.icon} 
                  size={16} 
                  color={selectedCategory === category.id ? colors.white : colors.textLight} 
                />
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === category.id && styles.filterChipTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Content Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {contentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.filterChip,
                  selectedType === type.id && styles.filterChipActive
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Icon 
                  name={type.icon} 
                  size={16} 
                  color={selectedType === type.id ? colors.white : colors.textLight} 
                />
                <Text style={[
                  styles.filterChipText,
                  selectedType === type.id && styles.filterChipTextActive
                ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>
            {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'} found
          </Text>
          
          {filteredContent.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="book" size={48} color={colors.textLight} />
              <Text style={styles.emptyStateText}>
                No content found for the selected filters.
              </Text>
            </View>
          ) : (
            filteredContent.map(renderContentCard)
          )}
        </View>
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
  content: {
    flex: 1,
  },
  filtersSection: {
    padding: 20,
    backgroundColor: colors.backgroundAlt,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 6,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  contentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  contentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 18,
  },
  completedBadge: {
    marginLeft: 8,
  },
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  contentActions: {
    alignItems: 'flex-start',
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
});

export default LearningHub;
