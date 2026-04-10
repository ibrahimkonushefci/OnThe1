import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '../constants/colors';
import { DetectScreen } from '../features/detect/DetectScreen';
import { LearnScreen } from '../features/learn/LearnScreen';
import { PracticeStack } from './PracticeStack';

export type AppTabsParamList = {
  Detect: undefined;
  Practice: undefined;
  Learn: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Detect"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => (
          <Feather color={color} name={getTabIcon(route.name)} size={size} />
        ),
      })}
    >
      <Tab.Screen component={DetectScreen} name="Detect" />
      <Tab.Screen component={PracticeStack} name="Practice" />
      <Tab.Screen component={LearnScreen} name="Learn" />
    </Tab.Navigator>
  );
}

function getTabIcon(routeName: keyof AppTabsParamList): React.ComponentProps<typeof Feather>['name'] {
  switch (routeName) {
    case 'Detect':
      return 'radio';
    case 'Practice':
      return 'activity';
    case 'Learn':
      return 'book-open';
  }
}
