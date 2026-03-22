import { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";

const KB = [
  { keywords: ["course", "courses", "available", "offer", "learn", "program"], answer: "We currently offer:\n• Introduction to C Programming\n• Intro to OOP (Java)\n• Introduction to Python\n\nVisit the Courses page for details and pricing." },
  { keywords: ["enroll", "enrollment", "join", "admission", "register", "sign up"], answer: "To enroll:\n1. Create an account\n2. Browse the Courses page\n3. Click 'View Details'\n4. Hit 'Enroll Now'\n\nNeed help? WhatsApp us at +91 82752 24127." },
  { keywords: ["exam", "schedule", "test", "date", "upcoming", "assessment"], answer: "Exam schedules are posted in your Student Dashboard under 'Upcoming' after you enroll." },
  { keywords: ["contact", "phone", "whatsapp", "reach", "call", "number", "touch"], answer: "WhatsApp: +91 82752 24127\nMon–Sat, 9 AM to 6 PM." },
  { keywords: ["fee", "fees", "price", "cost", "payment", "charge"], answer: "Course fees:\n• C Programming – ₹1,499\n• OOP (Java) – ₹1,999\n• Python – ₹1,299\n\nOne-time, no hidden charges." },
  { keywords: ["duration", "long", "weeks", "hours", "time", "commitment"], answer: "Durations:\n• C Programming – 6 weeks\n• OOP (Java) – 8 weeks\n• Python – 6 weeks" },
  { keywords: ["certificate", "certification", "certified"], answer: "Yes! You receive a certificate upon completing the course and passing the final assessment." },
  { keywords: ["batch", "timing", "class", "schedule", "slot"], answer: "Morning and evening batches available. WhatsApp +91 82752 24127 for current slots." },
  { keywords: ["hello", "hi", "hey", "hii"], answer: "Hi there! How can I help you today?" },
  { keywords: ["thank", "thanks", "thankyou", "ty"], answer: "You're welcome! Feel free to ask anything else." },
];

const QUICK_REPLIES = ["What courses?", "How to enroll?", "Exam schedule", "Contact", "Fees"];
const GREETING = { id: 0, from: "bot", text: "Hi! I'm Ajinkya Assistant. How can I help?" };
const STORAGE_KEY = "ajinkya_chat_v3";

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.answer;
  }
  return "I'm not sure about that. WhatsApp us at +91 82752 24127 and we'll help!";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [GREETING]; }
    catch { return [GREETING]; }
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); }, [messages]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { if (open) setUnread(0); }, [open]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: userText }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "bot", text: getBotReply(userText) }]);
      if (!open) setUnread((n) => n + 1);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* Chat window */}
      <div
        style={{
          position: "fixed",
          bottom: "88px",
          right: "20px",
          zIndex: 50,
          width: "340px",
          maxWidth: "calc(100vw - 2rem)",
          height: "480px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "4px",
          background: "var(--slate2)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          transformOrigin: "bottom right",
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
          transform: open ? "scale(1)" : "scale(0.92)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          background: "var(--slate3)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "3px",
              background: "var(--slate4)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FaRobot style={{ color: "var(--terra)", fontSize: "13px" }} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--warm-white)", lineHeight: 1 }}>
                Ajinkya Assistant
              </p>
              <p className="mono" style={{ fontSize: "9px", marginTop: "3px", color: "var(--forest)" }}>● online</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer", fontSize: "14px", padding: "4px" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--warm-white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
              {msg.from === "bot" && (
                <div style={{
                  width: "22px", height: "22px", borderRadius: "3px",
                  background: "var(--slate3)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginRight: "6px", marginTop: "2px", flexShrink: 0,
                }}>
                  <FaRobot style={{ color: "var(--terra)", fontSize: "10px" }} />
                </div>
              )}
              <div style={{
                maxWidth: "75%",
                padding: "8px 12px",
                borderRadius: "3px",
                fontSize: "12px",
                whiteSpace: "pre-line",
                lineHeight: 1.6,
                fontFamily: "var(--sans)",
                ...(msg.from === "user"
                  ? { background: "var(--terra)", color: "var(--warm-white)", borderBottomRightRadius: "1px" }
                  : { background: "var(--slate3)", color: "var(--warm-grey)", border: "1px solid var(--border)", borderBottomLeftRadius: "1px" }
                ),
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "22px", height: "22px", borderRadius: "3px",
                background: "var(--slate3)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <FaRobot style={{ color: "var(--terra)", fontSize: "10px" }} />
              </div>
              <div style={{
                padding: "8px 12px", borderRadius: "3px",
                background: "var(--slate3)", border: "1px solid var(--border)",
                display: "flex", gap: "4px", alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "var(--terra)", display: "inline-block",
                    animation: "bounce 1s infinite",
                    animationDelay: `${i * 0.15}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div style={{
          padding: "8px 12px",
          display: "flex",
          gap: "6px",
          overflowX: "auto",
          flexShrink: 0,
          borderTop: "1px solid var(--border)",
        }}>
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="mono"
              style={{
                flexShrink: 0,
                fontSize: "10px",
                padding: "4px 10px",
                borderRadius: "2px",
                border: "1px solid var(--border)",
                color: "var(--warm-grey)",
                background: "var(--slate3)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--terra)"; e.currentTarget.style.color = "var(--terra)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--warm-grey)"; }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: "10px 12px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexShrink: 0,
          borderTop: "1px solid var(--border)",
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            style={{
              flex: 1,
              fontSize: "12px",
              padding: "8px 12px",
              borderRadius: "3px",
              border: "1px solid var(--border)",
              background: "var(--slate3)",
              color: "var(--warm-grey)",
              fontFamily: "var(--sans)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--terra)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            style={{
              width: "34px", height: "34px", borderRadius: "3px",
              background: "var(--terra)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s, transform 0.2s",
              opacity: input.trim() ? 1 : 0.4,
            }}
            onMouseEnter={(e) => { if (input.trim()) e.currentTarget.style.background = "var(--terra2)"; }}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--terra)")}
          >
            <FaPaperPlane style={{ color: "var(--warm-white)", fontSize: "11px" }} />
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "20px",
          zIndex: 50,
          width: "52px", height: "52px",
          borderRadius: "3px",
          background: "var(--terra)",
          border: "none",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(224,122,95,0.35)",
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--terra2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {open
          ? <FaTimes style={{ color: "var(--warm-white)", fontSize: "16px" }} />
          : <FaCommentDots style={{ color: "var(--warm-white)", fontSize: "16px" }} />
        }
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: "-4px", right: "-4px",
            width: "18px", height: "18px", borderRadius: "50%",
            background: "#c0392b", color: "#fff",
            fontSize: "10px", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--sans)",
          }}>
            {unread}
          </span>
        )}
      </button>
    </>
  );
};

export default Chatbot;
