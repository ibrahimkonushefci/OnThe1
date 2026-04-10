import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FindTheOneScreen } from '../features/practice/FindTheOneScreen';
import { PracticeHomeScreen } from '../features/practice/PracticeHomeScreen';
import { QuickCountScreen } from '../features/practice/QuickCountScreen';

export type PracticeStackParamList = {
  PracticeHome: undefined;
  QuickCount: undefined;
  FindTheOne: undefined;
};

const Stack = createNativeStackNavigator<PracticeStackParamList>();

export function PracticeStack() {
  return (
    <Stack.Navigator
      initialRouteName="PracticeHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen component={PracticeHomeScreen} name="PracticeHome" />
      <Stack.Screen component={QuickCountScreen} name="QuickCount" />
      <Stack.Screen component={FindTheOneScreen} name="FindTheOne" />
    </Stack.Navigator>
  );
}
