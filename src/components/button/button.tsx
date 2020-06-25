import React from 'react';
import './button.scss';
export const CustomButton = (props: any) => {
    const handle = (action: any) => {
        //--
        if (action) {
            action();
        }
    }
    return <>
        <button className='button' onClick={() => handle(props.action)}>{props.name}</button>
        </>
};
