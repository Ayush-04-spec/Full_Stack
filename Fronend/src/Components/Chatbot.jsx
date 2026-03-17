import { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";

// ── Knowledge base ──────────────────────────────────────────────
const KB = [
  {
    keywords: ["course", "courses", "available", "offer", "learn", "program"],
    answer:
      "We currently offer:\n• Introduction to C Programming\n• Intro to OOP (Java)\n• Introduction to Python\n\nVisit the Courses page for details and pricing.",
  },
  {
    keywords: ["enroll", "enrollment", "join", "admission", "register", "sign up"],
    answer:
      "To enroll:\n1. Create an account on our website\n2. Browse the Courses page\n3. Click 'View Details' on any course\n4. Hit 'Enroll Now'\n\nNeed help? WhatsApp us at +91 82752 24127.",
  },
  {
    keywords: ["exam", "schedule", "test", "date", "upcoming", "assessment"],
    answer:
      "Exam schedules are posted in your Student Dashboard under the 'Upcoming' section after you enroll. Check your profile page once logged in.",
  },
  {
    keywords: ["contact", "phone", "whatsapp", "reach", "call", "number", "touch"],
    answer:
      "You can reach us on WhatsApp at +91 82752 24127. We're available Mon–Sat, 9 AM to 6 PM.",
  },
  {
    keywords: ["fee", "fees", "price", "cost", "payment", "charge"],
    answer:
      "Course fees:\n• C Programming – ₹1,499\n• OOP (Java) – ₹1,999\n• Python – ₹1,299\n\nAll fees are one-time with no hidden charges.",
  },
  {
    keywords: ["duration", "long", "weeks", "hours", "time", "commitment"],
    answer:
      "Course durations:\n• C Programming – 6 weeks (4–5 hrs/week)\n• OOP (Java) – 8 weeks (5–6 hrs/week)\n• Python – 6 weeks (4–5 hrs/week)",
  },
  {
    keywords: ["certificate", "certification", "certified"],
    answer:
      "Yes! You receive a certificate from Ajinkya Infotech upon successfully completing the course and passing the final assessment.",
  },
  {
    keywords: ["batch", "timing", "class", "schedule", "slot", "time"],
    answer:
      "We run morning and evening batches. Contact us on WhatsApp at +91 82752 24127 to check current batch availability.",
  },
  {
    keywords: ["hello", "hi", "hey", "hii", "helo"],
    answer: "Hi there! 👋 How can I help you today?",
  },
  {
    keywords: ["thank", "thanks", "thankyou", "ty"],
    answer: "You're welcome! Feel free to ask anything else. 😊",
  },
];

const QUICK_REPLIES = [
  "What courses are available?",
  "How to enroll?",
  "Exam schedule",
  "Contact institute",
  "Course fees",
];

const GREETING = {
  id: 0,
  from: "bot",
  text: "Hi! 👋 I'm Ajinkya Assistant. How can I help you today?",
};

const STORAGE_KEY = "ajinkya_chat_history";

// ── Bot logic ────────────────────────────────────────────────────
function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "I'm not sure about that. Please WhatsApp us at +91 82752 24127 and we'll be happy to help! 😊";
}

// ── Component ────────────────────────────────────────────────────
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [GREETING];
    } catch {
      return [GREETING];
    }
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  // Persist chat
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Clear unread on open
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg = { id: Date.now(), from: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(userText);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: reply },
      ]);
      if (!open) setUnread((n) => n + 1);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat window ── */}
      <div
        className={`
          fixed bottom-24 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)]
          bg-white rounded-2xl shadow-2xl border border-orange-100
          flex flex-col overflow-hidden
          transition-all duration-300 origin-bottom-right
          ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"}
        `}
        style={{ height: "480px" }}
      >
        {/* Header */}
        <div className="bg-orange-500 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">Ajinkya Assistant</p>
              <p className="text-orange-100 text-xs mt-0.5">Always here to help</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition">
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#fdf6ee]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "bot" && (
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mr-1.5 mt-1 shrink-0">
                  <FaRobot className="text-white text-xs" />
                </div>
              )}
              <div
                className={`
                  max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line leading-relaxed
                  ${msg.from === "user"
                    ? "bg-orange-500 text-white rounded-br-sm"
                    : "bg-white text-gray-700 shadow-sm border border-orange-100 rounded-bl-sm"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <FaRobot className="text-white text-xs" />
              </div>
              <div className="bg-white border border-orange-100 shadow-sm px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="px-3 py-2 flex gap-1.5 overflow-x-auto shrink-0 bg-white border-t border-orange-50">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="shrink-0 text-xs border border-orange-300 text-orange-500 hover:bg-orange-50 px-3 py-1 rounded-full transition whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 flex gap-2 items-center bg-white border-t border-orange-100 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            className="flex-1 text-sm bg-orange-50 border border-orange-200 rounded-full px-4 py-2 outline-none focus:border-orange-400 transition"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 flex items-center justify-center transition shrink-0"
          >
            <FaPaperPlane className="text-white text-xs" />
          </button>
        </div>
      </div>

      {/* ── FAB button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-400/50 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        {open ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaCommentDots className="text-white text-xl" />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
    </>
  );
};

export default Chatbot;
