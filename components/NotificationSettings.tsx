
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/commonStyles';
import { UserPreferences } from '../types';
import { useStorage } from '../hooks/useStorage';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationSettingsProps {
  userId: string;
  initialPreferences?: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export default function NotificationSettings({ 
  userId, 
  initialPreferences, 
  onPreferencesChange 
}: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(
    initialPreferences || {
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
    }
  );

  const { storeData } = useStorage();
  const { scheduleDailyAffirmation, scheduleDailyVerse, scheduleReminder } = useNotifications();

  // Memoize the callback to prevent unnecessary re-renders
  const memoizedOnPreferencesChange = useCallback(onPreferencesChange, [onPreferencesChange]);

  useEffect(() => {
    // Save preferences whenever they change
    storeData(`preferences_${userId}`, preferences);
    memoizedOnPreferencesChange(preferences);

    // Set up notifications based on preferences
    if (preferences.notifications.dailyAffirmations) {
      scheduleDailyAffirmation();
      scheduleDailyVerse();
    }

    if (preferences.notifications.reminders) {
      scheduleReminder('Daily Check-in', 'How are you feeling today?', 18, 0);
      scheduleReminder('Reading Time', 'Take some time to read today', 16, 0);
      scheduleReminder('Walk Reminder', 'Time for your daily walk!', 17, 0);
    }
  }, [
    preferences, 
    userId, 
    storeData, 
    memoizedOnPreferencesChange, 
    scheduleDailyAffirmation, 
    scheduleDailyVerse, 
    scheduleReminder
  ]);

  const updateNotificationPreference = (key: keyof UserPreferences['notifications'], value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updatePrivacyPreference = (key: keyof UserPreferences['privacy'], value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Daily Affirmations</Text>
            <Text style={styles.settingDescription}>
              Receive daily positive affirmations and Bible verses
            </Text>
          </View>
          <Switch
            value={preferences.notifications.dailyAffirmations}
            onValueChange={(value) => updateNotificationPreference('dailyAffirmations', value)}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={preferences.notifications.dailyAffirmations ? colors.primary : colors.textLight}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Activity Reminders</Text>
            <Text style={styles.settingDescription}>
              Reminders to read, walk, and check-in daily
            </Text>
          </View>
          <Switch
            value={preferences.notifications.reminders}
            onValueChange={(value) => updateNotificationPreference('reminders', value)}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={preferences.notifications.reminders ? colors.primary : colors.textLight}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Challenge Updates</Text>
            <Text style={styles.settingDescription}>
              Notifications about new challenges and events
            </Text>
          </View>
          <Switch
            value={preferences.notifications.challenges}
            onValueChange={(value) => updateNotificationPreference('challenges', value)}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={preferences.notifications.challenges ? colors.primary : colors.textLight}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Encouragement Messages</Text>
            <Text style={styles.settingDescription}>
              Supportive messages based on your mood tracker
            </Text>
          </View>
          <Switch
            value={preferences.notifications.encouragement}
            onValueChange={(value) => updateNotificationPreference('encouragement', value)}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={preferences.notifications.encouragement ? colors.primary : colors.textLight}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Show Real Name</Text>
            <Text style={styles.settingDescription}>
              Display your real name instead of pseudonym
            </Text>
          </View>
          <Switch
            value={preferences.privacy.showRealName}
            onValueChange={(value) => updatePrivacyPreference('showRealName', value)}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={preferences.privacy.showRealName ? colors.primary : colors.textLight}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Allow Mentor Contact</Text>
            <Text style={styles.settingDescription}>
              Let mentors reach out to you directly
            </Text>
          </View>
          <Switch
            value={preferences.privacy.allowMentorContact}
            onValueChange={(value) => updatePrivacyPreference('allowMentorContact', value)}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={preferences.privacy.allowMentorContact ? colors.primary : colors.textLight}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 18,
  },
});
