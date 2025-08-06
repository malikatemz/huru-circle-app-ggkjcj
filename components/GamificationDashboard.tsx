
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import { User, Badge, Reward } from '../types';

interface GamificationDashboardProps {
  user: User;
  availableRewards: Reward[];
  onRedeemReward: (rewardId: string) => void;
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({
  user,
  availableRewards,
  onRedeemReward,
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'badges' | 'rewards'>('overview');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'HURU Explorer':
        return colors.explorer;
      case 'HURU Builder':
        return colors.builder;
      case 'HURU Leader':
        return colors.leader;
      default:
        return colors.primary;
    }
  };

  const getLevelProgress = () => {
    const levels = ['HURU Explorer', 'HURU Builder', 'HURU Leader'];
    const currentIndex = levels.indexOf(user.level);
    const pointsThresholds = [0, 500, 1500]; // Points needed for each level
    const nextThreshold = pointsThresholds[currentIndex + 1] || pointsThresholds[pointsThresholds.length - 1];
    const currentThreshold = pointsThresholds[currentIndex];
    
    if (currentIndex === levels.length - 1) {
      return 100; // Max level reached
    }
    
    const progress = ((user.points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getNextLevelPoints = () => {
    const levels = ['HURU Explorer', 'HURU Builder', 'HURU Leader'];
    const currentIndex = levels.indexOf(user.level);
    const pointsThresholds = [0, 500, 1500];
    
    if (currentIndex === levels.length - 1) {
      return null; // Max level reached
    }
    
    return pointsThresholds[currentIndex + 1] - user.points;
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(user.level) }]}>
            <Icon name="star" size={24} color={colors.white} />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{user.level}</Text>
            <Text style={styles.pointsText}>{user.points} points</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${getLevelProgress()}%`,
                  backgroundColor: getLevelColor(user.level)
                }
              ]} 
            />
          </View>
          {getNextLevelPoints() && (
            <Text style={styles.progressText}>
              {getNextLevelPoints()} points to next level
            </Text>
          )}
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Icon name="flame" size={24} color={colors.warning} />
          <Text style={styles.statNumber}>{user.streakDays}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="trophy" size={24} color={colors.accent} />
          <Text style={styles.statNumber}>{user.badges.length}</Text>
          <Text style={styles.statLabel}>Badges Earned</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="gift" size={24} color={colors.success} />
          <Text style={styles.statNumber}>{availableRewards.filter(r => r.pointsCost <= user.points).length}</Text>
          <Text style={styles.statLabel}>Available Rewards</Text>
        </View>
      </View>

      <View style={styles.recentBadges}>
        <Text style={styles.sectionTitle}>Recent Badges</Text>
        {user.badges.slice(-3).map((badge) => (
          <View key={badge.id} style={styles.badgeItem}>
            <View style={styles.badgeIcon}>
              <Icon name={badge.icon} size={20} color={colors.accent} />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
            </View>
            <Text style={styles.badgePoints}>+{badge.points}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderBadges = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Your Badges ({user.badges.length})</Text>
      
      <View style={styles.badgesGrid}>
        {user.badges.map((badge) => (
          <View key={badge.id} style={styles.badgeCard}>
            <View style={styles.badgeCardIcon}>
              <Icon name={badge.icon} size={32} color={colors.accent} />
            </View>
            <Text style={styles.badgeCardName}>{badge.name}</Text>
            <Text style={styles.badgeCardDescription}>{badge.description}</Text>
            <Text style={styles.badgeCardPoints}>+{badge.points} points</Text>
            <Text style={styles.badgeCardDate}>
              Earned {new Date(badge.earnedAt).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
      
      {user.badges.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="trophy" size={48} color={colors.textLight} />
          <Text style={styles.emptyStateText}>
            No badges yet! Complete challenges and activities to earn your first badge.
          </Text>
        </View>
      )}
    </View>
  );

  const renderRewards = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Rewards Store</Text>
      <Text style={styles.subtitle}>Redeem your points for amazing rewards!</Text>
      
      <View style={styles.rewardsGrid}>
        {availableRewards.map((reward) => {
          const canAfford = user.points >= reward.pointsCost;
          
          return (
            <View key={reward.id} style={[styles.rewardCard, !canAfford && styles.rewardCardDisabled]}>
              <View style={styles.rewardHeader}>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <View style={[styles.rewardCost, !canAfford && styles.rewardCostDisabled]}>
                  <Text style={[styles.rewardCostText, !canAfford && styles.rewardCostTextDisabled]}>
                    {reward.pointsCost} pts
                  </Text>
                </View>
              </View>
              
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              
              {reward.requiresApproval && (
                <Text style={styles.approvalText}>Requires admin approval</Text>
              )}
              
              <TouchableOpacity
                style={[
                  styles.redeemButton,
                  !canAfford && styles.redeemButtonDisabled,
                  !reward.isAvailable && styles.redeemButtonUnavailable
                ]}
                onPress={() => canAfford && reward.isAvailable && onRedeemReward(reward.id)}
                disabled={!canAfford || !reward.isAvailable}
              >
                <Text style={[
                  styles.redeemButtonText,
                  !canAfford && styles.redeemButtonTextDisabled
                ]}>
                  {!reward.isAvailable ? 'Out of Stock' : canAfford ? 'Redeem' : 'Not Enough Points'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Keep growing and earning rewards!</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'badges' && styles.activeTab]}
          onPress={() => setSelectedTab('badges')}
        >
          <Text style={[styles.tabText, selectedTab === 'badges' && styles.activeTabText]}>
            Badges
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'rewards' && styles.activeTab]}
          onPress={() => setSelectedTab('rewards')}
        >
          <Text style={[styles.tabText, selectedTab === 'rewards' && styles.activeTabText]}>
            Rewards
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'badges' && renderBadges()}
        {selectedTab === 'rewards' && renderRewards()}
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
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  levelCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  pointsText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  recentBadges: {
    marginTop: 8,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  badgeDescription: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  badgePoints: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  badgeCardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeCardDescription: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  badgeCardPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 4,
  },
  badgeCardDate: {
    fontSize: 10,
    color: colors.textLight,
  },
  rewardsGrid: {
    gap: 16,
  },
  rewardCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  rewardCardDisabled: {
    opacity: 0.6,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  rewardCost: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rewardCostDisabled: {
    backgroundColor: colors.textLight,
  },
  rewardCostText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  rewardCostTextDisabled: {
    color: colors.white,
  },
  rewardDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  approvalText: {
    fontSize: 12,
    color: colors.warning,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  redeemButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: colors.textLight,
  },
  redeemButtonUnavailable: {
    backgroundColor: colors.error,
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  redeemButtonTextDisabled: {
    color: colors.white,
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

export default GamificationDashboard;
