import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { ArrowRight, CheckCircle } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { InteractiveDemo } from "@/components/interactive-demo";

const TRUST = ["5-min Tally setup", "Read-only access", "14-day free trial", "No credit card"];

export default function Landing() {
  const { width } = useWindowDimensions();
  const twoCol = width >= 880;

  return (
    <View className="flex-1 bg-surface">
      <Nav />
      <ScrollView contentContainerClassName="pb-16">
        <View
          className="w-full self-center"
          style={{
            maxWidth: 1200,
            paddingHorizontal: twoCol ? 32 : 24,
            paddingTop: twoCol ? 112 : 48,
            paddingBottom: twoCol ? 96 : 48,
          }}
        >
          <View className={twoCol ? "flex-row gap-12 items-center" : "gap-10"}>
            <View className="flex-1 gap-5">
              <View className="self-start flex-row items-center gap-2 bg-brand-tint px-3 py-1.5 rounded-full">
                <View className="w-1.5 h-1.5 rounded-full bg-brand" />
                <Text className="font-semibold text-xs uppercase text-ink-tertiary" style={{ letterSpacing: 2 }}>
                  Live demo · sample data
                </Text>
              </View>
              <Text
                className="font-semibold text-ink"
                style={{ fontSize: twoCol ? 64 : 44, lineHeight: twoCol ? 70 : 48, letterSpacing: -1 }}
              >
                Your books, but they talk back.
              </Text>
              <Text className="text-slate-600" style={{ fontSize: 18, lineHeight: 28, maxWidth: 520 }}>
                Ask anything about a Tally-connected business — receivables, GST, cash, margins. Riko answers in seconds, in plain English. Try it on the right before you sign up.
              </Text>
              <View className="flex-row gap-3 mt-2 flex-wrap">
                <Pressable
                  onPress={() => router.push("/onboarding/connect-tally")}
                  className="flex-row items-center gap-2 bg-ink rounded-full"
                  style={{ paddingHorizontal: 24, paddingVertical: 14 }}
                >
                  <Text className="text-sm font-semibold text-white">Get started free</Text>
                  <ArrowRight size={16} color="#ffffff" strokeWidth={2.25} />
                </Pressable>
                <Pressable
                  className="border border-slate-300 rounded-full bg-surface"
                  style={{ paddingHorizontal: 24, paddingVertical: 14 }}
                >
                  <Text className="text-sm font-medium text-slate-700">How it works</Text>
                </Pressable>
              </View>
              <View className="flex-row flex-wrap gap-x-5 gap-y-2 mt-2">
                {TRUST.map((t) => (
                  <View key={t} className="flex-row items-center gap-1.5">
                    <CheckCircle size={14} color="#22C55E" strokeWidth={2.25} />
                    <Text className="text-xs text-slate-500">{t}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flex: twoCol ? 1.05 : undefined, width: twoCol ? undefined : "100%" }}>
              <InteractiveDemo />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
