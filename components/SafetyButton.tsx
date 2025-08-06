
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';
import { useNotifications } from '../hooks/useNotifications';

interface SafetyButtonProps {
  userId: string;
  emergencyContacts: any[];
}

export default function SafetyButton({ userId, emergencyContacts }: SafetyButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const { sendEmergencyAlert } = useNotifications();

  const handleEmergencyPress = () => {
    setShowModal(true);
  };

  const confirmEmergency = async () => {
    setShowModal(false);
    
    Alert.alert(
      'Emergency Alert Sent',
      'Your emergency contacts have been notified. If this is a life-threatening emergency, please call emergency services immediately.',
      [
        { text: 'Call Emergency Services', onPress: () => console.log('Would dial emergency number') },
        { text: 'OK', style: 'default' }
      ]
    );

    await sendEmergencyAlert(userId, emergencyContacts);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={handleEmergencyPress}
        activeOpacity={0.8}
      >
        <Icon name="warning" size={24} color={colors.white} />
        <Text style={styles.emergencyText}>Emergency</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="warning" size={48} color={colors.error} />
            <Text style={styles.modalTitle}>Emergency Alert</Text>
            <Text style={styles.modalText}>
              This will immediately notify your emergency contacts. 
              Are you sure you want to proceed?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmEmergency}
              >
                <Text style={styles.confirmButtonText}>Send Alert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    boxShadow: '0px 4px 12px rgba(231, 76, 60, 0.3)',
    elevation: 4,
  },
  emergencyText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.backgroundAlt,
  },
  confirmButton: {
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
