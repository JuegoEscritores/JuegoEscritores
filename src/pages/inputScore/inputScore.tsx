import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Keys} from "../../keys";
import {User} from '../../models/user';
import {StorageService} from "../../services/save.local.storage";
import {SendEmail} from "../../services/send.email";


export const InputScore = (props: any) => {
    const history = useHistory();
    const [inputScore, setInputScore] = useState(-1);
    let user = User;
    const storageService = new StorageService();
    user = storageService.get(Keys.USER);
    const lvl = props.location.state ? props.location.state.level : null;
    const handleButton = () => {
        if (lvl) {
            if (inputScore && inputScore >= 0) {
                    let scores = user.score;
                    if (!scores[lvl - 1]) {
                        scores.push({"level": lvl, "score": inputScore});
                    } else {
                        scores[lvl - 1]["level"] = lvl;
                        scores[lvl - 1]["score"] = inputScore;
                    }
                    user.currentLevel = lvl;
                    console.log("LVL " + lvl);
                    if(lvl==10){
                        storageService.set(Keys.WIN, true);
                    }
                    storageService.set(Keys.USER, user);
                    storageService.set(Keys.IS_CHANGE_INPUT, true);
            } else {
                storageService.set(Keys.IS_CHANGE_INPUT, false);
            }
        }
        history.push(Keys.PAGE_TABLE_GAME);
    }

    return <>
        <div className="container-all">
            <form>
                <div id="id-input" className="inputGroup inputGroup2">
                    <label>Por favor realiza el juego de este nivel y luego dinos:</label>
                    <label>¿Cuál fue tu puntaje para el nivel {lvl}?</label>
                    <input type="number" id="nombre_usuario" className="password"
                           onChange={(e) => {
                               setInputScore(e.target.valueAsNumber);
                           }}/>
                </div>
                <div id="div-button" className="inputGroup inputGroup3">
                    <button id="guardar-puntaje" onClick={handleButton}>
                        Guardar puntaje
                    </button>
                </div>
            </form>
        </div>
    </>
}