import { useEffect, useRef, useState } from "react";
import Chat from "../components/Chat";
import { BACKEND_URL } from "../config";
import { addMessageToLocalStorage, getMessageFromLocalStorage } from "../utils";

export interface MessageType {
  username: string;
  message: string;
  timestamp: string;
}

function Home() {
  const [font, setFont] = useState("special-elite-regular");
  const socket = useRef<WebSocket | null>(null);
  const self = useRef<{ username: string; frequency: string } | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const self_data = localStorage.getItem("self");
    if (self_data) {
      const parsed_self_data = JSON.parse(self_data);
      self.current = parsed_self_data;
    }

    if (!socket.current) {
      const ws = new WebSocket(`${BACKEND_URL}`);
      socket.current = ws;
    }

    socket.current.onopen = () => {
      socket.current?.send(
        JSON.stringify({
          type: "join",
          payload: {
            username: self.current?.username,
            room: self.current?.frequency,
          },
        })
      );
    };

    if (self.current?.frequency)
      setMessages(getMessageFromLocalStorage(self.current.frequency));

    return () => {
      socket.current?.close();
      socket.current = null;
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data);
        setMessages((m) => [...m, parsedMessage]);

        if (self.current?.frequency)
          addMessageToLocalStorage(self.current.frequency, parsedMessage);
      };
    }
  }, [messages]);

  return (
    <main className={`h-fit w-fit text-white ${font}`}>
      <Chat
        font={font}
        setFont={setFont}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </main>
  );
}

export default Home;
