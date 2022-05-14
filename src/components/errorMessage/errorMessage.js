import React from "react";
import './errorMessage.css';
import pic from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
        <img src={pic} alt='error'></img>         
        <span>Something goes wrong</span>
        </>
    )                                   //синтаксис забора данных с папки public
}

export default ErrorMessage;