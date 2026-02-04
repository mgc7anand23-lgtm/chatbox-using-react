import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState(["Hello! Welcome to the chat."]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null); // Reference to the chat end

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages update

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]); // Add message
      setInput(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Chat Box</h2>
      
      <div className="w-80 h-64 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-white shadow">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded my-1 text-center">
            {msg}
          </div>
        ))}
        {/* Invisible div to scroll to */}
        <div ref={chatEndRef} />
      </div>

      <div className="w-80 flex mt-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
