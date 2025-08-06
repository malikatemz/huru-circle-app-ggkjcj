
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';
import { MoodEntry } from '../types';
import { useNotifications } from '../hooks/useNotifications';

interface MoodTrackerProps {
  onMoodSubmit: (mood: MoodEntry) => void;
  userId: string;
}

const moodOptions = [
  { value: 'great', label: 'Great', icon: 'happy-outline', color: '#27ae60' },
  { value: 'good', label: 'Good', icon: 'thumbs-up-outline', color: '#2ecc71' },
  { value: 'okay', label: 'Okay', icon: 'remove-outline', color: '#f39c12' },
  { value: 'struggling', label: 'Struggling', icon: 'sad-outline', color: '#e67e22' },
  { value: 'difficult', label: 'Difficult', icon: 'close-circle-outline', color: '#e74c3c' },
];

export default function MoodTracker({ onMoodSubmit, userId }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [triggers, setTriggers] = useState('');
  const { sendEncouragementNotification } = useNotifications();

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood', 'Choose how you&apos;re feeling today');
      return;
    }

    const moodEntry: MoodEntry = {
      id: Date.now().toString(),
      userId,
      mood: selectedMood as any,
      notes: notes.trim() || undefined,
      timestamp: new Date(),
      triggers: triggers.trim() ? triggers.split(',').map(t => t.trim()) : undefined,
    };

    onMoodSubmit(moodEntry);

    // Send encouragement notification based on mood
    if (['struggling', 'difficult'].includes(selectedMood)) {
      await sendEncouragementNotification(selectedMood);
    }

    // Reset form
    setSelectedMood('');
    setNotes('');
    setTriggers('');

    Alert.alert('Mood Logged', 'Thank you for sharing how you&apos;re feeling today!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      
      <View style={styles.moodOptions}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodOption,
              selectedMood === mood.value && { backgroundColor: mood.color + '20', borderColor: mood.color }
            ]}
            onPress={() => setSelectedMood(mood.value)}
          >
            <Icon name={mood.icon as any} size={32} color={mood.color} />
            <Text style={[styles.moodLabel, { color: mood.color }]}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Notes (optional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tell us more about how you're feeling..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Triggers (optional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What influenced your mood? (separate with commas)"
          value={triggers}
          onChangeText={setTriggers}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !selectedMood && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!selectedMood}
      >
        <Text style={styles.submitButtonText}>Log Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  moodOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodOption: {
    width: '18%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.backgroundAlt,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundAlt,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.textLight,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
