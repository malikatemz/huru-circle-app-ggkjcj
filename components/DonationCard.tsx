
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface DonationCardProps {
  onDonate: (amount: number, isAnonymous: boolean, message?: string) => void;
}

const presetAmounts = [100, 500, 1000, 2000, 5000];

export default function DonationCard({ onDonate }: DonationCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    
    if (!amount || amount < 50) {
      Alert.alert('Invalid Amount', 'Minimum donation amount is KSh 50');
      return;
    }

    setIsLoading(true);

    Alert.alert(
      'Confirm Donation',
      `Donate KSh ${amount} to support HURU Circle?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Donate', 
          onPress: async () => {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            onDonate(amount, isAnonymous, message.trim() || undefined);
            
            // Reset form
            setSelectedAmount(null);
            setCustomAmount('');
            setMessage('');
            setIsAnonymous(false);
            
            Alert.alert('Thank You!', 'Your donation has been processed successfully.');
          }
        }
      ]
    );
    
    setIsLoading(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name="heart" size={32} color={colors.error} />
        <Text style={styles.title}>Support HURU Circle</Text>
        <Text style={styles.subtitle}>
          Your donation helps us provide mental health support to teens
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Choose Amount (KSh)</Text>
      <View style={styles.amountGrid}>
        {presetAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.amountButton,
              selectedAmount === amount && styles.selectedAmountButton
            ]}
            onPress={() => {
              setSelectedAmount(amount);
              setCustomAmount('');
            }}
          >
            <Text style={[
              styles.amountText,
              selectedAmount === amount && styles.selectedAmountText
            ]}>
              {amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Or Enter Custom Amount</Text>
      <TextInput
        style={styles.customAmountInput}
        placeholder="Enter amount in KSh"
        value={customAmount}
        onChangeText={(text) => {
          setCustomAmount(text);
          setSelectedAmount(null);
        }}
        keyboardType="numeric"
      />

      <Text style={styles.sectionTitle}>Message (Optional)</Text>
      <TextInput
        style={styles.messageInput}
        placeholder="Leave a message of support..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={styles.anonymousToggle}
        onPress={() => setIsAnonymous(!isAnonymous)}
      >
        <Icon 
          name={isAnonymous ? "checkbox" : "square-outline"} 
          size={20} 
          color={colors.primary} 
        />
        <Text style={styles.anonymousText}>Donate anonymously</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.donateButton, isLoading && styles.loadingButton]}
        onPress={handleDonate}
        disabled={isLoading || (!selectedAmount && !customAmount)}
      >
        <Icon name="heart" size={20} color={colors.white} />
        <Text style={styles.donateButtonText}>
          {isLoading ? 'Processing...' : 'Donate Now'}
        </Text>
      </TouchableOpacity>

      <View style={styles.paymentMethods}>
        <Text style={styles.paymentText}>Payment via M-PESA or Card</Text>
        <Text style={styles.tillNumber}>Till Number: 123456</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedAmountButton: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  selectedAmountText: {
    color: colors.primary,
  },
  customAmountInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundAlt,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundAlt,
    height: 80,
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  anonymousText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  donateButton: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  loadingButton: {
    backgroundColor: colors.textLight,
  },
  donateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  paymentMethods: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  paymentText: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  tillNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
