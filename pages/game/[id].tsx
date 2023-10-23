import { useRouter } from 'next/router';
import { useEffect, useState} from 'react';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [ws, setWs] = useState<WebSocket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [equation, setEquation] = useState<string>('');
    let data: any;



  useEffect(() => {
    if (!loading) return;
    if (id === undefined) return;
    setWs(new WebSocket('ws://localhost:8080'));
  }, [loading, id]);

    useEffect(() => {
        if (ws === undefined) return;
        ws.onopen = () => {
            console.log('connected');
            ws.send(JSON.stringify({
                type: 'join',
                gameId: id,
                userId: 'later'
            }));
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
            gameId: id,
            userId: 'later'
        }));
      }
        }>Click me</button>
        <h1>{equation}</h1>
    </div>
  );
}
