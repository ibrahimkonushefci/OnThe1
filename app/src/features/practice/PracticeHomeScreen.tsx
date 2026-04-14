import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppHeader } from '../../components/AppHeader';
import { IconBadge } from '../../components/IconBadge';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenLayout } from '../../components/ScreenLayout';
import { SurfaceCard } from '../../components/SurfaceCard';
import { appCopy } from '../../constants/copy';
import type { PracticeStackParamList } from '../../navigation/PracticeStack';

type Props = NativeStackScreenProps<PracticeStackParamList, 'PracticeHome'>;

export function PracticeHomeScreen({ navigation }: Props) {
  return (
    <ScreenLayout>
      <AppHeader subtitle={appCopy.practice.subtitle} title={appCopy.practice.title} />

      <SurfaceCard
        body="Choose a style and tempo, then follow the count."
        title="Quick Count"
      >
        <IconBadge name="clock" />
        <PrimaryButton
          icon="arrow-right"
          label="Open Quick Count"
          onPress={() => navigation.navigate('QuickCount')}
        />
      </SurfaceCard>

      <SurfaceCard
        body="Play a practice track and tap when you think the 1 lands."
        title="Find the 1"
      >
        <IconBadge name="target" tone="secondary" />
        <PrimaryButton
          icon="arrow-right"
          label="Open Trainer"
          onPress={() => navigation.navigate('FindTheOne')}
        />
      </SurfaceCard>
    </ScreenLayout>
  );
}
