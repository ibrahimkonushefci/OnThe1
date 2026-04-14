import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/spacing';

type ScreenLayoutProps = PropsWithChildren<{
  footer?: ReactNode;
  scroll?: boolean;
  showAmbientGlow?: boolean;
}>;

export function ScreenLayout({
  children,
  footer,
  scroll = true,
  showAmbientGlow = true,
}: ScreenLayoutProps) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.staticContent}>{children}</View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {showAmbientGlow ? <View pointerEvents="none" style={styles.topGlow} /> : null}
      {showAmbientGlow ? <View pointerEvents="none" style={styles.bottomGlow} /> : null}
      {content}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.screenVertical,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.screenVertical,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
  },
  topGlow: {
    position: 'absolute',
    top: -96,
    left: -44,
    width: 220,
    height: 220,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(115, 82, 246, 0.10)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: 88,
    right: -68,
    width: 240,
    height: 240,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(25, 199, 243, 0.08)',
  },
});
