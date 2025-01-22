import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Groq } from "groq-sdk";

const FloatingChatbot = () => {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatEndRef = useRef(null);

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);

    const updatedConversation = [
      ...conversation,
      { role: "user", content: inputText },
    ];

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.9,
        max_tokens: 2048,
        messages: [
          {
            role: "system",
            content:
              "You are Quacky, a playful and helpful chatbot designed to assist users in learning programming in C, C++, Python, and Java. Your responses should be thorough, clear, and educational, using examples where needed to support learning. Maintain a fun and friendly tone that matches the silly duck theme of the website.For any queries outside of programming in these specific languages, politely explain that you only specialize in these areas and gently redirect the user back to relevant topics. Stay on-brand by adding a touch of duck-themed humor or quirkiness to your responses.keep in mind you only know everything about C,C++,Python and Java",
          },
          ...updatedConversation,
        ],
      });

      const aiResponse =
        chatCompletion.choices[0]?.message?.content || "No response from AI.";

      setConversation([
        ...updatedConversation,
        { role: "assistant", content: aiResponse },
      ]);

      setInputText("");
    } catch (error) {
      console.error("Error fetching from Groq:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      {!isChatOpen && (
        <button
          className="fixed bottom-4 right-4  transition-all z-50 hover:scale-110"
          onClick={() => setIsChatOpen(true)}
        >
          <img src="/chatbot.png" alt="Chatbot Icon" className="w-30 h-16" />
        </button>
      )}

      {/* Chatbot Popup */}
      {isChatOpen && (
        <div className="fixed bottom-12 right-12 w-[450px] h-[33rem] bg-black rounded-lg shadow-lg flex flex-col z-50">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-yellow-500 text-black p-3 rounded-t-lg">
            <div className="flex items-center">
              <img
                src="/chatbot.png"
                alt="Chatbot Header Icon"
                className="w-25 h-16 ml-0.2 mr-4" // Slight left shift for the image
              />
              <div>
                <h1 className="text-lg font-bold">Doodly</h1>
                <p className="text-sm text-gray-800">
                  Your quacky coding companion!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Refresh Button */}
              <button
                className="text-black hover:text-blue-800 text-2xl font-bold"
                onClick={() => setConversation([])} // Clears the conversation
                title="Refresh Chat"
              >
                ⟳
              </button>
              {/* Close Button */}
              <button
                className="text-black hover:text-red-600 text-xl font-bold"
                onClick={() => setIsChatOpen(false)}
                title="Close Chat"
              >
                X
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg shadow-sm ${
                    message.role === "user"
                      ? "bg-yellow-500 text-black"
                      : "bg-black text-yellow-200 text-sm border border-yellow-200"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-yellow-200"
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              rows="2"
              className="w-full p-2 border bg-black text-white border-yellow-200 rounded-lg focus:outline-none focus:ring focus:ring-yellow-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-yellow-600 text-black font-semibold py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
