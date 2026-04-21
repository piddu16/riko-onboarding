import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

type NavProps = {
  rightSlot?: ReactNode;
};

export function Nav({ rightSlot }: NavProps) {
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-border">
      <Pressable onPress={() => router.push("/")} className="flex-row items-center gap-2">
        <View className="w-7 h-7 rounded-md bg-green items-center justify-center">
          <Text className="text-white font-semibold text-[13px]">R</Text>
        </View>
        <Text className="font-medium text-base text-ink">Riko</Text>
      </Pressable>
      {rightSlot ?? (
        <View className="flex-row items-center gap-3">
          <Text className="text-[13px] text-ink-secondary hidden sm:flex">Sign in</Text>
          <Pressable className="px-3.5 py-2 border border-border rounded-lg hidden sm:flex">
            <Text className="text-[13px] text-ink-secondary">Book a demo</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/onboarding/connect-tally")}
            className="px-3.5 py-2 bg-green rounded-lg"
          >
            <Text className="text-[13px] font-medium text-white">Get my numbers</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
