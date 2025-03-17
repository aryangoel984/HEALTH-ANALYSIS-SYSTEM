"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Ayurvedic health assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();
      console.log("API Response:", data); // Debugging Step

      const assistantMessage = data.reply?.trim() ? data.reply : "I'm sorry, I couldn't process your request. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: assistantMessage,
          role: "assistant",
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderedMessages = useMemo(() =>
    messages.map((message) => (
      <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={message.role === "assistant" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4N_soUiGggkq4TxayU7O_echs7FO8ISMD5w&s" : "https://www.svgrepo.com/download/192244/man-user.svg"} alt={message.role} />
            <AvatarFallback>{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
          </Avatar>
          <div className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <p>{message.content}</p>
            <p className="text-xs opacity-70 mt-1">
              {new Date(message.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
            </p>
          </div>
        </div>
      </div>
    )),
    [messages]
  );

  return (
    <div className="flex justify-center">
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>AI Health Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col" aria-live="polite">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">{renderedMessages}</div>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4N_soUiGggkq4TxayU7O_echs7FO8ISMD5w&s" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <p className="animate-pulse">AI is typing...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
              <Input placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} className="flex-1" />
              <Button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
                {isLoading ? <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
    </div>
  );
}
