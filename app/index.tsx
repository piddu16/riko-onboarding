import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Nav } from "@/components/nav";
import { InteractiveDemo } from "@/components/interactive-demo";

const TRUST = ["5-min Tally setup", "Read-only access", "14-day free trial", "No credit card"];

export default function Landing() {
  const { width } = useWindowDimensions();
  const twoCol = width >= 880;

  return (
    <View className="flex-1 bg-surface-bg">
      <Nav />
      <ScrollView contentContainerClassName="pb-16">
        <View
          className="w-full self-center"
          style={{ maxWidth: 1200, paddingHorizontal: twoCol ? 32 : 16, paddingTop: twoCol ? 64 : 32, paddingBottom: twoCol ? 96 : 48 }}
        >
          <View className={twoCol ? "flex-row gap-12 items-center" : "gap-8"}>
            <View className="flex-1 gap-4">
              <View className="self-start flex-row items-center gap-2 bg-green-light px-3 py-1.5 rounded-full">
                <View className="w-1.5 h-1.5 rounded-full bg-green" />
                <Text className="text-xs font-medium text-green-darkest">Live demo · sample data</Text>
              </View>
              <Text
                className="font-medium text-ink"
                style={{ fontSize: twoCol ? 48 : 36, lineHeight: twoCol ? 53 : 40, letterSpacing: -0.5 }}
              >
                Your books, but they talk back.
              </Text>
              <Text className="text-ink-secondary" style={{ fontSize: 17, lineHeight: 26, maxWidth: 480 }}>
                Ask anything about a Tally-connected business — receivables, GST, cash, margins. Riko answers in seconds, in plain English. Try it on the right before you sign up.
              </Text>
              <View className="flex-row gap-3 mt-2 flex-wrap">
                <Pressable
                  onPress={() => router.push("/onboarding/connect-tally")}
                  className="bg-green rounded-lg"
                  style={{ paddingHorizontal: 22, paddingVertical: 12 }}
                >
                  <Text className="text-sm font-medium text-white">Get my numbers →</Text>
                </Pressable>
                <Pressable className="border border-border rounded-lg" style={{ paddingHorizontal: 18, paddingVertical: 12 }}>
                  <Text className="text-sm text-ink-secondary">How it works</Text>
                </Pressable>
              </View>
              <View className="flex-row flex-wrap gap-x-5 gap-y-2 mt-3">
                {TRUST.map((t) => (
                  <View key={t} className="flex-row items-center gap-1.5">
                    <Text className="text-xs text-green font-medium">✓</Text>
                    <Text className="text-xs text-ink-tertiary">{t}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flex: twoCol ? 1.1 : undefined, width: twoCol ? undefined : "100%" }}>
              <InteractiveDemo />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
