import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string; time: string };

const QUICK_REPLIES = [
  "What services do you offer?",
  "Tell me about your projects",
  "What's your tech stack?",
  "I need a website built",
  "How can I contact Fahisa?",
];

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! 👋 I'm Fahisa's AI assistant. Whether you're a recruiter or a potential client — I'm here to help! Ask me about her skills, projects, or services.",
          time: getTime(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || isTyping) return;

    setShowQuickReplies(false);
    const userMsg: Msg = { role: "user", content: userText, time: getTime() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);

    try {
      const apiMessages = nextMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));
      // Remove the welcome assistant message from API context if it's first
      const trimmed =
        apiMessages[0]?.role === "assistant" ? apiMessages.slice(1) : apiMessages;

      const { data, error } = await supabase.functions.invoke("chat-assistant", {
        body: { messages: trimmed },
      });

      if (error) throw error;
      const reply =
        (data as { reply?: string; error?: string })?.reply ||
        "I'm having trouble connecting. Please reach Fahisa directly at getfahisa@gmail.com";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, time: getTime() },
      ]);
    } catch (e) {
      console.error("chat error:", e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! Something went wrong. Please contact Fahisa directly at getfahisa@gmail.com 📧",
          time: getTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  };

  return (
    <>
      {/* Floating label */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            background: "#1a1a2e",
            color: "#e0c97f",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: 20,
            zIndex: 99998,
            pointerEvents: "none",
            letterSpacing: "0.3px",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          Chat with Fahisa's AI 💬
        </div>
      )}

      {/* Toggle button */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "none",
          cursor: "pointer",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#e0c97f">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#e0c97f">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            width: 370,
            maxWidth: "calc(100vw - 20px)",
            height: 540,
            maxHeight: "calc(100vh - 130px)",
            background: "#ffffff",
            borderRadius: 20,
            zIndex: 99997,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.1)",
            fontFamily: "'DM Sans', sans-serif",
            border: "1px solid rgba(0,0,0,0.08)",
            animation: "fahisaSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <style>{`
            @keyframes fahisaSlideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes fahisaBounce { 0%,60%,100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-5px); opacity: 1; } }
            .fahisa-typing span { width:6px; height:6px; background:#c0a84c; border-radius:50%; display:inline-block; margin:0 2px; animation: fahisaBounce 1.2s infinite; }
            .fahisa-typing span:nth-child(2){ animation-delay:.2s; }
            .fahisa-typing span:nth-child(3){ animation-delay:.4s; }
            .fahisa-msgs::-webkit-scrollbar { width: 4px; }
            .fahisa-msgs::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
            .fahisa-qr-btn:hover { background:#1a1a2e !important; color:#e0c97f !important; border-color:#1a1a2e !important; }
          `}</style>

          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e0c97f, #c9a84c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#1a1a2e",
              }}
            >
              FP
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Fahisa's Assistant
              </h3>
              <p style={{ fontSize: 11, color: "#e0c97f", margin: "2px 0 0", fontWeight: 400 }}>
                AI-Powered Portfolio Bot
              </p>
            </div>
            <div
              style={{
                width: 7,
                height: 7,
                background: "#4ade80",
                borderRadius: "50%",
                marginLeft: "auto",
                boxShadow: "0 0 6px rgba(74,222,128,0.6)",
              }}
            />
          </div>

          {/* Messages */}
          <div
            className="fahisa-msgs"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "#f8f9fc",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "85%",
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 16,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    wordWrap: "break-word",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
                        : "#ffffff",
                    color: m.role === "user" ? "#fff" : "#1a1a2e",
                    borderBottomLeftRadius: m.role === "user" ? 16 : 4,
                    borderBottomRightRadius: m.role === "user" ? 4 : 16,
                    border: m.role === "user" ? "none" : "1px solid rgba(0,0,0,0.07)",
                    boxShadow: m.role === "user" ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#aaa",
                    marginTop: 4,
                    padding: "0 4px",
                    textAlign: m.role === "user" ? "right" : "left",
                  }}
                >
                  {m.time}
                </div>
              </div>
            ))}

            {showQuickReplies && messages.length === 1 && !isTyping && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    className="fahisa-qr-btn"
                    onClick={() => sendMessage(q)}
                    style={{
                      background: "#fff",
                      border: "1px solid #e0c97f",
                      color: "#1a1a2e",
                      padding: "5px 12px",
                      borderRadius: 20,
                      fontSize: 11.5,
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "12px 14px",
                  background: "#fff",
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                  border: "1px solid rgba(0,0,0,0.07)",
                  width: "fit-content",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
                className="fahisa-typing"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              background: "#fff",
              borderTop: "1px solid rgba(0,0,0,0.07)",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              style={{
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: 22,
                padding: "9px 16px",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                resize: "none",
                maxHeight: 80,
                lineHeight: 1.5,
                color: "#1a1a2e",
                background: "#f8f9fc",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                border: "none",
                cursor: isTyping || !input.trim() ? "not-allowed" : "pointer",
                opacity: isTyping || !input.trim() ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#e0c97f">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: 6,
              fontSize: 10,
              color: "#ccc",
              background: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Powered by Claude AI · Fahisa Pallikkattil
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
