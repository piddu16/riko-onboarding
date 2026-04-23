import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, Check } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding, type CaIntent } from "@/lib/onboarding-store";
import { CA_INTENT_LABEL } from "@/lib/ca-content";

const KEYS: CaIntent[] = [
  "client_chase",
  "gst_across",
  "mis_lender",
  "multi_recon",
  "client_staff",
  "scale",
];

export default function CaIntents() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Tell us about you", [], state.role);
  const canContinue = state.caIntents.length >= 1;

  function toggle(key: CaIntent) {
    const has = state.caIntents.includes(key);
    const next = has ? state.caIntents.filter((i) => i !== key) : [...state.caIntents, key];
    update({ caIntents: next });
  }

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
            What slows your practice down?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 16, lineHeight: 24, maxWidth: 560 }}>
            Pick everything that matters. We'll design Riko around these — not the other way around.
          </Text>

          <View className="gap-2.5">
            {KEYS.map((key) => {
              const active = state.caIntents.includes(key);
              return (
                <Pressable
                  key={key}
                  onPress={() => toggle(key)}
                  className={`flex-row items-center gap-3 rounded-xl p-4 border ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <View
                    className={`w-6 h-6 rounded-md items-center justify-center ${
                      active ? "bg-brand" : "border-2 border-slate-300"
                    }`}
                  >
                    {active && <Check size={14} color="#ffffff" strokeWidth={3} />}
                  </View>
                  <Text className="flex-1 text-base font-medium text-ink">{CA_INTENT_LABEL[key]}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-xs text-slate-500 mt-4">
            {state.caIntents.length} of {KEYS.length} selected · at least 1 required
          </Text>

          <View className="mt-8 items-start">
            <Pressable
              onPress={() => router.push("/onboarding/ca-stat")}
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
