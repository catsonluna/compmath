import { useEffect, useState} from 'react';

export default function Home() {
    const [ws, setWs] = useState<WebSocket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [equation, setEquation] = useState<string>('');
    let data: any;



  useEffect(() => {
    if (!loading) return;
    setWs(new WebSocket('ws://localhost:8080'));
  }, [loading]);

    useEffect(() => {
        if (ws === undefined) return;
        ws.onopen = () => {
            console.log('connected');
            setLoading(false);
        };
        ws.onmessage = (e) => {
            console.log(e.data);
            data = JSON.parse(e.data);
            console.log(data);
            if(data.type === 'equation')
            setEquation(data.equation);
        };
        ws.onclose = () => {
            console.log('disconnected');
            setLoading(true);
        };
    }, [ws]);


  if (ws === undefined) {
    return (
        <></>);
}

  return (
    <div>
      <button onClick={() => {
        console.log('clicked');
        ws.send(JSON.stringify({
            type: 'equation',
            level: 15
        }));
      }
        }>Click me</button>
        <h1>{equation}</h1>
    </div>
  );
}
