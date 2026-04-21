import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
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
    <View className="bg-surface border border-border rounded-2xl p-4 min-h-[460px] flex-1">
      <View className="flex-row items-center justify-between pb-3 border-b border-border mb-3">
        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-green" />
          <Text className="text-[13px] font-medium text-ink">Riko · Patel Textiles (sample)</Text>
        </View>
        <Text className="text-[11px] text-ink-tertiary">Synced 2 min ago</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1 max-h-[380px]"
        contentContainerClassName="gap-3"
        showsVerticalScrollIndicator={false}
      >
        {msgs.map((m) => {
          if (m.kind === "user") {
            return (
              <View
                key={m.id}
                className="self-end bg-surface-alt px-3.5 py-2.5 rounded-2xl rounded-br-sm max-w-[75%]"
              >
                <Text className="text-sm text-ink">{m.text}</Text>
              </View>
            );
          }
          if (m.kind === "typing") {
            return (
              <View key={m.id} className="self-start max-w-[92%]">
                <Text className="text-[11px] text-ink-tertiary mb-1.5 pl-1">Riko</Text>
                <View className="bg-green-light px-3.5 py-3 rounded-2xl rounded-tl-sm">
                  <View className="flex-row gap-1 items-center">
                    <View className="w-1.5 h-1.5 rounded-full bg-green opacity-40" />
                    <View className="w-1.5 h-1.5 rounded-full bg-green opacity-70" />
                    <View className="w-1.5 h-1.5 rounded-full bg-green" />
                  </View>
                </View>
              </View>
            );
          }
          if (m.kind === "ai") {
            return (
              <View key={m.id} className="self-start max-w-[92%]">
                <Text className="text-[11px] text-ink-tertiary mb-1.5 pl-1">Riko · from your Tally</Text>
                <View className="bg-green-light px-3.5 py-3 rounded-2xl rounded-tl-sm">
                  <Text className="text-sm text-green-darkest leading-5">{m.answer.lead}</Text>
                  <View className="mt-2.5">
                    {m.answer.rows.map((r, i) => (
                      <View
                        key={i}
                        className={`flex-row justify-between py-1.5 ${
                          i < m.answer.rows.length - 1 ? "border-b border-green/10" : ""
                        }`}
                      >
                        <Text className="text-[13px] text-green-darkest">{r.label}</Text>
                        <Text className="text-[13px] font-medium text-green-darkest">{r.value}</Text>
                      </View>
                    ))}
                  </View>
                  <Text className="mt-2.5 text-[13px] text-green-dark">{m.answer.followup}</Text>
                </View>
              </View>
            );
          }
          return (
            <View key={m.id} className="self-start max-w-[92%]">
              <Text className="text-[11px] text-ink-tertiary mb-1.5 pl-1">Riko</Text>
              <View className="bg-green-light px-3.5 py-3 rounded-2xl rounded-tl-sm">
                <Text className="text-sm text-green-darkest leading-5">
                  I'd answer this from your real Tally data once connected. For the demo, try one of the sample questions below — or sign up to ask this against your own books.
                </Text>
                <Pressable
                  onPress={() => router.push("/onboarding/connect-tally")}
                  className="self-start mt-2.5 bg-green-dark px-3.5 py-2 rounded-md"
                >
                  <Text className="text-xs font-medium text-white">Connect my Tally →</Text>
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
            className="border border-border rounded-full px-3 py-1.5 active:bg-surface-alt"
          >
            <Text className="text-xs text-ink-secondary">{s.label}</Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row gap-2 mt-3 pt-3 border-t border-border">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask in English or Hindi..."
          placeholderTextColor="#888780"
          className="flex-1 h-[38px] px-3 border border-border rounded-lg bg-surface text-sm text-ink"
          onSubmitEditing={submit}
          returnKeyType="send"
        />
        <Pressable onPress={submit} className="h-[38px] px-4 bg-green rounded-lg justify-center">
          <Text className="text-[13px] font-medium text-white">Ask</Text>
        </Pressable>
      </View>
    </View>
  );
}
