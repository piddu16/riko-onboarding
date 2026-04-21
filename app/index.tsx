import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { ArrowRight, CheckCircle } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { InteractiveDemo } from "@/components/interactive-demo";

const TRUST = ["5-min Tally setup", "Read-only access", "14-day free trial", "No credit card"];

export default function Landing() {
  const { width } = useWindowDimensions();
  const twoCol = width >= 880;
  const heroSize = twoCol ? 64 : width >= 480 ? 42 : 36;

  return (
    <View className="flex-1 bg-surface">
      <Nav />
      <ScrollView contentContainerClassName="pb-12">
        <View
          className="w-full self-center"
          style={{
            maxWidth: 1200,
            paddingHorizontal: twoCol ? 32 : 20,
            paddingTop: twoCol ? 112 : 36,
            paddingBottom: twoCol ? 96 : 48,
          }}
        >
          <View className={twoCol ? "flex-row gap-12 items-center" : "gap-8"}>
            <View className="flex-1 gap-5">
              <View className="self-start flex-row items-center gap-2 bg-brand-tint px-3 py-1.5 rounded-full">
                <View className="w-1.5 h-1.5 rounded-full bg-brand" />
                <Text className="font-semibold text-xs uppercase text-ink-tertiary" style={{ letterSpacing: 2 }}>
                  Live demo · sample data
                </Text>
              </View>
              <Text
                className="font-semibold text-ink"
                style={{
                  fontSize: heroSize,
                  lineHeight: heroSize * 1.1,
                  letterSpacing: twoCol ? -1 : -0.5,
                }}
              >
                Your books, but they talk back.
              </Text>
              <Text className="text-slate-600" style={{ fontSize: 17, lineHeight: 26, maxWidth: 520 }}>
                Ask anything about a Tally-connected business — receivables, GST, cash, margins. Riko answers in seconds, in plain English. Try it below before you sign up.
              </Text>
              <View className="flex-row gap-3 mt-2 flex-wrap">
                <Pressable
                  onPress={() => router.push("/onboarding/role")}
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
