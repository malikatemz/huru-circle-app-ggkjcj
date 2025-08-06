
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export function useStorage() {
  const storeData = async (key: string, value: any, secure: boolean = false) => {
    try {
      const jsonValue = JSON.stringify(value);
      if (secure && Platform.OS !== 'web') {
        await SecureStore.setItemAsync(key, jsonValue);
      } else {
        await AsyncStorage.setItem(key, jsonValue);
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const getData = async (key: string, secure: boolean = false) => {
    try {
      let jsonValue;
      if (secure && Platform.OS !== 'web') {
        jsonValue = await SecureStore.getItemAsync(key);
      } else {
        jsonValue = await AsyncStorage.getItem(key);
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  const removeData = async (key: string, secure: boolean = false) => {
    try {
      if (secure && Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  return { storeData, getData, removeData };
}
