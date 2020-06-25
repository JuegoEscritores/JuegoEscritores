import React from 'react';
import './footer.style.scss'
import {CardAuthor} from "../cardAuthor/card.author";
import author from '../../mocks/authors.json';
import {Keys} from "../../keys";
import {User} from "../../models/user";
import {StorageService} from "../../services/save.local.storage";
export const FooterComponent = (props: any) => {

    const storageService = new StorageService();
    let beforeSpawn;
    beforeSpawn =  storageService.get(Keys.USER) as any;
    let suma = 0;
    beforeSpawn.score.forEach ( (numero: any) => {
        suma += numero.score;
    });

    return <>
       <div className='footer-container'>
           <div className='order'>

               <div className='inline-xd'>
                   <img  src={beforeSpawn.icon.icon} alt={beforeSpawn.name}/>
               </div>

               <div className='custom text inline-xd'>
                   <span>{beforeSpawn.icon.name}</span>
               </div>

               <div className='custom-order text inline-xd'>
                   <strong>Nivel Actual:</strong> <span> {beforeSpawn.currentLevel}</span>
               </div>

               <div className='custom-order text inline-xd'>
                   <strong>Puntaje Total: </strong><span>{suma}</span>
               </div>
           </div>

       </div>
    </>
};
