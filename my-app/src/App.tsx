import React from 'react';
import './App.css';
import { Minefield } from './Minefield';


export default function App(): any {
  return ( 
    <div>

      <Minefield height={9} width={9} /> 
    </div>
  )
}

