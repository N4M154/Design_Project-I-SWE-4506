// import { Groq } from "groq-sdk";
// import React, { useEffect, useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useLocation } from "react-router-dom";

// const FloatingChatbot = () => {
//   const [inputText, setInputText] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const chatEndRef = useRef(null);

//   const location = useLocation();
//   const pathsToShowChatbot = ["/home"];
//   const shouldShowChatbot = pathsToShowChatbot.includes(location.pathname);

//   const groq = new Groq({
//     apiKey: import.meta.env.VITE_GROQ_API_KEY,
//     dangerouslyAllowBrowser: true,
//   });

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [conversation]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!inputText.trim()) return;

//     setLoading(true);

//     const updatedConversation = [
//       ...conversation,
//       { role: "user", content: inputText },
//     ];

//     try {
//       const chatCompletion = await groq.chat.completions.create({
//         model: "llama-3.3-70b-versatile", //gemma2-9b-it;llama-3.1-8b-instant;llama3-70b-8192;llama3-8b-8192;mixtral-8x7b-32768
//         temperature: 0.9,
//         max_tokens: 2048,
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are Doodly, a playful and helpful chatbot designed to assist users in learning programming in C, C++, Python, and Java. Your responses should be thorough, clear, and educational, using examples where needed to support learning. Maintain a fun and friendly tone that matches the silly duck theme of the website.For any queries outside of programming in these specific languages, politely explain that you only specialize in these areas and gently redirect the user back to relevant topics. Stay on-brand by adding a touch of duck-themed humor or quirkiness to your responses.keep in mind you only know everything about C,C++,Python and Java",
//           },
//           ...updatedConversation,
//         ],
//       });

//       const aiResponse =
//         chatCompletion.choices[0]?.message?.content || "No response from AI.";

//       setConversation([
//         ...updatedConversation,
//         { role: "assistant", content: aiResponse },
//       ]);

//       setInputText("");
//     } catch (error) {
//       console.error("Error fetching from Groq:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!shouldShowChatbot) {
//     return null;
//   }

//   return (
//     <>
//       {/* Floating Chatbot Button */}
//       {!isChatOpen && (
//         <button
//           className="fixed bottom-4 right-4  transition-all z-50 hover:scale-110"
//           onClick={() => setIsChatOpen(true)}
//         >
//           <img src="/chatbot.png" alt="Chatbot Icon" className="w-30 h-16" />
//         </button>
//       )}

//       {/* Chatbot Popup */}
//       {isChatOpen && (
//         <div className="fixed bottom-12 right-12 w-[450px] h-[33rem] bg-white dark:bg-black rounded-lg shadow-lg flex flex-col z-50">
//           {/* Chat Header */}
//           <div className="flex items-center justify-between bg-yellow-100 dark:bg-yellow-500 text-black p-3 rounded-t-lg">
//             <div className="flex items-center">
//               <img
//                 src="/chatbot.png"
//                 alt="Chatbot Header Icon"
//                 className="w-25 h-16 ml-0.2 mr-4" // Slight left shift for the image
//               />
//               <div>
//                 <h1 className="text-lg font-bold">Doodly</h1>
//                 <p className="text-sm text-gray-800">
//                   Your quacky coding companion!
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               {/* Refresh Button */}
//               <button
//                 className="text-black hover:text-blue-800 text-2xl font-bold"
//                 onClick={() => setConversation([])} // Clears the conversation
//                 title="Refresh Chat"
//               >
//                 ⟳
//               </button>
//               {/* Close Button */}
//               <button
//                 className="text-black hover:text-red-600 text-xl font-bold"
//                 onClick={() => setIsChatOpen(false)}
//                 title="Close Chat"
//               >
//                 X
//               </button>
//             </div>
//           </div>

//           {/* Chat History */}
//           <div className="flex-1 overflow-y-auto p-3">
//             {conversation.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-4 ${
//                   message.role === "user" ? "text-right" : "text-left"
//                 }`}
//               >
//                 <div
//                   className={`inline-block p-3 rounded-lg shadow-sm ${
//                     message.role === "user"
//                       ? "bg-yellow-200 dark:bg-yellow-500 dark:text-black"
//                       : "bg-yellow-50 border-black dark:bg-black text-black dark:text-yellow-200 text-sm border dark:border-yellow-200"
//                   }`}
//                 >
//                   <ReactMarkdown>{message.content}</ReactMarkdown>
//                 </div>
//               </div>
//             ))}
//             <div ref={chatEndRef}></div>
//           </div>

//           {/* Chat Input */}
//           <form
//             onSubmit={handleSubmit}
//             className="p-3 border-t border-black dark:border-yellow-200"
//           >
//             <textarea
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               placeholder="Type your message here..."
//               rows="2"
//               className="w-full p-2 border bg-yellow-50 dark:bg-black text-black dark:text-white border-black dark:border-yellow-200 rounded-lg focus:outline-none focus:ring focus:ring-yellow-200"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-2 w-full bg-black dark:bg-yellow-600 text-yellow-50 dark:text-black font-semibold py-2 rounded-lg hover:opacity-70 dark:hover:bg-yellow-700 disabled:opacity-50"
//             >
//               {loading ? "Thinking..." : "Send"}
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default FloatingChatbot;

import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Groq } from "groq-sdk";
import { TiMicrophone } from "react-icons/ti";
import { IoMdSend } from "react-icons/io";

const FloatingChatbot = () => {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  const location = useLocation();
  const pathsToShowChatbot = ["/home", "/compiler"];
  const shouldShowChatbot = pathsToShowChatbot.includes(location.pathname);

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const recognitionRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => `${prev} ${transcript}`);
      };
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleSpeechInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

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
              "You are Doodly, a playful and helpful chatbot on a coding learning platform. You assist users in learning and practicing programming in C, C++, Python, and Java. Your responses should be clear, educational, and fun, with examples to support learning. When a user asks a coding-related question, provide thorough, easy-to-understand explanations, along with code examples when necessary. If a user asks a question unrelated to coding, respond with a friendly and gentle reminder to 'Please ask any questions related to programming.' Keep the tone playful, encouraging, and silly, just like a cheerful duck!",
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

  if (!shouldShowChatbot) {
    return null;
  }

  return (
    <>
      {!isChatOpen && (
        <button
          className="fixed bottom-4 right-4 transition-all z-50 hover:scale-110"
          onClick={() => setIsChatOpen(true)}
        >
          <img src="/chatbot.png" alt="Chatbot Icon" className="w-30 h-16" />
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-12 right-12 w-[450px] h-[33rem] bg-white dark:bg-black rounded-lg shadow-lg flex flex-col z-50">
          <div className="flex items-center justify-between bg-yellow-100 dark:bg-yellow-500 text-black p-3 rounded-t-lg">
            <div className="flex items-center">
              <img
                src="/chatbot.png"
                alt="Chatbot Header Icon"
                className="w-25 h-16 ml-0.2 mr-4"
              />
              <div>
                <h1 className="text-lg font-bold">Doodly</h1>
                <p className="text-sm text-gray-800">
                  Your quacky coding companion!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-black hover:text-blue-800 text-2xl font-bold"
                onClick={() => setConversation([])}
                title="Refresh Chat"
              >
                ⟳
              </button>
              <button
                className="text-black hover:text-red-600 text-xl font-bold"
                onClick={() => setIsChatOpen(false)}
                title="Close Chat"
              >
                X
              </button>
            </div>
          </div>

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
                      ? "bg-yellow-200 dark:bg-yellow-500 dark:text-black"
                      : "bg-yellow-50 border-black dark:bg-black text-black dark:text-white text-sm border dark:border-yellow-200"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-black dark:border-yellow-200"
          >
            <div className="flex items-center space-x-2">
              {/* Text Area */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                rows="2"
                className="w-full p-2 border bg-yellow-50 dark:bg-black text-black dark:text-white border-black dark:border-yellow-200 rounded-lg focus:outline-none focus:ring focus:ring-yellow-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2 bg-black dark:bg-yellow-600 text-yellow-300 dark:text-black rounded-lg hover:opacity-70 disabled:opacity-50 flex items-center justify-center"
                title="Send Message"
              >
                <IoMdSend size={24} />
              </button>
              <button
                type="button"
                onClick={handleSpeechInput}
                title="Voice Input"
                className={`p-2 rounded-lg ${
                  isListening
                    ? "bg-green-500"
                    : "bg-yellow-100 border border-black text-black dark:bg-black dark:text-yellow-700 dark:border-yellow-700"
                } hover:opacity-70 disabled:opacity-50`}
              >
                <TiMicrophone size={24} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
