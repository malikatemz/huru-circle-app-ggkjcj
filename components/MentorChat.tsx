
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import { ChatMessage, User } from '../types';

interface MentorChatProps {
  currentUser: User;
  otherUser: User;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

const MentorChat: React.FC<MentorChatProps> = ({
  currentUser,
  otherUser,
  messages,
  onSendMessage,
  onBack,
}) => {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isCurrentUser = message.senderId === currentUser.id;
    const showDate = index === 0 || 
      formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

    return (
      <View key={message.id}>
        {showDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate(message.timestamp)}</Text>
          </View>
        )}
        
        <View style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
        ]}>
          <View style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
          ]}>
            <Text style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText
            ]}>
              {message.content}
            </Text>
            <Text style={[
              styles.timeText,
              isCurrentUser ? styles.currentUserTime : styles.otherUserTime
            ]}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSafetyNotice = () => (
    <View style={styles.safetyNotice}>
      <Icon name="shield" size={16} color={colors.warning} />
      <Text style={styles.safetyText}>
        This conversation is monitored for safety. Please keep discussions appropriate and supportive.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{otherUser.displayName}</Text>
          <Text style={styles.headerRole}>
            {otherUser.role === 'mentor' ? 'Mentor' : 'Teen'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => Alert.alert('Safety', 'If you feel unsafe or uncomfortable, please use the emergency button or contact an admin.')}
        >
          <Icon name="information-circle" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {renderSafetyNotice()}

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="chatbubbles" size={48} color={colors.textLight} />
            <Text style={styles.emptyStateText}>
              Start a conversation! Remember to be respectful and supportive.
            </Text>
          </View>
        ) : (
          messages.map((message, index) => renderMessage(message, index))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textLight}
          multiline
          maxLength={500}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Icon 
            name="send" 
            size={20} 
            color={messageText.trim() ? colors.white : colors.textLight} 
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48, // Account for status bar
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  headerRole: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  infoButton: {
    padding: 8,
  },
  safetyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  safetyText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateText: {
    fontSize: 12,
    color: colors.textLight,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messageContainer: {
    marginVertical: 4,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  otherUserMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  currentUserBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: colors.white,
  },
  otherUserText: {
    color: colors.text,
  },
  timeText: {
    fontSize: 11,
    marginTop: 4,
  },
  currentUserTime: {
    color: colors.white,
    opacity: 0.7,
  },
  otherUserTime: {
    color: colors.textLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundAlt,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
});

export default MentorChat;
