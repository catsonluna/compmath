import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/game.module.css';
import Heart from '@/pages/components/heart';
import Calc from '@/pages/components/calc';
import { getCookie } from 'cookies-next';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [ws, setWs] = useState<WebSocket>();
    const [loading, setLoading] = useState<boolean>(true);
    const [equation, setEquation] = useState<string>('');
    let data: any;
    const [ready, setReady] = useState<boolean>(false);

    const [counter, setCounter] = useState(30);

    const [restartKey, setRestartKey] = useState(0); // Add this line
    const [inputValue, setInputValue] = useState(''); // Add this line
    const inputRef1 = useRef(null); // Create a ref for the first input field
    const inputRef2 = useRef(null); // Create a ref for the second input field
    const [localLives, setLocalLives] = useState(7);
    const [enemyLives, setEnemyLives] = useState(7);
    const [localColour, setLocalColour] = useState('white');
    const [enemyColour, setEnemyColour] = useState('white');
    const [localEnabled, setLocalEnabled] = useState(true);


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
                sessionToken: getCookie('token')
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
            if(data.type === 'start'){
                setReady(true);
                setCounter(30);
                setEquation(data.equation);
            }
            if(data.type === "answer"){
              if(data.sessionToken === getCookie('token')){
                if(data.correct){
                  setLocalColour('green');
                }else{
                  setLocalColour('red');
                  setLocalLives(localLives - 1);
                }
            }else{
              if(data.correct){
                setEnemyColour('green');
              }else{
                setEnemyColour('red');
                setEnemyLives(enemyLives - 1);
              }
            }
          }
          if(data.type === "next"){
            setLocalColour('white');
            setEnemyColour('white');
            setLocalEnabled(true);
            setCounter(30);
            setEquation(data.equation);
          }
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

    if(!ready){
      return<>
        <div className={`${styles.mainq}`}>
          <h1 className={`${styles.queue}`}>Waiting for other player...</h1>
        </div>
      </>
    }

    return (
      <>
              <div className={`${styles.main}`} key={restartKey}>{/*main*/}
                <div id="time" className={`${styles.time}`}>{/*time*/}
                    <p className={`${styles.timer}`}>{counter.toString()} sec</p>
                </div>
                <div className={`${styles.eq}`}>{/*equations*/}
                    <h1>{equation}</h1>
                </div>
          <div className={`${styles.calcs}`}>{/*calcs*/}
              <div className={`${styles.boxing}`}>
                <div className={`${styles.calc1}`}>{/*calc1*/}
                  <div className={`${styles.res}`}                     style={{
                      backgroundColor: localColour
                    }}>
                    {/* Add ref to the first input field */}
                    <input type="number" value={inputValue} className={`${styles.in}`} onChange={handleChange} placeholder="0" ref={inputRef1} onKeyDown={(event) => {
                      if(event.key === 'Enter'){
                        ws.send(JSON.stringify({
                          type: 'answer',
                          answer: inputValue,
                          gameId: id,
                          sessionToken: getCookie('token')
                        }));
                        setLocalEnabled(false);
                        setInputValue('')
                      }
                    }}
                    />
                  </div>
                    {/* Pass setInputValue as a prop to Calc */}
                    <Calc inputValue={inputValue} setInputValue={setInputValue} disabled={!localEnabled}/>
                </div>


                <div>
                  <p className={`${styles.titl}`}>Me:</p>
                  <Heart num={localLives} />
                </div>
              </div>
              <div className={`${styles.boxing1}`}>
                <p className={`${styles.titl}`}>Enemy:</p>
                <Heart num={enemyLives} />
                <div className={`${styles.calc2}`}>{/*calc2*/}
                  <div className={`${styles.res}`} style={{
                      backgroundColor: enemyColour
                    }}>
                    {/* Add ref to the input field */}
                    <input type="number" className={`${styles.inhid}`} placeholder="0" ref={inputRef2}/>
                  </div>
                    {/* Pass setInputValue as a prop to Calc */}
                    <Calc setInputValue={setInputValue} disabled={true}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
