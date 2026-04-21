import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ANSWERS } from "@/lib/answers";

const FIRST_THREE: Array<keyof typeof ANSWERS> = ["overdue", "cash", "gst"];

const FOUNDER_NOTE =
  "Hi, I'm Harsh. I co-founded Riko because I was tired of asking my CA \u201Cwhat's my cash\u201D three times a week. This is the moment we built it for. Reply here if anything looks wrong — I read every one.";

export default function Welcome() {
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const heroSize = compact ? 30 : width < 880 ? 40 : 48;

  return (
    <View className="flex-1 bg-surface">
      <Nav
        rightSlot={
          <View className="flex-row items-center gap-2">
            <View className="w-9 h-9 rounded-full bg-brand-tint items-center justify-center">
              <Text className="text-xs font-semibold text-ink-tertiary">HS</Text>
            </View>
            {!compact && <Text className="text-sm text-slate-700 font-medium">Harsh</Text>}
          </View>
        }
      />
      <ScrollView contentContainerClassName="pb-16">
        <View className="w-full self-center px-5" style={{ maxWidth: 760, paddingTop: compact ? 24 : 56 }}>
          <View className="self-start flex-row items-center gap-2 bg-brand-tint px-3 py-1.5 rounded-full mb-4">
            <View className="w-2 h-2 rounded-full bg-brand" />
            <Text className="font-semibold text-xs uppercase text-ink-tertiary" style={{ letterSpacing: 2 }}>
              Your real data is live
            </Text>
          </View>

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: heroSize, lineHeight: heroSize * 1.15, letterSpacing: -0.5 }}
          >
            Welcome to Riko, Harsh.
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 17, lineHeight: 26, maxWidth: 580 }}>
            Your Tally just synced. 3 companies, 14,237 invoices, 4.2 years of history. Ask anything.
          </Text>

          <View
            className="bg-brand-tint rounded-2xl border border-brand/20 p-5 mb-10"
            style={{
              shadowColor: "#10B981",
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.1,
              shadowRadius: 30,
              elevation: 4,
            }}
          >
            <View className="flex-row items-start gap-4">
              <View
                className="w-12 h-12 rounded-full bg-brand items-center justify-center"
                style={{ flexShrink: 0 }}
              >
                <Text className="text-white font-semibold text-base">HM</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-semibold uppercase text-ink-tertiary mb-2" style={{ letterSpacing: 1.5 }}>
                  A note from the founder
                </Text>
                <Text className="text-base text-ink mb-3" style={{ lineHeight: 25 }}>
                  {FOUNDER_NOTE}
                </Text>
                <Text
                  className="text-base text-ink"
                  style={{ fontFamily: "Inter_600SemiBold", letterSpacing: 0.5 }}
                >
                  — Harsh, Co-founder
                </Text>
                <Text className="text-xs text-slate-500 mt-1">
                  reply@rikoai.in · reads every message
                </Text>
              </View>
            </View>
          </View>

          <Text className="font-semibold text-ink mb-1" style={{ fontSize: 22, letterSpacing: -0.3 }}>
            Your first three answers — now on real data.
          </Text>
          <Text className="text-slate-600 mb-5" style={{ fontSize: 15, lineHeight: 23 }}>
            We ran these the moment your sync completed. Everything below is your actual books.
          </Text>

          <View className="gap-4">
            {FIRST_THREE.map((key) => {
              const a = ANSWERS[key];
              return (
                <View
                  key={a.key}
                  className="bg-surface border border-slate-200 rounded-2xl p-5"
                  style={{
                    shadowColor: "#0B1F12",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.03,
                    shadowRadius: 3,
                    elevation: 1,
                  }}
                >
                  <View className="flex-row items-center gap-2 mb-3">
                    <View className="w-2 h-2 rounded-full bg-brand" />
                    <Text className="text-xs font-semibold uppercase text-ink-tertiary" style={{ letterSpacing: 1.5 }}>
                      From your Tally · live
                    </Text>
                  </View>
                  <Text className="text-base font-semibold text-ink mb-2" style={{ lineHeight: 22 }}>
                    {a.question}
                  </Text>
                  <Text className="text-sm text-slate-700 mb-3" style={{ lineHeight: 22 }}>
                    {a.lead}
                  </Text>
                  <View className="bg-slate-50 rounded-xl px-4 py-2">
                    {a.rows.map((r, i) => (
                      <View
                        key={i}
                        className={`flex-row justify-between py-2.5 ${
                          i < a.rows.length - 1 ? "border-b border-slate-200" : ""
                        }`}
                      >
                        <Text className="text-sm text-slate-700">{r.label}</Text>
                        <Text className="text-sm font-semibold text-ink" style={{ fontVariant: ["tabular-nums"] }}>
                          {r.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text className="text-sm font-medium text-ink-tertiary mt-3" style={{ lineHeight: 21 }}>
                    {a.followup}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="items-center mt-10">
            <Pressable className="flex-row items-center gap-2 bg-ink rounded-full px-6 py-3.5">
              <Text className="text-sm font-semibold text-white">Go to my dashboard</Text>
              <ArrowRight size={16} color="#ffffff" strokeWidth={2.25} />
            </Pressable>
            <Text className="text-xs text-slate-500 mt-3 text-center" style={{ maxWidth: 420 }}>
              Your Riko learns from every question. Ask five in the next 24 hours — that's how it gets useful.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
