import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding } from "@/lib/onboarding-store";

const RANGES = ["Under 10", "10–50", "50–200", "200+"];

export default function CaClients() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Tell us about you", [], state.role);
  const canContinue = !!state.caClients;

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 720, paddingTop: compact ? 24 : 56 }}>
          <ProgressDots steps={steps} />

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: compact ? 30 : 40, lineHeight: compact ? 36 : 46, letterSpacing: -0.5 }}
          >
            How many clients do you serve in Tally?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 17, lineHeight: 26, maxWidth: 560 }}>
            Roughly — rounded to the nearest bracket. This is how Riko sizes your cross-client views.
          </Text>

          <View className="gap-2.5">
            {RANGES.map((item) => {
              const active = state.caClients === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => update({ caClients: item })}
                  className={`flex-row items-center justify-between rounded-2xl p-5 border ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <Text className={`text-lg font-semibold ${active ? "text-ink-tertiary" : "text-ink"}`} style={{ fontVariant: ["tabular-nums"] }}>
                    {item}
                  </Text>
                  <View className={`w-5 h-5 rounded-full ${active ? "bg-brand" : "border-2 border-slate-300"}`} />
                </Pressable>
              );
            })}
          </View>

          <View className="mt-8 items-start">
            <Pressable
              onPress={() => router.push("/onboarding/ca-practice")}
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
