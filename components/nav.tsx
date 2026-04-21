import type { ReactNode } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavProps = {
  rightSlot?: ReactNode;
};

export function Nav({ rightSlot }: NavProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const showSecondary = width >= 640;

  return (
    <View
      className="flex-row items-center justify-between px-5 bg-surface border-b border-slate-200"
      style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}
    >
      <Pressable onPress={() => router.push("/")} className="flex-row items-center gap-2 py-1 pr-2">
        <View className="w-8 h-8 rounded-lg bg-brand items-center justify-center">
          <Text className="text-white font-semibold text-sm">R</Text>
        </View>
        <Text className="font-semibold text-base text-ink">Riko</Text>
      </Pressable>
      {rightSlot ?? (
        <View className="flex-row items-center gap-3">
          {showSecondary && (
            <>
              <Pressable className="py-2.5 px-2">
                <Text className="text-sm text-slate-600">Sign in</Text>
              </Pressable>
              <Pressable className="py-2.5 px-5 rounded-full border border-slate-300 bg-surface">
                <Text className="text-sm font-medium text-slate-700">Book a Demo</Text>
              </Pressable>
            </>
          )}
          <Pressable
            onPress={() => router.push("/onboarding/role")}
            className="py-2.5 px-5 rounded-full bg-ink"
          >
            <Text className="text-sm font-semibold text-white">Get started free</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
