import { getRecordingPermissionsAsync, requestRecordingPermissionsAsync } from 'expo-audio';
import { Linking } from 'react-native';

export async function getMicrophonePermission() {
  return await getRecordingPermissionsAsync();
}

export async function requestMicrophonePermission() {
  return await requestRecordingPermissionsAsync();
}

export async function openAppSettings() {
  await Linking.openSettings();
}
