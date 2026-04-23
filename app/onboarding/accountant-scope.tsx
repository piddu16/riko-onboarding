import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding } from "@/lib/onboarding-store";

const SCOPES = ["1 business", "2–5 businesses", "5+ businesses"];

export default function AccountantScope() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Tell us about you", [], state.role);

  const canContinue = !!state.accountantScope && !!state.accountantEmployer;

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
            Tell us about the books you handle.
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 16, lineHeight: 24, maxWidth: 520 }}>
            This helps Riko set the right cadence for reminders, reconciliation, and month-end.
          </Text>

          <Text className="text-sm font-semibold uppercase text-ink-tertiary mb-3" style={{ letterSpacing: 1.5 }}>
            How many businesses do you handle?
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-8">
            {SCOPES.map((item) => {
              const active = state.accountantScope === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => update({ accountantScope: item })}
                  className={`flex-1 min-w-[140px] rounded-xl border py-3.5 items-center ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <Text className={`text-sm font-semibold ${active ? "text-ink-tertiary" : "text-slate-700"}`}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-sm font-semibold uppercase text-ink-tertiary mb-3" style={{ letterSpacing: 1.5 }}>
            Are you in-house or external?
          </Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => update({ accountantEmployer: "in_house" })}
              className={`flex-1 rounded-xl border py-3.5 items-center ${
                state.accountantEmployer === "in_house" ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
              }`}
            >
              <Text className={`text-sm font-semibold ${state.accountantEmployer === "in_house" ? "text-ink-tertiary" : "text-slate-700"}`}>
                In-house
              </Text>
              <Text className="text-xs text-slate-500 mt-1">Full-time with one business</Text>
            </Pressable>
            <Pressable
              onPress={() => update({ accountantEmployer: "external" })}
              className={`flex-1 rounded-xl border py-3.5 items-center ${
                state.accountantEmployer === "external" ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
              }`}
            >
              <Text className={`text-sm font-semibold ${state.accountantEmployer === "external" ? "text-ink-tertiary" : "text-slate-700"}`}>
                External / consulting
              </Text>
              <Text className="text-xs text-slate-500 mt-1">Retained across multiple owners</Text>
            </Pressable>
          </View>

          <View className="mt-10 items-start">
            <Pressable
              onPress={() => router.push("/onboarding/accountant-intents")}
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
