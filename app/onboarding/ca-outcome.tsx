import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, Calendar, FileText, Inbox, MessageSquare, Sparkles, Users } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { useOnboarding, topCaIntent, type CaIntent } from "@/lib/onboarding-store";
import { CA_BENEFIT, CA_HERO_BY_INTENT } from "@/lib/ca-content";

const ICONS: Record<CaIntent, typeof Users> = {
  client_chase: MessageSquare,
  gst_across: Calendar,
  mis_lender: FileText,
  multi_recon: Sparkles,
  client_staff: Inbox,
  scale: Users,
};

export default function CaOutcome() {
  const { state } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const heroSize = compact ? 34 : width < 880 ? 44 : 56;

  const fallback: CaIntent[] = ["client_chase", "gst_across", "mis_lender"];
  const picked = state.caIntents.length > 0 ? state.caIntents : fallback;
  const shown = picked.slice(0, 3);
  const lead = topCaIntent(picked) ?? "client_chase";
  const hero = CA_HERO_BY_INTENT[lead];

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 760, paddingTop: compact ? 24 : 56 }}>
          <View className="self-start flex-row items-center gap-2 bg-brand-tint px-3 py-1.5 rounded-full mb-5">
            <View className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Text className="font-semibold text-xs uppercase text-ink-tertiary" style={{ letterSpacing: 2 }}>
              Based on 380 CA practices on Riko
            </Text>
          </View>

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: heroSize, lineHeight: heroSize * 1.12, letterSpacing: -0.75 }}
          >
            CAs on Riko unlock{" "}
            <Text className="text-brand" style={{ fontFamily: "Inter_700Bold" }}>
              {hero.number}
            </Text>{" "}
            {hero.clause}.
          </Text>
          <Text className="text-slate-600 mb-10" style={{ fontSize: 17, lineHeight: 26, maxWidth: 560 }}>
            Not a projection. Median result across CA firms running 10–200 client books on Tally Prime.
          </Text>

          <View className="gap-3 mb-10">
            {shown.map((key) => {
              const Icon = ICONS[key];
              const b = CA_BENEFIT[key];
              return (
                <View
                  key={key}
                  className="flex-row items-start gap-4 bg-surface border border-slate-200 rounded-2xl p-5"
                >
                  <View className="w-11 h-11 rounded-xl bg-brand-tint items-center justify-center">
                    <Icon size={20} color="#16A34A" strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-ink mb-1.5">{b.title}</Text>
                    <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
                      {b.body}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="items-start">
            <Pressable
              onPress={() => router.push("/onboarding/ca-commit")}
              className="flex-row items-center gap-2 bg-ink rounded-full px-6 py-3.5"
            >
              <Text className="text-sm font-semibold text-white">Show me my Riko</Text>
              <ArrowRight size={16} color="#ffffff" strokeWidth={2.25} />
            </Pressable>
            <Text className="text-xs text-slate-500 mt-3">
              Two more steps. We'll email you a magic link — no password to remember.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
