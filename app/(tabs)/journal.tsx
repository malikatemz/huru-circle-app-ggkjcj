
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrivateJournal from '../../components/PrivateJournal';
import Header from '../../components/Header';
import { Journal } from '../../types';

// Mock journal data
const mockJournals: Journal[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Grateful for Today',
    content: 'Today was a really good day. I had a great conversation with my mentor about my goals for the future. I\'m feeling more confident about the path I\'m taking and excited about the opportunities ahead. I\'m grateful for the support system I have and the progress I\'ve made.',
    mood: 'great',
    isPrivate: true,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    tags: ['gratitude', 'mentor', 'goals'],
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Challenging Day',
    content: 'Had a difficult day today. Felt overwhelmed with school work and some personal issues. But I managed to complete the meditation challenge and it helped me feel more centered. Sometimes it\'s okay to have tough days.',
    mood: 'struggling',
    isPrivate: true,
    createdAt: new Date('2024-01-12T18:45:00'),
    updatedAt: new Date('2024-01-12T18:45:00'),
    tags: ['challenges', 'meditation', 'school'],
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Weekend Reflections',
    content: 'Spent the weekend with family and friends. It was nice to disconnect from social media and just be present. I realized how much I value these real connections and want to prioritize them more.',
    mood: 'good',
    isPrivate: true,
    createdAt: new Date('2024-01-10T20:15:00'),
    updatedAt: new Date('2024-01-10T20:15:00'),
    tags: ['family', 'friends', 'reflection'],
  },
];

const JournalScreen: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>(mockJournals);

  const handleSaveJournal = (journalData: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Saving journal:', journalData);
    
    const newJournal: Journal = {
      ...journalData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setJournals(prevJournals => [newJournal, ...prevJournals]);
  };

  const handleDeleteJournal = (journalId: string) => {
    console.log('Deleting journal:', journalId);
    setJournals(prevJournals => prevJournals.filter(journal => journal.id !== journalId));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PrivateJournal
        journals={journals}
        onSaveJournal={handleSaveJournal}
        onDeleteJournal={handleDeleteJournal}
        userId="user1"
      />
    </SafeAreaView>
  );
};

export default JournalScreen;
