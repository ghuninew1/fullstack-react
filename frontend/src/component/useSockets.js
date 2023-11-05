import { useState, useEffect } from "react";
import io from "socket.io-client";

export const useSocket = () => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_WS_URL, {
            path: "/ws",
            transports: ["websocket", "polling", "webtransport"],
            cors: { origin: "*", Credentials: true },
            autoConnect: false,
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket?.on("connect", () => {
                console.log("Socket connected id: " + socket.id);
            });

            socket?.on("disconnect", (ws) => {
                console.log("Socket disconnected " + ws);
            });
        }
    }, [socket]);

    return { socket };
};
