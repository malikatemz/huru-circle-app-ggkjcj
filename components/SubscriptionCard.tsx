
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface SubscriptionCardProps {
  plan: 'basic' | 'premium';
  price: number;
  features: string[];
  isActive?: boolean;
  onSubscribe: (plan: 'basic' | 'premium') => void;
}

export default function SubscriptionCard({ 
  plan, 
  price, 
  features, 
  isActive = false, 
  onSubscribe 
}: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    Alert.alert(
      'Confirm Subscription',
      `Subscribe to ${plan} plan for KSh ${price}/month?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Subscribe', 
          onPress: async () => {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            onSubscribe(plan);
            Alert.alert('Success', 'Subscription activated successfully!');
          }
        }
      ]
    );
    
    setIsLoading(false);
  };

  return (
    <View style={[styles.card, isActive && styles.activeCard]}>
      {isActive && (
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>ACTIVE</Text>
        </View>
      )}
      
      <Text style={styles.planName}>{plan.toUpperCase()}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.currency}>KSh</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.period}>/month</Text>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.subscribeButton,
          isActive && styles.activeButton,
          isLoading && styles.loadingButton
        ]}
        onPress={handleSubscribe}
        disabled={isActive || isLoading}
      >
        <Text style={[styles.subscribeButtonText, isActive && styles.activeButtonText]}>
          {isLoading ? 'Processing...' : isActive ? 'Current Plan' : 'Subscribe'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 8,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  activeCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  activeBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  activeBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 20,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginHorizontal: 4,
  },
  period: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.success,
  },
  loadingButton: {
    backgroundColor: colors.textLight,
  },
  subscribeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  activeButtonText: {
    color: colors.white,
  },
});
