import React from 'react';
import './App.css';
import { Minefield, RenderMinefield } from './Minefield';



export default function App(): any {
  return ( 
    <div>
      <RenderMinefield
        minefield={new Minefield(9,9,0)}
        /> 
    </div>
  )
}

