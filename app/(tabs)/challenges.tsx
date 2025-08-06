
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../../styles/commonStyles';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import { mockChallenges, mockUsers } from '../../data/mockData';
import { Challenge } from '../../types';

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'available'>('active');

  const currentUser = mockUsers[0];

  const joinChallenge = (challengeId: string) => {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge =>
        challenge.id === challengeId
          ? { 
              ...challenge, 
              participants: [...challenge.participants, currentUser.id] 
            }
          : challenge
      )
    );
  };

  const getChallengeIcon = (type: Challenge['type']) => {
    const icons = {
      reading: 'book-outline',
      walking: 'walk-outline',
      meditation: 'flower-outline',
      service: 'heart-outline',
      creative: 'brush-outline',
    };
    return icons[type];
  };

  const getChallengeColor = (type: Challenge['type']) => {
    const colors_map = {
      reading: colors.primary,
      walking: colors.success,
      meditation: colors.accentSecondary,
      service: colors.error,
      creative: colors.accent,
    };
    return colors_map[type];
  };

  const filteredChallenges = challenges.filter(challenge => {
    const isParticipant = challenge.participants.includes(currentUser.id);
    const isActive = challenge.isActive && new Date() <= challenge.endDate;
    
    switch (activeTab) {
      case 'active':
        return isParticipant && isActive;
      case 'completed':
        return isParticipant && !isActive;
      case 'available':
        return !isParticipant && isActive;
      default:
        return true;
    }
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <Header 
        title="Challenges" 
        rightAction={{
          icon: 'trophy-outline',
          onPress: () => console.log('View achievements')
        }}
      />

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {challenges.filter(c => c.participants.includes(currentUser.id)).length}
          </Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {challenges.filter(c => 
              c.participants.includes(currentUser.id) && 
              new Date() > c.endDate
            ).length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {challenges
              .filter(c => c.participants.includes(currentUser.id))
              .reduce((total, c) => total + c.points, 0)}
          </Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'active', label: 'Active' },
          { key: 'available', label: 'Available' },
          { key: 'completed', label: 'Completed' },
        ].map((tab) => (
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
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {filteredChallenges.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="trophy-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyStateTitle}>
              {activeTab === 'active' ? 'No Active Challenges' :
               activeTab === 'available' ? 'No Available Challenges' :
               'No Completed Challenges'}
            </Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'available' 
                ? 'Check back later for new challenges!'
                : 'Join a challenge to get started on your journey!'
              }
            </Text>
          </View>
        ) : (
          filteredChallenges.map((challenge) => (
            <View key={challenge.id} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={[
                  styles.challengeIcon,
                  { backgroundColor: getChallengeColor(challenge.type) + '20' }
                ]}>
                  <Icon 
                    name={getChallengeIcon(challenge.type) as any} 
                    size={24} 
                    color={getChallengeColor(challenge.type)} 
                  />
                </View>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeType}>{challenge.type.toUpperCase()}</Text>
                </View>
                <View style={styles.challengePoints}>
                  <Text style={styles.pointsText}>{challenge.points}</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                </View>
              </View>

              <Text style={styles.challengeDescription}>
                {challenge.description}
              </Text>

              <View style={styles.challengeDetails}>
                <View style={styles.detailItem}>
                  <Icon name="calendar-outline" size={16} color={colors.textLight} />
                  <Text style={styles.detailText}>
                    {challenge.duration} days
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="people-outline" size={16} color={colors.textLight} />
                  <Text style={styles.detailText}>
                    {challenge.participants.length} participants
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="time-outline" size={16} color={colors.textLight} />
                  <Text style={styles.detailText}>
                    Ends {challenge.endDate.toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {activeTab === 'available' && (
                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    { backgroundColor: getChallengeColor(challenge.type) }
                  ]}
                  onPress={() => joinChallenge(challenge.id)}
                >
                  <Icon name="add" size={20} color={colors.white} />
                  <Text style={styles.joinButtonText}>Join Challenge</Text>
                </TouchableOpacity>
              )}

              {activeTab === 'active' && (
                <View style={styles.progressSection}>
                  <View style={styles.progressBar}>
                    <View style={[
                      styles.progressFill,
                      { 
                        width: '60%', // This would be calculated based on actual progress
                        backgroundColor: getChallengeColor(challenge.type)
                      }
                    ]} />
                  </View>
                  <Text style={styles.progressText}>60% Complete</Text>
                </View>
              )}

              {activeTab === 'completed' && (
                <View style={styles.completedBadge}>
                  <Icon name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.completedText}>Completed!</Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: colors.primary + '20',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  challengeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  challengeType: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textLight,
    letterSpacing: 1,
  },
  challengePoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.accent,
  },
  pointsLabel: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '600',
  },
  challengeDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  completedText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
