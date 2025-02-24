/**
 * ヘッダーコンポーネント
 *
 * @important
 * ノッチ付きデバイスでのレイアウトずれに注意
 * - SafeAreaView と組み合わせて使用する場合、適切なパディングの設定が必要
 * - useSafeAreaInsets を使用してデバイスに応じたパディングを設定することを推奨
 * - レイアウトの変更時は、様々なデバイスでの表示確認を推奨
 *
 * @example
 * // 推奨される使用方法
 * import { useSafeAreaInsets } from 'react-native-safe-area-context';
 *
 * const Component = () => {
 *   const insets = useSafeAreaInsets();
 *   return (
 *     <Header
 *       title="タイトル"
 *       containerStyle={{ paddingTop: insets.top + spacing.sm }}
 *     />
 *   );
 * };
 */
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'
import { typography } from '../../styles/typography'

type HeaderProps = {
  title: string
  emoji?: string
  showBack?: boolean
  onBack?: () => void
  leftIcon?: string
  onLeftIconPress?: () => void
  rightIcon?: string
  onRightIconPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
}

export const Header: React.FC<HeaderProps> = ({
  title,
  emoji,
  showBack = false,
  onBack,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {showBack && <HeaderBackButton onPress={onBack} />}
      {leftIcon && (
        <TouchableOpacity style={styles.leftIcon} onPress={onLeftIconPress}>
          <Text style={styles.iconText}>{leftIcon}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {emoji && `${emoji} `}
          {title}
        </Text>
      </View>
      {rightIcon ? (
        <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
          <Text style={styles.iconText}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIcon} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
  iconText: {
    fontSize: 24,
  },
  leftIcon: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  rightIcon: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  title: {
    ...typography.heading.h1,
    color: colors.text.primary,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.md,
  },
})
