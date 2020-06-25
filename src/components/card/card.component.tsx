import React, {FunctionComponent, useEffect, useState} from 'react';

export const Card = (props: any) => {
    const [time, setTime] = useState(0);
    const [ome, setOme] = useState('ome');

    useEffect(()=> {
        console.log('time changed!');
    }, [time]);

    const showConsole = (log = '') => {
        console.log('result:', log);
        console.log(props.name, log);
        asyncFunction().then( () => {
            setTime(1);
            setOme('ome 2');
        });
        runCallback(callbackC);
    };

    const callbackC =  () => {
        console.log('callback executed!');
    }

    const runCallback = (callback: any) => {
        callback();
    }

    /**
     * to be executed 2 seconds later
     */
    const asyncFunction = () => {
        return new Promise(resolve =>
            setTimeout(() => resolve(), 2000)
        );
    }

    return <>
        <p>Card component {props.name} {time} {ome}</p>
        <button onClick={() => showConsole()}>CLICK ME!</button>
    </>
}
