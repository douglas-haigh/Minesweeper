import React from 'react';
import './App.css';
import { Minefield } from './Minesweeper';


export default function App(): any {
  return ( 
    <div>
      <Minefield
        height={9} width={8} numMines={10}
        /> 
    </div>
  )
}

