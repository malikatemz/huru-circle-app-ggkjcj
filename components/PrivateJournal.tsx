
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import Button from './Button';
import { Journal } from '../types';

interface PrivateJournalProps {
  journals: Journal[];
  onSaveJournal: (journal: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteJournal: (journalId: string) => void;
  userId: string;
}

const PrivateJournal: React.FC<PrivateJournalProps> = ({
  journals,
  onSaveJournal,
  onDeleteJournal,
  userId,
}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'struggling' | 'difficult' | undefined>();
  const [tags, setTags] = useState('');

  const moods = [
    { value: 'great', label: 'Great', icon: 'happy', color: colors.success },
    { value: 'good', label: 'Good', icon: 'thumbs-up', color: colors.accent },
    { value: 'okay', label: 'Okay', icon: 'remove', color: colors.warning },
    { value: 'struggling', label: 'Struggling', icon: 'sad', color: colors.error },
    { value: 'difficult', label: 'Difficult', icon: 'close-circle', color: colors.error },
  ];

  const startNewEntry = () => {
    setIsWriting(true);
    setEditingJournal(null);
    setTitle('');
    setContent('');
    setMood(undefined);
    setTags('');
  };

  const editEntry = (journal: Journal) => {
    setIsWriting(true);
    setEditingJournal(journal);
    setTitle(journal.title);
    setContent(journal.content);
    setMood(journal.mood);
    setTags(journal.tags.join(', '));
  };

  const saveEntry = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in both title and content.');
      return;
    }

    const journalData = {
      userId,
      title: title.trim(),
      content: content.trim(),
      mood,
      isPrivate: true,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    onSaveJournal(journalData);
    setIsWriting(false);
    Alert.alert('Success', 'Journal entry saved successfully!');
  };

  const cancelEntry = () => {
    Alert.alert(
      'Cancel Entry',
      'Are you sure you want to cancel? Your changes will be lost.',
      [
        { text: 'Keep Writing', style: 'cancel' },
        { text: 'Cancel', style: 'destructive', onPress: () => setIsWriting(false) },
      ]
    );
  };

  const deleteEntry = (journalId: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDeleteJournal(journalId) },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getMoodIcon = (moodValue?: string) => {
    const moodData = moods.find(m => m.value === moodValue);
    return moodData || { icon: 'help', color: colors.textLight };
  };

  if (isWriting) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={cancelEntry} style={styles.headerButton}>
            <Icon name="close" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {editingJournal ? 'Edit Entry' : 'New Journal Entry'}
          </Text>
          <TouchableOpacity onPress={saveEntry} style={styles.headerButton}>
            <Icon name="checkmark" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.writeContent}>
          <View style={styles.writeForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Give your entry a title..."
                placeholderTextColor={colors.textLight}
                maxLength={100}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>How are you feeling?</Text>
              <View style={styles.moodSelector}>
                {moods.map((moodOption) => (
                  <TouchableOpacity
                    key={moodOption.value}
                    style={[
                      styles.moodOption,
                      mood === moodOption.value && styles.moodOptionSelected,
                      mood === moodOption.value && { borderColor: moodOption.color }
                    ]}
                    onPress={() => setMood(moodOption.value as any)}
                  >
                    <Icon 
                      name={moodOption.icon} 
                      size={20} 
                      color={mood === moodOption.value ? moodOption.color : colors.textLight} 
                    />
                    <Text style={[
                      styles.moodText,
                      mood === moodOption.value && { color: moodOption.color }
                    ]}>
                      {moodOption.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your thoughts</Text>
              <TextInput
                style={styles.contentInput}
                value={content}
                onChangeText={setContent}
                placeholder="Write about your day, thoughts, feelings, or anything on your mind..."
                placeholderTextColor={colors.textLight}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tags (optional)</Text>
              <TextInput
                style={styles.tagsInput}
                value={tags}
                onChangeText={setTags}
                placeholder="Add tags separated by commas (e.g., gratitude, goals, reflection)"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Private Journal</Text>
        <Text style={styles.subtitle}>Your safe space for reflection</Text>
      </View>

      <View style={styles.privacyNotice}>
        <Icon name="lock-closed" size={16} color={colors.success} />
        <Text style={styles.privacyText}>
          Your journal entries are completely private and only visible to you.
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.journalList}>
          {journals.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="book" size={48} color={colors.textLight} />
              <Text style={styles.emptyStateText}>
                Start your journaling journey! Writing down your thoughts can help you process emotions and track your growth.
              </Text>
              <Button
                text="Write Your First Entry"
                onPress={startNewEntry}
                variant="primary"
                style={styles.firstEntryButton}
              />
            </View>
          ) : (
            journals.map((journal) => {
              const moodData = getMoodIcon(journal.mood);
              return (
                <TouchableOpacity
                  key={journal.id}
                  style={styles.journalCard}
                  onPress={() => editEntry(journal)}
                >
                  <View style={styles.journalHeader}>
                    <View style={styles.journalTitleRow}>
                      <Text style={styles.journalTitle}>{journal.title}</Text>
                      {journal.mood && (
                        <Icon name={moodData.icon} size={16} color={moodData.color} />
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteEntry(journal.id)}
                      style={styles.deleteButton}
                    >
                      <Icon name="trash" size={16} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.journalPreview} numberOfLines={3}>
                    {journal.content}
                  </Text>
                  
                  <View style={styles.journalMeta}>
                    <Text style={styles.journalDate}>
                      {formatDate(journal.createdAt)}
                    </Text>
                    {journal.tags.length > 0 && (
                      <View style={styles.journalTags}>
                        {journal.tags.slice(0, 2).map((tag, index) => (
                          <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                        {journal.tags.length > 2 && (
                          <Text style={styles.moreTagsText}>+{journal.tags.length - 2}</Text>
                        )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {journals.length > 0 && (
        <View style={styles.fab}>
          <TouchableOpacity style={styles.fabButton} onPress={startNewEntry}>
            <Icon name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 4,
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  privacyText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  writeContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  writeForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  moodOptionSelected: {
    borderWidth: 2,
  },
  moodText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 6,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
    minHeight: 200,
  },
  tagsInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.white,
  },
  journalList: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  firstEntryButton: {
    alignSelf: 'center',
  },
  journalCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  journalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  journalPreview: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  journalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  journalDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  journalTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  tagText: {
    fontSize: 10,
    color: colors.textLight,
  },
  moreTagsText: {
    fontSize: 10,
    color: colors.textLight,
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 6,
  },
});

export default PrivateJournal;
