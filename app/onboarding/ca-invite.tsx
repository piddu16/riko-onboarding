import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { ArrowRight, Check, Mail } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding, nameFromEmail } from "@/lib/onboarding-store";

function isValidEmail(s: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.trim());
}

export default function CaInvite() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Invite first client", ["Tell us about you", "Sign up"], "ca");

  const [clientName, setClientName] = useState(state.firstClient?.name ?? "");
  const [clientEmail, setClientEmail] = useState(state.firstClient?.email ?? "");
  const [sent, setSent] = useState(false);

  const canSend = clientName.trim().length > 1 && isValidEmail(clientEmail);
  const caName = nameFromEmail(state.email);

  function send() {
    if (!canSend) return;
    update({ firstClient: { name: clientName.trim(), email: clientEmail.trim() } });
    setSent(true);
    setTimeout(() => router.push("/onboarding/welcome"), 900);
  }

  return (
    <View className="flex-1 bg-surface">
      <Nav
        rightSlot={
          <View className="flex-row items-center gap-2">
            <View className="w-9 h-9 rounded-full bg-brand-tint items-center justify-center">
              <Text className="text-xs font-semibold text-ink-tertiary">
                {caName.slice(0, 2).toUpperCase()}
              </Text>
            </View>
            {!compact && <Text className="text-sm text-slate-700 font-medium">{caName}</Text>}
          </View>
        }
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView contentContainerClassName="pb-24" keyboardShouldPersistTaps="handled">
          <View className="w-full self-center px-5" style={{ maxWidth: 640, paddingTop: compact ? 24 : 56 }}>
            <ProgressDots steps={steps} />

            <Text
              className="font-semibold text-ink mb-3"
              style={{ fontSize: compact ? 28 : 36, lineHeight: compact ? 34 : 42, letterSpacing: -0.5 }}
            >
              Add your first client.
            </Text>
            <Text className="text-slate-600 mb-7" style={{ fontSize: 16, lineHeight: 24, maxWidth: 560 }}>
              Riko emails them a one-tap setup link. Takes the owner five minutes. You'll see their books the moment they pair.
            </Text>

            <Text className="text-xs font-semibold uppercase text-ink-tertiary mb-2" style={{ letterSpacing: 1.5 }}>
              Client / business name
            </Text>
            <TextInput
              value={clientName}
              onChangeText={setClientName}
              placeholder="Patel Textiles"
              placeholderTextColor="#94A3B8"
              editable={!sent}
              className="px-4 border border-slate-300 rounded-xl bg-surface text-base text-ink"
              style={{ fontFamily: "Inter_400Regular", height: 48 }}
            />

            <Text className="text-xs font-semibold uppercase text-ink-tertiary mt-5 mb-2" style={{ letterSpacing: 1.5 }}>
              Owner's email
            </Text>
            <View className="relative">
              <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                <Mail size={18} color="#94A3B8" strokeWidth={2} />
              </View>
              <TextInput
                value={clientEmail}
                onChangeText={setClientEmail}
                placeholder="owner@patel-textiles.in"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!sent}
                className="pl-12 pr-4 border border-slate-300 rounded-xl bg-surface text-base text-ink"
                style={{ fontFamily: "Inter_400Regular", height: 48 }}
              />
            </View>

            <View
              className="mt-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
              style={{ maxWidth: 420 }}
            >
              <Text className="text-[11px] font-semibold uppercase text-ink-tertiary mb-1" style={{ letterSpacing: 1.2 }}>
                Preview: the email {clientName || "your client"} will get
              </Text>
              <Text className="text-sm font-semibold text-ink mb-1">
                {caName} invited you to set up Riko
              </Text>
              <Text className="text-sm text-slate-600" style={{ lineHeight: 20 }}>
                Hi, your CA ({caName}) invited you to set up Riko — an AI assistant that reads your Tally books. Takes 5 minutes, read-only:{" "}
                <Text className="underline text-ink-tertiary font-medium">riko.in/i/abc123</Text>
              </Text>
            </View>

            <Pressable
              onPress={send}
              disabled={!canSend || sent}
              className={`flex-row items-center justify-center gap-2 rounded-full mt-5 ${
                canSend && !sent ? "bg-ink" : "bg-slate-200"
              }`}
              style={{ height: 52 }}
            >
              {sent && <Check size={14} color="#ffffff" strokeWidth={2.5} />}
              <Text className={`text-sm font-semibold ${canSend && !sent ? "text-white" : "text-slate-500"}`}>
                {sent ? "Invite sent" : "Send invite"}
              </Text>
              {!sent && canSend && <ArrowRight size={16} color="#ffffff" strokeWidth={2.25} />}
            </Pressable>

            <Pressable className="mt-3 self-start" onPress={() => router.push("/onboarding/welcome")}>
              <Text className="text-sm text-slate-500 underline">I'll add my first client later</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
