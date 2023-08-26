import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { Socket, io } from "socket.io-client";
import { v4 } from "uuid";

interface IMessages {
  id: string;
  text: string;
  userId: string;
  username: string;
}

export const useChat = () => {
  const socket = useRef<Socket>();
  const [openSnackbar] = useSnackbar();
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [loadingConnection, setLoadingConnection] = useState(false);

  const sendMessage = (message: string) => {
    socket.current?.emit("message", {
      id: v4(),
      text: message,
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    setLoadingConnection(true);
    socket.current = io("ws://localhost:3002", {
      transports: ["websocket"],
    });

    socket.current.on("connect", async () => {
      openSnackbar("Connection established with the websocket server");
      setLoadingConnection(false);
    });

    socket.current.on("disconnect", () => {
      openSnackbar("Connection closed with the websocket server");
    });

    socket.current.on("message", (message) => {
      openSnackbar("Message received from the websocket server");
      setMessages((messages) => [...messages, message]);
    });

    socket.current.on("error", (error) => {
      openSnackbar(`Error received from the websocket server - ${error}`);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);
  return {
    messages,
    sendMessage,
    loadingConnection,
  };
};
