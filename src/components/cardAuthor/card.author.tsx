import React from 'react';
import './cardAuthor.scss';
import {Keys} from "../../keys";
import {StorageService} from "../../services/save.local.storage";
import {useHistory} from 'react-router-dom';

export const CardAuthor = (props: any) => {
    const history = useHistory();
    const storageService = new StorageService();
    let user = storageService.get(Keys.USER);
    /**
     * handler when the user has selected a card.
     * @param action
     */
    const handle = (action: any) => {
        if (user) {
            if (action) {
                console.log("Se eligió un autor")
                user.icon = props.author;
                storageService.set(Keys.USER, user);
                history.push(Keys.PAGE_TABLE_GAME);
                window.open(Keys.ENV+"resources/Juego escritores - Instrucciones.pdf");
                window.open("","_blank","width=300,height=200,menubar=no", false);
            } else {
                console.log("No se ha elegido un autor")
                history.push(Keys.PAGE_LOGIN);
            }
        }
    }
    return <>
        <div className="container" onClick={(e) => handle(e)}>
            <img src={props.author.image} alt={props.author.name}/>
            <p className="title">{props.author.name}</p>
            <div className="overlay"></div>
        </div>
    </>
};
