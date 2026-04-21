import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, Send } from "lucide-react-native";
import { ANSWERS, SUGGESTED, matchKey, type Answer, type AnswerKey } from "@/lib/answers";

type Msg =
  | { kind: "user"; text: string; id: string }
  | { kind: "typing"; id: string }
  | { kind: "ai"; answer: Answer; id: string }
  | { kind: "ai-fallback"; id: string };

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function InteractiveDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const didAutoRun = useRef(false);

  useEffect(() => {
    if (didAutoRun.current) return;
    didAutoRun.current = true;
    const t = setTimeout(() => askKey("overdue"), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToEnd() {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }

  function pushUserAndTyping(text: string) {
    setMsgs((m) => [
      ...m,
      { kind: "user", text, id: uid() },
      { kind: "typing", id: uid() },
    ]);
    scrollToEnd();
  }

  function replaceTyping(next: Msg) {
    setMsgs((m) => [...m.filter((x) => x.kind !== "typing"), next]);
    scrollToEnd();
  }

  function askKey(key: AnswerKey, customText?: string) {
    const ans = ANSWERS[key];
    pushUserAndTyping(customText ?? ans.question);
    setTimeout(() => replaceTyping({ kind: "ai", answer: ans, id: uid() }), 700);
  }

  function askFree(text: string) {
    pushUserAndTyping(text);
    const k = matchKey(text);
    setTimeout(() => {
      if (k) replaceTyping({ kind: "ai", answer: ANSWERS[k], id: uid() });
      else replaceTyping({ kind: "ai-fallback", id: uid() });
    }, 700);
  }

  function submit() {
    const v = input.trim();
    if (!v) return;
    askFree(v);
    setInput("");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <View
        className="bg-surface border border-slate-200 rounded-2xl p-4 flex-1"
        style={{
          minHeight: 520,
          shadowColor: "#10B981",
          shadowOffset: { width: 0, height: 30 },
          shadowOpacity: 0.18,
          shadowRadius: 40,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-brand" />
            <Text className="text-sm font-semibold text-ink">Riko · Patel Textiles (sample)</Text>
          </View>
          <Text className="text-xs text-slate-500">Synced 2 min ago</Text>
        </View>

        <ScrollView
          ref={scrollRef}
          className="flex-1"
          style={{ maxHeight: 380 }}
          contentContainerClassName="gap-3"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {msgs.map((m) => {
            if (m.kind === "user") {
              return (
                <View
                  key={m.id}
                  className="self-end bg-brand px-4 py-2.5 rounded-2xl rounded-br-sm"
                  style={{ maxWidth: "78%" }}
                >
                  <Text className="text-sm text-white font-medium">{m.text}</Text>
                </View>
              );
            }
            if (m.kind === "typing") {
              return (
                <View key={m.id} className="self-start" style={{ maxWidth: "92%" }}>
                  <Text className="text-[11px] text-slate-500 mb-1 pl-1 font-medium">Riko</Text>
                  <View className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <View className="flex-row gap-1 items-center">
                      <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </View>
                  </View>
                </View>
              );
            }
            if (m.kind === "ai") {
              return (
                <View key={m.id} className="self-start" style={{ maxWidth: "92%" }}>
                  <Text className="text-[11px] text-slate-500 mb-1 pl-1 font-medium">Riko · from your Tally</Text>
                  <View className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <Text className="text-sm text-ink" style={{ lineHeight: 20 }}>{m.answer.lead}</Text>
                    <View className="mt-3">
                      {m.answer.rows.map((r, i) => (
                        <View
                          key={i}
                          className={`flex-row justify-between py-2 ${
                            i < m.answer.rows.length - 1 ? "border-b border-slate-200" : ""
                          }`}
                        >
                          <Text className="text-[13px] text-slate-700">{r.label}</Text>
                          <Text className="text-[13px] font-semibold text-ink" style={{ fontVariant: ["tabular-nums"] }}>
                            {r.value}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <Text className="mt-3 text-[13px] font-medium text-ink-tertiary">{m.answer.followup}</Text>
                  </View>
                </View>
              );
            }
            return (
              <View key={m.id} className="self-start" style={{ maxWidth: "92%" }}>
                <Text className="text-[11px] text-slate-500 mb-1 pl-1 font-medium">Riko</Text>
                <View className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <Text className="text-sm text-ink" style={{ lineHeight: 20 }}>
                    I'd answer this from your real Tally data once connected. For the demo, try one of the sample questions below — or sign up to ask this against your own books.
                  </Text>
                  <Pressable
                    onPress={() => router.push("/onboarding/role")}
                    className="self-start mt-3 flex-row items-center gap-1.5 bg-ink px-4 py-2.5 rounded-full"
                  >
                    <Text className="text-xs font-semibold text-white">Connect my Tally</Text>
                    <ArrowRight size={12} color="#ffffff" strokeWidth={2.5} />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className="flex-row flex-wrap gap-1.5 mt-3">
          {SUGGESTED.map((s) => (
            <Pressable
              key={s.key}
              onPress={() => askKey(s.key)}
              className="border border-slate-300 rounded-full px-4 py-2 bg-surface"
            >
              <Text className="text-xs text-slate-600 font-medium">{s.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row gap-2 mt-3 pt-3 border-t border-slate-100 items-center">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask Riko about your books…"
            placeholderTextColor="#94A3B8"
            className="flex-1 px-4 border border-slate-300 rounded-lg bg-surface text-sm text-ink"
            onSubmitEditing={submit}
            returnKeyType="send"
            style={{ fontFamily: "Inter_400Regular", height: 44 }}
          />
          <Pressable
            onPress={submit}
            className="flex-row items-center gap-1.5 px-5 bg-brand rounded-lg justify-center"
            style={{ height: 44 }}
          >
            <Text className="text-sm font-semibold text-white">Ask</Text>
            <Send size={14} color="#ffffff" strokeWidth={2.25} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
