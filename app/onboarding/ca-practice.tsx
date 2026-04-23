import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding } from "@/lib/onboarding-store";

const PRACTICES = [
  { key: "solo", label: "Solo practice", note: "Just me, maybe a part-time junior." },
  { key: "small", label: "Small firm (2–10)", note: "A lean team, partners plus a few seniors." },
  { key: "mid", label: "Mid-size firm (10–50)", note: "Multiple partners, departments, a managing partner." },
  { key: "large", label: "Large firm (50+)", note: "Full audit + advisory + tax verticals." },
];

export default function CaPractice() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Tell us about you", [], state.role);
  const canContinue = !!state.caPractice;

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 760, paddingTop: compact ? 24 : 56 }}>
          <ProgressDots steps={steps} />

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: compact ? 28 : 36, lineHeight: compact ? 34 : 42, letterSpacing: -0.5 }}
          >
            What kind of practice do you run?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 16, lineHeight: 24, maxWidth: 560 }}>
            We tune reminders, inbox routing, and billing around how your team actually works.
          </Text>

          <View className="gap-2.5">
            {PRACTICES.map(({ key, label, note }) => {
              const active = state.caPractice === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => update({ caPractice: key })}
                  className={`flex-row items-start gap-3 rounded-2xl p-4 border ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <View className={`w-5 h-5 rounded-full mt-0.5 ${active ? "bg-brand" : "border-2 border-slate-300"}`} />
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-ink">{label}</Text>
                    <Text className="text-sm text-slate-600 mt-0.5" style={{ lineHeight: 20 }}>
                      {note}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View className="mt-8 items-start">
            <Pressable
              onPress={() => router.push("/onboarding/ca-intents")}
              disabled={!canContinue}
              className={`flex-row items-center gap-2 rounded-full px-6 py-3.5 ${
                canContinue ? "bg-ink" : "bg-slate-200"
              }`}
            >
              <Text className={`text-sm font-semibold ${canContinue ? "text-white" : "text-slate-500"}`}>
                Continue
              </Text>
              <ArrowRight size={16} color={canContinue ? "#ffffff" : "#94A3B8"} strokeWidth={2.25} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
