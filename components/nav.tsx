import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

type NavProps = {
  rightSlot?: ReactNode;
};

export function Nav({ rightSlot }: NavProps) {
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-slate-200">
      <Pressable onPress={() => router.push("/")} className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded-lg bg-brand items-center justify-center">
          <Text className="text-white font-semibold text-sm">R</Text>
        </View>
        <Text className="font-semibold text-base text-ink">Riko</Text>
      </Pressable>
      {rightSlot ?? (
        <View className="flex-row items-center gap-3">
          <Pressable className="hidden sm:flex">
            <Text className="text-sm text-slate-600">Sign in</Text>
          </Pressable>
          <Pressable className="hidden sm:flex px-5 py-2.5 rounded-full border border-slate-300 bg-surface">
            <Text className="text-sm font-medium text-slate-700">Book a Demo</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/onboarding/connect-tally")}
            className="px-5 py-2.5 rounded-full bg-ink"
          >
            <Text className="text-sm font-semibold text-white">Get started free</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
