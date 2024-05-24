import { useEffect, useState } from "react";
import { finnhubApiKey } from "../utils/apis";

function useGetLivePrice(symbol: string) {
  const [livePrice, setPrice] = useState<number>();
  useEffect(() => {
    if (symbol) {
      const socket = new WebSocket(
        `wss://ws.finnhub.io?token=${finnhubApiKey}`,
      );

      // Connection opened -> Subscribe
      socket.addEventListener("open", (event) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });

      // Listen for messages
      socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
        const data = JSON.parse(event.data);
        console.log("data", data);
        if (data?.data?.[0]?.p) {
          setPrice(data?.data?.[0]?.p);
        }
      });

      // Unsubscribe
      return () => {
        setPrice(0);
        socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
      };
    }
  }, [symbol]);

  return {
    livePrice,
  };
}

export default useGetLivePrice;
