import React from 'react';
import author from '../mocks/authors.json';
import {CardAuthor} from "../components/cardAuthor/card.author";
import './grid.authors.scss';

export const GridAuthors = (props: any) => {

    const cards = () => {
        let authors = author;
        let cards: JSX.Element[] = [];
        authors.forEach((aut) => {
            cards.push(<CardAuthor author={aut} key={aut.id}/>)
        });
        return cards;
    }
    return <>
        <div className="selector-title-container">
            <h1 className="selector-title">Elige un escritor</h1>
        </div>
        <div className='layoutContainer'>
            {cards()}
        </div>
    </>
}
