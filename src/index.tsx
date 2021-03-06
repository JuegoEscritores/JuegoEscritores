import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Keys} from "./keys";
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

ReactDOM.render(
    <React.StrictMode>
        <audio src={Keys.ENV + "music.mp3"} id="music" autoPlay loop controls></audio>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
