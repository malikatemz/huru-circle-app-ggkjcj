
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Event } from '../../types';

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Youth Leadership Workshop',
    description: 'Join us for an interactive workshop on developing leadership skills for young people. Learn about communication, decision-making, and inspiring others.',
    type: 'workshop',
    startDate: new Date('2024-01-20T10:00:00'),
    endDate: new Date('2024-01-20T16:00:00'),
    location: 'Community Center, Nairobi',
    isVirtual: false,
    maxParticipants: 50,
    participants: ['user1', 'user2', 'user3'],
    createdBy: 'admin1',
    isActive: true,
    points: 100,
  },
  {
    id: '2',
    title: 'Online Prayer Circle',
    description: 'A virtual gathering for prayer, reflection, and spiritual support. All are welcome to join this peaceful time of connection.',
    type: 'prayer',
    startDate: new Date('2024-01-18T19:00:00'),
    endDate: new Date('2024-01-18T20:00:00'),
    isVirtual: true,
    participants: ['user1', 'user4', 'user5', 'user6'],
    createdBy: 'mentor1',
    isActive: true,
    points: 25,
  },
  {
    id: '3',
    title: 'Mental Health Awareness Webinar',
    description: 'Learn about mental health, stress management, and resources available for young people. Expert speakers and Q&A session included.',
    type: 'webinar',
    startDate: new Date('2024-01-25T14:00:00'),
    endDate: new Date('2024-01-25T15:30:00'),
    isVirtual: true,
    maxParticipants: 200,
    participants: ['user1'],
    createdBy: 'admin1',
    isActive: true,
    points: 75,
  },
  {
    id: '4',
    title: 'Community Service Day',
    description: 'Join fellow HURU Circle members for a day of giving back to our community. We\'ll be helping at the local orphanage.',
    type: 'meetup',
    startDate: new Date('2024-01-22T08:00:00'),
    endDate: new Date('2024-01-22T17:00:00'),
    location: 'Hope Children\'s Home, Kibera',
    isVirtual: false,
    maxParticipants: 30,
    participants: ['user2', 'user3'],
    createdBy: 'leader1',
    isActive: true,
    points: 150,
  },
  {
    id: '5',
    title: 'Goal Setting Challenge Kickoff',
    description: 'Start the new month right with our goal-setting challenge. Learn SMART goal techniques and get accountability partners.',
    type: 'challenge',
    startDate: new Date('2024-02-01T18:00:00'),
    endDate: new Date('2024-02-01T19:30:00'),
    isVirtual: true,
    participants: [],
    createdBy: 'mentor2',
    isActive: true,
    points: 50,
  },
];

const EventsScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'joined'>('all');
  const currentUserId = 'user1'; // Mock current user

  const eventTypes = [
    { type: 'workshop', icon: 'school', color: colors.primary },
    { type: 'webinar', icon: 'videocam', color: colors.secondary },
    { type: 'meetup', icon: 'people', color: colors.accent },
    { type: 'challenge', icon: 'trophy', color: colors.accentSecondary },
    { type: 'prayer', icon: 'heart', color: colors.tertiary },
  ];

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find(t => t.type === type) || eventTypes[0];
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const isUpcoming = event.startDate > now;
    const isJoined = event.participants.includes(currentUserId);

    switch (selectedFilter) {
      case 'upcoming':
        return isUpcoming;
      case 'joined':
        return isJoined;
      default:
        return true;
    }
  });

  const handleJoinEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    if (event.participants.includes(currentUserId)) {
      Alert.alert('Already Joined', 'You have already joined this event.');
      return;
    }

    if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
      Alert.alert('Event Full', 'This event has reached its maximum capacity.');
      return;
    }

    Alert.alert(
      'Join Event',
      `Are you sure you want to join "${event.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Join',
          onPress: () => {
            setEvents(prevEvents =>
              prevEvents.map(e =>
                e.id === eventId
                  ? { ...e, participants: [...e.participants, currentUserId] }
                  : e
              )
            );
            Alert.alert('Success', 'You have successfully joined the event!');
          },
        },
      ]
    );
  };

  const handleLeaveEvent = (eventId: string) => {
    Alert.alert(
      'Leave Event',
      'Are you sure you want to leave this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            setEvents(prevEvents =>
              prevEvents.map(e =>
                e.id === eventId
                  ? { ...e, participants: e.participants.filter(p => p !== currentUserId) }
                  : e
              )
            );
            Alert.alert('Left Event', 'You have left the event.');
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (startDate: Date, endDate: Date) => {
    const duration = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const renderEventCard = (event: Event) => {
    const typeInfo = getEventTypeInfo(event.type);
    const isJoined = event.participants.includes(currentUserId);
    const isFull = event.maxParticipants && event.participants.length >= event.maxParticipants;
    const isPast = event.endDate < new Date();

    return (
      <View key={event.id} style={styles.eventCard}>
        <View style={styles.eventHeader}>
          <View style={[styles.eventTypeIcon, { backgroundColor: typeInfo.color }]}>
            <Icon name={typeInfo.icon} size={20} color={colors.white} />
          </View>
          <View style={styles.eventHeaderInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventType}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              {event.isVirtual && ' • Virtual'}
            </Text>
          </View>
          <View style={styles.eventPoints}>
            <Icon name="star" size={14} color={colors.accent} />
            <Text style={styles.eventPointsText}>{event.points}</Text>
          </View>
        </View>

        <Text style={styles.eventDescription}>{event.description}</Text>

        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <Icon name="time" size={16} color={colors.textLight} />
            <Text style={styles.eventDetailText}>
              {formatDate(event.startDate)}
            </Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <Icon name="hourglass" size={16} color={colors.textLight} />
            <Text style={styles.eventDetailText}>
              {formatDuration(event.startDate, event.endDate)}
            </Text>
          </View>

          {event.location && (
            <View style={styles.eventDetailItem}>
              <Icon name="location" size={16} color={colors.textLight} />
              <Text style={styles.eventDetailText}>{event.location}</Text>
            </View>
          )}

          <View style={styles.eventDetailItem}>
            <Icon name="people" size={16} color={colors.textLight} />
            <Text style={styles.eventDetailText}>
              {event.participants.length}
              {event.maxParticipants && ` / ${event.maxParticipants}`} participants
            </Text>
          </View>
        </View>

        <View style={styles.eventActions}>
          {isPast ? (
            <Text style={styles.pastEventText}>Event Completed</Text>
          ) : isJoined ? (
            <Button
              text="Leave Event"
              onPress={() => handleLeaveEvent(event.id)}
              variant="outline"
              style={styles.actionButton}
            />
          ) : (
            <Button
              text={isFull ? "Event Full" : "Join Event"}
              onPress={() => !isFull && handleJoinEvent(event.id)}
              variant={isFull ? "outline" : "primary"}
              disabled={isFull}
              style={styles.actionButton}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Events" showBack={false} />
      
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'all', label: 'All Events' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'joined', label: 'My Events' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter.key && styles.filterChipTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </Text>
          
          {filteredEvents.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="calendar" size={48} color={colors.textLight} />
              <Text style={styles.emptyStateText}>
                No events found for the selected filter.
              </Text>
            </View>
          ) : (
            filteredEvents.map(renderEventCard)
          )}
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
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  eventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventHeaderInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  eventType: {
    fontSize: 12,
    color: colors.textLight,
  },
  eventPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventPointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
    marginLeft: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
  eventActions: {
    alignItems: 'flex-start',
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  pastEventText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
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

export default EventsScreen;
