import { useRouter } from 'next/router';
import { useEffect, useState} from 'react';
import styles from '@/styles/game.module.css';
import Heart from '@/pages/components/heart';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [ws, setWs] = useState<WebSocket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [equation, setEquation] = useState<string>('');
    let data: any;

    const [counter, setCounter] = useState(30);

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
            const timer = setInterval(() => {
                setCounter((currentCounter) => currentCounter > 0 ? currentCounter - 1 : 0);
            }, 1000);
            return () => clearInterval(timer);
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
        return <></>;
    }

    return (
        <div className={`${styles.main}`}>
            <div>
                <button onClick={() => {
                    console.log('clicked');
                    ws.send(JSON.stringify({
                        type: 'equation',
                        gameId: id,
                        userId: 'later'
                    }));
                }}>Click me</button>
            </div>
            <div className={`${styles.main}`}>{/*main*/}
                <div id="time" className={`${styles.time}`}>{/*time*/}
                    <p className={`${styles.timer}`}>{counter} sec</p>
                </div>
                <div className={`${styles.eq}`}>{/*equations*/}
                    <h1>{equation}</h1>
                </div>
          <div className={`${styles.calcs}`}>{/*calcs*/}
              <div className={`${styles.boxing}`}>
                <div className={`${styles.calc1}`}>{/*calc1*/}
                  <div className={`${styles.res}`}>
                    <input type="number" className={`${styles.in}`} placeholder="0"/>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={7}>7</button>
                    <button className={`${styles.button}`} value={8}>8</button>
                    <button className={`${styles.button}`} value={9}>9</button>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={4}>4</button>
                    <button className={`${styles.button}`} value={5}>5</button>
                    <button className={`${styles.button}`} value={6}>6</button>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={1}>1</button>
                    <button className={`${styles.button}`} value={2}>2</button>
                    <button className={`${styles.button}`} value={3}>3</button>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={0}>0</button>
                  </div>
                </div>
                <div>
                  <p className={`${styles.titl}`}>Me:</p>
                  <Heart num={7} />
                </div>
              </div>
              <div className={`${styles.boxing1}`}>
                <p className={`${styles.titl}`}>Enemy:</p>
                <Heart num={7} />
                <div className={`${styles.calc2}`}>{/*calc2*/}
                  <div className={`${styles.res}`}>
                    <input type="number" className={`${styles.inhid}`} placeholder="0"/>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={7}>7</button>
                    <button className={`${styles.button}`} value={8}>8</button>
                    <button className={`${styles.button}`} value={9}>9</button>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={4}>4</button>
                    <button className={`${styles.button}`} value={5}>5</button>
                    <button className={`${styles.button}`} value={6}>6</button>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={1}>1</button>
                    <button className={`${styles.button}`} value={2}>2</button>
                    <button className={`${styles.button}`} value={3}>3</button>
                  </div>
                  <div className={`${styles.align}`}>
                    <button className={`${styles.button}`} value={0}>0</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}
