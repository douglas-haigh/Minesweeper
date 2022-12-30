import React from 'react';
import './App.css';
import { Minefield, RenderMinefield } from './Minesweeper';


export default function App(): any {
  return ( 
    <div>
      <RenderMinefield
        minefield={new Minefield(9,9,4)}
        /> 
    </div>
  )
}

