import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { useOnboarding, topIntent } from "@/lib/onboarding-store";
import { STAT } from "@/lib/onboarding-content";

export default function StatScreen() {
  const { state } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const intent = topIntent(state.intents) ?? "receivables";
  const { big, line } = STAT[intent];

  const bigSize = compact ? 64 : width < 880 ? 96 : 128;

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 720, paddingTop: compact ? 32 : 80 }}>
          <Text
            className="font-semibold text-ink-tertiary text-xs uppercase mb-5"
            style={{ letterSpacing: 2 }}
          >
            Here's what kept us up at night when we built Riko
          </Text>

          <Text
            className="font-bold text-brand"
            style={{
              fontSize: bigSize,
              lineHeight: bigSize * 1.02,
              letterSpacing: -2,
              fontFamily: "Inter_700Bold",
              fontVariant: ["tabular-nums"],
            }}
          >
            {big}
          </Text>

          <Text
            className="font-medium text-ink mt-6 mb-8"
            style={{ fontSize: compact ? 22 : 28, lineHeight: compact ? 30 : 38, letterSpacing: -0.3, maxWidth: 620 }}
          >
            {line}
          </Text>

          <View className="flex-row items-center gap-2 mb-10">
            <View className="w-1 h-8 rounded-full bg-brand" />
            <Text className="text-sm text-slate-600 flex-1" style={{ lineHeight: 22 }}>
              That's not a Riko number. That's the Indian SMB reality we're fixing.
            </Text>
          </View>

          <View className="items-start">
            <Pressable
              onPress={() => router.push("/onboarding/outcome")}
              className="flex-row items-center gap-2 bg-ink rounded-full px-6 py-3.5"
            >
              <Text className="text-sm font-semibold text-white">Show me how Riko fixes this</Text>
              <ArrowRight size={16} color="#ffffff" strokeWidth={2.25} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
