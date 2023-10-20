import { useEffect } from 'react';
import WebSocket from 'isomorphic-ws';

export default function Home() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('connected');
      ws.send('Hello, this is client!');
    };

    ws.onmessage = (evt: any) => {
      console.log(evt.data);
    };

    ws.onerror = (err: any) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };
  }, []);

  return (
    <div>
      Check the console for WebSocket messages.
    </div>
  );
}
