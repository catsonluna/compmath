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
    const [gameover, setGameover] = useState(false);

    useEffect(() => {
        if (!loading) return;
        if (id === undefined) return;
        setWs(new WebSocket('ws://49.13.48.240:8080'));
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
                  setLocalLives(localLives - 1);
                  setLocalColour('red');
                  console.log(localLives);
                }
            }else{
              if(data.correct){
                setEnemyColour('green');
              }else{
                setEnemyLives(enemyLives - 1);
                setEnemyColour('red');
                console.log(enemyLives);
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
          if(data.type === "gameover"){
            setGameover(true);
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
          <button className={`${styles.button1}`} onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}>Copy Link</button>
        </div>
      </>
    }

    if(gameover){
      return<>
        <div className={`${styles.mainq}`}>
          </div>  
          <div className={`${styles.mainq}`}>
          <h1 className={`${styles.queue}`}>Game Over</h1>
          <button className={`${styles.button1}`} onClick={() => {
            router.push('/');
          }}>Return to Home</button>
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
                      if(event.key === 'Enter' || counter === 0){
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
