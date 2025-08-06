
import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { dailyAffirmations, bibleVerses } from '../data/mockData';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      console.log('Push token:', token);
      setExpoPushToken(token || '');
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const scheduleDailyAffirmation = async () => {
    const randomAffirmation = dailyAffirmations[Math.floor(Math.random() * dailyAffirmations.length)];
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Affirmation 🌟',
        body: randomAffirmation,
        data: { type: 'affirmation' },
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  const scheduleDailyVerse = async () => {
    const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Verse 📖',
        body: randomVerse,
        data: { type: 'verse' },
      },
      trigger: {
        hour: 19,
        minute: 0,
        repeats: true,
      },
    });
  };

  const scheduleReminder = async (title: string, body: string, hour: number, minute: number) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'reminder' },
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  };

  const sendEncouragementNotification = async (mood: string) => {
    const encouragementMessages = {
      struggling: "Remember, tough times don't last, but tough people do. You've got this! 💪",
      difficult: "It's okay to have difficult days. Reach out to your support network. You're not alone. 🤗",
      okay: "Every small step forward is progress. Keep going! 🌱",
      good: "Great to see you're doing well! Keep up the positive momentum! ✨",
      great: "Your positive energy is contagious! Share your joy with others! 🌟",
    };

    const message = encouragementMessages[mood as keyof typeof encouragementMessages] || 
                   "You're doing great! Keep being amazing! 🌈";

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Encouragement 💝',
        body: message,
        data: { type: 'encouragement', mood },
      },
      trigger: null, // Send immediately
    });
  };

  const sendEmergencyAlert = async (userId: string, emergencyContacts: any[]) => {
    // In a real app, this would send alerts to emergency contacts
    console.log('Emergency alert triggered for user:', userId);
    console.log('Notifying contacts:', emergencyContacts);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Emergency Alert Sent 🚨',
        body: 'Your emergency contacts have been notified. Help is on the way.',
        data: { type: 'emergency', userId },
      },
      trigger: null,
    });
  };

  return {
    expoPushToken,
    notification,
    scheduleDailyAffirmation,
    scheduleDailyVerse,
    scheduleReminder,
    sendEncouragementNotification,
    sendEmergencyAlert,
  };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
