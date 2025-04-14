import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  text: string;
  type: "user" | "user-joined" | "user-left";
  self?: boolean; // Flag to check if message is from current user
}

const socket: Socket = io("http://127.0.0.1:3030");

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("user-joined", (content: { message: string }) => {
      setMessages((prev) => [
        ...prev,
        { text: content.message, type: "user-joined" },
      ]);
    });

    socket.on("user-left", (content: { message: string }) => {
      setMessages((prev) => [
        ...prev,
        { text: content.message, type: "user-left" },
      ]);
    });

    socket.on("message", (content: { message: string; self: boolean }) => {
      setMessages((prev) => [
        ...prev,
        { text: content.message, type: "user", self: content.self },
      ]);
    });

    return () => {
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = text.trim();

    if (trimmed) {
      socket.emit("newMessage", trimmed);
      setMessages((prev) => [
        ...prev,
        { text: trimmed, type: "user", self: true },
      ]);
      setText("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">React Chat Room</div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.type === "user-left"
                ? "user-left"
                : msg.type === "user-joined"
                ? "user-joined"
                : msg.self
                ? "message-right"
                : "message-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
