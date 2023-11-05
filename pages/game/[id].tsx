import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/game.module.css';
import Heart from '@/pages/components/heart';
import Calc from '@/pages/components/calc';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [ws, setWs] = useState<WebSocket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [equation, setEquation] = useState<string>('');
    let data: any;

    const [counter, setCounter] = useState(30);
    const [inputValue, setInputValue] = useState('');
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const [restartKey, setRestartKey] = useState(0); // Add this line

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
                setCounter((currentCounter) => {
                    if (currentCounter > 0) {
                        return currentCounter - 1;
                    } else {
                        // When the countdown hits 0, increment restartKey to force a remount
                        setRestartKey(prevKey => prevKey + 1);
                        // Reset the counter to 30 seconds after 10 seconds
                        setTimeout(() => {
                            setCounter(30);
                        }, 10000);
                        return 0;
                    }
                });
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

    useEffect(() => {
        if (inputRef1.current) {
          inputRef1.current.focus();
        }
      }, []);
    
      const handleChange = (event) => {
        setInputValue(event.target.value);
      }

    if (ws === undefined) {
        return <></>;
    }

    return (
        <>
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
              <div className={`${styles.main}`} key={restartKey}>{/*main*/}
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
                      <input type="number" value={inputValue} className={`${styles.in}`} onChange={handleChange} placeholder="0" ref={inputRef1}/>
                    </div>
                      <Calc inputValue={inputValue} setInputValue={setInputValue} disabled={false}/>
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
                    {/* Add ref to the input field */}
                    <input type="number" className={`${styles.inhid}`} placeholder="0" ref={inputRef2}/>
                  </div>
                    {/* Pass setInputValue as a prop to Calc */}
                    <Calc setInputValue={setInputValue} disabled={true}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
