import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, Check } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding, type Intent } from "@/lib/onboarding-store";
import { INTENT_LABEL } from "@/lib/onboarding-content";

const INTENT_KEYS: Intent[] = ["receivables", "cash", "gst", "mis", "margin", "payables"];

export default function IntentsScreen() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const steps = makeSteps("Tell us about you");
  const canContinue = state.intents.length >= 1;

  function toggle(key: Intent) {
    const has = state.intents.includes(key);
    const next = has ? state.intents.filter((i) => i !== key) : [...state.intents, key];
    update({ intents: next });
  }

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 760, paddingTop: compact ? 24 : 56 }}>
          <ProgressDots steps={steps} />

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: compact ? 30 : 40, lineHeight: compact ? 36 : 46, letterSpacing: -0.5 }}
          >
            What's keeping you up at night?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 17, lineHeight: 26, maxWidth: 560 }}>
            Pick all that apply. We'll pre-build your Riko home around these.
          </Text>

          <View className="gap-2.5">
            {INTENT_KEYS.map((key) => {
              const active = state.intents.includes(key);
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
                  <Text className="flex-1 text-base font-medium text-ink">{INTENT_LABEL[key]}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-xs text-slate-500 mt-4">
            {state.intents.length} of {INTENT_KEYS.length} selected · at least 1 required
          </Text>

          <View className="mt-8 items-start">
            <Pressable
              onPress={() => router.push("/onboarding/business")}
              disabled={!canContinue}
              className={`flex-row items-center gap-2 rounded-full px-6 py-3.5 ${
                canContinue ? "bg-ink" : "bg-slate-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${canContinue ? "text-white" : "text-slate-500"}`}
              >
                Continue
              </Text>
              <ArrowRight
                size={16}
                color={canContinue ? "#ffffff" : "#94A3B8"}
                strokeWidth={2.25}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
