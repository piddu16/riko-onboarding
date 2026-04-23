import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding } from "@/lib/onboarding-store";

const INDUSTRIES = [
  "Manufacturing",
  "Trading / Distribution",
  "Retail",
  "Services",
  "FMCG",
  "Textiles",
  "Pharma",
  "Other",
];

const SIZES = ["< ₹1 Cr", "₹1–10 Cr", "₹10–100 Cr", "₹100 Cr+"];

export default function BusinessScreen() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const steps = makeSteps("Tell us about you");
  const canContinue = !!state.industry && !!state.size;

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
            Tell us about your business.
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 17, lineHeight: 26, maxWidth: 560 }}>
            Two quick questions. We use these to benchmark your Riko against peers.
          </Text>

          <Text className="text-sm font-semibold uppercase text-ink-tertiary mb-3" style={{ letterSpacing: 1.5 }}>
            What does your business do?
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-8">
            {INDUSTRIES.map((item) => {
              const active = state.industry === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => update({ industry: item })}
                  className={`rounded-full px-4 py-2.5 border ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <Text className={`text-sm font-medium ${active ? "text-ink-tertiary" : "text-slate-700"}`}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-sm font-semibold uppercase text-ink-tertiary mb-3" style={{ letterSpacing: 1.5 }}>
            How large is your business?
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {SIZES.map((item) => {
              const active = state.size === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => update({ size: item })}
                  className={`flex-1 min-w-[120px] rounded-xl border py-3.5 items-center ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${active ? "text-ink-tertiary" : "text-slate-700"}`}
                    style={{ fontVariant: ["tabular-nums"] }}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="mt-10 items-start">
            <Pressable
              onPress={() => router.push("/onboarding/stat")}
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
