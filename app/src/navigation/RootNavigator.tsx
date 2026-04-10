import { NavigationContainer } from '@react-navigation/native';

import { navigationTheme } from '../constants/colors';
import { AppTabs } from './AppTabs';

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppTabs />
    </NavigationContainer>
  );
}
